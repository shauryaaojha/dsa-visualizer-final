import { AlgorithmResult, StepState } from '../types';

export function nQueensSteps(n: number): AlgorithmResult {
    const steps: StepState[] = [];
    const board: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    let operations = 0;
    let nodesExpanded = 0;

    const isSafe = (row: number, col: number): boolean => {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) return false;
        }

        // Check upper left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }

        // Check upper right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 1) return false;
        }

        return true;
    };

    const solve = (row: number): boolean => {
        if (row === n) {
            steps.push({
                structureKind: 'matrix',
                matrix: {
                    data: board.map(r => [...r]),
                    rows: n,
                    cols: n,
                },
                message: `Solution found! All ${n} queens placed.`,
                lineNumber: 6,
            });
            return true;
        }

        for (let col = 0; col < n; col++) {
            nodesExpanded++;
            operations++;

            steps.push({
                structureKind: 'matrix',
                matrix: {
                    data: board.map(r => [...r]),
                    rows: n,
                    cols: n,
                    highlightedCells: [{ row, col }],
                    highlightType: 'current',
                },
                variables: { row, col, queens: row },
                message: `Trying to place queen at row ${row}, col ${col}`,
                lineNumber: 2,
            });

            if (isSafe(row, col)) {
                board[row][col] = 1;

                steps.push({
                    structureKind: 'matrix',
                    matrix: {
                        data: board.map(r => [...r]),
                        rows: n,
                        cols: n,
                        highlightedCells: [{ row, col }],
                        highlightType: 'found',
                    },
                    variables: { row, col, queens: row + 1 },
                    message: `Placed queen at row ${row}, col ${col}`,
                    lineNumber: 3,
                });

                if (solve(row + 1)) {
                    return true;
                }

                // Backtrack
                board[row][col] = 0;

                steps.push({
                    structureKind: 'matrix',
                    matrix: {
                        data: board.map(r => [...r]),
                        rows: n,
                        cols: n,
                        highlightedCells: [{ row, col }],
                        highlightType: 'compare',
                    },
                    message: `Backtracking: removing queen from row ${row}, col ${col}`,
                    lineNumber: 5,
                });
            }
        }

        return false;
    };

    steps.push({
        structureKind: 'matrix',
        matrix: {
            data: board.map(r => [...r]),
            rows: n,
            cols: n,
        },
        message: `Starting N-Queens for n=${n}`,
        lineNumber: 1,
    });

    solve(0);

    return { steps, meta: { comparisons: 0, operations, nodesExpanded } };
}
