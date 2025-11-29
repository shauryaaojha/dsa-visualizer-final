import { AlgorithmResult, StepState } from '../types';

export function mcmSteps(dimensions: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    const n = dimensions.length - 1; // Number of matrices
    const m: number[][] = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));
    const s: number[][] = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));
    let operations = 0;
    let comparisons = 0;

    // Initial state
    steps.push({
        structureKind: 'dp-table',
        dpTable: {
            table: m,
            rows: n + 1,
            cols: n + 1,
            rowLabels: Array(n + 1).fill('').map((_, i) => i === 0 ? '' : `M${i}`),
            colLabels: Array(n + 1).fill('').map((_, i) => i === 0 ? '' : `M${i}`),
            highlightedCells: [],
        },
        message: `Matrix Chain Multiplication for ${n} matrices. Dimensions: ${dimensions.join(' x ')}`,
        variables: { n },
        lineNumber: 1,
    });

    // Initialize diagonal (cost 0 for single matrix)
    for (let i = 1; i <= n; i++) {
        m[i][i] = 0;
        steps.push({
            structureKind: 'dp-table',
            dpTable: {
                table: JSON.parse(JSON.stringify(m)),
                rows: n + 1,
                cols: n + 1,
                rowLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                colLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                highlightedCells: [{ row: i, col: i, color: 'bg-green-200' }],
            },
            message: `Cost for single matrix M${i} is 0`,
            variables: { i, cost: 0 },
            lineNumber: 2,
        });
    }

    // L is chain length
    for (let L = 2; L <= n; L++) {
        for (let i = 1; i <= n - L + 1; i++) {
            const j = i + L - 1;
            m[i][j] = Infinity;

            steps.push({
                structureKind: 'dp-table',
                dpTable: {
                    table: JSON.parse(JSON.stringify(m)),
                    rows: n + 1,
                    cols: n + 1,
                    rowLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                    colLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                    highlightedCells: [{ row: i, col: j, color: 'bg-yellow-200' }],
                },
                message: `Calculating min cost for chain M${i}...M${j} (Length ${L})`,
                variables: { i, j, L },
                lineNumber: 4,
            });

            for (let k = i; k <= j - 1; k++) {
                operations++;
                // q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]
                const q = m[i][k] + m[k + 1][j] + dimensions[i - 1] * dimensions[k] * dimensions[j];
                comparisons++;

                steps.push({
                    structureKind: 'dp-table',
                    dpTable: {
                        table: JSON.parse(JSON.stringify(m)),
                        rows: n + 1,
                        cols: n + 1,
                        rowLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                        colLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                        highlightedCells: [
                            { row: i, col: j, color: 'bg-yellow-200' },
                            { row: i, col: k, color: 'bg-blue-100' },
                            { row: k + 1, col: j, color: 'bg-blue-100' }
                        ],
                    },
                    message: `Split at k=${k}: Cost = ${m[i][k]} + ${m[k + 1][j]} + ${dimensions[i - 1]}*${dimensions[k]}*${dimensions[j]} = ${q}`,
                    variables: { i, j, k, q, currentMin: m[i][j] === Infinity ? '∞' : m[i][j] },
                    lineNumber: 6,
                });

                if (q < m[i][j]) {
                    m[i][j] = q;
                    s[i][j] = k;

                    steps.push({
                        structureKind: 'dp-table',
                        dpTable: {
                            table: JSON.parse(JSON.stringify(m)),
                            rows: n + 1,
                            cols: n + 1,
                            rowLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                            colLabels: Array(n + 1).fill('').map((_, idx) => idx === 0 ? '' : `M${idx}`),
                            highlightedCells: [{ row: i, col: j, color: 'bg-green-200' }],
                        },
                        message: `New minimum cost found: ${q}`,
                        variables: { i, j, minCost: q, split: k },
                        lineNumber: 8,
                    });
                }
            }
        }
    }

    return { steps, meta: { operations, comparisons } };
}
