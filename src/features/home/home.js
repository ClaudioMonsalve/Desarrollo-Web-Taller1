import { api } from '../../data/api.js';

// DOM Elements
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const dropdownList = document.getElementById('dropdown-list');
const searchToggle = document.getElementById('search-toggle');

const carouselTrack = document.getElementById('carousel-track');
const carouselDots = document.getElementById('carousel-dots');

const panelNoticias = document.getElementById('panel-noticias');
const panelBeneficios = document.getElementById('panel-beneficios');

// State
let pymeTypes = [];
let allNews = [];
let allBenefits = [];
let slides = [
  { title: 'Contenido relevante', subtitle: 'Descubre beneficios exclusivos para tu empresa', cta: 'Ver más', bgColor: '#d0c0a9', href: '#' },
  { title: 'Capacitaciones', subtitle: 'Cursos gratuitos para impulsar tu PYME', cta: 'Inscríbete', bgColor: '#c6b598', href: 'capacitaciones.html' },
  { title: 'Red de contactos', subtitle: 'Conecta con otras PYMEs de tu sector', cta: 'Explorar', bgColor: '#bba787', href: 'red-contactos.html' },
  { title: 'Evaluador de Bancos', subtitle: 'Compara opciones bancarias y encuentra la mejor para tu PYME', cta: 'Comparar', bgColor: '#a79277', href: 'financiamiento.html' }
];

let currentSlide = 0;
let isDropdownOpen = false;

// Initialization
async function init() {
  pymeTypes = await api.getPymeTypes();
  allNews = await api.getNews();
  allBenefits = await api.getBenefits();

  renderDropdown();
  renderCarousel();
  
  
  // Restaurar selección guardada
    const savedTypeId = localStorage.getItem('selectedPymeType');
    if (savedTypeId) {
      const t = pymeTypes.find(x => x.id === savedTypeId);
      if (t) {
        searchInput.value = t.label;
      }
    }

  updatePanels(savedTypeId);
  bindEvents();
}

// ---------------------------
// 1. Dropdown (Search Bar)
// ---------------------------
function renderDropdown() {
  dropdownList.innerHTML = pymeTypes.map(t => `
    <li class="px-3 py-2 rounded-lg cursor-pointer text-sm hover:bg-[#F5F0E8]" data-id="${t.id}">
      ${t.label}
    </li>
  `).join('');

  dropdownList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const t = pymeTypes.find(x => x.id === id);
      searchInput.value = t.label;
      localStorage.setItem('selectedPymeType', id);
      toggleDropdown(false);
      updatePanels(id);
    });
  });
}

function toggleDropdown(forceState) {
  isDropdownOpen = forceState !== undefined ? forceState : !isDropdownOpen;
  dropdownList.classList.toggle('hidden', !isDropdownOpen);
}

// ---------------------------
// 2. Carousel
// ---------------------------
function renderCarousel() {
  carouselTrack.innerHTML = slides.map(s => `
    <div class="carousel-slide min-h-[250px] md:min-h-[350px] lg:min-h-[420px] p-8 md:p-12 box-border" style="background: ${s.bgColor};">
      <div class="text-center max-w-[320px] md:max-w-[480px]">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2A322E] mb-2">${s.title}</h2>
        <p class="text-sm md:text-base text-[#4A5A50] mb-4">${s.subtitle}</p>
        <a href="${s.href}" class="inline-block px-6 py-2 bg-[#2A322E] text-[#F5F0E8] font-semibold text-sm rounded-lg hover:bg-[#3D6B50]">${s.cta}</a>
      </div>
    </div>
  `).join('');

  carouselDots.innerHTML = slides.map((_, i) => `
    <button class="dot w-2 h-2 rounded-full bg-[#C4B89E] cursor-pointer p-0 border-none transition-all ${i === 0 ? 'active' : ''}" data-idx="${i}"></button>
  `).join('');

  // Sincronizar scroll con puntos
  let scrollTimer;
  carouselTrack.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const idx = Math.round(carouselTrack.scrollLeft / carouselTrack.offsetWidth);
      if (idx !== currentSlide) {
        currentSlide = idx;
        document.querySelectorAll('.dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }, 80);
  });

  // Clic en los puntos
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = Number(e.target.dataset.idx);
      const slide = carouselTrack.children[idx];
      if (slide) {
        carouselTrack.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
      }
    });
  });
}

// ---------------------------
// 3. Panels
// ---------------------------
function updatePanels(typeId) {
  // Simular filtrado según si hay un tipo seleccionado o no
  const limit = typeId ? 4 : allBenefits.length;
  
  const finalNews = allNews.slice(0, limit);
  const finalBenefits = allBenefits.slice(0, limit);

  panelNoticias.innerHTML = finalNews.length > 0 
    ? finalNews.map(n => `<p class="mb-2"><strong>${n.title}</strong><br>${n.summary}</p>`).join('')
    : '<p>No hay noticias para mostrar.</p>';

  panelBeneficios.innerHTML = finalBenefits.length > 0
    ? finalBenefits.map(b => `<p class="mb-2"><strong>${b.title}</strong><br>${b.description}</p>`).join('')
    : '<p>No hay beneficios para mostrar.</p>';
}

// ---------------------------
// 4. Events Binding
// ---------------------------
function bindEvents() {
  searchInput.addEventListener('click', () => toggleDropdown(true));
  searchToggle.addEventListener('click', () => toggleDropdown());

  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && isDropdownOpen) {
      toggleDropdown(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isDropdownOpen) {
      toggleDropdown(false);
    }
  });
}

// Iniciar aplicación
init();
