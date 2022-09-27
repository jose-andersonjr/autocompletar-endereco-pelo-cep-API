const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput= document.querySelector("address");
const cityInput = document.querySelector("#city");
const neighborh =document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");

// Validate CEP input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    // allow only numbers
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
})

// Get address event
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    // Check if we have the correct length
    if(inputValue.length === 8) {
        getAddress(inputValue);
    }
});

// GET costumer address from API
const getAddress = async (cep) => {
    toggleLoader();

    cepInput.blur();

    const apiURL = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiURL)
    
    const data = await response.json();

    // show error and reset form
    if(data.erro === "true") {
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido, tente novamente.");
        // show message
        return;
    }

};

// show or hide loader
const toggleLoader = () => {

    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

//show or hide message
const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");
    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

// close message modal
closeButton.addEventListener("click", () => toggleMessage())