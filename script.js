// DOM Elements

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// generate event listen

generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy the PW to Clipboard

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied')

    // Remove the Password after Copied
    resultEl.innerText = '';

});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1- Init password variable
    // 2- filter out unchecked types
    // 3- Loop over length call generator function for each type
    // 4- Add final password to the password variable and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]);


    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator Functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+<?<{}[],'
    return symbols[Math.floor(Math.random() * symbols.length)];
}



// // SOCIAL PANEL JS
// const floating_btn = document.querySelector('.floating-btn');
// const close_btn = document.querySelector('.close-btn');
// const social_panel_container = document.querySelector('.social-panel-container');

// floating_btn.addEventListener('click', () => {
//     social_panel_container.classList.toggle('visible')
// });

// close_btn.addEventListener('click', () => {
//     social_panel_container.classList.remove('visible')
// });