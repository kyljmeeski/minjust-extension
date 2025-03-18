chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case "copyData":
            chrome.tabs.query(
                { active: true, currentWindow: true }, 
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { command: "copyData" });
                }
            );
            break;
        case "pasteData":
            chrome.tabs.query(
                { active: true, currentWindow: true }, 
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { command: "pasteData" });
                }
            );
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});
