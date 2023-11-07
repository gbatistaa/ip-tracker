// Mapa e suas configurações iniciais:

const mapa = document.getElementById('mapa');

let map = L.map('mapa',{center: [51.505, -0.09], zoom: 13});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Elementos HTML:

const input = document.getElementById('ip-input');
const ipAdd = document.getElementById('ip-address');
const location = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const sendButton = document.getElementById('ip-send');

// Back-end referente a requisiçao HTTP, dos dados relacionados ao endereço de IP:

const geoLocation = new XMLHttpRequest();
geoLocation.responseType = 'json';

let latLon;

geoLocation.onload = () => {
    console.log(geoLocation.response)
    if (geoLocation.readyState === 4 && geoLocation.status < 300) {
        const locationObj = geoLocation.response.location;
        location.innerText = `${locationObj.city}, ${locationObj.region}, ${locationObj.country}`;
        timezone.innerText = `UTC ${locationObj.timezone}`;
        isp.innerText = geoLocation.response.isp;
        ipAdd.innerText = geoLocation.response.ip;
        latLon = [locationObj.lat, locationObj.lng];
        L.marker(latLon, {opacity: 1.0}).addTo(map);
    };
};

sendButton.addEventListener('click', () => {
    const ipAddress = input.value;
    geoLocation.open('GET', `https://geo.ipify.org/api/v2/country,city?apiKey=at_g6KY5GbYbtIYHzKdPlk2BVq8BBKeh&ipAddress=${ipAddress}`);
    geoLocation.send();
});