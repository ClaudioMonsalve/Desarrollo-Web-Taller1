/**
 * o-navbar.js — Organism: Navigation Bar
 * Composes: a-icon, m-search-bar
 */
class ONavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 16px;
          background: #8D806F;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          min-height: 56px;
        }
        .nav-logo { cursor: pointer; }
        .nav-user { cursor: pointer; }

        /* Responsive: más padding en desktop */
        @media (min-width: 1024px) {
          nav { padding: 12px 32px; }
        }
      </style>

      <nav>
        <div class="nav-logo">
          <a href="/" class="nav-logo">
            <a-icon name="abaco logo" size="34px" label="Ábaco logo"></a-icon>
          </a>
        </div>
        <m-search-bar></m-search-bar>
        <a class="nav-user" href="#perfil">
          <a-icon name="user - icon" size="34px" label="Perfil"></a-icon>
        </a>
      </nav>
    `;
  }
}

customElements.define('o-navbar', ONavbar);
export default ONavbar;
