const map = L.map('mapid').setView([-27.222633, -49.6455874], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const icon = L.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

map.addEventListener('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  if (marker) map.removeLayer(marker); 
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

function addPhotoField() {
  const container = document.querySelector('#images');
  const fieldContainer = document.querySelectorAll('.new-upload');

  const newFieldContainer = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  const input = newFieldContainer.children[0];

  if (input.value === '') {
    alert('Campo de imagem vazio!');
    return;
  }

  newFieldContainer.children[0].value = '';
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget
  const fieldsContainer = document.querySelectorAll('.new-upload');
  
  if (fieldsContainer.length <= 1) {
    fieldsContainer[0].children[0].value = '';
    return;
  }

  span.parentNode.remove();
}

function toggleSelect(event) {
  const arrButtons = document.querySelectorAll('.button-select button');
  arrButtons.forEach((button) => button.classList.remove('active'));
  
  const button = event.currentTarget;
  button.classList.add('active');

  const input = document.querySelector('[name="open_on_weekends"]');
  input.value = button.dataset.value;
}

function validate(event) {  
  const lat = document.querySelector('[name=lat]').value;
  const lng = document.querySelector('[name=lng]').value;

  if (lat === '' || lng === '') {
    event.preventDefault();

    alert('Selecione um local no mapa');
  }
}
