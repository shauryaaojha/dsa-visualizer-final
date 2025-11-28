import { AlgorithmResult, StepState } from '../types';

export function lcsSteps(text1: string, text2: string): AlgorithmResult {
    const m = text1.length;
    const n = text2.length;
    const dp: (number | string)[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    const steps: StepState[] = [];
    let operations = 0;

    // Initial DP table
    steps.push({
        structureKind: 'dp-table',
        dpTable: {
            table: dp.map(row => [...row]),
            rows: m + 1,
            cols: n + 1,
            rowLabels: [''].concat(text1.split('')),
            colLabels: [''].concat(text2.split('')),
        },
        message: 'Initial DP table for Longest Common Subsequence',
        lineNumber: 1,
    });

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            operations++;

            steps.push({
                structureKind: 'dp-table',
                dpTable: {
                    table: dp.map(row => [...row]),
                    rows: m + 1,
                    cols: n + 1,
                    rowLabels: [''].concat(text1.split('')),
                    colLabels: [''].concat(text2.split('')),
                    highlightedCells: [{ row: i, col: j }],
                    highlightType: 'current',
                },
                variables: { i, j },
                message: `Comparing text1[${i - 1}]='${text1[i - 1]}' with text2[${j - 1}]='${text2[j - 1]}'`,
                lineNumber: 2,
            });

            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = (dp[i - 1][j - 1] as number) + 1;

                steps.push({
                    structureKind: 'dp-table',
                    dpTable: {
                        table: dp.map(row => [...row]),
                        rows: m + 1,
                        cols: n + 1,
                        rowLabels: [''].concat(text1.split('')),
                        colLabels: [''].concat(text2.split('')),
                        highlightedCells: [{ row: i, col: j }],
                        highlightType: 'found',
                    },
                    variables: { i, j, 'dp[i][j]': dp[i][j] },
                    message: `Match! dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
                    lineNumber: 3,
                });
            } else {
                dp[i][j] = Math.max(dp[i - 1][j] as number, dp[i][j - 1] as number);

                steps.push({
                    structureKind: 'dp-table',
                    dpTable: {
                        table: dp.map(row => [...row]),
                        rows: m + 1,
                        cols: n + 1,
                        rowLabels: [''].concat(text1.split('')),
                        colLabels: [''].concat(text2.split('')),
                        highlightedCells: [{ row: i, col: j }],
                        highlightType: 'compare',
                    },
                    variables: { i, j, 'dp[i][j]': dp[i][j] },
                    message: `No match. dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${dp[i][j]}`,
                    lineNumber: 4,
                });
            }
        }
    }

    const lcsLength = dp[m][n];

    steps.push({
        structureKind: 'dp-table',
        dpTable: {
            table: dp.map(row => [...row]),
            rows: m + 1,
            cols: n + 1,
            rowLabels: [''].concat(text1.split('')),
            colLabels: [''].concat(text2.split('')),
            highlightedCells: [{ row: m, col: n }],
            highlightType: 'found',
        },
        message: `LCS Length: ${lcsLength}`,
        lineNumber: 5,
    });

    return { steps, meta: { comparisons: 0, operations } };
}
