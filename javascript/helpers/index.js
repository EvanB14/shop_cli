const readlinePromises = require('node:readline/promises');

const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout
})

const userInput = async (q) => { return rl.question(q); }

const displayProductHeader = () => {

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("| " + `${"ID".padEnd(4)}` + " | " + `${"Product Name".padEnd(30)}` + " | " + `${"Quantity".padEnd(8)}` + " | " + `${"Price".padEnd(10)}` + " |");
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");

}

const displayFooter = () => {

    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("| " + `${"0".padEnd(4)}` + " | " + `${"Return".padEnd(54)}` + " |");
    console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log("\r")

}

const isEmailValid = (input) => {

    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]){2,6}$/

    const test = emailRegex.test(input);

    if (test) return true;
    else return false;

}

const isNumberValid = (input) => {

    const numRegex = /^[0-9]+$/

    const test = numRegex.test(input);

    if (test) return true;
    else return false;

}

const isFloatValid = (input) => {

    const floatRegex = /^([0-9]{0,3}((.)[0-9]{0,2}))$/

    const test = floatRegex.test(input);

    if (test) return true;
    else return false;

}

module.exports = { 
    userInput,
    displayProductHeader,
    displayFooter,
    isEmailValid,
    isNumberValid,
    isFloatValid
}