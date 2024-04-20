document.addEventListener('DOMContentLoaded', function() {
    var darkModeButton = document.getElementById('DarkModeButton');
    var darkModeStatus = document.getElementById('DarkModeStatus');
    var autoFrameworkButton = document.getElementById('AutoFrameworkButton');
    var autoFrameworkStatus = document.getElementById('AutoFrameworkStatus');

    // Check if the darkModeButton and darkModeStatus elements exist
    if (darkModeButton && darkModeStatus) {
        // Check if dark mode is enabled or not
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeStatus.textContent = 'On';
        } else
        {
            document.body.classList.remove('dark-mode');
            darkModeStatus.textContent = 'Off';
        }

        darkModeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            // Change status
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'true');
                darkModeStatus.textContent = 'On';
                darkModeStatus.classList.remove('status-off');
                darkModeStatus.classList.add('status-on');
            } else {
                localStorage.setItem('darkMode', 'false');
                darkModeStatus.textContent = 'Off';
                darkModeStatus.classList.remove('status-on');
                darkModeStatus.classList.add('status-off');
            }

        });
    } else {
        console.error('Dark mode elements not found');
    }

    // Check if Autoframework button work
    if (autoFrameworkButton && autoFrameworkStatus) {
        // Check if auto framework is enabled or not
        if (localStorage.getItem('autoFramework') === 'true') {
            autoFrameworkStatus.textContent = 'On';
        } else {
            autoFrameworkStatus.textContent = 'Off';
        }

        autoFrameworkButton.addEventListener('click', function() {
            // Change status and save it to localStorage
            if (autoFrameworkStatus.textContent === 'On') {
                localStorage.setItem('autoFramework', 'false');
                autoFrameworkStatus.textContent = 'Off';
                autoFrameworkStatus.classList.remove('status-on');
                autoFrameworkStatus.classList.add('status-off');
            } else {
                localStorage.setItem('autoFramework', 'true');
                autoFrameworkStatus.textContent = 'On';
                autoFrameworkStatus.classList.remove('status-off');
                autoFrameworkStatus.classList.add('status-on');
            }
        });
    } else {
        console.error('Auto framework elements not found');
    }

    // Add click event listener to the About button
    aboutButton.addEventListener('click', () => {
        alert('Better SNOW by Mark, MIT License');
    });

    // Add click event listener to the Return to Search button
    var returnToSearchButton = document.getElementById('ReturnToSearchButton');

    if (returnToSearchButton) {
        returnToSearchButton.addEventListener('click', function() {
            window.location.href = "popup.html";
        });
    } else {
        console.error('Return to Search button not found');
    }

    const animationToggle = document.getElementById('animationToggle');
    const animationStatus = document.getElementById('animationStatus');

    // Load the current state from localStorage
    let animationEnabled = localStorage.getItem('animationEnabled') === 'true';
    updateAnimationState()

    // Toggle the state and save to localStorage whenever the button is clicked
    animationToggle.addEventListener('click', function() {
        animationEnabled = !animationEnabled;
        localStorage.setItem('animationEnabled', animationEnabled);
        updateAnimationState();

        // Add this code inside the click event listener
        if (animationStatus.textContent.trim() === 'On') {
            animationStatus.classList.remove('status-off');
            animationStatus.classList.add('status-on');
        } else if (animationStatus.textContent.trim() === 'Off') {
            animationStatus.classList.remove('status-on');
            animationStatus.classList.add('status-off');
        }
    });

    function updateAnimationState() {
        if (animationEnabled) {
            document.body.classList.add('animation-enabled');
            animationStatus.textContent = 'On';
        } else {
            document.body.classList.remove('animation-enabled');
            animationStatus.textContent = 'Off';
        }
    }

});