var listaDeBancos = []; // Aquí guardaremos todos los bancos

// Pedimos los datos al JSON
fetch('src/data/initial-state.json')
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(datos) {
    listaDeBancos = datos.banks;
    mostrarBancos(listaDeBancos); // Mostramos todos por defecto al cargar la página
  });

// Función para dibujar las tarjetas en el HTML
function mostrarBancos(lista) {
  var contenedor = document.getElementById("contenedor-bancos");
  contenedor.innerHTML = ""; // Limpiamos lo que haya antes

  if (lista.length === 0) {
    contenedor.innerHTML = "<p class='col-span-2 text-center text-gray-500 py-8'>No hay bancos disponibles para este filtro.</p>";
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var banco = lista[i];
    var html = "";
    
    html += "<div class='bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow'>";
    html += "  <h3 class='text-xl font-bold text-gray-800'>" + banco.name + "</h3>";
    html += "  <p class='text-gray-600 mt-2 mb-4 h-12'>" + banco.description + "</p>";
    
    html += "  <div class='flex gap-2 mb-4'>";
    html += "    <span class='bg-green-100 text-green-800 text-sm px-2 py-1 rounded font-bold'>" + banco.tasaBadge + "</span>";
    html += "    <span class='bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded'>" + banco.extraBadge + "</span>";
    html += "  </div>";
    
    html += "  <div class='mt-4 pt-4 border-t border-gray-100'>";
    html += "    <p class='text-xs text-gray-500 uppercase tracking-wide mb-1'>Sirve para:</p>";
    html += "    <p class='font-bold text-gray-700 text-sm'>" + banco.tags.join(', ') + "</p>";
    html += "  </div>";
    html += "</div>";

    contenedor.innerHTML += html;
  }
}

// Función que se ejecuta al hacer clic en los botones (onclick)
function filtrarBancos(tamañoEmpresa) {
  if (tamañoEmpresa === 'todos') {
    // Mostramos la lista original completa
    mostrarBancos(listaDeBancos);
  } else {
    // Creamos una lista nueva solo con los que cumplen la condición
    var filtrados = [];
    
    for (var i = 0; i < listaDeBancos.length; i++) {
      var banco = listaDeBancos[i];
      // indexOf > -1 es la forma clásica de saber si un texto está en un arreglo
      if (banco.profiles.indexOf(tamañoEmpresa) > -1) {
        filtrados.push(banco);
      }
    }
    
    mostrarBancos(filtrados);
  }
}
