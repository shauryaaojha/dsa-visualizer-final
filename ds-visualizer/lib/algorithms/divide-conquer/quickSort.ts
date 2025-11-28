import { AlgorithmResult, StepState } from '../types';

export function quickSortSteps(input: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    const array = [...input];
    let comparisons = 0;
    let swaps = 0;
    let recursiveCalls = 0;

    steps.push({
        array: [...array],
        message: 'Starting Quick Sort',
        lineNumber: 1,
    });

    function partition(low: number, high: number): number {
        const pivot = array[high];
        let i = low - 1;

        steps.push({
            array: [...array],
            highlights: { indices: [high], type: 'pivot' },
            variables: { low, high, pivot, i },
            message: `Selected pivot: ${pivot} (at index ${high})`,
            lineNumber: 2,
        });

        for (let j = low; j < high; j++) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: { indices: [j, high], type: 'compare' },
                variables: { i, j, pivot },
                message: `Comparing ${array[j]} with pivot ${pivot}`,
                lineNumber: 3,
            });

            if (array[j] < pivot) {
                i++;
                if (i !== j) {
                    swaps++;
                    [array[i], array[j]] = [array[j], array[i]];

                    steps.push({
                        array: [...array],
                        highlights: { indices: [i, j], type: 'swap' },
                        variables: { i, j, pivot },
                        message: `Swapped ${array[i]} and ${array[j]}`,
                        lineNumber: 4,
                    });
                }
            }
        }

        i++;
        if (i !== high) {
            swaps++;
            [array[i], array[high]] = [array[high], array[i]];

            steps.push({
                array: [...array],
                highlights: { indices: [i, high], type: 'swap' },
                variables: { i, pivot },
                message: `Placed pivot ${pivot} at position ${i}`,
                lineNumber: 5,
            });
        }

        return i;
    }

    function quickSort(low: number, high: number): void {
        if (low < high) {
            recursiveCalls++;
            const pi = partition(low, high);

            steps.push({
                array: [...array],
                highlights: { indices: [pi], type: 'sorted' },
                variables: { low, high, partitionIndex: pi },
                message: `Partition complete. Pivot is at correct position ${pi}`,
                lineNumber: 6,
            });

            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    quickSort(0, array.length - 1);

    steps.push({
        array: [...array],
        message: 'Quick Sort Completed',
        lineNumber: 7,
    });

    return { steps, meta: { comparisons, swaps, recursiveCalls } };
}
