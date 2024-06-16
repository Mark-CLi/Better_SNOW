document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to the Return to Search button
    var returnToSearchButton = document.getElementById('ReturnToSearchButton');

    if (returnToSearchButton) {
        console.log('Adding event listener to ReturnToSearchButton');
        returnToSearchButton.addEventListener('click', function() {
            window.location.href = "popup.html";
        });
    } else {
        console.error('Return to Search button not found see js or html');
    }

    var settingsButton = document.getElementById('SettingsButton');
    // Check if the settingsButton element exists
    if (settingsButton) {
        console.log('Adding event listener to SettingsButton');
        settingsButton.addEventListener('click', function() {
            window.location.href = "settings.html";
        });
    } else {
        console.error('Settings button not found see js or html');
    }
});