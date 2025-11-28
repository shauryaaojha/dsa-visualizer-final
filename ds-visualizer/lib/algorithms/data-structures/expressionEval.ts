import { AlgorithmResult, StepState } from '../types';

export function evaluatePostfixSteps(expression: string): AlgorithmResult {
    const steps: StepState[] = [];
    const tokens = expression.split(/\s+/);
    const stack: number[] = [];
    let operations = 0;

    steps.push({
        structureKind: 'stack',
        stack: {
            items: [],
            top: -1,
        },
        message: `Evaluating postfix: "${expression}"`,
        variables: { expression },
        lineNumber: 1,
    });

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        operations++;

        // Check if operand (number)
        if (!isNaN(Number(token))) {
            stack.push(Number(token));

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...stack],
                    top: stack.length - 1,
                    highlightedIndex: stack.length - 1,
                    highlightType: 'found',
                },
                message: `Push operand ${token} onto stack`,
                variables: { token, top: stack.length - 1 },
                lineNumber: 2,
            });
        } else {
            // Operator
            if (stack.length < 2) {
                steps.push({
                    structureKind: 'stack',
                    stack: { items: [...stack], top: stack.length - 1 },
                    message: `Error: Not enough operands for operator ${token}`,
                    lineNumber: 3,
                });
                break;
            }

            const b = stack.pop()!;
            const a = stack.pop()!;

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...stack, b],
                    top: stack.length,
                    highlightType: 'visiting',
                },
                message: `Pop operands: ${a} and ${b} for operator ${token}`,
                variables: { operator: token, operand1: a, operand2: b },
                lineNumber: 4,
            });

            let result: number;
            switch (token) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = Math.floor(a / b); break;
                case '^': result = Math.pow(a, b); break;
                default: result = 0;
            }

            stack.push(result);

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...stack],
                    top: stack.length - 1,
                    highlightedIndex: stack.length - 1,
                    highlightType: 'found',
                },
                message: `Compute ${a} ${token} ${b} = ${result}, push result`,
                variables: { result, top: stack.length - 1 },
                lineNumber: 5,
            });
        }
    }

    const finalResult = stack.length > 0 ? stack[stack.length - 1] : 0;

    steps.push({
        structureKind: 'stack',
        stack: {
            items: [...stack],
            top: stack.length - 1,
            highlightedIndex: stack.length - 1,
            highlightType: 'found',
        },
        message: `Final result: ${finalResult}`,
        variables: { result: finalResult },
        lineNumber: 6,
    });

    return { steps, meta: { operations, comparisons: 0 } };
}

export function infixToPostfixSteps(expression: string): AlgorithmResult {
    const steps: StepState[] = [];
    const stack: string[] = [];
    let postfix = '';
    let operations = 0;

    const precedence: Record<string, number> = {
        '+': 1, '-': 1,
        '*': 2, '/': 2,
        '^': 3
    };

    const isOperator = (ch: string) => ['+', '-', '*', '/', '^'].includes(ch);

    steps.push({
        structureKind: 'stack',
        stack: { items: [], top: -1 },
        message: `Converting infix to postfix: "${expression}"`,
        variables: { infix: expression },
        lineNumber: 1,
    });

    for (const ch of expression) {
        operations++;

        if (ch === ' ') continue;

        if (!isNaN(Number(ch)) || /[a-zA-Z]/.test(ch)) {
            // Operand
            postfix += ch + ' ';

            steps.push({
                structureKind: 'stack',
                stack: { items: stack.map((s, i) => i), top: stack.length - 1 },
                message: `Add operand '${ch}' to output`,
                variables: { postfix: postfix.trim(), char: ch },
                lineNumber: 2,
            });
        } else if (ch === '(') {
            stack.push(ch);
            steps.push({
                structureKind: 'stack',
                stack: { items: stack.map((s, i) => i), top: stack.length - 1 },
                message: `Push '(' onto stack`,
                lineNumber: 3,
            });
        } else if (ch === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                const op = stack.pop()!;
                postfix += op + ' ';
            }
            stack.pop(); // Remove '('

            steps.push({
                structureKind: 'stack',
                stack: { items: stack.map((s, i) => i), top: stack.length - 1 },
                message: `Pop until '(', output: ${postfix.trim()}`,
                variables: { postfix: postfix.trim() },
                lineNumber: 4,
            });
        } else if (isOperator(ch)) {
            while (stack.length > 0 &&
                stack[stack.length - 1] !== '(' &&
                precedence[stack[stack.length - 1]] >= precedence[ch]) {
                const op = stack.pop()!;
                postfix += op + ' ';
            }
            stack.push(ch);

            steps.push({
                structureKind: 'stack',
                stack: { items: stack.map((s, i) => i), top: stack.length - 1 },
                message: `Push operator '${ch}' onto stack`,
                variables: { postfix: postfix.trim(), operator: ch },
                lineNumber: 5,
            });
        }
    }

    while (stack.length > 0) {
        postfix += stack.pop() + ' ';
    }

    steps.push({
        structureKind: 'stack',
        stack: { items: [], top: -1 },
        message: `Postfix expression: ${postfix.trim()}`,
        variables: { postfix: postfix.trim() },
        lineNumber: 6,
    });

    return { steps, meta: { operations, comparisons: 0 } };
}
