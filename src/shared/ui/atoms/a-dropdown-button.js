/**
 * a-dropdown-button.js — Atom: Dropdown Toggle Button
 * Simple arrow button that emits 'dropdown-toggle' on click.
 */
class ADropdownButton extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent('dropdown-toggle', { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const isOpen = this.getAttribute('open') === 'true';

    this.shadowRoot.innerHTML = `
      <style>
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          background: #4A5A50;
          color: #F5F0E8;
          cursor: pointer;
          padding: 0;
        }
        button:hover { background: #3D6B50; }
        svg {
          width: 16px;
          height: 16px;
          transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0)'};
        }
      </style>
      <button type="button" aria-label="Abrir opciones">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
  }
}

customElements.define('a-dropdown-button', ADropdownButton);
export default ADropdownButton;
