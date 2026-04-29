fetch('src/data/initial-state.json')
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(datos) {
    mostrarContactos(datos.contacts);
  });

function mostrarContactos(lista) {
  var contenedor = document.getElementById("contenedor-contactos");
  contenedor.innerHTML = "";

  for (var i = 0; i < lista.length; i++) {
    var contacto = lista[i];
    var html = "";
    
    // Obtenemos la primera letra del nombre para usarla como icono avatar
    var primeraLetra = contacto.name.charAt(0);
    
    html += "<div class='bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow'>";
    html += "  <div class='flex items-center mb-4'>";
    html += "    <div class='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl font-bold text-green-700 mr-4'>" + primeraLetra + "</div>";
    html += "    <div>";
    html += "      <h3 class='text-lg font-bold text-gray-800'>" + contacto.name + "</h3>";
    html += "      <span class='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded inline-block mt-1'>" + contacto.sector + "</span>";
    html += "    </div>";
    html += "  </div>";
    html += "  <button onclick='alert(\"Solicitud de conexión enviada a " + contacto.name + "\")' class='w-full bg-white border-2 border-green-600 text-green-700 px-4 py-2 rounded font-bold hover:bg-green-50 transition-colors'>Contactar</button>";
    html += "</div>";

    contenedor.innerHTML += html;
  }
}
