import { AlgorithmResult, StepState } from '../types';

export function selectionSortSteps(input: number[]): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
        array: [...array],
        message: 'Starting Selection Sort',
        lineNumber: 1,
    });

    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        steps.push({
            array: [...array],
            highlights: { indices: [i], type: 'current' },
            variables: { i, minIdx },
            message: `Current minimum is at index ${i} (${array[i]})`,
            lineNumber: 2,
        });

        for (let j = i + 1; j < array.length; j++) {
            comparisons++;
            steps.push({
                array: [...array],
                highlights: { indices: [minIdx, j], type: 'compare' },
                variables: { i, j, minIdx },
                message: `Comparing ${array[j]} with current minimum ${array[minIdx]}`,
                lineNumber: 3,
            });

            if (array[j] < array[minIdx]) {
                minIdx = j;
                steps.push({
                    array: [...array],
                    highlights: { indices: [minIdx], type: 'found' }, // New min found
                    variables: { i, j, minIdx },
                    message: `New minimum found at index ${j} (${array[j]})`,
                    lineNumber: 4,
                });
            }
        }

        if (minIdx !== i) {
            swaps++;
            const temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;

            steps.push({
                array: [...array],
                highlights: { indices: [i, minIdx], type: 'swap' },
                variables: { i, minIdx },
                message: `Swapping ${array[i]} with ${array[minIdx]}`,
                lineNumber: 6,
            });
        }
    }

    steps.push({
        array: [...array],
        message: 'Selection Sort Completed',
        lineNumber: 8,
    });

    return { steps, meta: { comparisons, swaps } };
}
