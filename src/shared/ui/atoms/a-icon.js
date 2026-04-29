/**
 * a-icon.js — Atom: Icon
 * Renders an SVG icon from src/assets/.
 */
class AIcon extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const name = this.getAttribute('name') || '';
    const size = this.getAttribute('size') || '32px';
    const label = this.getAttribute('label') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; width: ${size}; height: ${size}; }
        img { width: 100%; height: 100%; object-fit: contain; }
      </style>
      <img src="src/assets/${name}.svg" alt="${label}" />
    `;
  }
}

customElements.define('a-icon', AIcon);
export default AIcon;
