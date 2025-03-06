document.getElementById("copyBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});

document.getElementById("pasteBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: pasteData
        });
    });
});

function pasteData() {
    const data = JSON.parse(localStorage.getItem("minjustData"));
    if (!data) {
        alert("Нет сохраненных данных!");
        return;
    }

    document.getElementById("number").value = data.regNumber;
    document.getElementById("fullNameRu").value = data.fullName;
    document.getElementById("inn").value = data.inn;
    document.getElementById("okpo").value = data.okpo;
    document.getElementById("pin").value = "123456"; // фиксированный ПИН
    document.getElementById("innUploader").value = "987654321"; // фиксированный ИНН
}
