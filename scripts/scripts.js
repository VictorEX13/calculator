//Elements ---------------------------------------------------------------

const result = document.querySelector(".result");
const valueButtons = document.querySelectorAll(".value-button");
const operatorButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let prevValue = 0;
let currentValue = 0;
let isDoingAnOperation = false;
let currentOperator = "";
let clickedOnce = false;
let displayingResult = false;

//Functions --------------------------------------------------------------

function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  return operator === "-"
    ? subtraction(num1, num2)
    : operator === "/"
    ? division(num1, num2)
    : operator === "*"
    ? multiplication(num1, num2)
    : addition(num1, num2);
}

function displayResult(clickedOnEquals) {
  if (currentOperator === "/" && currentValue === 0) {
    result.textContent = "ERROR";
    prevValue = 0;
    currentValue = 0;
    isDoingAnOperation = false;
    currentOperator = "";
    clickedOnce = false;
  } else {
    displayingResult = clickedOnEquals;

    result.textContent =
      Math.round(operate(currentOperator, prevValue, currentValue) * 100) / 100;
  }
}

function clear() {
  result.textContent = "0";
  prevValue = 0;
  currentValue = 0;
  isDoingAnOperation = false;
  currentOperator = "";
  clickedOnce = false;
}

//Events -----------------------------------------------------------------

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayingResult) {
      clear();
    }

    if (
      result.textContent === "0" ||
      result.textContent === "ERROR" ||
      isDoingAnOperation
    ) {
      prevValue = Number(result.textContent);

      result.textContent = button.textContent;
      currentValue = Number(result.textContent);

      isDoingAnOperation = false;
      displayingResult = false;
    } else {
      if (
        !(button.textContent === "." && result.textContent.indexOf(".") > -1)
      ) {
        result.textContent += button.textContent;

        currentValue = Number(result.textContent);
        displayingResult = false;
      }
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isDoingAnOperation) {
      if (clickedOnce) {
        displayResult(false);
      }

      currentOperator = button.textContent;

      isDoingAnOperation = true;
      clickedOnce = true;
    }
  });
});

deleteButton.addEventListener("click", () => {
  if (
    !displayingResult &&
    ((!clickedOnce && result.textContent !== "0") ||
      result.textContent !== "ERROR")
  ) {
    if (!clickedOnce && result.textContent.length <= 1) {
      result.textContent = "0";
    } else {
      result.textContent = result.textContent.slice(0, -1);

      currentValue = result.textContent ? Number(result.textContent) : 0;
    }
  }
});

equalsButton.addEventListener("click", () => {
  displayResult(true);
});

clearButton.addEventListener("click", clear);
