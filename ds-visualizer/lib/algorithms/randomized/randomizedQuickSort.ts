import { AlgorithmResult, StepState } from '../types';

export function randomizedQuickSortSteps(input: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    const array = [...input];
    let comparisons = 0;
    let swaps = 0;
    let recursiveCalls = 0;

    steps.push({
        array: [...array],
        message: 'Starting Randomized Quick Sort',
        lineNumber: 1,
    });

    function partition(low: number, high: number): number {
        // Randomized pivot selection
        const randomIdx = Math.floor(Math.random() * (high - low + 1)) + low;

        steps.push({
            array: [...array],
            highlights: { indices: [randomIdx], type: 'candidate' },
            variables: { low, high, randomIdx },
            message: `Randomly selected index ${randomIdx} as pivot candidate`,
            lineNumber: 2,
        });

        // Swap random pivot to end
        [array[randomIdx], array[high]] = [array[high], array[randomIdx]];
        swaps++;

        steps.push({
            array: [...array],
            highlights: { indices: [randomIdx, high], type: 'swap' },
            message: `Swapped random pivot to end (index ${high})`,
            lineNumber: 3,
        });

        const pivot = array[high];
        let i = low - 1;

        steps.push({
            array: [...array],
            highlights: { indices: [high], type: 'pivot' },
            variables: { pivot },
            message: `Partitioning with pivot ${pivot}`,
            lineNumber: 4,
        });

        for (let j = low; j < high; j++) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: { indices: [j, high], type: 'compare' },
                variables: { i, j, pivot },
                message: `Comparing ${array[j]} with pivot ${pivot}`,
                lineNumber: 5,
            });

            if (array[j] < pivot) {
                i++;
                if (i !== j) {
                    swaps++;
                    [array[i], array[j]] = [array[j], array[i]];

                    steps.push({
                        array: [...array],
                        highlights: { indices: [i, j], type: 'swap' },
                        message: `Swapped ${array[i]} and ${array[j]}`,
                        lineNumber: 6,
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
                message: `Placed pivot ${pivot} at position ${i}`,
                lineNumber: 7,
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
                message: `Partition complete. Pivot at ${pi}`,
                lineNumber: 8,
            });

            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    quickSort(0, array.length - 1);

    steps.push({
        array: [...array],
        message: 'Randomized Quick Sort Completed',
        lineNumber: 9,
    });

    return { steps, meta: { comparisons, swaps, recursiveCalls } };
}
