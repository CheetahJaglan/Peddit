document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('show-passwords');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');

    checkbox.addEventListener('change', () => {
        const type = checkbox.checked ? 'text' : 'password';
        passwordField.type = type;
        confirmPasswordField.type = type;
    });
});