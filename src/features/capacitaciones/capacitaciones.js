import { api } from '../../data/api.js';

const coursesContainer = document.getElementById('courses-container');

async function renderCourses() {
  const courses = await api.getCourses();
  
  if (courses.length === 0) {
    coursesContainer.innerHTML = '<p>No hay capacitaciones disponibles.</p>';
    return;
  }

  coursesContainer.innerHTML = courses.map(c => `
    <section class="bg-white rounded-xl shadow p-6 mb-6">
      <h2 class="text-xl font-bold text-[#2A322E] mb-2">${c.title}</h2>
      <p class="text-[#4A5A50] mb-4">${c.description}</p>
      <button class="bg-[#3D6B50] text-white px-4 py-2 rounded-lg hover:bg-[#2A322E] font-semibold transition">Inscribirse</button>
    </section>
  `).join('');
}

renderCourses();
