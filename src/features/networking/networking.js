import { api } from '../../data/api.js';

const contactsContainer = document.getElementById('contacts-container');

async function renderContacts() {
  const contacts = await api.getContacts();
  
  if (contacts.length === 0) {
    contactsContainer.innerHTML = '<p class="col-span-full text-center">No hay contactos disponibles.</p>';
    return;
  }

  contactsContainer.innerHTML = contacts.map(c => `
    <div class="bg-white rounded-xl shadow p-6 border border-[#E0D5C3]">
      <h3 class="font-bold text-lg mb-1">${c.name}</h3>
      <p class="text-sm text-gray-500 mb-3">Sector: ${c.sector}</p>
      <button class="bg-transparent border border-[#3D6B50] text-[#3D6B50] px-4 py-2 rounded font-semibold hover:bg-[#3D6B50] hover:text-white transition">Conectar</button>
    </div>
  `).join('');
}

renderContacts();
