/**
 * pyme-types.service.js — Proveedor de tipos de PYME
 * Obtiene los perfiles de empresas desde localStorage / JSON
 */

const STORAGE_KEY = 'abaco_data';
const INITIAL_STATE_PATH = 'src/data/initial-state.json';

let _cache = null;

async function _loadData() {
  if (_cache && _cache.pymeTypes) return _cache;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.pymeTypes) {
        _cache = parsed;
        return _cache;
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  try {
    const response = await fetch(INITIAL_STATE_PATH);
    const initial = await response.json();
    
    const storedAgain = localStorage.getItem(STORAGE_KEY);
    if (storedAgain) {
      try {
        const parsed = JSON.parse(storedAgain);
        parsed.pymeTypes = initial.pymeTypes;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        _cache = parsed;
        return _cache;
      } catch(e) {}
    }

    _cache = initial;
    return _cache;
  } catch (e) {
    return { pymeTypes: [] };
  }
}

// Obtiene la lista de tipos
export async function getPymeTypes() {
  const data = await _loadData();
  return data.pymeTypes || [];
}

// Obtiene un tipo por ID
export async function getPymeTypeById(id) {
  const types = await getPymeTypes();
  return types.find((t) => t.id === id);
}
