import { api } from '../../data/api.js';

const userPanel = document.getElementById('user-panel');

let currentUser = []

async function init() {

  if (!localStorage.getItem("userLog") || localStorage.getItem("userLog") == "no") {
    console.log("user not loged");

    renderLoginButton();
    renderNotLogedMsg();

  } else {

    const testUsers = await api.getTestUsers();
    currentUser = testUsers.find(user => user.rut == localStorage.getItem("userRut"))

    renderUser();
  }

  

}

function renderLoginButton() {
  
}

function renderNotLogedMsg() {

}

function renderUser() {

  userPanel.innerHTML = `
    <div class="bg-[#E0D5C3] min-h-[250px] md:min-h-[350px] lg:min-h-[400px] p-8">
      <h1> ${currentUser.nombre} </h1>
      <h2> ${currentUser.nombrePyme} </h2>
      <div> 
         ${currentUser.tipoPyme}
         ${currentUser.ganancias}
      </div>
      <div>
        
        <button></button>
      </div>
      <div>

        <button></button>
      </div>
    </div>
  `;
}

init()