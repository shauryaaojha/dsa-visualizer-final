import { AlgorithmResult, StepState, StackState, StackOperation } from '../types';

export function stackSteps(
    initialValues: number[],
    operation: StackOperation,
    value?: number
): AlgorithmResult {
    const steps: StepState[] = [];
    const items = [...initialValues];
    let operations = 0;

    // Initial state
    steps.push({
        structureKind: 'stack',
        stack: {
            items: [...items],
            top: items.length - 1,
        },
        message: `Initial Stack with ${items.length} items`,
        variables: { top: items.length - 1, size: items.length },
        lineNumber: 1,
    });

    switch (operation) {
        case 'push':
            if (value === undefined) break;
            operations++;

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...items],
                    top: items.length - 1,
                    highlightType: 'current',
                },
                message: `Preparing to push ${value}`,
                variables: { value },
                lineNumber: 2,
            });

            items.push(value);

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...items],
                    top: items.length - 1,
                    highlightedIndex: items.length - 1,
                    highlightType: 'found',
                },
                message: `Pushed ${value} to the stack`,
                variables: { top: items.length - 1, value },
                lineNumber: 3,
            });
            break;

        case 'pop':
            if (items.length === 0) {
                steps.push({
                    structureKind: 'stack',
                    stack: {
                        items: [],
                        top: -1,
                    },
                    message: `Stack Underflow! Cannot pop from empty stack.`,
                    lineNumber: 4,
                });
                break;
            }

            operations++;
            const poppedVal = items[items.length - 1];

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...items],
                    top: items.length - 1,
                    highlightedIndex: items.length - 1,
                    highlightType: 'visiting',
                },
                message: `Popping top element: ${poppedVal}`,
                variables: { top: items.length - 1, value: poppedVal },
                lineNumber: 5,
            });

            items.pop();

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...items],
                    top: items.length - 1,
                },
                message: `Popped ${poppedVal}. New top is at index ${items.length - 1}`,
                variables: { top: items.length - 1 },
                lineNumber: 6,
            });
            break;

        case 'peek':
            if (items.length === 0) {
                steps.push({
                    structureKind: 'stack',
                    stack: {
                        items: [],
                        top: -1,
                    },
                    message: `Stack is empty. Nothing to peek.`,
                    lineNumber: 7,
                });
                break;
            }

            operations++;
            const peekVal = items[items.length - 1];

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...items],
                    top: items.length - 1,
                    highlightedIndex: items.length - 1,
                    highlightType: 'found',
                },
                message: `Top element is ${peekVal}`,
                variables: { top: items.length - 1, value: peekVal },
                lineNumber: 8,
            });
            break;

        case 'is-empty':
            operations++;
            const isEmpty = items.length === 0;

            steps.push({
                structureKind: 'stack',
                stack: {
                    items: [...items],
                    top: items.length - 1,
                },
                message: `Is Stack Empty? ${isEmpty}`,
                variables: { isEmpty, size: items.length },
                lineNumber: 9,
            });
            break;
    }

    return {
        steps,
        meta: { operations },
    };
}
