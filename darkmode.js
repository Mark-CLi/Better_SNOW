document.addEventListener('DOMContentLoaded', function() {
    // Check if dark mode is enabled or not
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    // Check if auto animation is enabled or not
    // Check if animation is enabled or not
    if (localStorage.getItem('animationEnabled') === 'true') {
        document.body.classList.add('animation-enabled');
    } else {
        document.body.classList.remove('animation-enabled');
    }
});