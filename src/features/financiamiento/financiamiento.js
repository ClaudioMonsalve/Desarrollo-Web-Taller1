import { api } from '../../data/api.js';

const banksContainer = document.getElementById('banks-container');
const profileCards = document.querySelectorAll('.profile-card');
const needPills = document.querySelectorAll('.filter-pill');

let allBanks = [];
let currentProfile = 'micro';
let currentNeed = 'all';

async function init() {
  allBanks = await api.getBanks();
  bindEvents();
  renderBanks();
}

function bindEvents() {
  profileCards.forEach(card => {
    card.addEventListener('click', () => {
      profileCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentProfile = card.dataset.p;
      renderBanks();
    });
  });

  needPills.forEach(pill => {
    pill.addEventListener('click', () => {
      needPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentNeed = pill.dataset.n;
      renderBanks();
    });
  });
}

function renderBanks() {
  banksContainer.innerHTML = '';
  let first = true;

  allBanks.forEach(bank => {
    const pMatch = currentProfile === 'all' || bank.profiles.includes(currentProfile);
    const nMatch = currentNeed === 'all' || bank.needs.includes(currentNeed);

    if (pMatch && nMatch) {
      const isRecommended = first;
      if (first) first = false;

      const html = `
        <div class="bank-card ${isRecommended ? 'recommended' : ''}">
          <h3 class="text-lg font-bold">${bank.name}</h3>
          <p class="text-sm text-[#6B7D72] mb-2">${bank.description}</p>
          
          <div>
            <span class="stat ${bank.tasaClass}">${bank.tasaBadge}</span> 
            <span class="stat ${bank.extraClass}">${bank.extraBadge}</span>
          </div>
          
          <div class="grid grid-cols-3 gap-3 mt-3 text-xs">
            <div>
              <strong>Tasa</strong>
              <div class="bar"><div class="bar-fill" style="width:${bank.tasaFill};background:${bank.tasaColor}"></div></div>
              ${bank.tasaVal}
            </div>
            <div>
              <strong>Plazo</strong>
              <div class="bar"><div class="bar-fill" style="width:${bank.plazoFill};background:${bank.plazoColor}"></div></div>
              ${bank.plazoVal}
            </div>
            <div>
              <strong>Requisitos</strong>
              <div class="bar"><div class="bar-fill" style="width:${bank.reqFill};background:${bank.reqColor}"></div></div>
              ${bank.reqVal}
            </div>
          </div>
          
          <div class="mt-2">
            ${bank.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
      banksContainer.innerHTML += html;
    }
  });

  if (banksContainer.innerHTML === '') {
    banksContainer.innerHTML = '<p class="text-center text-[#6B7D72]">No hay bancos que coincidan con estos filtros.</p>';
  }
}

init();
