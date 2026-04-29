/**
 * home.page.js — Orquestador de la vista Home
 * Une los componentes visuales con los datos y registra los Web Components.
 */

// Atoms
import '../../shared/ui/atoms/a-icon.js';
import '../../shared/ui/atoms/a-dropdown-button.js';

// Molecules
import './ui/molecules/m-search-bar.js';

// Organisms
import './ui/organisms/o-navbar.js';
import './ui/organisms/o-carousel.js';
import './ui/organisms/o-panel-container.js';

// Lógica de datos
import { getAllBenefits, getAllNews } from './logic/benefit.service.js';

// Inicializa los datos en localStorage
Promise.all([getAllBenefits(), getAllNews()]).then(([benefits, news]) => {
  console.log(`[Ábaco] Datos cargados`);
});

// Escucha cambios en el tipo de PYME y actualiza los paneles
document.addEventListener('pyme-type-selected', async (e) => {
  const typeId = e.detail.type?.id;
  const benefits = await getAllBenefits();
  const news = await getAllNews();
  
  // Filtrado básico visual
  const finalBenefits = typeId ? benefits.slice(0, 2) : benefits;
  const finalNews = typeId ? news.slice(0, 2) : news;

  const panel = document.querySelector('o-panel-container');
  if (panel && panel.updateData) {
    panel.updateData(finalNews, finalBenefits);
  }
});
