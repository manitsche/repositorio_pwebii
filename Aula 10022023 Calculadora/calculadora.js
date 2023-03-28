const previousOperationText = document.querySelector("#previous-operation"); // Obtém elementos da página
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator { // Classe
  constructor(previousOperationText, currentOperationText) { // Construtor
    this.previousOperationText = previousOperationText; // Parâmetros
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Adiciona um dígito a tela da calculadora
  addDigit(digit) {
    console.log(digit);
    
    // Verifica se o número já tem um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processa todas as operações da calculadora
  processOperation(operation) {

    // Verifica se o valor atual está nulo
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      
      // Muda a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }

      return;
    }

    // Obtêm o valor atual e o valor anterior
    let operationValue;
    let previous = + this.previousOperationText.innerText.split(" ")[0];
    let current = + this.currentOperationText.innerText;

    // Executa as operações de acordo com o clique dos botões
    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "^":
        operationValue = previous ** current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Muda os valores na tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {

      // Acrescenta o número para o valor atual
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      
      // Verifica se o valor é zero, se for só adiciona o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      
      // Adiciona o valor atual para o anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Muda as operações matemáticas
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/", "^"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Limpa todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processa uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => { // Para cada clique em cada botão
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});