"use strict";const toggleButton=document.querySelector(".nav_toggle"),itemsContainer=document.querySelector(".navbar_items");toggleButton.onclick=()=>{itemsContainer.classList.toggle("open"),toggleButton.classList.toggle("close")};const menuLinks=document.querySelectorAll(".js-menu");menuLinks.forEach(e=>{e.onclick=()=>{itemsContainer.classList.remove("open"),toggleButton.classList.remove("close")}}),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".navbar_a-logo");window.addEventListener("scroll",(function(){const a=window.scrollY>50;e.src=a?"./assets/images/Logo-negro.png":" ./assets/images/Logo-blanco.png"}))}));const ponentesInfo={"Ponente 1":{name:"Ana Gil Amor",image:"./assets/images/anaGil.png",title:'"Creando un backend en 5 min con AWS AppSync"',bio:"Desarrolladora frontend en Kairós DS, interesada en la arquitectura de software, graphql y la natación. No por este orden.",info:"Desde una perspectiva de desarrollo frontend, a menudo surge la necesidad de realizar pruebas de concepto o simplemente disfrutar de un desarrollo totalmente frontend. Sin embargo, en ocasiones, evitar la simulación de todos los datos requiere la implementación de un backend que pueda almacenar y servir esos datos. ¿Qué tal si te proporciono una solución para crear un backend funcional en tan solo 5 minutos?",twitter:"https://twitter.com/manosfrias",linkedin:"https://linkedin.com/in/anagilamor"},"Ponente 2":{name:"Ángeles Vázquez",image:"./assets/images/angelesVP.png",title:'"¿Has oído? Accesibilidad para aplicaciones móviles."',bio:"Soy Ángeles, Ingeniera Telemática con 8 años de experiencia. Empecé programando en SAP y luego me pasé al desarrollo de aplicaciones móviles de Android nativo hace más de 5 años, ¡Y super contenta con el cambio! <br>Actualmente trabajo en Eventbrite donde estoy desarrollando una aplicación móvil para todo aquél que quiera disfrutar eventos. Si no estoy programando, probablemente esté paseando a mi perrita Mera o aprendiendo algo nuevo.",info:"Exploraremos el impacto y la importancia de la accesibilidad en el diseño de aplicaciones móviles. En un mundo cada vez más conectado, es crucial garantizar que nuestras aplicaciones sean inclusivas y accesibles para todos los usuarios, independientemente de sus capacidades. <br>Revisaremos todas las herramientas que tenemos a nuestro alcance como desarrolladores para mejorar la experiencia de usuario de nuestras aplicaciones móviles, para que sean mucho más  accesibles y poner en primer lugar a quienes realmente importan, nuestros usuarios. <br>¡Prepárate para inspirarte y cambiar tu enfoque hacia el desarrollo de aplicaciones más inclusivas!",twitter:"https://twitter.com/avazpar",linkedin:"https://www.linkedin.com/in/angeles-vazquez-parra/"},"Ponente 3":{name:"Esther Mora",image:"./assets/images/estherMora.png",title:'"Conversando con tus aplicaciones: la IA Generativa revoluciona el desarrollo de software"',bio:"Comencé en el mundo de la consultoría de IT hace 25 años, de los cuales llevo 16 en Capgemini. He tenido el privilegio de desempeñar roles clave y contribuir al éxito de numerosos proyectos y servicios en el sector. <br>Comencé mi trayectoria como programadora junior, y mi capacidad para aprender y adaptarme rápidamente me ha permitido evolucionar en mi carrera profesional durante estos años, hasta llegar a liderar equipos de mas de 100 personas para grandes clientes. <br>En la actualidad, lidero el GoToMarket en el Area de Cloud & Custom Applications, comprendiendo las necesidades de nuestros clientes y proponiendo soluciones de valor basadas en nuestro porfolio",info:"La Inteligencia Artificial Generativa está redefiniendo la comunicación entre desarrolladores y aplicaciones, acelerando el ciclo de vida del software, elevando la calidad de proyectos y servicios y mejorando el time to market. Exploraremos cómo estamos adoptando esta tecnología en proyectos y servicios, ofreciendo beneficios tangibles para los clientes",twitter:"https://twitter.com/esthermora450",linkedin:"https://www.linkedin.com/in/esther-mora-uribes-58b6179/"},"Ponente 4":{name:"Marisa Martín",image:"./assets/images/mariaIsabelMartin.png",title:'"DevOps, FinOps, GreenOps todo a la vez"',bio:"Soy una profesional de la tecnología con más de 15 años de experiencia, en roles técnicos y no técnicos, organizaciones, sectores, países... Pero siempre profundamente ligada a infraestructura y plataforma. <br>En la actualidad, trabajo como Technical Product Manager en la consultora tecnológica Thoughtworks donde ayudo a nuestros clientes a construir plataformas de ingeniería y negocio aplicando buenas prácticas de GreenOps y FinOps, SRE, seguridad... Participo en conferencias de DevOps/Plataforma y soy mentora de TechShessions",info:"Te despistas un momento y cuando te das cuenta, ya hay una nueva metodología AbcOps! En esta charla, repasaremos las metodologías DevOps, FinOps y GreenOps: Su origen, razón de ser, y cómo nos hacen la vida más fácil como equipos de producto y plataforma. Veremos con ejemplos cuándo estas metodologías son únicas, se complementan o hasta se contradicen!",linkedin:"https://www.linkedin.com/in/marisa-martin-serrano-17a94057/"},"Ponente 5":{name:"Marta Romero",image:"./assets/images/martaRomero.png",title:'"Crea tu propia Skill con Alexa"',bio:"Actualmente, trabajo en Telefónica Tech en temas de ingeniería de datos, como Data Engineer, y Machine Learning. Soy una persona de naturaleza inquieta y curiosa, por lo que me gusta investigar y poner en práctica mis conocimientos, así que normalmente suelo estar cacharreando :)",info:"Ahora que Alexa, o cualquier otra marca de dispositivos inteligentes, han invadido nuestros hogares, te propongo una forma divertida de usarlos, creando tu propia skill. Con ella podrás descubrir los secretos que se esconden detrás de estos dispositivos y serás capaz de interactuar con ellos de una manera diferente",linkedin:"https://www.linkedin.com/in/marta-romero-garc%C3%ADa-rubio-8202b8142/"},"Ponente 6":{name:"Natalia Mira",image:"./assets/images/nataliaMira.png",title:'"La inteligencia sobre las imágenes hoy: la visión artificial"',bio:"Soy Natalia Ingeniera de Telecomunicaciones y Máster en Visión Artificial. <br>Como Responsable de Venta Especialista Industria en Telefónica, promuevo la digitalización y automatización en el sector industrial. Mi carrera comenzó como Programadora de Visión Artificial, llegando a liderar equipos de desarrollo. En paralelo, comercialmente, fui responsable de la preventa SW/HW de tecnologías de imagen en clientes industriales, desempeñando roles como Product Owner.<br>El compromiso por la tecnología y la igualdad es esencial para mi, comparto mi conocimiento sobre visión e inteligencia artificial e industria en conferencias y, como mentora, motivo futuras generaciones de mujeres en ámbitos STEM",info:"Desde pequeños, nuestros ojos nos permiten ver el mundo y procesar la información para tomar decisiones. Este es el objetivo de la visión artificial: busca emular la capacidad visual humana mediante el uso de algoritmos y modelos computacionales. ¿Nos hemos dado cuenta que es una tecnología que está presente en nuestro día día? ¿De qué manera? ¿Se hace un uso correcta de ésta?",twitter:"https://twitter.com/nataliams91",linkedin:"https://es.linkedin.com/in/natalia-mira-serna"},"Ponente 7":{name:"Noe Medina",image:"./assets/images/noeMedina.png",title:'"¡Alineación planetaria en CSS! Todas esas nuevas features nativas que por fin podemos usar en producción."',bio:"Soy Noe Medina, bióloga de formación, maquetadora de corazón y ahora esa persona que gestiona equipos y proyectos en aprendizaje. Nunca dejaré de aprender sobre CSS aunque esté inmersa ya en el mundo de las métricas, las macros de excel y las dinámicas de equipo.",info:"La comunidad de desarrolladoras front que ama el CSS ha tenido siempre una whislist de herramientas potentes que les gustaría poder usar de forma nativa. Algunas de ellas empezaron a sonar hace ya un par de años (incluso más) pero no ha sido hasta finales del pasado e inicios de este 2024 que han alcanzado un buen soporte en los  navegadores mayoritarios. <br>Es el caso de. :has(), las container-queries, el CSS nesting y algunas nuevas propiedades que nos van a hacer la vida mucho más sencilla y van a ir eliminando progresivamente las dependencias de preprocesadores / librerías js dándole visibilidad a todo el potencial que el lenguaje CSS ha tenido escondido hasta ahora.",twitter:"https://twitter.com/n03m1ms",linkedin:"https://www.linkedin.com/in/noemedina/"},"Ponente 8":{name:"Paola García",image:"./assets/images/paolaGarcia.png",title:'"Navega en el sector tech como un "pro" gracias tu ADN"',bio:'Genotipia "experto en Medicina Genomina. UCAM"',info:"Durante mi vida profesional, he navegado por el sector tecnológico como ingeniera, pasando por una multinacional privada, siendo desarrolladora freelancer en Europa, CEO y cofundadora de dos startups tecnológicas, speaker y ahora doctoranda en Biomedicina. <br>Por el camino, aprendí a descifrar mi ADN y el de aquellos a mi alrededor que se ofrecieron, y a tomar ventaja de ello. ¿Hubiese cambiado algo de mis decisiones laborales si hubiese tenido esta información antes? ¿Cuánto cuesta y cómo lo puedes hacer tú? ¿Qué información útil puede darte? <br>Te lo cuento en esta charla, en la que aprenderás que puedes hacerlo desde la comodidad de tu casa. Solo para ti. Cada uno somos únicos, conocer nuestra programación interna y respetarla puede marcar la diferencia.",twitter:"https://twitter.com/ggarciapaola",linkedin:"https://www.linkedin.com/in/paolagarcia"},"Ponente 9":{name:"Patty O&apos;Callaghan",image:"./assets/images/pattyO.png",title:'"Introducción a la API de Gemini para web apps"',bio:"Patty tiene más de 20 años de experiencia en tecnología y una formación en Ciencias de la Computación e IA. Es Tech Leader en Charles River Laboratories.<br>En su tiempo libre, Patty dirige un Code Club para niños de 10 a 15 años. Además, es organizadora del Google Developers Group Glasgow, embajadora de GoogleO&apos;s Women Techmakers y está reconocida como Google Developer Expert (GDE) en IA/ML y Google Cloud Champion Innovator",info:"En esta sesión, descubrirás cómo acceder a la API de Gemini directamente desde tu aplicación web utilizando el SDK JavaScript de Google AI. Este SDK te permite utilizar los modelos de IA Generativa de Gemini para crear funciones y aplicaciones basadas en IA. <br>Aprenderás, con sólo unas pocas líneas de código, a acceder a las capacidades multimodales de Gemini para generar texto a partir de la entrada de texto e imágenes.",twitter:"https://twitter.com/pattyneta",linkedin:"https://www.linkedin.com/in/patty-ocallaghan/"},"Ponente 10":{name:"Raquel Lainde",image:"./assets/images/raquelLainde.png",title:'"Sororidad práctica: estrategias y tácticas que contrarrestan la discriminación inconsciente"',bio:"Polímata digital con más de 35 años de carrera profesional. Ha sido empresaria en diversos sectores. También ha vivido en precariedad. <br>Durante la última década enfocada principalmente en la investigación, consultoría y formación sobre diversidad en el mundo laboral con una perspectiva de negocio.",info:"Sororidad práctica: estrategias y tácticas que contrarrestan la discriminación inconsciente",twitter:"https://twitter.com/lainde",linkedin:"https://www.linkedin.com/in/raquellainde/"}},modal=document.getElementById("myModal"),modalContent=document.getElementById("modalContent");function openModal(e){modal.classList.remove("hidden");const a=ponentesInfo[e];modalContent.innerHTML=`\n      <div class="modal__column img-column">\n      <div class="shadow">\n        <img src="${a.image}" alt="${a.name}" class="modal__imgM">\n      </div> \n        <h2 class="modal__name">${a.name}</h2>\n      </div>\n      <div class="modal__column text-column">\n        <h3 class="modal__titleP">${a.title}</h3>\n        <p class="modal__text">${a.info}</p>\n        <button class="modal__close" onclick="closeModal()">Volver</button>\n      </div>`}function closeModal(){modal.classList.add("hidden"),modalContent.innerHTML=""}const modalBox=document.getElementById("modalBox"),modalText=document.getElementById("modalText");function speakerOpen(e){modalBox.classList.remove("hid");const a=ponentesInfo[e];modalText.innerHTML=`\n  <div class="modal__column img-column">\n      <div class="shadow">\n        <img src="${a.image}" alt="${a.name}" class="modal__imgM">\n      </div> \n        <h2 class="modal__name">${a.name}</h2>\n      </div>\n      <div class="modal__column text-column">\n        <p class="modal__text space">${a.bio}</p>\n        <span>${a.twitter?`\n          <a class="modalBoxes__text_info_bio-icon" href="${a.twitter}" target="_blank">\n          <i class="fa-brands fa-x-twitter"></i>\n          </a>`:""}\n          ${a.linkedin?`\n          <a class="modalBoxes__text_info_bio-icon" href="${a.linkedin}" target="_blank">\n          <i class="fa-brands fa-linkedin"></i>\n          </a>`:""}\n        </span>\n        <button class="modal__closed" onclick="speakerClosed()">Volver</button>\n      </div>`}function speakerClosed(){modalBox.classList.add("hid"),modalText.innerHTML=""}