import React from 'react';
import { MatrixState } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface MatrixViewProps {
    state: MatrixState;
}

export function MatrixView({ state }: MatrixViewProps) {
    const { data, rows, cols, highlightedCells = [], highlightType = 'visiting' } = state;

    if (!data || rows === 0 || cols === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">🔢</div>
                    <div className="text-sm">Empty Matrix</div>
                </div>
            </div>
        );
    }

    const cellSize = Math.max(40, Math.min(70, 500 / Math.max(rows, cols)));
    const fontSize = cellSize > 50 ? 'text-base' : 'text-sm';

    return (
        <div className="h-full flex flex-col p-4 overflow-auto bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
                <div className="text-gray-600 font-semibold">Matrix ({rows}×{cols})</div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-100" />
                    <span className="text-gray-600">Scanning</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-green-600 bg-green-100" />
                    <span className="text-gray-600">Found/Selected</span>
                </div>
            </div>

            {/* Matrix Table */}
            <div className="flex-1 overflow-auto flex items-center justify-center">
                <table className="border-collapse shadow-lg">
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => {
                                    const isHighlighted = highlightedCells.some(h => h.row === i && h.col === j);
                                    const colors = isHighlighted ? getColorClasses(highlightType) : getColorClasses('default');

                                    return (
                                        <td
                                            key={j}
                                            className={`border-2 ${colors.border} ${colors.bg} ${fontSize} font-bold text-center transition-all duration-300 hover:scale-110`}
                                            style={{
                                                width: `${cellSize}px`,
                                                height: `${cellSize}px`,
                                                minWidth: `${cellSize}px`,
                                            }}
                                            title={`[${i}][${j}] = ${cell}`}
                                        >
                                            {cell}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
