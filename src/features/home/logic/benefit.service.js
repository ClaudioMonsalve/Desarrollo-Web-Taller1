/**
 * benefit.service.js — Servicio CRUD de Beneficios y Noticias
 * Maneja persistencia en localStorage con respaldo en initial-state.json
 */

const STORAGE_KEY = 'abaco_data';
const INITIAL_STATE_PATH = 'src/data/initial-state.json';

let _cache = null;

// Carga los datos (Prioridad: 1. localStorage, 2. JSON)
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
    _cache = { benefits: [], news: [] };
    return _cache;
  }
}

// Guarda en localStorage
function _persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_cache));
}

// Genera un ID simple
function _generateId(prefix = 'ben') {
  return `${prefix}-${Date.now().toString(36)}`;
}

// Devuelve todos los beneficios
export async function getAllBenefits() {
  const data = await _loadData();
  return [...data.benefits];
}

// Devuelve un beneficio por ID
export async function getBenefitById(id) {
  const data = await _loadData();
  return data.benefits.find((b) => b.id === id);
}

// Crea un beneficio
export async function createBenefit(payload) {
  const data = await _loadData();
  const newBenefit = {
    id: _generateId('ben'),
    title: payload.title,
    description: payload.description,
    category: payload.category,
    active: payload.active ?? true,
  };
  data.benefits.push(newBenefit);
  _persist();
  return { ...newBenefit };
}

// Actualiza un beneficio
export async function updateBenefit(id, updates) {
  const data = await _loadData();
  const index = data.benefits.findIndex((b) => b.id === id);
  if (index === -1) return null;

  data.benefits[index] = { ...data.benefits[index], ...updates };
  _persist();
  return { ...data.benefits[index] };
}

// Elimina un beneficio
export async function deleteBenefit(id) {
  const data = await _loadData();
  const index = data.benefits.findIndex((b) => b.id === id);
  if (index === -1) return false;

  data.benefits.splice(index, 1);
  _persist();
  return true;
}

// Devuelve las noticias
export async function getAllNews() {
  const data = await _loadData();
  return [...data.news];
}

// Reinicia los datos al JSON original
export async function resetToInitialState() {
  localStorage.removeItem(STORAGE_KEY);
  _cache = null;
  await _loadData();
}
