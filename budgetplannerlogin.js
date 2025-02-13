function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (!username || !password) {
        errorMessage.textContent = "Please fill in both Username and Password.";
    } else {
        errorMessage.textContent = "";
        window.location.href = 'budgetplannerhome.html';
    }
}