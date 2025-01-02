// DOM 
const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const clipboardEl = document.querySelector("#clipboard");
const generateEl = document.querySelector("#generate");




const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


function getRandomLower() {
    return String.fromCharCode(
        Math.floor(
            Math.random() * 26
        ) + 97
    )
};

function getRandomUpper() {
    return String.fromCharCode(
        Math.floor(
            Math.random() * 26
        ) + 65
    )
};

function getRandomNumber() {
    return String.fromCharCode(
        Math.floor(
            Math.random() * 10
        ) + 48
    )
};

function getRandomSymbol() {
    symbols = "!@#$%^&*()_'+<>;=:?/"
    return symbols[
        Math.floor(
            Math.random() * symbols.length
        )
    ]
};

generateEl.addEventListener("click", e => {
    const length = parseInt(lengthEl.value);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.textContent = GeneratePassword(length, hasLower,hasUpper,hasSymbol,hasNumber);
});


function GeneratePassword(Length, Lower,Upper,Symbol,Number) {
    let generatedPassword = "";
    const typesCount = Lower + Upper + Number + Symbol;
    const typesArr = [{Lower} , {Upper} , {Number} , {Symbol}].filter
    (
        item => Object.values(item)[0]
    );
    // console.log("typesArr: ", typesArr)

    if (typesCount === 0) {
        console.log(Length)
        return '';
    }
    for (let i = 0; i < Length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName.toLowerCase()]();
        })
    }

    resultEl.innerHTML = generatedPassword.slice(0, Length);
    finalPassword = generatedPassword.slice(0, Length)

    return finalPassword
};


clipboardEl.addEventListener("click", e => {
    const textarea = document.createElement("textarea");
    const paasword = resultEl.textContent;

    if (!paasword) {
        return;
    }

    textarea.value = paasword;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard.")
})