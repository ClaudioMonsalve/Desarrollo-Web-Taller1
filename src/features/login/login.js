const loginForm = document.getElementById('login-form');

async function renderLogin() {

  loginForm.innerHTML = `
    <form class="bg-[#E0D5C3] p-6 rounded-2xl mt-6">
        <label class="p-1" for="rut-input">Identificador Rut:</label><br>
        <input class="bg-[#F5F0E8] p-1 rounded" placeholder="11.222.333-k" id="rut-input"><br>
        <label class="p-1" for="password-input">Contraseña</label><br>
        <input class="bg-[#F5F0E8] p-1 rounded mb-8" id="password-input" type="password"><br>
        <div class="flex flex-col items-center justify-center">
            <button class="bg-[#2A322E] px-6 py-2 mb-4 text-[#F5F0E8] font-semibold text-sm rounded-lg hover:bg-[#3D6B50]" type="submit"> Iniciar Sesion</button>
            <button class="bg-[#cadcd3] px-6 py-2 mb-4 border border-abaco-dark font-semibold text-sm rounded-lg hover:bg-[#7fb195]"" onclick="sopas()"> Crear cuenta</button>
        </div>
    </form>
  `;
}

renderLogin();