function isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function redirectToLogin() {
    window.location.href = '/login.html';
}

function accessSensitiveFile() {
    if (isAuthenticated() == false) {
        redirectToLogin();
    }
}