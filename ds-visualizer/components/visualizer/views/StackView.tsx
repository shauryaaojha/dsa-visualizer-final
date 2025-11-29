import React from 'react';
import { StackState } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface StackViewProps {
    state: StackState;
}

export function StackView({ state }: StackViewProps) {
    const { items, top, highlightedIndex, highlightType = 'visiting' } = state;

    if (!items || items.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <div className="text-sm">Empty Stack</div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col items-center justify-end p-6 gap-4">
            {/* Legend */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-green-600 bg-green-100" />
                    <span className="text-gray-600">Top</span>
                </div>
            </div>

            {/* Top Pointer */}
            <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-semibold text-green-600">TOP</div>
                <svg width="20" height="20" viewBox="0 0 20 20" className="text-green-500">
                    <path d="M10 2 L10 18 M10 18 L6 14 M10 18 L14 14" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </div>

            {/* Stack Items (bottom to top) */}
            <div className="flex flex-col-reverse gap-1 max-h-[320px] overflow-y-auto w-40">
                {items.map((val, idx) => {
                    const isTop = idx === top;
                    const isHighlighted = highlightedIndex === idx;

                    let borderColor = 'border-gray-400';
                    let bgColor = 'bg-blue-50';

                    if (isTop) {
                        borderColor = 'border-green-600';
                        bgColor = 'bg-green-100';
                    } else if (isHighlighted) {
                        const colors = getColorClasses(highlightType);
                        borderColor = colors.border;
                        bgColor = colors.bg.replace('bg-', 'bg-').replace('400', '100');
                    }

                    return (
                        <div
                            key={idx}
                            className={`flex items-center justify-center h-14 rounded-lg border-2 ${borderColor} ${bgColor} transition-all duration-300 hover:scale-105 shadow-sm`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="text-xs text-gray-500">idx: {idx}</div>
                                <div className="text-lg font-bold text-gray-800">{val}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Base */}
            <div className="w-48 h-1 bg-gray-400 rounded-full" />
            <div className="text-xs text-gray-500">Stack Base</div>
        </div>
    );
}
