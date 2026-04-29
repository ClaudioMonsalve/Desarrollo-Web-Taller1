/**
 * o-carousel.js — Organism: Featured Content Carousel
 * Simple scroll-snap carousel with swipe support.
 */
import { getCarouselSlides } from '../../logic/carousel.service.js';

class OCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._slides = [];
    this._currentIndex = 0;
  }

  async connectedCallback() {
    this._slides = await getCarouselSlides();
    this.render();
    this._bindEvents();
  }

  _bindEvents() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    if (!track) return;

    // Sync dots when user scrolls/swipes
    let scrollTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const idx = Math.round(track.scrollLeft / track.offsetWidth);
        if (idx !== this._currentIndex) {
          this._currentIndex = idx;
          this._updateDots();
        }
      }, 80);
    }, { passive: true });

    // Dot clicks
    this.shadowRoot.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = Number(dot.dataset.index);
        const slide = track.children[idx];
        if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
      });
    });
  }

  _updateDots() {
    this.shadowRoot.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === this._currentIndex);
    });
  }

  render() {
    const slidesHTML = this._slides
      .map(s => `
        <div class="carousel-slide" style="background: ${s.bgColor};">
          <div class="slide-content">
            <h2 class="slide-title">${s.title}</h2>
            <p class="slide-subtitle">${s.subtitle}</p>
            <a href="${s.href}" class="slide-cta">${s.cta}</a>
          </div>
        </div>`)
      .join('');

    const dotsHTML = this._slides
      .map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`)
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
        }

        .carousel-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          border-radius: 16px;
          background: #EDE5D8;
          scrollbar-width: none;
        }
        .carousel-track::-webkit-scrollbar { display: none; }

        .carousel-slide {
          min-width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 250px;
          padding: 32px 24px;
          box-sizing: border-box;
          scroll-snap-align: start;
        }

        .slide-content {
          text-align: center;
          max-width: 320px;
        }
        .slide-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2A322E;
          margin: 0 0 8px;
        }
        .slide-subtitle {
          font-size: 0.875rem;
          color: #4A5A50;
          margin: 0 0 16px;
        }
        .slide-cta {
          display: inline-block;
          padding: 8px 24px;
          background: #2A322E;
          color: #F5F0E8;
          border: none;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }
        .slide-cta:hover { background: #3D6B50; }

        .dots-container {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 12px 0;
        }
        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: none;
          background: #C4B89E;
          cursor: pointer;
          padding: 0;
        }
        .dot.active {
          background: #2A322E;
          width: 20px;
          border-radius: 10px;
        }

        /* Responsive: más alto en desktop */
        @media (min-width: 768px) {
          :host { padding: 20px 24px; }
          .carousel-slide { min-height: 350px; }
          .slide-content { max-width: 480px; }
          .slide-title { font-size: 1.75rem; }
        }
        @media (min-width: 1024px) {
          :host { padding: 24px 32px; }
          .carousel-slide { min-height: 420px; padding: 48px; }
          .slide-content { max-width: 540px; }
          .slide-title { font-size: 2rem; }
        }
      </style>

      <div class="carousel-track">
        ${slidesHTML}
      </div>
      <div class="dots-container">${dotsHTML}</div>
    `;
  }
}

customElements.define('o-carousel', OCarousel);
export default OCarousel;
