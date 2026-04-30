import { api } from '../../data/api.js';

const userPanel = document.getElementById('user-panel');

let currentUser = [];

async function init() {

  if (!localStorage.getItem("userLog") || localStorage.getItem("userLog") == "no") {
    console.log("user not loged");
    window.location.href = "/login";

  } else {

    const testUsers = await api.getTestUsers();
    currentUser = testUsers.find(user => user.rut == localStorage.getItem("userRut"))

    renderUser();

  }

  

}

function cerrarSesion() {
  localStorage.clear();
  location.reload();
}

function renderUser() {

  userPanel.innerHTML = `
    <div class="bg-[#E0D5C3] min-h-[250px] md:min-h-[350px] lg:min-h-[400px] p-8 rounded-2xl">
      <h1 class="text-2xl font-bold m-2 p-2 rounded-xl bg-[#b4a591]"> ${currentUser.nombre} </h1>
      <h2 class="text-xl font-semibold m-2"> ${currentUser.nombrePyme} </h2>
      <div> 
         <h3 class="m-2">Tipo de pyme: ${currentUser.tipoPyme}</h3>
         <h3 class="m-2">Ganancias pyme: $${currentUser.ganancias}</h3>
      </div>
      <div>
        <button class="bg-red-800 p-1 rounded-lg border-2 border-red-600 text-white" type="click">Cerrar Sesion</button>
      </div>
      <div>

        <button></button>
      </div>
    </div>
  `;
}

userPanel.addEventListener("click", cerrarSesion);

init()