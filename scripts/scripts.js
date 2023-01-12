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
  return operator === "+"
    ? addition(num1, num2)
    : operator === "-"
    ? subtraction(num1, num2)
    : operator === "*"
    ? multiplication(num1, num2)
    : division(num1, num2);
}
