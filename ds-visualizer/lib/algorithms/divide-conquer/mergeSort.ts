import { AlgorithmResult, StepState } from '../types';

export function mergeSortSteps(input: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    const array = [...input];
    let comparisons = 0;
    let recursiveCalls = 0;

    steps.push({
        array: [...array],
        message: 'Starting Merge Sort',
        lineNumber: 1,
    });

    function mergeSort(arr: number[], left: number, right: number, depth: number): void {
        if (left >= right) return;

        recursiveCalls++;
        const mid = Math.floor((left + right) / 2);

        steps.push({
            array: [...array],
            highlights: { indices: Array.from({ length: right - left + 1 }, (_, i) => left + i), type: 'current' },
            variables: { left, right, mid, depth },
            message: `Dividing array at mid=${mid} (depth=${depth})`,
            lineNumber: 2,
        });

        mergeSort(arr, left, mid, depth + 1);
        mergeSort(arr, mid + 1, right, depth + 1);
        merge(arr, left, mid, right);
    }

    function merge(arr: number[], left: number, mid: number, right: number): void {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;

            steps.push({
                array: [...array],
                highlights: { indices: [k], type: 'compare' },
                variables: { i, j, k, left, mid, right },
                message: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
                lineNumber: 3,
            });

            if (leftArr[i] <= rightArr[j]) {
                array[k] = leftArr[i];
                i++;
            } else {
                array[k] = rightArr[j];
                j++;
            }
            k++;

            steps.push({
                array: [...array],
                highlights: { indices: [k - 1], type: 'swap' },
                message: `Placed ${array[k - 1]} at position ${k - 1}`,
                lineNumber: 4,
            });
        }

        while (i < leftArr.length) {
            array[k++] = leftArr[i++];
        }

        while (j < rightArr.length) {
            array[k++] = rightArr[j++];
        }

        steps.push({
            array: [...array],
            highlights: { indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx), type: 'sorted' },
            message: `Merged subarray from ${left} to ${right}`,
            lineNumber: 5,
        });
    }

    mergeSort(array, 0, array.length - 1, 0);

    steps.push({
        array: [...array],
        message: 'Merge Sort Completed',
        lineNumber: 6,
    });

    return { steps, meta: { comparisons, recursiveCalls } };
}
