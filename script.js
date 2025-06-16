// Calculator logic for modern calculator

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;
let error = false;

// Helper: map HTML symbols to JS operators
const symbolToOperator = {
  '÷': '/',
  '×': '*',
  '−': '-',
  '+': '+'
};

function updateDisplay(value) {
  display.textContent = value;
}

function clearAll() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  waitingForSecondOperand = false;
  error = false;
  updateDisplay('0');
}

function inputNumber(num) {
  if (error) clearAll();
  if (waitingForSecondOperand) {
    currentInput = num;
    waitingForSecondOperand = false;
  } else {
    if (currentInput === '0') {
      currentInput = num;
    } else {
      currentInput += num;
    }
  }
  updateDisplay(currentInput);
}

function inputDecimal() {
  if (error) clearAll();
  if (waitingForSecondOperand) {
    currentInput = '0.';
    waitingForSecondOperand = false;
    updateDisplay(currentInput);
    return;
  }
  if (!currentInput.includes('.')) {
    currentInput += currentInput ? '.' : '0.';
    updateDisplay(currentInput);
  }
}

function handleOperator(nextOperator) {
  if (error) clearAll();
  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }
  if (firstOperand == null && currentInput !== '') {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    if (result === 'Error') {
      updateDisplay('Error');
      error = true;
      return;
    }
    firstOperand = result;
    updateDisplay(result);
  }
  operator = nextOperator;
  waitingForSecondOperand = true;
}

function calculate(first, second, op) {
  switch (op) {
    case '+': return first + second;
    case '-': return first - second;
    case '*': return first * second;
    case '/': return second === 0 ? 'Error' : first / second;
    default: return second;
  }
}

function handleEquals() {
  if (operator && !waitingForSecondOperand) {
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    if (result === 'Error' || isNaN(result)) {
      updateDisplay('Error');
      error = true;
      return;
    }
    updateDisplay(result);
    currentInput = result.toString();
    firstOperand = null;
    operator = '';
    waitingForSecondOperand = false;
  }
}

// Button click events
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    const dataKey = button.getAttribute('data-key');
    if (button.classList.contains('number')) {
      inputNumber(dataKey);
    } else if (button.classList.contains('decimal')) {
      inputDecimal();
    } else if (button.classList.contains('operator')) {
      // Map symbol to JS operator
      handleOperator(symbolToOperator[value] || value);
    } else if (button.classList.contains('equals')) {
      handleEquals();
    } else if (button.classList.contains('clear')) {
      clearAll();
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    inputNumber(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === '.' || e.key === ',') {
    inputDecimal();
  } else if (e.key === 'Enter' || e.key === '=') {
    handleEquals();
  } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
    clearAll();
  }
});

// Initialize
clearAll();