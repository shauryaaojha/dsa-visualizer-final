import { AlgorithmResult, StepState } from '../types';

export function bubbleSortSteps(input: number[]): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
        array: [...array],
        message: 'Starting Bubble Sort',
        lineNumber: 1,
    });

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            comparisons++;
            steps.push({
                array: [...array],
                highlights: { indices: [j, j + 1], type: 'compare' },
                variables: { i, j },
                message: `Comparing ${array[j]} and ${array[j + 1]}`,
                lineNumber: 3,
            });

            if (array[j] > array[j + 1]) {
                swaps++;
                // Swap
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                steps.push({
                    array: [...array],
                    highlights: { indices: [j, j + 1], type: 'swap' },
                    variables: { i, j },
                    message: `Swapping ${array[j]} and ${array[j + 1]}`,
                    lineNumber: 4,
                });
            }
        }
        steps.push({
            array: [...array],
            highlights: { indices: [array.length - i - 1], type: 'found' }, // Mark sorted element
            message: `Element ${array[array.length - i - 1]} is now in its sorted position`,
            lineNumber: 1,
        });
    }

    steps.push({
        array: [...array],
        message: 'Bubble Sort Completed',
        lineNumber: 8,
    });

    return { steps, meta: { comparisons, swaps } };
}
