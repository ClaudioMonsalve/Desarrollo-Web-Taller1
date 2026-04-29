/**
 * m-search-bar.js — Molecule: Search Bar with PYME Type Dropdown
 * Composes: a-dropdown-button
 */
import { getPymeTypes } from '../../logic/pyme-types.service.js';

class MSearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
    this._selectedType = null;
    this._types = [];
  }

  async connectedCallback() {
    this._types = await getPymeTypes();

    // Restore previous selection
    const savedId = localStorage.getItem('selectedPymeType');
    if (savedId) {
      this._selectedType = this._types.find(t => t.id === savedId) || null;
    }

    this.render();
    this._bindEvents();

    if (this._selectedType) {
      const input = this.shadowRoot.querySelector('#search-input');
      if (input) input.placeholder = this._selectedType.label;
      this.dispatchEvent(new CustomEvent('pyme-type-selected', {
        bubbles: true, composed: true,
        detail: { type: this._selectedType },
      }));
    }

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && this._isOpen) {
        this._isOpen = false;
        this._updateDropdown();
      }
    });
  }

  _bindEvents() {
    const root = this.shadowRoot;

    root.addEventListener('dropdown-toggle', () => {
      this._isOpen = !this._isOpen;
      this._updateDropdown();
    });

    root.querySelector('#search-input')?.addEventListener('click', () => {
      if (!this._isOpen) {
        this._isOpen = true;
        this._updateDropdown();
      }
    });

    root.querySelectorAll('[data-type-id]').forEach(item => {
      item.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.typeId;
        this._selectedType = this._types.find(t => t.id === id) || null;
        this._isOpen = false;

        if (this._selectedType) {
          localStorage.setItem('selectedPymeType', this._selectedType.id);
        }

        const input = root.querySelector('#search-input');
        if (input && this._selectedType) {
          input.value = '';
          input.placeholder = this._selectedType.label;
        }

        root.querySelectorAll('[data-type-id]').forEach(li => {
          li.setAttribute('aria-selected', String(li.dataset.typeId === id));
        });

        this.dispatchEvent(new CustomEvent('pyme-type-selected', {
          bubbles: true, composed: true,
          detail: { type: this._selectedType },
        }));

        this._updateDropdown();
      });
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        this._isOpen = false;
        this._updateDropdown();
      }
    });
  }

  _updateDropdown() {
    const dropdown = this.shadowRoot.querySelector('#dropdown-list');
    const btn = this.shadowRoot.querySelector('a-dropdown-button');
    if (dropdown) dropdown.classList.toggle('open', this._isOpen);
    if (btn) btn.setAttribute('open', String(this._isOpen));
  }

  render() {
    const typesHTML = this._types
      .map(t => `
        <li class="dropdown-item" data-type-id="${t.id}" role="option"
            aria-selected="${this._selectedType?.id === t.id}">
          ${t.label}
        </li>`)
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex: 1;
          max-width: 420px;
          position: relative;
        }
        .search-container {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          background: #F5F0E8;
          border: 1.5px solid rgba(42,50,46,0.1);
          border-radius: 12px;
          padding: 4px 6px 4px 14px;
        }
        .search-container:focus-within {
          border-color: #3D6B50;
        }
        #search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #2A322E;
          padding: 8px 0;
          min-width: 0;
        }
        #search-input::placeholder { color: #6B7D72; }

        #dropdown-list {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          background: #fff;
          border: 1px solid rgba(42,50,46,0.1);
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(42,50,46,0.1);
          list-style: none;
          margin: 0;
          padding: 6px;
          z-index: 100;
          display: none;
        }
        #dropdown-list.open { display: block; }

        .dropdown-item {
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          color: #2A322E;
        }
        .dropdown-item:hover { background: #F5F0E8; }
        .dropdown-item[aria-selected="true"] {
          background: #E0D5C3;
          font-weight: 600;
        }
      </style>

      <div class="search-container">
        <input type="text" id="search-input"
               placeholder="¿Qué tipo pyme eres?"
               autocomplete="off" />
        <a-dropdown-button open="${this._isOpen}"></a-dropdown-button>
      </div>
      <ul id="dropdown-list" role="listbox">${typesHTML}</ul>
    `;
  }
}

customElements.define('m-search-bar', MSearchBar);
export default MSearchBar;
