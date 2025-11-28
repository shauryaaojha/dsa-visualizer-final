import { AlgorithmResult, StepState } from '../types';

interface Item {
    weight: number;
    value: number;
}

export function knapsack01Steps(items: Item[], capacity: number): AlgorithmResult {
    const n = items.length;
    const dp: (number | string)[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    const steps: StepState[] = [];
    let operations = 0;

    steps.push({
        structureKind: 'dp-table',
        dpTable: {
            table: dp.map(row => [...row]),
            rows: n + 1,
            cols: capacity + 1,
            rowLabels: ['0'].concat(items.map((_, idx) => `Item${idx + 1}`)),
            colLabels: Array.from({ length: capacity + 1 }, (_, i) => `W=${i}`),
        },
        message: '0/1 Knapsack: Initial DP table',
        lineNumber: 1,
    });

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            operations++;

            const item = items[i - 1];

            steps.push({
                structureKind: 'dp-table',
                dpTable: {
                    table: dp.map(row => [...row]),
                    rows: n + 1,
                    cols: capacity + 1,
                    rowLabels: ['0'].concat(items.map((_, idx) => `Item${idx + 1}`)),
                    colLabels: Array.from({ length: capacity + 1 }, (_, i) => `W=${i}`),
                    highlightedCells: [{ row: i, col: w }],
                    highlightType: 'current',
                },
                variables: { i, w, weight: item.weight, value: item.value },
                message: `Processing Item ${i} (weight=${item.weight}, value=${item.value}) for capacity ${w}`,
                lineNumber: 2,
            });

            if (item.weight <= w) {
                const include = (dp[i - 1][w - item.weight] as number) + item.value;
                const exclude = dp[i - 1][w] as number;
                dp[i][w] = Math.max(include, exclude);

                steps.push({
                    structureKind: 'dp-table',
                    dpTable: {
                        table: dp.map(row => [...row]),
                        rows: n + 1,
                        cols: capacity + 1,
                        rowLabels: ['0'].concat(items.map((_, idx) => `Item${idx + 1}`)),
                        colLabels: Array.from({ length: capacity + 1 }, (_, i) => `W=${i}`),
                        highlightedCells: [{ row: i, col: w }],
                        highlightType: 'found',
                    },
                    variables: { include, exclude, 'dp[i][w]': dp[i][w] },
                    message: `Can include: max(include=${include}, exclude=${exclude}) = ${dp[i][w]}`,
                    lineNumber: 3,
                });
            } else {
                dp[i][w] = dp[i - 1][w];

                steps.push({
                    structureKind: 'dp-table',
                    dpTable: {
                        table: dp.map(row => [...row]),
                        rows: n + 1,
                        cols: capacity + 1,
                        rowLabels: ['0'].concat(items.map((_, idx) => `Item${idx + 1}`)),
                        colLabels: Array.from({ length: capacity + 1 }, (_, i) => `W=${i}`),
                        highlightedCells: [{ row: i, col: w }],
                        highlightType: 'compare',
                    },
                    message: `Cannot include (too heavy). dp[${i}][${w}] = ${dp[i][w]}`,
                    lineNumber: 4,
                });
            }
        }
    }

    steps.push({
        structureKind: 'dp-table',
        dpTable: {
            table: dp.map(row => [...row]),
            rows: n + 1,
            cols: capacity + 1,
            rowLabels: ['0'].concat(items.map((_, idx) => `Item${idx + 1}`)),
            colLabels: Array.from({ length: capacity + 1 }, (_, i) => `W=${i}`),
            highlightedCells: [{ row: n, col: capacity }],
            highlightType: 'found',
        },
        message: `Maximum value: ${dp[n][capacity]}`,
        lineNumber: 5,
    });

    return { steps, meta: { comparisons: 0, operations } };
}
