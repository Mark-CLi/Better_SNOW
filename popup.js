document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchQueryInput = document.getElementById('searchQuery');
    const searchResultsDiv = document.getElementById('searchResults');
    const aboutButton = document.getElementById('aboutButton'); // Get the About button

    function performSearch() {
        const searchQuery = searchQueryInput.value.toLowerCase();


        fetch(chrome.runtime.getURL('File.json')) // was planning on using CDN for file, but security concerns
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let responses;

                if (searchQuery) {
                    responses = data.responses.filter(response =>
                        response.title.toLowerCase().includes(searchQuery) ||
                        response.message.toLowerCase().includes(searchQuery)
                    );
                } else {
                    responses = data.responses;
                }

                searchResultsDiv.innerHTML = '';

                responses.forEach(response => {
                    const entryDiv = document.createElement('div');
                    entryDiv.className = 'entry';

                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'title';
                    titleDiv.textContent = response.title;

                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message';
                    messageDiv.textContent = response.message.substring(0, 120); // Limit the displayed message to the first 90 characters

                    entryDiv.appendChild(titleDiv);
                    entryDiv.appendChild(messageDiv);

                    entryDiv.addEventListener('click', () => {
                        navigator.clipboard.writeText(response.message)
                            .then(() => {
                                console.log('Message copied to clipboard');
                                window.close();
                            })
                            .catch(err => {
                                console.error('Could not copy text: ', err);
                            });
                    });

                    searchResultsDiv.appendChild(entryDiv);
                });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        performSearch();
    });

    searchQueryInput.addEventListener('input', performSearch);

    // Add click event listener to the About button
    document.getElementById('aboutButton').addEventListener('click', function() {
        window.location.href = 'about.html';
    });

    var settingsButton = document.getElementById('SettingsButton');
    // Check if the settingsButton element exists
    if (settingsButton) {
        settingsButton.addEventListener('click', function() {
            window.location.href = "settings.html";
        });
    } else {
        console.error('Settings button not found');
    }

});
