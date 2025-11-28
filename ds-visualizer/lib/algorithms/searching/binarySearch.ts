import { AlgorithmResult, StepState } from '../types';

export function binarySearchSteps(input: number[], target: number): AlgorithmResult {
    // Binary search requires sorted array. We assume input is sorted or we sort it?
    // Usually for visualization we expect user to provide sorted input or we sort it.
    // But to show the algorithm correctly, we should probably sort it first if it's not,
    // OR just assume it is. Let's assume it is for now, or sort it and show that.
    // For simplicity and correctness of the algo visualization, let's work on the array as is,
    // but usually binary search fails if not sorted.
    // Let's sort it implicitly for the visualization to work, OR just trust the user.
    // Better: Sort it and add a step saying "Sorting array for Binary Search".

    let array = [...input];
    // Check if sorted
    const isSorted = array.every((v, i, a) => !i || a[i - 1] <= v);
    const steps: StepState[] = [];

    if (!isSorted) {
        array.sort((a, b) => a - b);
        steps.push({
            array: [...array],
            message: 'Array must be sorted for Binary Search. Sorting now...',
            lineNumber: 0
        });
    }

    let comparisons = 0;
    let low = 0;
    let high = array.length - 1;

    steps.push({
        array: [...array],
        message: `Starting Binary Search for ${target}`,
        variables: { low, high, target },
        lineNumber: 1,
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        comparisons++;

        steps.push({
            array: [...array],
            highlights: { indices: [mid], type: 'mid' },
            variables: { low, high, mid, target },
            message: `Checking middle element at index ${mid} (${array[mid]})`,
            lineNumber: 3,
        });

        if (array[mid] === target) {
            steps.push({
                array: [...array],
                highlights: { indices: [mid], type: 'found' },
                variables: { low, high, mid, target },
                message: `Found ${target} at index ${mid}!`,
                lineNumber: 4,
            });
            return { steps, meta: { comparisons } };
        } else if (array[mid] < target) {
            low = mid + 1;
            steps.push({
                array: [...array],
                highlights: { indices: [mid], type: 'compare' },
                variables: { low, high, mid, target },
                message: `${array[mid]} < ${target}, ignoring left half. New low is ${low}`,
                lineNumber: 5,
            });
        } else {
            high = mid - 1;
            steps.push({
                array: [...array],
                highlights: { indices: [mid], type: 'compare' },
                variables: { low, high, mid, target },
                message: `${array[mid]} > ${target}, ignoring right half. New high is ${high}`,
                lineNumber: 6,
            });
        }
    }

    steps.push({
        array: [...array],
        message: `${target} not found in the array.`,
        lineNumber: 8,
    });

    return { steps, meta: { comparisons } };
}
