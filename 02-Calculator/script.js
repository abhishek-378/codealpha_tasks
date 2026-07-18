const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const operators = ["+", "-", "*", "/", "%"];
let calculated = false;
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        if (value === "C") {
            display.value = "";
        }

        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }

        else if (value === "=") {

    if (display.value === "") {
        return;
    }

    try {

        display.value = eval(display.value);
        calculated = true;

    }

    catch {

        display.value = "Error";

    }

}

        else {

    const lastChar = display.value.slice(-1);

    if (operators.includes(value) && operators.includes(lastChar)) {
        return;
    }
if (value === ".") {

    const parts = display.value.split(/[\+\-\*\/%]/);

    const lastNumber = parts[parts.length - 1];

    if (lastNumber.includes(".")) {
        return;
    }
}
    display.value += value;

}
    });

});

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if ((key >= "0" && key <= "9") || key === "." || key === "+" || key === "-" || key === "*" || key === "/") {
        display.value += key;
    }

    else if (key === "Enter") {
        event.preventDefault();

        try {
            display.value = eval(display.value);
        }
        catch {
            display.value = "Error";
        }
    }

    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    else if (key === "Escape") {
        display.value = "";
    }

});