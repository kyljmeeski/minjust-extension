const fullName = document.getElementById("fullNameRu")?.value || "";
const regNumber = document.getElementById("number")?.value || "";
const inn = document.getElementById("inn")?.value || "";
const okpo = document.getElementById("okpo")?.value || "";

const data = { fullName, regNumber, inn, okpo };

localStorage.setItem("minjustData", JSON.stringify(data));
alert("Данные сохранены!");
