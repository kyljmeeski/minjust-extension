chrome.commands.onCommand.addListener((command) => {
    console.log(`Command received: ${command}`);  // Логирование команды
    switch (command) {
        case "copyData":
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ["content.js"]
                });
            });
            break;

        case "pasteData":
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: pasteData
                });
            });
            break;

        default:
            console.log(`Command ${command} not found`);
    }
});

function pasteData() {
    const data = JSON.parse(localStorage.getItem("minjustData"));
    if (!data) {
        alert("Нет сохраненных данных!");
        return;
    }

    console.log("Pasted data:", data);

    document.getElementById("number").value = data.regNumber;
    document.getElementById("fullNameRu").value = data.fullName;
    document.getElementById("inn").value = data.inn;
    document.getElementById("okpo").value = data.okpo;
    document.getElementById("pin").value = "123456"; // фиксированный ПИН
    document.getElementById("innUploader").value = "987654321"; // фиксированный ИНН
}
