document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    // Toggle between login and register forms
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const dni = document.getElementById('loginDNI').value;
        const password = document.getElementById('loginPassword').value;
        
        // Here you would typically send this data to a server for authentication
        console.log('Login attempt:', { dni, password });
        alert('Intento de inicio de sesión registrado. En una aplicación real, esto se enviaría a un servidor para autenticación.');
    });

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const surname = document.getElementById('registerSurname').value;
        const dni = document.getElementById('registerDNI').value;
        const role = document.getElementById('registerRole').value;
        const password = document.getElementById('registerPassword').value;
        
        // Here you would typically send this data to a server to create a new user
        console.log('Registration attempt:', { name, surname, dni, role, password });
        alert('Intento de registro registrado. En una aplicación real, esto se enviaría a un servidor para crear un nuevo usuario.');
    });
});

