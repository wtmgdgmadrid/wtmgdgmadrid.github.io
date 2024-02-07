'use strict';

// Hamburguesa
const toggleButton = document.querySelector('.nav_toggle');
const itemsContainer = document.querySelector('.navbar_items');

toggleButton.onclick = () => {
  itemsContainer.classList.toggle('open');
  toggleButton.classList.toggle('close');
};

// Obtener todos los enlaces del menú
const menuLinks = document.querySelectorAll('.js-menu');

// Controlador de eventos para cada enlace del menú
menuLinks.forEach(link => {
  link.onclick = () => {
    // Remover la clase 'open' del contenedor de elementos
    itemsContainer.classList.remove('open');
    // Remover la clase 'close' del botón de alternar
    toggleButton.classList.remove('close');
  };
});


// Scroll
document.addEventListener('DOMContentLoaded', function () {
  const logo = document.querySelector('.navbar_a-logo');

  window.addEventListener('scroll', function () {
    const isScrolled = window.scrollY > 50;

    logo.src = isScrolled
      ? './assets/images/Logo-negro.png'
      : ' ./assets/images/Logo-blanco.png';
  });
});

// Modales Ponentes

// Objeto que almacena la información de los ponentes

const ponentesInfo = {
  'Ponente 1': {
    name: 'Cristina rodríguez',
    image: './assets/images/crisFlor.png',
    title: 'Cómo teletrabajar en un networking',
    place: '(Madrid, 1991)',
    bio: 'Breve biografía del Ponente 1.',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus!',
    twitter:'https://www.linkedin.com/in/alba-gg',
    linkedin:'https://www.linkedin.com/in/alba-gg'
  },
  'Ponente 2': {
    name: 'Ainhoa de las Heras',
    image: './assets/images/ainhoaFlor.png',
    title: 'Cómo teletrabajar en un networking',
    place: '(Barcelona, 1991)',
    bio: 'Breve biografía del Ponente 2.',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus',
    twitter:'https://www.linkedin.com/in/alba-gg',
    linkedin:'https://www.linkedin.com/in/alba-gg'
  },
  'Ponente 3': {
    name: 'Raquel Ortiz',
    image: './assets/images/rachelFlor.png',
    title: 'Cómo teletrabajar en un networking',
    place: '(Barcelona, 1991)',
    bio: 'Breve biografía del Ponente 3.',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus',
    twitter:'https://www.linkedin.com/in/alba-gg',
    linkedin:'https://www.linkedin.com/in/alba-gg'
  },
  'Ponente 4': {
    name: 'Alba Ginés',
    image: './assets/images/defaultFlor.png',
    title: 'Cómo teletrabajar en un networking',
    place: '(Barcelona, 1991)',
    bio: 'Breve biografía del Ponente 4.',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus',
    twitter:'https://www.linkedin.com/in/alba-gg',
    linkedin:'https://www.linkedin.com/in/alba-gg'
  },
  'Ponente 5': {
    name: 'Aranzazu Barrutia',
    image: './assets/images/defaultFlor.png',
    title: 'Cómo teletrabajar en un networking',
    place: '(Barcelona, 1991)',
    bio: 'Breve biografía del Ponente 5.',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veniam consequuntur. Sapiente vitae minima sequi laboriosam expedita distinctio iure quasi natus ratione, eum quia autem aut fugiat ipsum perferendis possimus',
    twitter:'https://www.linkedin.com/in/alba-gg',
    linkedin:'https://www.linkedin.com/in/alba-gg'
  },
  'Ponente 6': {
    name: 'Paula Gonzalez',
    image: './assets/images/defaultFlor.png',
    title: 'Cómo teletrabajar en un networking',
    place: '(Barcelona, 1991)',
    bio: 'Breve biografía del Ponente 6.',
    info: '¿Qué podemos hacer en nuestro día a día para salvar al planeta? El tema de la sostenibilidad también aplica a la informática. <br>El Green Computing es un área de la informática que estudia el uso de los recursos y su impacto ambiental. <br>Entonces, ¿podemos hacer nuestro trabajo más sostenible? ¿Y es el trabajo en remoto siempre más sostenible? <br>Vamos a ver una introducción al Green Computing y que podemos hacer cotidianamente para aportar nuestro granito de arena al medioambiente.',
    twitter:'https://www.linkedin.com/in/alba-gg',
    linkedin:'https://www.linkedin.com/in/alba-gg'
  },
};

const modal = document.getElementById('myModal');
const modalContent = document.getElementById('modalContent');

function openModal(ponente) {
  modal.classList.remove('hidden');

  const info = ponentesInfo[ponente];

  modalContent.innerHTML = `
      <div class="modal__column img-column">
      <div class="shadow">
        <img src="${info.image}" alt="${info.name}" class="modal__imgM">
      </div> 
        <h2 class="modal__name">${info.name}</h2>
      </div>
      <div class="modal__column text-column">
        <h3 class="modal__titleP">${info.title}</h3>
        <p class="modal__text">${info.info}</p>
        <button class="modal__close" onclick="closeModal()">Volver</button>
      </div>`;
}

function closeModal() {
  modal.classList.add('hidden');
  modalContent.innerHTML = '';
}

const modalBox = document.getElementById('modalBox');
const modalText = document.getElementById('modalText');

function speakerOpen(ponente) {
  modalBox.classList.remove('hid');

  const info = ponentesInfo[ponente];

  modalText.innerHTML = `
    <div class="modalBoxes__text_info" >
     <img src="${info.image}" alt="${info.name}" class="modal__imgM">
     <h2 class="modalBoxes__text_info_title">${info.name}</h2>
     <p class="modalBoxes__text_info_bio"><strong>${info.place}</strong> ${info.bio}</p>
     <span>
      <a class="speakers__img_name-icon" href="${info.twitter}" target="_blank">
       <i class="fa-brands fa-x-twitter"></i>
      </a>
      <a class="speakers__img_name-icon" href="${info.linkedin}" target="_blank">
       <i class="fa-brands fa-linkedin"></i>
      </a>
     </span>
    <button class="modal__closed" onclick="speakerClosed()">Volver</button>
    </div>`;
}

function speakerClosed() {
  modalBox.classList.add('hid');
  modalText.innerHTML = '';
}
