import React from 'react';
import { getColorClasses, commonLegend } from '@/lib/utils/visualColors';

interface ArrayViewProps {
    array: number[];
    highlights?: {
        indices: number[];
        type: string;
    };
}

export function ArrayView({ array, highlights }: ArrayViewProps) {
    if (!array || array.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                No array data
            </div>
        );
    }

    const maxVal = Math.max(...array, 1);
    const n = array.length;

    // Dynamic sizing: max 80px per bar, min 24px
    const barWidth = Math.max(24, Math.min(80, 600 / n));
    const showValues = barWidth >= 40; // Only show values if bars are wide enough

    return (
        <div className="h-full flex flex-col">
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mb-4 px-4">
                {commonLegend.slice(0, 4).map(({ type, label }) => {
                    const colors = getColorClasses(type);
                    return (
                        <div key={type} className="flex items-center gap-1.5 text-xs">
                            <div className={`w-4 h-4 rounded ${colors.bg} ${colors.border} border-2`} />
                            <span className="text-gray-600">{label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Array Visualization */}
            <div className="flex-1 flex items-end justify-center gap-1 px-4 overflow-x-auto">
                {array.map((val, idx) => {
                    let colorType = 'default';

                    if (highlights && highlights.indices.includes(idx)) {
                        colorType = highlights.type;
                    }

                    const colors = getColorClasses(colorType);
                    const heightPercent = (val / maxVal) * 100;

                    return (
                        <div
                            key={idx}
                            className="flex flex-col items-center gap-1 transition-all duration-300"
                            style={{ width: `${barWidth}px` }}
                        >
                            {/* Value Label (if space) */}
                            {showValues && (
                                <span className="text-xs font-semibold text-gray-700 mb-1">
                                    {val}
                                </span>
                            )}

                            {/* Bar */}
                            <div
                                className={`w-full rounded-t-md border-2 ${colors.bg} ${colors.border} transition-all duration-300 hover:scale-105`}
                                style={{
                                    height: `${Math.max(heightPercent, 8)}%`,
                                    minHeight: '20px',
                                }}
                                title={`Value: ${val}, Index: ${idx}`}
                            />

                            {/* Index Label */}
                            <span className="text-[10px] text-gray-500 mt-1">{idx}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
