/**
 * api.js — Gestor central de datos (Simula un backend)
 * Maneja la persistencia en localStorage y lee de initial-state.json
 */

const STORAGE_KEY = 'abaco_data';
const INITIAL_STATE_PATH = 'src/data/initial-state.json';

let _cache = null;

async function _loadData() {
  if (_cache) return _cache;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      _cache = JSON.parse(stored);
      return _cache;
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  try {
    const response = await fetch(INITIAL_STATE_PATH);
    _cache = await response.json();
    _persist();
    return _cache;
  } catch (e) {
    _cache = { benefits: [], news: [], pymeTypes: [], courses: [], contacts: [], banks: [] };
    return _cache;
  }
}

function _persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_cache));
}

// APIs Públicas
export const api = {
  getBenefits: async () => { const d = await _loadData(); return d.benefits || []; },
  getNews: async () => { const d = await _loadData(); return d.news || []; },
  getPymeTypes: async () => { const d = await _loadData(); return d.pymeTypes || []; },
  getCourses: async () => { const d = await _loadData(); return d.courses || []; },
  getContacts: async () => { const d = await _loadData(); return d.contacts || []; },
  getBanks: async () => { const d = await _loadData(); return d.banks || []; },
};
