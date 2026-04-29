/**
 * o-courses-list.js — Organism: Courses List
 * Renders the list of available courses.
 */

import { getAllCourses } from '../../logic/capacitaciones.service.js';

class OCoursesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._courses = [];
  }

  async connectedCallback() {
    this._courses = await getAllCourses();
    this.render();
  }

  render() {
    const coursesHTML = this._courses.length > 0
      ? this._courses.map(c => `
          <section class="course-card">
            <h2 class="course-title">${c.title}</h2>
            <p class="course-desc">${c.description}</p>
            <button class="btn">Inscribirse</button>
          </section>
        `).join('')
      : '<p>No hay capacitaciones disponibles.</p>';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .course-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 24px;
          margin-bottom: 24px;
        }
        .course-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2A322E;
          margin: 0 0 8px;
          font-family: 'Inter', sans-serif;
        }
        .course-desc {
          color: #4A5A50;
          margin: 0 0 16px;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
        }
        .btn {
          background: #3D6B50;
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }
        .btn:hover { background: #2A322E; }
      </style>
      <div>
        ${coursesHTML}
      </div>
    `;
  }
}

customElements.define('o-courses-list', OCoursesList);
export default OCoursesList;
