const loginForm = document.getElementById('login-form');

async function renderLogin() {

  loginForm.innerHTML = `
    <form>
        <label>pixulita</label><br>
        <input class=""><br>
        <label></label><br>
        <input><br>
        <button></button>
        <button></button>
    </form>
  `;
}

renderLogin();