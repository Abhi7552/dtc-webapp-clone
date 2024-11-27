function handleRegister(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (localStorage.getItem(username)) {
        alert('User already exists. Please log in.');
        showLoginScreen();
    } else {
        localStorage.setItem(username, password);
        alert('Registration successful! You can now log in.');
        showLoginScreen();
    }
}

function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
        showLogoutScreen();
    } else {
        alert('Invalid username or password.');
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    showLoginScreen();
}

function showLoginScreen() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('logoutScreen').classList.add('hidden');
}

function showRegisterScreen() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('logoutScreen').classList.add('hidden');
}

function showLogoutScreen() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('logoutScreen').classList.remove('hidden');
    const username = localStorage.getItem('username');
    document.getElementById('welcomeMessage').innerText = `Welcome, ${username}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        showLogoutScreen();
    } else {
        showLoginScreen();
    }
});