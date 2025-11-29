import React from 'react';
import { DpTableState } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface DpTableViewProps {
    state: DpTableState;
}

export function DpTableView({ state }: DpTableViewProps) {
    const { table, rows, cols, highlightedCells = [], rowLabels, colLabels } = state;

    if (!table || rows === 0 || cols === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-sm">Empty Table</div>
                </div>
            </div>
        );
    }

    // Auto-size cells based on table dimensions
    const cellSize = Math.max(32, Math.min(60, 400 / Math.max(rows, cols)));
    const fontSize = cellSize > 40 ? 'text-sm' : 'text-xs';

    return (
        <div className="h-full flex flex-col p-4 overflow-auto bg-gradient-to-br from-indigo-50 to-blue-50">
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
                <div className="text-gray-600 font-semibold">DP Table</div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-green-600 bg-green-100" />
                    <span className="text-gray-600">Current Cell</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-100" />
                    <span className="text-gray-600">Computed</span>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="border-collapse">
                    <tbody>
                        {/* Column Headers */}
                        {colLabels && (
                            <tr>
                                <td className="p-1"></td>
                                {colLabels.map((label, idx) => (
                                    <td
                                        key={idx}
                                        className="p-1 text-center text-xs font-semibold text-gray-600"
                                        style={{ width: `${cellSize}px` }}
                                    >
                                        {label}
                                    </td>
                                ))}
                            </tr>
                        )}

                        {/* Table Rows */}
                        {table.map((row, i) => (
                            <tr key={i}>
                                {/* Row Header */}
                                {rowLabels && (
                                    <td className="p-1 text-right text-xs font-semibold text-gray-600 pr-2">
                                        {rowLabels[i]}
                                    </td>
                                )}

                                {/* Cells */}
                                {row.map((cell, j) => {
                                    const highlighted = highlightedCells.find(h => h.row === i && h.col === j);

                                    let bgColor = 'bg-white';
                                    let borderColor = 'border-gray-300';

                                    if (highlighted) {
                                        if (highlighted.color) {
                                            bgColor = highlighted.color === '#4ade80' ? 'bg-green-100' :
                                                highlighted.color === '#60a5fa' ? 'bg-blue-100' : 'bg-yellow-100';
                                            borderColor = highlighted.color === '#4ade80' ? 'border-green-500' :
                                                highlighted.color === '#60a5fa' ? 'border-blue-500' : 'border-yellow-500';
                                        } else {
                                            bgColor = 'bg-green-100';
                                            borderColor = 'border-green-500';
                                        }
                                    }

                                    return (
                                        <td
                                            key={j}
                                            className={`border-2 ${borderColor} ${bgColor} p-1 text-center ${fontSize} font-semibold text-gray-800 transition-all duration-300 hover:scale-105`}
                                            style={{
                                                width: `${cellSize}px`,
                                                height: `${cellSize}px`,
                                                minWidth: `${cellSize}px`,
                                            }}
                                            title={`[${i}][${j}] = ${cell}`}
                                        >
                                            {cell === Infinity ? '∞' : cell}
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
