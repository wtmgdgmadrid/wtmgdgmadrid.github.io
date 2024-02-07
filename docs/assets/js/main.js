"use strict";const toggleButton=document.querySelector(".nav_toggle"),itemsContainer=document.querySelector(".navbar_items");toggleButton.onclick=()=>{itemsContainer.classList.toggle("open"),toggleButton.classList.toggle("close")};const menuLinks=document.querySelectorAll(".js-menu");menuLinks.forEach(e=>{e.onclick=()=>{itemsContainer.classList.remove("open"),toggleButton.classList.remove("close")}}),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".navbar_a-logo");window.addEventListener("scroll",(function(){const n=window.scrollY>50;e.src=n?"./assets/images/Logo-negro.png":" ./assets/images/Logo-blanco.png"}))}));const ponentesInfo={"Ponente 1":{name:"Cristina rodríguez",image:"./assets/images/crisFlor.png",title:"Cómo teletrabajar en un networking",place:"(Madrid, 1991)",bio:"Breve biografía del Ponente 1.",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus!",twitter:"https://www.linkedin.com/in/alba-gg",linkedin:"https://www.linkedin.com/in/alba-gg"},"Ponente 2":{name:"Ainhoa de las Heras",image:"./assets/images/ainhoaFlor.png",title:"Cómo teletrabajar en un networking",place:"(Barcelona, 1991)",bio:"Breve biografía del Ponente 2.",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus",twitter:"https://www.linkedin.com/in/alba-gg",linkedin:"https://www.linkedin.com/in/alba-gg"},"Ponente 3":{name:"Raquel Ortiz",image:"./assets/images/rachelFlor.png",title:"Cómo teletrabajar en un networking",place:"(Barcelona, 1991)",bio:"Breve biografía del Ponente 3.",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus",twitter:"https://www.linkedin.com/in/alba-gg",linkedin:"https://www.linkedin.com/in/alba-gg"},"Ponente 4":{name:"Alba Ginés",image:"./assets/images/defaultFlor.png",title:"Cómo teletrabajar en un networking",place:"(Barcelona, 1991)",bio:"Breve biografía del Ponente 4.",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus",twitter:"https://www.linkedin.com/in/alba-gg",linkedin:"https://www.linkedin.com/in/alba-gg"},"Ponente 5":{name:"Aranzazu Barrutia",image:"./assets/images/defaultFlor.png",title:"Cómo teletrabajar en un networking",place:"(Barcelona, 1991)",bio:"Breve biografía del Ponente 5.",info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus",twitter:"https://www.linkedin.com/in/alba-gg",linkedin:"https://www.linkedin.com/in/alba-gg"},"Ponente 6":{name:"Paula Gonzalez",image:"./assets/images/defaultFlor.png",title:"Cómo teletrabajar en un networking",place:"(Barcelona, 1991)",bio:"Breve biografía del Ponente 6.",info:"¿Qué podemos hacer en nuestro día a día para salvar al planeta? El tema de la sostenibilidad también aplica a la informática. <br>El Green Computing es un área de la informática que estudia el uso de los recursos y su impacto ambiental. <br>Entonces, ¿podemos hacer nuestro trabajo más sostenible? ¿Y es el trabajo en remoto siempre más sostenible? <br>Vamos a ver una introducción al Green Computing y que podemos hacer cotidianamente para aportar nuestro granito de arena al medioambiente.",twitter:"https://www.linkedin.com/in/alba-gg",linkedin:"https://www.linkedin.com/in/alba-gg"}},modal=document.getElementById("myModal"),modalContent=document.getElementById("modalContent");function openModal(e){modal.classList.remove("hidden");const n=ponentesInfo[e];modalContent.innerHTML=`\n      <div class="modal__column img-column">\n      <div class="shadow">\n        <img src="${n.image}" alt="${n.name}" class="modal__imgM">\n      </div> \n        <h2 class="modal__name">${n.name}</h2>\n      </div>\n      <div class="modal__column text-column">\n        <h3 class="modal__titleP">${n.title}</h3>\n        <p class="modal__text">${n.info}</p>\n        <button class="modal__close" onclick="closeModal()">Volver</button>\n      </div>`}function closeModal(){modal.classList.add("hidden"),modalContent.innerHTML=""}const modalBox=document.getElementById("modalBox"),modalText=document.getElementById("modalText");function speakerOpen(e){modalBox.classList.remove("hid");const n=ponentesInfo[e];modalText.innerHTML=`\n    <div class="modalBoxes__text_info" >\n     <img src="${n.image}" alt="${n.name}" class="modal__imgM">\n     <h2 class="modalBoxes__text_info_title">${n.name}</h2>\n     <p class="modalBoxes__text_info_bio"><strong>${n.place}</strong> ${n.bio}</p>\n     <span>\n      <a class="speakers__img_name-icon" href="${n.twitter}" target="_blank">\n       <i class="fa-brands fa-x-twitter"></i>\n      </a>\n      <a class="speakers__img_name-icon" href="${n.linkedin}" target="_blank">\n       <i class="fa-brands fa-linkedin"></i>\n      </a>\n     </span>\n    <button class="modal__closed" onclick="speakerClosed()">Volver</button>\n    </div>`}function speakerClosed(){modalBox.classList.add("hid"),modalText.innerHTML=""}