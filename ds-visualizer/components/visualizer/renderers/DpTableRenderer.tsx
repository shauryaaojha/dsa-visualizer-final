import { DpTableState } from '@/lib/algorithms/types';

interface DpTableRendererProps {
    state: DpTableState;
}

export function DpTableRenderer({ state }: DpTableRendererProps) {
    const { table, rows, cols, highlightedCells = [], highlightType, rowLabels, colLabels } = state;

    const isCellHighlighted = (row: number, col: number) => {
        return highlightedCells.some(cell => cell.row === row && cell.col === col);
    };

    const getCellColor = (row: number, col: number) => {
        const cell = highlightedCells.find(c => c.row === row && c.col === col);
        if (cell) {
            if (cell.color) return cell.color;

            switch (highlightType) {
                case 'current': return 'bg-yellow-300';
                case 'compare': return 'bg-orange-300';
                case 'found': return 'bg-green-300';
                default: return 'bg-blue-300';
            }
        }
        return 'bg-gray-50';
    };

    return (
        <div className="overflow-auto p-4">
            <table className="border-collapse border border-gray-300 mx-auto text-sm">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-3 py-2 bg-gray-100"></th>
                        {colLabels ? (
                            colLabels.map((label, idx) => (
                                <th key={idx} className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold">
                                    {label}
                                </th>
                            ))
                        ) : (
                            Array.from({ length: cols }).map((_, idx) => (
                                <th key={idx} className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold">
                                    {idx}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody>
                    {table.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            <td className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold">
                                {rowLabels ? rowLabels[rowIdx] : rowIdx}
                            </td>
                            {row.map((cell, colIdx) => (
                                <td
                                    key={colIdx}
                                    className={`border border-gray-300 px-4 py-3 text-center font-mono transition-colors ${getCellColor(rowIdx, colIdx)}`}
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
