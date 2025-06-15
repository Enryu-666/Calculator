// This script implements a simple calculator functionality for a web application.
// It allows users to perform basic arithmetic operations like addition, subtraction, multiplication, and division.
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            if (value === 'C') {
                currentInput = '';
                display.textContent = '';
            } else if (value === '=') {
                try {
                    const result = eval(currentInput);
                    display.textContent = result;
                    currentInput = result.toString();
                } catch (error) {
                    display.textContent = 'Error';
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    // Bonus: Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if ('0123456789+-*/.'.includes(key)) {
            currentInput += key;
            display.textContent = currentInput;
        } else if (key === 'Enter') {
            try {
                const result = eval(currentInput);
                display.textContent = result;
                currentInput = result.toString();
            } catch (error) {
                display.textContent = 'Error';
                currentInput = '';
            }
        } else if (key === 'Escape') {
            currentInput = '';
            display.textContent = '';
        }
    });
});
// This code initializes the calculator functionality, allowing users to input numbers and operators,
// compute results, and clear the display. It also supports keyboard input for a better user experience.