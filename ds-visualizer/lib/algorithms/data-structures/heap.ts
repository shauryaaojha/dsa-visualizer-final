import { AlgorithmResult, StepState, TreeNode } from '../types';

export function minHeapSteps(values: number[]): AlgorithmResult {
    return heapSteps(values, 'min');
}

export function maxHeapSteps(values: number[]): AlgorithmResult {
    return heapSteps(values, 'max');
}

export function heapSortSteps(values: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    let arr = [...values];
    const n = arr.length;

    // Helper to generate tree nodes from array
    const getTreeNodes = (array: number[], highlight: number[] = [], type: 'visiting' | 'swap' | 'sorted' = 'visiting'): TreeNode[] => {
        return array.map((val, idx) => ({
            id: idx,
            value: val,
            left: 2 * idx + 1 < array.length ? 2 * idx + 1 : null,
            right: 2 * idx + 2 < array.length ? 2 * idx + 2 : null,
            parent: idx > 0 ? Math.floor((idx - 1) / 2) : null,
        }));
    };

    steps.push({
        structureKind: 'tree', // Visualize as tree primarily
        tree: {
            nodes: getTreeNodes(arr),
            root: 0,
            highlightedNodes: [],
            treeType: 'binary',
        },
        message: `Initial Array: [${arr.join(', ')}]`,
        variables: { n },
        lineNumber: 1,
    });

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, steps, 'max');
    }

    steps.push({
        structureKind: 'tree',
        tree: {
            nodes: getTreeNodes(arr),
            root: 0,
            highlightedNodes: [],
            treeType: 'binary',
        },
        message: `Max Heap Built: [${arr.join(', ')}]`,
        variables: { arr: `[${arr.join(', ')}]` },
        lineNumber: 5,
    });

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        operations++;
        // Swap root with end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: getTreeNodes(arr, [0, i], 'swap'),
                root: 0,
                highlightedNodes: [0, i],
                highlightType: 'swap',
                treeType: 'binary',
            },
            message: `Swapped root ${arr[i]} with ${arr[0]}. ${arr[i]} is now sorted.`,
            variables: { i, sorted: arr[i] },
            lineNumber: 8,
        });

        // Heapify root
        heapify(arr, i, 0, steps, 'max');
    }

    return { steps, meta: { operations, comparisons } };
}

function heapSteps(values: number[], type: 'min' | 'max'): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const arr: number[] = [];

    const getTreeNodes = (array: number[]): TreeNode[] => {
        return array.map((val, idx) => ({
            id: idx,
            value: val,
            left: 2 * idx + 1 < array.length ? 2 * idx + 1 : null,
            right: 2 * idx + 2 < array.length ? 2 * idx + 2 : null,
            parent: idx > 0 ? Math.floor((idx - 1) / 2) : null,
        }));
    };

    for (const val of values) {
        operations++;
        arr.push(val);
        let i = arr.length - 1;

        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: getTreeNodes(arr),
                root: 0,
                highlightedNodes: [i],
                highlightType: 'found',
                treeType: 'binary',
            },
            message: `Inserted ${val} at end`,
            variables: { val, index: i },
            lineNumber: 1,
        });

        // Bubble up
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            comparisons++;
            const condition = type === 'min' ? arr[i] < arr[p] : arr[i] > arr[p];

            if (condition) {
                // Swap
                [arr[i], arr[p]] = [arr[p], arr[i]];
                steps.push({
                    structureKind: 'tree',
                    tree: {
                        nodes: getTreeNodes(arr),
                        root: 0,
                        highlightedNodes: [i, p],
                        highlightType: 'swap',
                        treeType: 'binary',
                    },
                    message: `Swapped ${arr[p]} and ${arr[i]} to satisfy ${type}-heap property`,
                    variables: { child: arr[p], parent: arr[i] },
                    lineNumber: 3,
                });
                i = p;
            } else {
                break;
            }
        }
    }

    return { steps, meta: { operations, comparisons } };
}

function heapify(arr: number[], n: number, i: number, steps: StepState[], type: 'min' | 'max') {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    const getTreeNodes = (array: number[]): TreeNode[] => {
        return array.map((val, idx) => ({
            id: idx,
            value: val,
            left: 2 * idx + 1 < array.length ? 2 * idx + 1 : null,
            right: 2 * idx + 2 < array.length ? 2 * idx + 2 : null,
            parent: idx > 0 ? Math.floor((idx - 1) / 2) : null,
        }));
    };

    if (l < n) {
        const condition = type === 'min' ? arr[l] < arr[largest] : arr[l] > arr[largest];
        if (condition) largest = l;
    }

    if (r < n) {
        const condition = type === 'min' ? arr[r] < arr[largest] : arr[r] > arr[largest];
        if (condition) largest = r;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: getTreeNodes(arr),
                root: 0,
                highlightedNodes: [i, largest],
                highlightType: 'swap',
                treeType: 'binary',
            },
            message: `Heapify: Swapped ${arr[i]} and ${arr[largest]}`,
            variables: { i, largest },
            lineNumber: 10,
        });

        heapify(arr, n, largest, steps, type);
    }
}
