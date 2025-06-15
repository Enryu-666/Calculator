/*
      JavaScript instructions for you:

      1. Add event listeners to buttons to update the display with values.
      2. Parse the input expression and compute result when equals (=) is clicked.
      3. Implement clearing the display on clear (C).
      4. Handle cases like multiple operators in a row and decimal points.
      5. Show error messages or handle invalid inputs gracefully.
      6. Bonus: Add keyboard input support for numbers and operators.

      Use these steps to build up your calculator functionality.
    */

// YOUR JAVASCRIPT CODE GOES HERE
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