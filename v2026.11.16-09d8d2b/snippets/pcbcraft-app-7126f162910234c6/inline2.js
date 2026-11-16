
export function downloadFabrication(bytes,name){const url=URL.createObjectURL(new Blob([bytes],{type:'application/zip'}));const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
