import { AlgorithmResult, StepState, MatrixState } from '../types';

interface Triplet {
    row: number;
    col: number;
    value: number;
}

export function sparseMatrixSteps(matrix: number[][]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const triplets: Triplet[] = [];

    // Initial State: Show full matrix
    steps.push({
        structureKind: 'matrix',
        matrix: {
            data: matrix,
            rows,
            cols,
            highlightedCells: [],
        },
        message: `Input Matrix (${rows}x${cols})`,
        lineNumber: 1,
    });

    // Scan and build triplets
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            operations++;
            comparisons++;

            steps.push({
                structureKind: 'matrix',
                matrix: {
                    data: matrix,
                    rows,
                    cols,
                    highlightedCells: [{ row: i, col: j }],
                    highlightType: 'visiting',
                },
                message: `Scanning cell (${i}, ${j}). Value: ${matrix[i][j]}`,
                variables: { i, j, val: matrix[i][j] },
                lineNumber: 3,
            });

            if (matrix[i][j] !== 0) {
                triplets.push({ row: i, col: j, value: matrix[i][j] });

                steps.push({
                    structureKind: 'matrix',
                    matrix: {
                        data: matrix,
                        rows,
                        cols,
                        highlightedCells: [{ row: i, col: j }],
                        highlightType: 'found',
                    },
                    message: `Non-zero value found! Adding triplet <${i}, ${j}, ${matrix[i][j]}>`,
                    variables: { triplet: `<${i}, ${j}, ${matrix[i][j]}>` },
                    lineNumber: 5,
                });
            }
        }
    }

    // Show final Triplet Table
    // Since we don't have a specific 'triplet-table' renderer, we can use a matrix or custom message
    // Or we can display the triplet table as a new matrix where cols are Row, Col, Value

    const tripletTable: number[][] = [
        ['Row', 'Col', 'Value'] as any, // Header
        ...triplets.map(t => [t.row, t.col, t.value])
    ];

    steps.push({
        structureKind: 'matrix',
        matrix: {
            data: tripletTable as any,
            rows: triplets.length + 1,
            cols: 3,
            highlightedCells: [],
        },
        message: `Sparse Matrix Representation (Triplet Format). Total Non-Zero Elements: ${triplets.length}`,
        variables: { count: triplets.length },
        lineNumber: 10,
    });

    return { steps, meta: { operations, comparisons } };
}
