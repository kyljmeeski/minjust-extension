const copyData = () => {
    const fullNamePath = '/html/body/div/div[3]/main/div[2]/div/div/div/div/div/div/table/tbody/tr/td[2]/p';
    const regNumberPath = '/html/body/div/div[3]/main/div[2]/div/div/div/div/div/div/table/tbody/tr/td[3]/span';
    const innPath = '/html/body/div/div[3]/main/div[2]/div/div/div/div/div/div/table/tbody/tr/td[5]/span';
    const okpoPath = '/html/body/div/div[3]/main/div[2]/div/div/div/div/div/div/table/tbody/tr/td[6]';

    const fullNameElement = document.evaluate(fullNamePath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const regNumberElement = document.evaluate(regNumberPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const innElement = document.evaluate(innPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const okpoElement = document.evaluate(okpoPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    const fullName = fullNameElement ? fullNameElement.singleNodeValue.textContent : '';
    const regNumber = regNumberElement ? regNumberElement.singleNodeValue.textContent : '';
    const inn = (innElement && innElement.singleNodeValue.textContent !== '') ? innElement.singleNodeValue.textContent : '00000000000000';
    const okpo = okpoElement ? okpoElement.singleNodeValue.textContent : '';

    console.log(innElement && innElement.singleNodeValue.textContent === '');

    const data = { fullName, regNumber, inn, okpo };

    document.cookie = `minjustData=${encodeURIComponent(JSON.stringify(data))}; path=/; domain=.minjust.gov.kg; Secure; SameSite=None`;
    alert("Данные сохранены!");
}

const pasteData = () => {
    const cookies = document.cookie.split(';');
    let data = null;

    cookies.forEach(cookie => {
    if (cookie.trim().startsWith('minjustData=')) {
        data = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    }
    });

    if (!data) {
        alert("Нет сохраненных данных!");
        return;
    }

    const number = document.getElementById('number');
    const name = document.getElementById('name');
    const inn = document.getElementById('tin');
    const okpo = document.getElementById('statno');
    const signer = document.getElementById('signer');
    const pin = document.getElementById('pin');

    simulateTyping(number, data.regNumber);
    simulateTyping(name, data.fullName);
    simulateTyping(inn, data.inn);
    simulateTyping(okpo, data.okpo);
    simulateTyping(signer, '987654321'); // ИНН для ЭП
    simulateTyping(pin, '123456'); // Пин код для ЭП

    console.log(number.value);
}

const simulateTyping = (element, value) => {
  element.focus();
  
  element.value = value;
  
  element.dispatchEvent(new Event('input', { bubbles: true })); 

  element.dispatchEvent(new Event('change', { bubbles: true }));
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.command) {
      case "copyData":
        copyData();
        break;
      case "pasteData":
        pasteData();
        break;
      default:
        console.log(`Command ${request.command} not found`);
    }
  });

