import { MatrixState } from '@/lib/algorithms/types';

interface MatrixRendererProps {
    state: MatrixState;
}

export function MatrixRenderer({ state }: MatrixRendererProps) {
    const { data, rows, cols, highlightedCells = [], highlightType } = state;

    const isCellHighlighted = (row: number, col: number) => {
        return highlightedCells.some(cell => cell.row === row && cell.col === col);
    };

    const getCellColor = (row: number, col: number) => {
        if (isCellHighlighted(row, col)) {
            switch (highlightType) {
                case 'current': return 'bg-purple-300';
                case 'compare': return 'bg-yellow-300';
                case 'found': return 'bg-green-300';
                default: return 'bg-blue-300';
            }
        }
        return 'bg-white';
    };

    return (
        <div className="overflow-auto p-4">
            <table className="border-collapse border border-gray-400 mx-auto">
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((cell, colIdx) => (
                                <td
                                    key={colIdx}
                                    className={`border border-gray-400 px-4 py-3 text-center font-mono transition-colors ${getCellColor(rowIdx, colIdx)}`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
