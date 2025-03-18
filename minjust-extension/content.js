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
    const inn = innElement ? innElement.singleNodeValue.textContent : '';
    const okpo = okpoElement ? okpoElement.singleNodeValue.textContent : '';

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

    number.value = data.regNumber;
    name.value = data.fullName;
    inn.value = data.inn;
    okpo.value = data.okpo;
    signer.value = '987654321'; // ИНН для ЭП
    pin.value = '123456'; // Пин код для ЭП
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

