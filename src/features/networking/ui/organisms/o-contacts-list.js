/**
 * o-contacts-list.js — Organism: Contacts List
 */

import { getAllContacts } from '../../logic/networking.service.js';

class OContactsList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._contacts = [];
  }

  async connectedCallback() {
    this._contacts = await getAllContacts();
    this.render();
  }

  render() {
    const contactsHTML = this._contacts.length > 0
      ? this._contacts.map(c => `
          <div class="contact-card">
            <h3 class="contact-name">${c.name}</h3>
            <p class="contact-sector">Sector: ${c.sector}</p>
            <button class="btn">Conectar</button>
          </div>
        `).join('')
      : '<p>No hay contactos disponibles.</p>';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .grid { grid-template-columns: 1fr 1fr; }
        }
        .contact-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 24px;
          border: 1px solid #E0D5C3;
        }
        .contact-name {
          font-size: 1.125rem;
          font-weight: 700;
          color: #2A322E;
          margin: 0 0 4px;
          font-family: 'Inter', sans-serif;
        }
        .contact-sector {
          color: #6B7D72;
          margin: 0 0 16px;
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
        }
        .btn {
          background: transparent;
          color: #3D6B50;
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid #3D6B50;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
        }
        .btn:hover {
          background: #3D6B50;
          color: #fff;
        }
      </style>
      <div class="grid">
        ${contactsHTML}
      </div>
    `;
  }
}

customElements.define('o-contacts-list', OContactsList);
export default OContactsList;
