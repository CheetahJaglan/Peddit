
function togglePasswordVisibility() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const showPasswords = document.getElementById('show-passwords').checked;
    const type = showPasswords ? 'text' : 'password';
    password.type = type;
    confirmPassword.type = type;
}