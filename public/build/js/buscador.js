const dominio=window.location.origin;document.addEventListener("DOMContentLoaded",()=>{iniciarApp()});const iniciarApp=()=>{repetidor(),buscador()};let buscadorActual="";const buscador=()=>{const e=document.querySelector("#buscador"),t=document.querySelector("#titulo-buscador"),a=document.querySelector("#inputs");buscadorActual="hoy",e.addEventListener("input",e=>{switch(a.innerHTML="",e.target.value){case"hoy":t.textContent="Citas de Hoy";let e=buscador_hoy(citasArr);renderCitas(e);break;case"fecha":t.textContent="Citas por Fecha",a.innerHTML='<input type="date" id="input-date">';const n=document.querySelector("#input-date");let c=[];n.addEventListener("input",e=>{c=buscador_fecha(citasArr,e.target.value),renderCitas(c)});break;case"todas":t.textContent="Todas las Citas",buscador_todas(),renderCitas(citasArr)}})},fecha=new Date,fechaHoy=fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),buscador_hoy=e=>(buscadorActual="hoy",citasHoyArr=e.filter(e=>e.fecha==fechaHoy),citasHoyArr),buscador_fecha=(e,t)=>(buscadorActual="fecha",citasFechaArr=e.filter(e=>e.fecha==t),citasFechaArr),buscador_todas=()=>{buscadorActual="todas"},repetidor=()=>{setInterval(()=>{citasAPI(),actualizarCitas()},2e3)};let citasRenderizadas=0;const actualizarCitas=()=>{if(citasArr.length!=citasRenderizadas)switch(citasAPI(),citasRenderizadas=citasArr.length,buscadorActual){case"hoy":let e=buscador_hoy(citasArr);renderCitas(e);break;case"fecha":const t=document.querySelector("#input-date");let a=buscador_fecha(citasArr,t.value);renderCitas(a);break;case"todas":renderCitas(citasArr)}};let citasArr=[];const citasAPI=async()=>{try{const e=dominio+"/api/vercitas",t=await fetch(e),a=await t.json();citasArr.length=0;let n={},c={};idActual=0,a.forEach(e=>{const{id:t,hora:a,cliente:i,email:o,telefono:s,servicio:r,precio:d,fecha:l}=e;idActual!==t&&(n={id:t,cliente:i,telefono:s,email:o,hora:a,fecha:l,servicios:[],total:0},citasArr.push(n),idActual=t),c={servicio:r,precio:d},n.total+=Number(d),n.servicios.push(c)})}catch(e){console.log(e)}},renderCitas=e=>{const t=document.querySelector("#citas");t.innerHTML="",0==e.length&&(t.innerHTML="No hay Citas"),e.forEach(e=>{const{id:a,cliente:n,telefono:c,email:i,fecha:o,hora:s,servicios:r,total:d}=e,l=document.createElement("DIV");l.classList.add("cita");const p=document.createElement("DIV");p.classList.add("cliente-info");const u=document.createElement("P");u.innerHTML="<span>Cita ID:</span> "+a,p.appendChild(u);const h=document.createElement("P");h.innerHTML="<span>Cliente:</span> "+n,p.appendChild(h),l.appendChild(p);const m=document.createElement("DIV");m.classList.add("cita-info");const C=document.createElement("DIV");C.classList.add("contacto-info");const f=document.createElement("P");f.innerHTML="<span>Contacto</span>",C.appendChild(f);const A=document.createElement("P");A.innerHTML="<span>Teléfono:</span> "+c,C.appendChild(A);const b=document.createElement("P");b.innerHTML="<span>Email:</span> "+i,C.appendChild(b);const E=document.createElement("P");E.innerHTML="<span>Fecha:</span> "+o,C.appendChild(E);const y=document.createElement("P");y.innerHTML="<span>Hora:</span> "+s,C.appendChild(y);const L=document.createElement("DIV");L.classList.add("servicio-info");const H=document.createElement("P");H.innerHTML="<span>Servicios</span>",L.appendChild(H),r.forEach(e=>{const{servicio:t,precio:a}=e,n=document.createElement("P");n.textContent=t,L.appendChild(n);const c=document.createElement("P");c.innerHTML=`<span>$${a}</span>`,L.appendChild(c)});const T=document.createElement("P");T.innerHTML="<span>Total:</span> $"+d,L.appendChild(T),m.appendChild(C),m.appendChild(L),l.appendChild(m);const v=document.createElement("DIV");v.innerHTML=`<form action="/api/eliminar" method="POST">\n        <input type="hidden" name="id" value="${a}">\n        <input type="submit" value="Eliminar" class="boton-eliminar">\n        </form>`,l.appendChild(v),t.appendChild(l)})};