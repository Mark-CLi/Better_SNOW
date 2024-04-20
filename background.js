chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "searchServiceNow",
        title: "Search Domain ServiceNow for '%s'",
        // TODO: Change this
        contexts: ["all"]
    });

    chrome.runtime.onInstalled.addListener(() => {
        chrome.contextMenus.create({
            id: "serviceNowQuickResponse",
            title: "Service Now Quick Response",
            contexts: ["editable"]
        });
    });
});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchServiceNow" && info.selectionText) {
        const searchQuery = encodeURIComponent(info.selectionText);
        const url = `https://doamin.service-now.com/now/nav/ui/search/code_here/params/search-term/${searchQuery}/global-search-data-config-id/c861cea2c7022010099a308dc7c26041/back-button-label/Call%20-%20New%20Record/search-context/now%2Fnav%2Fui`;
        // TODO: Change this
        chrome.tabs.create({ url });
    } else if (info.menuItemId.startsWith('responseEntry_')) {
        const index = parseInt(info.menuItemId.replace('responseEntry_', ''), 10);

        fetch(chrome.runtime.getURL('File.json'))
            .then(response => response.text())
            .then(data => {
                const entries = data.split('[space]').filter(entry => entry.trim().length > 0);
                if (entries[index] !== undefined) {
                    const entryText = entries[index];

                    // Copying to clipboard requires user gesture, so do it in content script
                    chrome.tabs.sendMessage(tab.id, { action: 'copyToClipboard', text: entryText }, response => {
                        console.log('Copy to clipboard response:', response);
                    });

                    // Also send the entry text to the content script for insertion
                    chrome.tabs.sendMessage(tab.id, { action: 'insertText', text: entryText }, response => {
                        console.log('InsertText response:', response);
                    });
                }
            });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url && tab.url.includes('domain.service-now.com')) {
                const baseUrl = 'https://domain.service-now.com';
                // TODO: Change this
                const frameworkPrefix = '/now/nav/ui/classic/params/target/';
                // Extended patterns to include 'catalogs_home.do'
                const patterns = [
                    { entity: 'incident.do', queryPrefix: 'incident.do?' },
                    { entity: 'sc_task.do', queryPrefix: 'sc_task.do?' },
                    { entity: 'sc_req_item.do', queryPrefix: 'sc_req_item.do?' },
                    { entity: 'sc_request.do', queryPrefix: 'sc_request.do?' },
                    { entity: 'new_call.do', queryPrefix: 'new_call.do?' },
                    { entity: '$pa_dashboard.do', queryPrefix: '%24pa_dashboard.do?' },
                    { entity: 'kb_view.do', queryPrefix: 'kb_view.do?' },
                    { entity: 'new_call_list.do', queryPrefix: 'new_call_list.do?' },
                    { entity: 'task_list.do', queryPrefix: 'task_list.do?' },
                    { entity: 'catalogs_home.do', queryPrefix: '' }, // Remove queryPrefix for catalogs_home.do
                    // TODO: Change this if you have differnet patterns
                ];

                patterns.forEach(pattern => {
                    if (tab.url.includes(`${baseUrl}/${pattern.entity}`) && !tab.url.includes(frameworkPrefix)) {
                        let queryString = tab.url.includes(pattern.entity + '?') ? tab.url.split(pattern.entity + '?')[1] : '';

                        // For 'catalogs_home.do', directly use the extracted query string without appending it to a queryPrefix
                        let newUrl = pattern.entity === 'catalogs_home.do' ?
                            `${baseUrl}${frameworkPrefix}${pattern.entity}%3F${queryString}` :
                            `${baseUrl}${frameworkPrefix}${pattern.queryPrefix}${queryString}`;

                        if (queryString && pattern.queryPrefix) {
                            newUrl = newUrl.replace('?', '%3F').replace(/=/g, '%3D').replace(/&/g, '%26');
                        } else if (!pattern.queryPrefix) {
                            // No need for replacement logic if queryPrefix is empty
                            newUrl = newUrl.replace(`${pattern.entity}?`, `${pattern.entity}%3F`);
                        }

                        chrome.tabs.update(tabId, { url: newUrl });
                    }
                });
            }

});




