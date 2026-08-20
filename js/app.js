// --- CONSTANTES GLOBALES ---
const IDIOMAS_DISPONIBLES = ['es', 'en'];

const nombresIdiomas = {
    es: 'Español',
    en: 'English'
};

// --- DICCIONARIO DE TRADUCCIONES ---
const traducciones = {
    es: {
        subtituloHeader: "Policía Boliviana • Sucre, Bolivia",
        slide1: "Patrullaje Preventivo en el Centro Histórico",
        slide2: "Orientación y Asistencia Personalizada",
        slide3: "Seguridad en Circuitos Turísticos y Museos",
        institucional: `La <strong class="text-policia-dorado font-extrabold">Policía Turística</strong>, dependiente del Comando Departamental de Policía de Chuquisaca, tiene como función principal brindar protección, orientación y auxilio oportuno a turistas nacionales y extranjeros. Asimismo, desempeña un rol fundamental en la preservación y resguardo del patrimonio histórico y cultural de la ciudad de Sucre.`,
        btnGuiaTitulo: "GUÍA DE SEGURIDAD",
        btnGuiaSub: "Toca para abrir afiche completo",
        btnGuiaAccion: "Ver",
        btnMuseosTitulo: "INFORMACIÓN DE MUSEOS",
        btnMuseosSub: "Horarios y costos",
        btnMuseosAccion: "Ver Museos",
        emergenciasTitulo: "Teléfonos de Emergencias",
        policiaTuristica: "Policía Turística",
        radioPatrullas: "Radio Patrullas 110",
        modalGuiaTitulo: "Guía de Seguridad Turística",
        modalGuiaSub: "Policía Boliviana • Sucre",
        modalGuiaImg: "./assets/GuiaSeguridad.webp",
        modalGuiaPdf: "./assets/GuiaSeguridad.pdf",
        modalGuiaPdfNombre: "Guia_Seguridad_Turistica_Sucre.pdf",
        modalGuiaBtn: "DESCARGAR GUÍA EN PDF",
        modalMuseosTitulo: "Información de Museos",
        modalMuseosBtn: "DESCARGAR GUÍA EN PDF",
        verUbicacion: "Ver Ubicación",
        horarios: "Horarios",
        costos: "Costos",
        errorCarga: "Error al cargar la información de museos.",
        oficinaTitulo: "Atención Presencial e Información",
oficinaTitulo: "Atención Presencial e Información",
oficinaNombre: "Oficina de la Policía Turística",
oficinaDireccion: "Plaza 25 de Mayo N° 10 (Gobernación de Chuquisaca)",
oficinaHorario: "Atención y Orientación al Turista • Sucre, Bolivia",
oficinaBtn: "Abrir en Google Maps",
    },
    en: {
        subtituloHeader: "Bolivian Police • Sucre, Bolivia",
        slide1: "Preventive Patrols in the Historic Center",
        slide2: "Personalized Tourist Assistance and Guidance",
        slide3: "Security in Cultural Circuits and Museums",
        institucional: `The <strong class="text-policia-dorado font-bold">Tourist Police</strong>, operating under the Departmental Police Command of Chuquisaca, is responsible for providing protection, guidance, and assistance to domestic and international visitors, while safeguarding the historical and cultural heritage of Sucre.`,
        btnGuiaTitulo: "SAFETY GUIDE",
        btnGuiaSub: "Click to view full flyer",
        btnGuiaAccion: "View",
        btnMuseosTitulo: "MUSEUM INFORMATION",
        btnMuseosSub: "Hours and rates",
        btnMuseosAccion: "View Museums",
        emergenciasTitulo: "Emergency Phone Numbers",
        policiaTuristica: "Tourist Police",
        radioPatrullas: "Patrol Dispatch 110",
        modalGuiaTitulo: "Tourist Safety Guide",
        modalGuiaSub: "Bolivian Police • Sucre",
        modalGuiaImg: "./assets/SecurityGuide.webp",
        modalGuiaPdf: "./assets/SecurityGuide.pdf",
        modalGuiaPdfNombre: "Tourist_Safety_Guide_Sucre.pdf",
        modalGuiaBtn: "DOWNLOAD PDF GUIDE",
        modalMuseosTitulo: "Museum Information",
        modalMuseosBtn: "DOWNLOAD GUIDE IN PDF",
        verUbicacion: "View Location",
        horarios: "Opening Hours",
        costos: "Admission Rates",
        errorCarga: "Failed to load museum information.",
        oficinaTitulo: "In-Person Information & Assistance",
oficinaNombre: "Tourist Police Office",
oficinaDireccion: "25 de Mayo Square #10 (Chuquisaca Gov. Building)",
oficinaHorario: "Tourist Support & Information • Sucre, Bolivia",
oficinaBtn: "Open in Google Maps",
    }
};

let idiomaActual = 'es';

// --- CONTROL DE SCROLL PARA LA BARRA FLOTANTE ---
window.addEventListener('scroll', () => {
    const navbarSticky = document.getElementById('navbar-sticky');
    const headerPrincipal = document.getElementById('header-principal');
    if (!navbarSticky || !headerPrincipal) return;

    const threshold = headerPrincipal.offsetTop + (headerPrincipal.offsetHeight * 0.45);

    if (window.scrollY > threshold) {
        navbarSticky.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
        navbarSticky.classList.add('translate-y-0', 'opacity-100');
    } else {
        navbarSticky.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
        navbarSticky.classList.remove('translate-y-0', 'opacity-100');
    }
});

// --- MENÚS DE IDIOMA SINCRONIZADOS ---
function toggleMenuIdioma(dropdownId, arrowClass) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.querySelector('.' + arrowClass);
    if (!dropdown) return;

    const isHidden = dropdown.classList.contains('hidden');

    document.querySelectorAll('#dropdown-header, #dropdown-sticky').forEach(d => d.classList.add('hidden'));
    document.querySelectorAll('.arrow-header, .arrow-sticky').forEach(a => a.classList.remove('rotate-180'));

    if (isHidden) {
        dropdown.classList.remove('hidden');
        if (arrow) arrow.classList.add('rotate-180');
    }
}

function seleccionarIdioma(lang) {
    cambiarIdioma(lang);
    document.querySelectorAll('#dropdown-header, #dropdown-sticky').forEach(d => d.classList.add('hidden'));
    document.querySelectorAll('.arrow-header, .arrow-sticky').forEach(a => a.classList.remove('rotate-180'));
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('#navbar-sticky') && !e.target.closest('#header-principal')) {
        document.querySelectorAll('#dropdown-header, #dropdown-sticky').forEach(d => d.classList.add('hidden'));
        document.querySelectorAll('.arrow-header, .arrow-sticky').forEach(a => a.classList.remove('rotate-180'));
    }
});

// --- DETECCIÓN Y CAMBIO DE IDIOMA ---
function detectarIdiomaTurista() {
    const guardado = localStorage.getItem('idioma_preferido');
    if (guardado && IDIOMAS_DISPONIBLES.includes(guardado)) {
        return guardado;
    }

    const listaIdiomas = (navigator.languages && navigator.languages.length)
        ? Array.from(navigator.languages)
        : [navigator.language || navigator.userLanguage || ''];

    const codigos = listaIdiomas
        .filter(Boolean)
        .map(lang => lang.toLowerCase().split('-')[0]);

    if (codigos.includes('es')) {
        return 'es';
    }

    if (codigos.includes('en')) {
        return 'en';
    }

    return 'en';
}

function cambiarIdioma(nuevoIdioma) {
    if (idiomaActual === nuevoIdioma) return;
    idiomaActual = nuevoIdioma;
    localStorage.setItem('idioma_preferido', nuevoIdioma);
    aplicarIdioma(nuevoIdioma);
}

function aplicarIdioma(lang) {
    const t = traducciones[lang];
    if (!t) return;

    // 1. Selectores de idioma (Header y Navbar flotante)
    document.querySelectorAll('.txt-idioma-actual-val').forEach(el => {
        el.textContent = nombresIdiomas[lang] || 'Language';
    });
    document.querySelectorAll('.check-es-val').forEach(el => el.classList.toggle('hidden', lang !== 'es'));
    document.querySelectorAll('.check-en-val').forEach(el => el.classList.toggle('hidden', lang !== 'en'));

    // 2. Encabezado y Carrusel
    const subHeader = document.getElementById('txt-subtitulo-header');
    if (subHeader) subHeader.textContent = t.subtituloHeader;

    const s1 = document.getElementById('txt-slide-1');
    const s2 = document.getElementById('txt-slide-2');
    const s3 = document.getElementById('txt-slide-3');
    if (s1) s1.textContent = t.slide1;
    if (s2) s2.textContent = t.slide2;
    if (s3) s3.textContent = t.slide3;

    const txtInst = document.getElementById('txt-institucional');
    if (txtInst) txtInst.innerHTML = t.institucional;

    // 3. Botones Principales
    const btnGuiaTit = document.getElementById('txt-btn-guia-titulo');
    const btnGuiaSub = document.getElementById('txt-btn-guia-sub');
    const btnGuiaAcc = document.getElementById('txt-btn-guia-accion');
    if (btnGuiaTit) btnGuiaTit.textContent = t.btnGuiaTitulo;
    if (btnGuiaSub) btnGuiaSub.textContent = t.btnGuiaSub;
    if (btnGuiaAcc) btnGuiaAcc.textContent = t.btnGuiaAccion;

    const btnMusTit = document.getElementById('txt-btn-museos-titulo');
    const btnMusSub = document.getElementById('txt-btn-museos-sub');
    const btnMusAcc = document.getElementById('txt-btn-museos-accion');
    if (btnMusTit) btnMusTit.textContent = t.btnMuseosTitulo;
    if (btnMusSub) btnMusSub.textContent = t.btnMuseosSub;
    if (btnMusAcc) btnMusAcc.textContent = t.btnMuseosAccion;

    // 4. Emergencias
    const emergTit = document.getElementById('txt-emergencias-titulo');
    const polTur = document.getElementById('txt-policia-turistica');
    if (emergTit) emergTit.textContent = t.emergenciasTitulo;
    if (polTur) polTur.textContent = t.policiaTuristica;
    document.querySelectorAll('.txt-radio-patrullas').forEach(el => el.textContent = t.radioPatrullas);

    // 5. Modal Guía
    const modGuiaTit = document.getElementById('txt-modal-guia-titulo');
    const modGuiaSub = document.getElementById('txt-modal-guia-sub');
    const imgGuia = document.getElementById('img-modal-guia');
    const linkGuiaPdf = document.getElementById('link-modal-guia-pdf');
    const modGuiaBtn = document.getElementById('txt-modal-guia-btn');

    if (modGuiaTit) modGuiaTit.textContent = t.modalGuiaTitulo;
    if (modGuiaSub) modGuiaSub.textContent = t.modalGuiaSub;
    if (imgGuia) imgGuia.src = t.modalGuiaImg;
    if (linkGuiaPdf) {
        linkGuiaPdf.href = t.modalGuiaPdf;
        linkGuiaPdf.download = t.modalGuiaPdfNombre;
    }
    if (modGuiaBtn) modGuiaBtn.textContent = t.modalGuiaBtn;

    // 6. Modal Museos
    const modMusTit = document.getElementById('txt-modal-museos-titulo');
    const modMusBtn = document.getElementById('txt-modal-museos-btn');
    if (modMusTit) modMusTit.textContent = t.modalMuseosTitulo;
    if (modMusBtn) modMusBtn.textContent = t.modalMuseosBtn;

    // 7. Cargar JSON de museos
    cargarMuseos(lang);
}

// --- CARGA DINÁMICA DE MUSEOS ---
async function cargarMuseos(lang) {
    const contenedor = document.getElementById('lista-museos');
    if (!contenedor) return;

    const t = traducciones[lang];
    const rutaJson = lang === 'es' ? './assets/museos.json' : './assets/museums.json';

    try {
        const respuesta = await fetch(rutaJson);
        const museos = await respuesta.json();

        contenedor.innerHTML = '';

        museos.forEach(museo => {
            const horariosHtml = museo.horarios.map(h => `
                <p class="text-[11px] italic mt-0.5">${h.dias}</p>
                <p class="text-xs font-bold text-gray-800">${h.horas}</p>
            `).join('');

            const costosHtml = museo.costos.map(c => `
                <p class="text-xs font-semibold text-gray-800"><span class="italic">${c.concepto}</span> ${c.precio}</p>
            `).join('');

            const tarjeta = document.createElement('div');
            tarjeta.className = "bg-[#C2DFCD] text-gray-900 rounded-2xl p-4 shadow-md border border-policia-dorado/40 space-y-3";
            
            tarjeta.innerHTML = `
                <h3 class="text-lg font-black text-center leading-tight text-gray-900">${museo.nombre}</h3>
                
                <div class="grid grid-cols-5 gap-3 items-center">
                    <div class="col-span-2 rounded-xl overflow-hidden shadow aspect-square bg-gray-200">
                        <img src="${museo.imagen}" alt="${museo.nombre}" class="w-full h-full object-cover" loading="lazy">
                    </div>
                    
                    <div class="col-span-3 flex flex-col justify-between space-y-2">
                        <p class="text-[11px] leading-tight font-medium text-gray-800">
                            ${museo.descripcion}
                        </p>

                        <a href="${museo.mapaUrl}" target="_blank" rel="noopener noreferrer" 
                           class="w-full py-2 px-3 bg-gradient-to-r from-[#1C3A27] to-[#2E4F36] hover:from-[#142A1C] hover:to-[#223B28] text-amber-300 font-extrabold text-[11px] rounded-xl shadow flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-amber-300/30 tracking-wide">
                            <svg class="w-3.5 h-3.5 fill-current text-amber-300 shrink-0" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span>${t.verUbicacion}</span>
                        </a>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 pt-2 border-t border-black/10 text-center">
                    <div>
                        <h4 class="font-bold text-xs text-black">${t.horarios}</h4>
                        ${horariosHtml}
                    </div>
                    <div>
                        <h4 class="font-bold text-xs text-black">${t.costos}</h4>
                        ${costosHtml}
                    </div>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error('Error al cargar museos:', error);
        contenedor.innerHTML = `<p class="text-center text-xs text-red-500 font-semibold py-4">${t.errorCarga}</p>`;
    }
}

// --- CARRUSEL ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function setSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('opacity-100', i === index);
        slide.classList.toggle('opacity-0', i !== index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-policia-dorado', i === index);
        dot.classList.toggle('opacity-100', i === index);
        dot.classList.toggle('bg-white', i !== index);
        dot.classList.toggle('opacity-50', i !== index);
    });
    currentSlide = index;
}

setInterval(() => {
    if (slides.length > 0) {
        let nextSlide = (currentSlide + 1) % slides.length;
        setSlide(nextSlide);
    }
}, 4000);

// --- MODALES CON HISTORIAL DEL NAVEGADOR ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    history.pushState({ modalOpen: modalId }, '', '#' + modalId);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    if (window.location.hash === '#' + modalId) {
        history.back();
    }
}

window.addEventListener('popstate', function() {
    const modales = document.querySelectorAll('.modal-container');
    modales.forEach(modal => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    });
    document.body.style.overflow = 'auto';
});

// --- INICIALIZACIÓN ---
function inicializarIdioma() {
    idiomaActual = detectarIdiomaTurista();
    aplicarIdioma(idiomaActual);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarIdioma);
} else {
    inicializarIdioma();
}