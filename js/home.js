// Pedimos los datos al archivo JSON
fetch('src/data/initial-state.json')
  .then(function(respuesta) {
    return respuesta.json(); // Convertimos la respuesta a un objeto de Javascript
  })
  .then(function(datos) {
    // Cuando tenemos los datos, llamamos a las funciones para dibujar
    mostrarNoticias(datos.news);
    mostrarBeneficios(datos.benefits);
  });

// Función para dibujar las noticias
function mostrarNoticias(listaNoticias) {
  var contenedor = document.getElementById('contenedor-noticias');
  var html = ''; // Empezamos con un texto vacío
  
  for (var i = 0; i < listaNoticias.length; i++) {
    var noticia = listaNoticias[i];
    html += '<div class="mb-4 border border-gray-200 p-4 rounded bg-gray-50 hover:shadow transition-shadow">';
    html += '<h3 class="font-bold text-lg text-gray-800">' + noticia.title + '</h3>';
    html += '<p class="text-xs text-green-600 mb-2">Publicado: ' + noticia.date + ' | ' + noticia.category + '</p>';
    html += '<p class="text-sm text-gray-600">' + noticia.summary + '</p>';
    html += '</div>';
  }
  
  contenedor.innerHTML = html; // Metemos el HTML armado al contenedor
}

// Función para dibujar los beneficios
function mostrarBeneficios(listaBeneficios) {
  var contenedor = document.getElementById('contenedor-beneficios');
  var html = '';
  
  for (var i = 0; i < listaBeneficios.length; i++) {
    var beneficio = listaBeneficios[i];
    html += '<div class="mb-4 border border-blue-200 p-4 rounded bg-blue-50 hover:shadow transition-shadow">';
    html += '<h3 class="font-bold text-lg text-blue-800">' + beneficio.title + '</h3>';
    html += '<span class="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mt-1 mb-2">' + beneficio.category + '</span>';
    html += '<p class="text-sm text-gray-600">' + beneficio.description + '</p>';
    html += '</div>';
  }
  
  contenedor.innerHTML = html;
}
