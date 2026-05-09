// --- CARRUSEL ---
const DatosCarrusel = [
    { imagen: 'images/INICIO/trafico1.webp', leyenda: '¿No te agota tanto embotellamiento en Buenos Aires?' },
    { imagen: 'images/INICIO/trafico2.webp', leyenda: '¿Sentís que el tráfico continuo te consume la energía?' },
    { imagen: 'images/INICIO/trafico3.webp', leyenda: '¿No es agotador perder horas en la autopista?' },
    { imagen: 'images/INICIO/estacionamiento1.webp', leyenda: '¿No te agota buscar lugar en la calle siempre?' },
    { imagen: 'images/INICIO/estacionamiento2.webp', leyenda: '¿No te frustra llegar y que no haya lugar?' },
    { imagen: 'images/INICIO/estacionamiento3.webp', leyenda: 'AUTOPASS elimina el estres del estacionamiento en la ciudad.' },
    { imagen: 'images/INICIO/estacionamiento4.webp', leyenda: 'Reserva tu cochera online en segundos con AUTOPASS.' }
];

let IndiceCarruselActual = 0;
let IntervaloCarrusel = null;

function InicializarCarrusel() {
    const Contenedor = document.getElementById('contenedorCarrusel');
    const LeyendaHero = document.getElementById('leyendaHero');
    if (!Contenedor) return;

    DatosCarrusel.forEach((dato, i) => {
        const Item = document.createElement('div');
        Item.className = `item-carrusel ${i === 0 ? 'activo' : ''}`;
        Item.style.backgroundImage = `url('${dato.imagen}')`;
        Contenedor.appendChild(Item);
    });

    if (LeyendaHero) LeyendaHero.innerText = DatosCarrusel[0].leyenda;
    IniciarTemporizadorCarrusel();
}

function IniciarTemporizadorCarrusel() {
    if (IntervaloCarrusel) clearInterval(IntervaloCarrusel);
    IntervaloCarrusel = setInterval(() => RotarCarrusel(1), 5000);
}

function RotarCarrusel(Direccion) {
    const Items = document.querySelectorAll('.item-carrusel');
    const LeyendaHero = document.getElementById('leyendaHero');
    if (Items.length === 0) return;

    Items[IndiceCarruselActual].classList.remove('activo');

    IndiceCarruselActual += Direccion;

    if (IndiceCarruselActual >= Items.length) IndiceCarruselActual = 0;
    if (IndiceCarruselActual < 0) IndiceCarruselActual = Items.length - 1;

    Items[IndiceCarruselActual].classList.add('activo');

    if (LeyendaHero) {
        LeyendaHero.style.opacity = '0';
        setTimeout(() => {
            LeyendaHero.innerText = DatosCarrusel[IndiceCarruselActual].leyenda;
            LeyendaHero.style.opacity = '1';
        }, 800);
    }
}

function MoverCarrusel(Direccion) {
    RotarCarrusel(Direccion);
    IniciarTemporizadorCarrusel();
}

// --- MAPA ---
function initMap() {
    const hqCoords = [-34.5888, -58.3900];
    const map = L.map('map').setView(hqCoords, 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    const goldIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #C5A059; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #C5A059;"></div>`,
        iconSize: [15, 15],
        iconAnchor: [7, 7]
    });

    L.marker(hqCoords, { icon: goldIcon }).addTo(map).bindPopup('<b>AUTOPASS HQ</b><br>Av. del Libertador 1200, CABA').openPopup();

    const points = [
        { name: "AUTOPASS Ituzaingó", coords: [-34.6585, -58.6685], desc: "Punto de Acceso Estación Ituzaingó" },
        { name: "AUTOPASS Castelar", coords: [-34.6485, -58.6350], desc: "Centro Comercial Castelar" },
        { name: "AUTOPASS Morón", coords: [-34.6508, -58.6228], desc: "San Martín - Morón" }
    ];

    points.forEach(p => {
        const branchIcon = L.divIcon({
            className: 'branch-icon',
            html: `<div style="background-color: #C5A059; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px #C5A059;"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });
        L.marker(p.coords, { icon: branchIcon }).addTo(map).bindPopup(`<b>${p.name}</b><br>${p.desc}`);
    });
}

// --- MODAL EN CONSTRUCCIÓN ---
function openEnConstruccion() {
    document.getElementById('modalConst').classList.add('abierto');
}
function closeEnConstruccion() {
    document.getElementById('modalConst').classList.remove('abierto');
}
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalConst');
    if (e.target === modal) closeEnConstruccion();
});

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    const mapEl = document.getElementById('map');
    if (mapEl) initMap();

    if (document.getElementById('contenedorCarrusel')) {
        InicializarCarrusel();
    }
});
