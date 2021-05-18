class Calculator {
  constructor(pastOperationTextElement, currentOperationTextElement) {
    this.pastOperationTextElement = pastOperationTextElement;
    this.currentOperationTextElement = currentOperationTextElement;
    //when we open the calculator is clear all the inputs , outputs from screen
    this.clear();
  }
  //to clear the values from output
  clear() {
    //if you don't get the current and past then you check the html file you will understand it there
    this.currentOperation = "";
    this.pastOperation = "";
    this.operation = undefined;
  }
  //to delete the numbers from output
  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }
  //to add the numbers to output to do operation
  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return; //for adding only one . (dot) in number
    this.currentOperation =
      this.currentOperation.toString() + number.toString(); // here we converted the integer to string to append the numbers on each other
  }
  //to choose the operation + - * /
  chooseOperation(operation) {
    if (this.currentOperation === "") return; //if the current opeartion have no value then it didn't perform when we click on operation
    if (this.pastOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.pastOperation = this.currentOperation; //assiging the current opertion to past operation when we add the (+,-,/,*)
    this.currentOperation = ""; //after adding the sign the current operation is empty
  }
  //to perform the operation on numbers/ inputs
  compute() {
    let operationResult;
    const past = parseFloat(this.pastOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(past) || isNaN(current)) return; //if the current value or past value is not a number then do nothing
    switch (this.operation) {
      case "+":
        operationResult = past + current;
        break;
      case "-":
        operationResult = past - current;
        break;
      case "÷":
        operationResult = past / current;
        break;
      case "*":
        operationResult = past * current;
        break;

      default:
        return;
        break;
    }
    this.currentOperation = operationResult;
    this.operation = undefined;
    this.pastOperation = "";
  }
  //to display the number with qummas "','"
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let numberDisplay
    if (isNaN(integerDigits)) {
      numberDisplay = ''
    } else {
      numberDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${numberDisplay}.${decimalDigits}`
    } else {
      return numberDisplay;
    }
  }

  //to update the output when we do any operation like delete clear or appendnumber all of that
  updateDisplay() {
    this.currentOperationTextElement.innerText = this.getDisplayNumber(
      this.currentOperation
    );
    if (this.operation != null) {
      this.pastOperationTextElement.innerText = `${this.getDisplayNumber(this.pastOperation)} ${this.operation}`;
    } else {
      this.pastOperationTextElement.innerText = ""
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButtons = document.querySelector("[data-all-clear]");
const pastOperationTextElement = document.querySelector(
  "[data-past-operation]"
);
const currentOperationTextElement = document.querySelector(
  "[data-current-operation]"
);

//here we are calling the class calculator
const calculator = new Calculator(
  pastOperationTextElement,
  currentOperationTextElement
);

//to show the buttons in the output when we click on this buttons
//for ex when we click on the button of 1 then in the output it prints 1 and its with all the buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    //after adding value then it update the output
    calculator.updateDisplay();
  });
});

//for adding the operation to the number when we select it
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    //after adding value then it update the output
    calculator.updateDisplay();
  });
});

//adding functionality to equal button ''=''
equalsButtons.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//adding functionality to all-clear button ''AC''
allClearButtons.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

//adding functionality to delete button "DEL"
deleteButtons.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
