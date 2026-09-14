/* Local PDF export. No network requests or persistent storage. */
const LernnotizenPDF = (() => {
  const extra = {"€":128,"‚":130,"ƒ":131,"„":132,"…":133,"†":134,"‡":135,"ˆ":136,"‰":137,"Š":138,"‹":139,"Œ":140,"Ž":142,"‘":145,"’":146,"“":147,"”":148,"•":149,"–":150,"—":151,"˜":152,"™":153,"š":154,"›":155,"œ":156,"ž":158,"Ÿ":159};
  const clean = s => String(s).replace(/\r\n?/g,"\n").replace(/\u00ad|\u200b/g,"").replace(/\t/g,"    ");
  const code = c => extra[c] ?? (c.codePointAt(0)<=255 ? c.codePointAt(0) : null);
  const hex = s => [...s].map(c=>code(c).toString(16).padStart(2,"0")).join("");
  function build(blocks){
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    if(!ctx) throw new Error("Canvas unavailable");
    const width=487, left=54, bottom=776;
    const pages=[[]], images=[];
    let y=58;
    const page=()=>pages[pages.length-1];
    const next=()=>{pages.push([]);y=58;};
    const styles={
      titel:{size:23,bold:true,gap:16},
      untertitel:{size:12,bold:false,gap:12},
      kapitel:{size:17,bold:true,gap:15},
      heading:{size:12,bold:true,gap:9},
      text:{size:10.5,bold:false,gap:8},
      loesung:{size:10.5,bold:false,gap:8}
    };
    function lines(text,style){
      ctx.font=(style.bold?"bold ":"")+style.size+"px Arial";
      const result=[];
      for(const paragraph of text.split("\n")){
        if(!paragraph.trim()){result.push("");continue;}
        let line="";
        for(const word of paragraph.trim().split(/\s+/)){
          if(ctx.measureText(line+(line?" ":"")+word).width<=width/1.04){
            line+=(line?" ":"")+word;
          } else {
            if(line){result.push(line);line="";}
            for(const c of word){
              if(ctx.measureText(line+c).width>width/1.04){result.push(line);line="";}
              line+=c;
            }
          }
        }
        if(line) result.push(line);
      }
      return result;
    }
    function draw(line,style,atY){
      if([...line].every(c=>code(c)!==null)){
        page().push("BT /"+(style.bold?"F2":"F1")+" "+style.size+" Tf 0.12 0.11 0.09 rg 1 0 0 1 "+left+" "+(842-atY)+" Tm <"+hex(line)+"> Tj ET");
      } else {
        // Preserve characters outside WinAnsi (e.g. handwritten Greek or emoji)
        // as a high-resolution image of this line.
        const c=document.createElement("canvas");
        c.width=Math.ceil(width*3);c.height=Math.ceil(style.size*1.7*3);
        const g=c.getContext("2d");
        g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);
        g.scale(3,3);g.font=(style.bold?"bold ":"")+style.size+"px Arial";
        g.fillStyle="#1f1c17";g.textBaseline="alphabetic";g.fillText(line,0,style.size*1.2);
        const raw=atob(c.toDataURL("image/jpeg",0.95).split(",")[1]);
        images.push({raw,w:c.width,h:c.height});
        page().push("q "+width+" 0 0 "+(c.height/3)+" "+left+" "+(842-atY-style.size*.5)+" cm /I"+images.length+" Do Q");
      }
    }
    blocks.forEach(block=>{
      const style=styles[block.typ]||styles.text;
      const text=clean(block.text);
      if(!text)return;
      if(block.typ==="kapitel" && y>58)y+=18;
      const wrapped=lines(text,style);
      const leading=style.size*1.45;
      if(["heading","titel","kapitel"].includes(block.typ)&&y+leading*4>bottom)next();
      wrapped.forEach(line=>{
        if(y+leading>bottom)next();
        draw(line,style,y);y+=leading;
      });
      y+=style.gap;
    });
    const objs=[null,"<< /Type /Catalog /Pages 2 0 R >>","",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"];
    const imageIds=images.map(im=>{
      objs.push("<< /Type /XObject /Subtype /Image /Width "+im.w+" /Height "+im.h+" /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length "+im.raw.length+" >>\nstream\n"+im.raw+"\nendstream");
      return objs.length-1;
    });
    const kids=[];
    pages.forEach((commands,i)=>{
      commands.push("BT /F1 9 Tf 0.4 g 1 0 0 1 54 32 Tm <"+hex("Aufklärung · Lernnotizen")+" > Tj ET");
      commands.push("BT /F1 9 Tf 0.4 g 1 0 0 1 470 32 Tm <"+hex("Seite "+(i+1)+" / "+pages.length)+"> Tj ET");
      const stream=commands.join("\n");
      const streamId=objs.length;objs.push("<< /Length "+stream.length+" >>\nstream\n"+stream+"\nendstream");
      const id=objs.length;
      const xobjects=imageIds.map((n,j)=>"/I"+(j+1)+" "+n+" 0 R").join(" ");
      objs.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << "+xobjects+" >> >> /Contents "+streamId+" 0 R >>");
      kids.push(id+" 0 R");
    });
    objs[2]="<< /Type /Pages /Count "+kids.length+" /Kids ["+kids.join(" ")+"] >>";
    let pdf="%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", offsets=[0];
    for(let i=1;i<objs.length;i++){offsets.push(pdf.length);pdf+=i+" 0 obj\n"+objs[i]+"\nendobj\n";}
    const xref=pdf.length;
    pdf+="xref\n0 "+objs.length+"\n0000000000 65535 f \n";
    offsets.slice(1).forEach(o=>pdf+=String(o).padStart(10,"0")+" 00000 n \n");
    pdf+="trailer\n<< /Size "+objs.length+" /Root 1 0 R >>\nstartxref\n"+xref+"\n%%EOF\n";
    return new Uint8Array([...pdf].map(c=>c.charCodeAt(0)));
  }
  function download(blocks,name){
    const status=document.getElementById("pdf-status");
    try{
      const bytes=build(blocks);
      const url=URL.createObjectURL(new Blob([bytes],{type:"application/pdf"}));
      const a=document.createElement("a");
      a.href=url;a.download=name+"-"+new Date().toLocaleDateString("sv-SE")+".pdf";
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60000);
      status.textContent="Dein PDF wurde erstellt. Du findest es in den Downloads; auf dem iPad kannst du es auch in „Dateien“ sichern.";
    }catch(error){
      status.textContent="Das PDF konnte nicht erstellt werden. Bitte versuche es erneut. Deine Eingaben sind weiterhin vorhanden.";
      console.error("PDF export failed",error);
    }
  }
  return {build,download};
})();
