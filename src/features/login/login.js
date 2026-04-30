import { api } from '../../data/api.js';

const loginForm = document.getElementById('login-form');


let testUsers = [];


async function init() {

    testUsers = await api.getTestUsers();

    renderLogin();
    
    if (!localStorage.getItem("userLog") || localStorage.getItem("userLog") == "no") {
        console.log("user not loged");
    } else {
        window.location.href = "/usuario"
    }

}

function validateLogin() {

    console.log("working")
    const loginRut = document.getElementById('rut-input');
    const loginPass = document.getElementById('password-input');    
    const logingUser = testUsers.find(user => user.rut == loginRut.value)

    console.log(testUsers)

    if (logingUser.clave == loginPass.value) {
        //esto ES en efecto, un login MUY rasca, y lo va a hacer la api en el backend.
        localStorage.setItem("userLog", "si")
        localStorage.setItem("userRut", logingUser.rut)
        window.location.href = "/usuario"
    }

}

async function renderLogin() {

  loginForm.innerHTML = `
    <form class="bg-[#E0D5C3] p-6 rounded-2xl mt-6">
        <label class="p-1" for="rut-input">Identificador Rut:</label><br>
        <input class="bg-[#F5F0E8] p-1 rounded" placeholder="11.222.333-k" id="rut-input" required><br>
        <label class="p-1" for="password-input">Contraseña</label><br>
        <input class="bg-[#F5F0E8] p-1 rounded mb-8" id="password-input" type="password" required><br>
        <div class="flex flex-col items-center justify-center">
            <button id="loginSubmit" class="bg-[#2A322E] px-6 py-2 mb-4 text-[#F5F0E8] font-semibold text-sm rounded-lg hover:bg-[#3D6B50]" type="submit"> Iniciar Sesion</button>
            <button class="bg-[#cadcd3] px-6 py-2 mb-4 border border-abaco-dark font-semibold text-sm rounded-lg hover:bg-[#7fb195]" type="button" onclick="sopas()"> Crear cuenta</button>
        </div>
    </form>
  `;
}

loginForm.addEventListener("submit", (e) => {e.preventDefault();});
loginForm.addEventListener("submit", validateLogin);
init();
