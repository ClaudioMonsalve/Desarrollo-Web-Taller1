/**
 * capacitaciones.service.js — Servicio CRUD para Capacitaciones
 */

const STORAGE_KEY = 'abaco_data';
const INITIAL_STATE_PATH = 'src/data/initial-state.json';

let _cache = null;

async function _loadData() {
  if (_cache && _cache.courses) return _cache;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.courses) {
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
        parsed.courses = initial.courses;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        _cache = parsed;
        return _cache;
      } catch(e) {}
    }

    _cache = initial;
    return _cache;
  } catch (e) {
    return { courses: [] };
  }
}

export async function getAllCourses() {
  const data = await _loadData();
  return data.courses || [];
}
