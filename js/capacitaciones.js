fetch('src/data/initial-state.json')
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(datos) {
    mostrarCursos(datos.courses);
  });

function mostrarCursos(lista) {
  var contenedor = document.getElementById("contenedor-cursos");
  contenedor.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var curso = lista[i];
    var html = "";
    
    // Diseño sencillo con una barra lateral verde usando Tailwind CSS
    html += "<div class='bg-white p-6 border-l-4 border-green-600 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-4'>";
    html += "  <div class='flex-1'>";
    html += "    <h3 class='text-xl font-bold text-gray-800'>" + curso.title + "</h3>";
    html += "    <p class='text-gray-600 mt-2'>" + curso.description + "</p>";
    html += "  </div>";
    html += "  <button onclick='alert(\"¡Te has inscrito al curso!\")' class='bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition-colors w-full md:w-auto'>Inscribirse</button>";
    html += "</div>";

    contenedor.innerHTML += html;
  }
}
