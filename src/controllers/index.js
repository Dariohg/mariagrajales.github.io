import Stack from "../models/Stack.js";

class Converter {
    static convertInfixToPrefix(expression) {
        const operators = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '^': 3,
            '√': 3
        };

        const isOperand = (char) => /\w/.test(char);

        const stack = new Stack();
        let prefixExpression = '';

        for (let i = expression.length - 1; i >= 0; i--) {
            const token = expression[i];

            if (isOperand(token)) {
                prefixExpression = token + prefixExpression;
            } else if (token === ')') {
                stack.push(token);
            } else if (token === '(') {
                while (!stack.isEmpty() && stack.peek() !== ')') {
                    prefixExpression = stack.pop() + prefixExpression;
                }
                stack.pop(); // Pop '('
            } else {
                stack.push(token);
                if (i > 0 && isOperand(expression[i - 1])) {
                    prefixExpression = '*' + prefixExpression;
                }
            }
        }

        while (!stack.isEmpty()) {
            prefixExpression = stack.pop() + prefixExpression;
        }

        return prefixExpression;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('inputExpression');
    const output = document.getElementById('outputExpression');
    const convertButton = document.getElementById('convertButton');

    convertButton.addEventListener('click', function () {
        const infixExpression = input.value;
        const prefixExpression = Converter.convertInfixToPrefix(infixExpression);
        output.textContent = prefixExpression;
    });
});
