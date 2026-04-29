/**
 * o-bank-evaluator.js — Organism: Bank Evaluator
 * Renders the filter controls and bank cards, handling the logic natively.
 */

import { getAllBanks } from '../../logic/bank.service.js';

class OBankEvaluator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._banks = [];
    this._selectedProfile = 'all';
    this._selectedNeed = 'all';
  }

  async connectedCallback() {
    this._banks = await getAllBanks();
    this.render();
    this._bindEvents();
    this._filter(); // initial filter
  }

  _bindEvents() {
    const root = this.shadowRoot;
    
    // Profile clicks
    root.querySelectorAll('.profile-card').forEach(card => {
      card.addEventListener('click', (e) => {
        root.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this._selectedProfile = target.dataset.p;
        this._filter();
      });
    });

    // Need clicks
    root.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        root.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        this._selectedNeed = target.dataset.n;
        this._filter();
      });
    });
  }

  _filter() {
    const cards = this.shadowRoot.querySelectorAll('.bank-card');
    cards.forEach(c => c.classList.remove('recommended'));
    
    let first = true;
    cards.forEach(card => {
      const ps = card.dataset.profiles.split(',');
      const ns = card.dataset.needs.split(',');
      const pMatch = this._selectedProfile === 'all' || ps.includes(this._selectedProfile);
      const nMatch = this._selectedNeed === 'all' || ns.includes(this._selectedNeed);
      
      const show = pMatch && nMatch;
      card.style.display = show ? 'block' : 'none';
      
      if (show && first) { 
        card.classList.add('recommended'); 
        first = false; 
      }
    });
  }

  render() {
    const banksHTML = this._banks.map(b => `
      <div class="bank-card" data-profiles="${b.profiles.join(',')}" data-needs="${b.needs.join(',')}">
        <h3 class="bank-title">${b.name}</h3>
        <p class="bank-desc">${b.description}</p>
        
        <div>
          <span class="stat ${b.tasaClass}">${b.tasaBadge}</span> 
          <span class="stat ${b.extraClass}">${b.extraBadge}</span>
        </div>
        
        <div class="metrics-grid">
          <div>
            <strong>Tasa</strong>
            <div class="bar"><div class="bar-fill" style="width:${b.tasaFill};background:${b.tasaColor}"></div></div>
            ${b.tasaVal}
          </div>
          <div>
            <strong>Plazo</strong>
            <div class="bar"><div class="bar-fill" style="width:${b.plazoFill};background:${b.plazoColor}"></div></div>
            ${b.plazoVal}
          </div>
          <div>
            <strong>Requisitos</strong>
            <div class="bar"><div class="bar-fill" style="width:${b.reqFill};background:${b.reqColor}"></div></div>
            ${b.reqVal}
          </div>
        </div>
        
        <div class="tags-container">
          ${b.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Inter', sans-serif;
          color: #2A322E;
        }

        /* Titles */
        .section-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0 0 12px;
        }

        /* Profile Cards */
        .profiles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          max-width: 500px;
          margin-bottom: 24px;
        }
        .profile-card {
          background: #fff;
          border: 1.5px solid #EDE5D8;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }
        .profile-card.selected {
          border-color: #3D6B50;
          background: #f0f8f3;
        }
        .profile-icon { font-size: 1.5rem; }
        .profile-title { font-weight: 600; font-size: 0.875rem; margin: 4px 0 0; }
        .profile-desc { font-size: 0.75rem; color: #6B7D72; margin: 0; }

        /* Needs Filter */
        .needs-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .filter-pill {
          padding: 8px 18px;
          border-radius: 50px;
          border: 1.5px solid #C4B89E;
          background: transparent;
          color: #4A5A50;
          font-size: 0.85rem;
          cursor: pointer;
          font-family: inherit;
        }
        .filter-pill:hover { border-color: #2A322E; }
        .filter-pill.active {
          background: #2A322E;
          color: #F5F0E8;
          border-color: #2A322E;
        }

        /* Bank Cards */
        .bank-card {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(42,50,46,0.06);
          margin-bottom: 16px;
          border: 1.5px solid transparent;
        }
        .bank-card.recommended { border-color: #3D6B50; }
        .bank-card.recommended::before {
          content: '★ Recomendado';
          display: inline-block;
          background: #3D6B50;
          color: #F5F0E8;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 12px;
          border-radius: 20px;
          margin-bottom: 8px;
        }
        .bank-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .bank-desc {
          font-size: 0.875rem;
          color: #6B7D72;
          margin: 0 0 12px;
        }

        /* Stats & Tags */
        .stat {
          font-size: 0.78rem;
          background: #F5F0E8;
          border-radius: 6px;
          padding: 4px 10px;
          display: inline-block;
          margin: 2px 2px 2px 0;
          font-weight: 500;
        }
        .stat.good { background: #e8f5ee; color: #1a6b3a; }
        .stat.warn { background: #fef3e2; color: #8a5a1a; }
        
        .tag {
          font-size: 0.75rem;
          background: #F5F0E8;
          border-radius: 20px;
          padding: 3px 10px;
          display: inline-block;
          margin: 4px 4px 0 0;
          color: #4A5A50;
        }

        /* Metrics */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
          font-size: 0.75rem;
        }
        .metrics-grid strong { display: block; color: #4A5A50; }
        .bar {
          height: 5px;
          background: #EDE5D8;
          border-radius: 3px;
          margin: 4px 0;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 3px;
        }
      </style>

      <div>
        <!-- Profile Filter -->
        <h3 class="section-title">1. Tu perfil</h3>
        <div class="profiles-grid">
          <div class="profile-card selected" data-p="micro">
            <div class="profile-icon">🏪</div>
            <div class="profile-title">Micro</div>
            <div class="profile-desc">&lt; 2.400 UF/año</div>
          </div>
          <div class="profile-card" data-p="small">
            <div class="profile-icon">🏢</div>
            <div class="profile-title">Pequeña</div>
            <div class="profile-desc">2.400–25.000 UF</div>
          </div>
          <div class="profile-card" data-p="medium">
            <div class="profile-icon">🏭</div>
            <div class="profile-title">Mediana</div>
            <div class="profile-desc">25.000–100.000 UF</div>
          </div>
          <div class="profile-card" data-p="all">
            <div class="profile-icon">📊</div>
            <div class="profile-title">Ver todos</div>
            <div class="profile-desc">Sin filtro</div>
          </div>
        </div>

        <!-- Needs Filter -->
        <h3 class="section-title">2. ¿Qué necesitas?</h3>
        <div class="needs-flex">
          <button class="filter-pill active" data-n="all">Todos</button>
          <button class="filter-pill" data-n="capital">Capital de trabajo</button>
          <button class="filter-pill" data-n="inversion">Inversión</button>
          <button class="filter-pill" data-n="leasing">Leasing</button>
          <button class="filter-pill" data-n="comex">Comercio exterior</button>
        </div>

        <!-- Banks List -->
        <div id="banks-container">
          ${banksHTML}
        </div>
      </div>
    `;
  }
}

customElements.define('o-bank-evaluator', OBankEvaluator);
export default OBankEvaluator;
