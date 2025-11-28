import { AlgorithmResult, StepState } from '../types';

export function insertionSortSteps(input: number[]): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;
    let swaps = 0; // Counting shifts as swaps for simplicity in visualization

    steps.push({
        array: [...array],
        message: 'Starting Insertion Sort',
        lineNumber: 1,
    });

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        steps.push({
            array: [...array],
            highlights: { indices: [i], type: 'current' },
            variables: { i, key },
            message: `Selected key ${key} at index ${i}`,
            lineNumber: 2,
        });

        while (j >= 0 && array[j] > key) {
            comparisons++;
            steps.push({
                array: [...array],
                highlights: { indices: [j, j + 1], type: 'compare' },
                variables: { i, j, key },
                message: `Comparing ${array[j]} with key ${key}`,
                lineNumber: 3,
            });

            array[j + 1] = array[j];
            swaps++; // Shift
            j = j - 1;

            steps.push({
                array: [...array],
                highlights: { indices: [j + 1, j + 2], type: 'swap' }, // Visualizing shift
                variables: { i, j, key },
                message: `Shifting ${array[j + 1]} to the right`,
                lineNumber: 4,
            });
        }
        // Check comparison for the loop exit condition if j >= 0
        if (j >= 0) {
            comparisons++;
            steps.push({
                array: [...array],
                highlights: { indices: [j, j + 1], type: 'compare' },
                variables: { i, j, key },
                message: `Comparing ${array[j]} with key ${key} (Loop ends)`,
                lineNumber: 3
            });
        }


        array[j + 1] = key;
        steps.push({
            array: [...array],
            highlights: { indices: [j + 1], type: 'found' },
            variables: { i, j, key },
            message: `Inserted key ${key} at index ${j + 1}`,
            lineNumber: 6,
        });
    }

    steps.push({
        array: [...array],
        message: 'Insertion Sort Completed',
        lineNumber: 8,
    });

    return { steps, meta: { comparisons, swaps } };
}
