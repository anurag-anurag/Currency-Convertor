const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btn = document.querySelector("form button");
const dropdown = document.querySelectorAll(".dropdown select");
const Fromcurr = document.querySelector(".from select");
const Tocurr = document.querySelector(".to select");
const message = document.querySelector(".msg");
window.addEventListener("load",() => {
    updateExchangeRate();

});


for (let select of dropdown) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let code2 = countryList[code];
    let newsource = `https://flagsapi.com/${code2}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsource;
};

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = ( async () =>{
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    console.log(amtvalue);
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }

     
    const URl = `${base_url}/${Fromcurr.value.toLowerCase()}/${Tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URl);
    let data = await response.json();
    let rate = data [Tocurr.value.toLowerCase()];

    console.log(data);
    let finalamount = amtvalue * rate;
    message.innerText = `${amtvalue} ${Fromcurr.value} = ${finalamount} ${Tocurr.value}`;

});