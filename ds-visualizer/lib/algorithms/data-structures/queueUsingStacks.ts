import { AlgorithmResult, StepState } from '../types';

export function queueUsingStacksSteps(
    initialValues: number[],
    operation: 'enqueue' | 'dequeue' | 'peek',
    value?: number
): AlgorithmResult {
    const steps: StepState[] = [];
    let stack1: number[] = [...initialValues]; // Main stack for enqueue
    let stack2: number[] = []; // Auxiliary stack for dequeue
    let operations = 0;

    steps.push({
        message: `Queue using Two Stacks - Stack1: [${stack1.join(', ')}], Stack2: [${stack2.join(', ')}]`,
        variables: { stack1Size: stack1.length, stack2Size: stack2.length },
        lineNumber: 1,
    });

    switch (operation) {
        case 'enqueue':
            if (value === undefined) break;

            operations++;
            stack1.push(value);

            steps.push({
                message: `Enqueue ${value}: Push to Stack1`,
                array: [...stack1],
                highlights: { indices: [stack1.length - 1], type: 'found' },
                variables: { value, stack1Size: stack1.length },
                lineNumber: 2,
            });
            break;

        case 'dequeue':
            // Transfer from stack1 to stack2 if stack2 is empty
            if (stack2.length === 0) {
                steps.push({
                    message: `Stack2 empty. Transferring from Stack1 to Stack2...`,
                    variables: { stack1Size: stack1.length, stack2Size: 0 },
                    lineNumber: 3,
                });

                while (stack1.length > 0) {
                    const temp = stack1.pop()!;
                    stack2.push(temp);
                    operations++;

                    steps.push({
                        message: `Transfer ${temp} from Stack1 to Stack2`,
                        array: [...stack2],
                        highlights: { indices: [stack2.length - 1], type: 'swap' },
                        variables: { transferred: temp, stack1Size: stack1.length, stack2Size: stack2.length },
                        lineNumber: 4,
                    });
                }
            }

            if (stack2.length === 0) {
                steps.push({
                    message: `Queue is empty! Cannot dequeue.`,
                    lineNumber: 5,
                });
                break;
            }

            operations++;
            const dequeuedVal = stack2.pop()!;

            steps.push({
                message: `Dequeue ${dequeuedVal}: Pop from Stack2`,
                array: [...stack2],
                variables: { value: dequeuedVal, stack2Size: stack2.length },
                lineNumber: 6,
            });
            break;

        case 'peek':
            if (stack2.length === 0 && stack1.length > 0) {
                steps.push({
                    message: `Stack2 empty. Transferring from Stack1...`,
                    lineNumber: 7,
                });

                while (stack1.length > 0) {
                    stack2.push(stack1.pop()!);
                    operations++;
                }
            }

            if (stack2.length === 0) {
                steps.push({
                    message: `Queue is empty! Nothing to peek.`,
                    lineNumber: 8,
                });
                break;
            }

            operations++;
            const peekVal = stack2[stack2.length - 1];

            steps.push({
                message: `Front element: ${peekVal}`,
                array: [...stack2],
                highlights: { indices: [stack2.length - 1], type: 'found' },
                variables: { value: peekVal },
                lineNumber: 9,
            });
            break;
    }

    steps.push({
        message: `Final state - Stack1: [${stack1.join(', ')}], Stack2: [${stack2.join(', ')}]`,
        variables: { stack1Size: stack1.length, stack2Size: stack2.length },
        lineNumber: 10,
    });

    return { steps, meta: { operations, comparisons: 0 } };
}
