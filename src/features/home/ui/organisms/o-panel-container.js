/**
 * o-panel-container.js — Organism: Panel Container
 * Noticias & Beneficios panels.
 * Responsive: stacked on mobile, side-by-side on desktop.
 */
class OPanelContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  updateData(news, benefits) {
    const newsBody = this.shadowRoot.querySelector('#panel-noticias .panel-body');
    const benBody = this.shadowRoot.querySelector('#panel-beneficios .panel-body');

    if (newsBody) {
      newsBody.innerHTML = news.length > 0
        ? news.map(n => `<p><strong>${n.title}</strong><br>${n.summary}</p>`).join('')
        : '<p>No hay noticias para este perfil.</p>';
    }
    if (benBody) {
      benBody.innerHTML = benefits.length > 0
        ? benefits.map(b => `<p><strong>${b.title}</strong><br>${b.description}</p>`).join('')
        : '<p>No hay beneficios para este perfil.</p>';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 0 16px 24px;
        }
        .panel-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .panel {
          background: #E0D5C3;
          border-radius: 16px;
          padding: 16px;
          min-height: 140px;
        }
        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(245,240,232,0.85);
          border-radius: 12px;
          padding: 12px 18px;
        }
        .panel-icon { width: 30px; height: 30px; }
        .panel-icon img { width: 100%; height: 100%; object-fit: contain; }
        .panel-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2A322E;
          margin: 0;
        }
        .panel-body {
          padding: 14px 4px 0;
          color: #4A5A50;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .panel-body p { margin: 0 0 8px; }

        /* Responsive: side by side en desktop */
        @media (min-width: 1024px) {
          :host { padding: 0 32px 32px; }
          .panel-layout { flex-direction: row; }
          .panel { flex: 1; min-height: 180px; }
        }
      </style>

      <div class="panel-layout">
        <div class="panel" id="panel-noticias">
          <div class="panel-header">
            <div class="panel-icon">
              <img src="src/assets/ico noticia.svg" alt="Noticias" />
            </div>
            <h3 class="panel-title">Noticias</h3>
          </div>
          <div class="panel-body">
            <p>Últimas novedades y actualizaciones relevantes para tu empresa.</p>
          </div>
        </div>

        <div class="panel" id="panel-beneficios">
          <div class="panel-header">
            <div class="panel-icon">
              <img src="src/assets/hand-money-cash-hold-coins-svgrepo-com 1.svg" alt="Beneficios" />
            </div>
            <h3 class="panel-title">Beneficios</h3>
          </div>
          <div class="panel-body">
            <p>Accede a beneficios y descuentos exclusivos para PYMEs.</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('o-panel-container', OPanelContainer);
export default OPanelContainer;
