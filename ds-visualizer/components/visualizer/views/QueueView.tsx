import React from 'react';
import { QueueState } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface QueueViewProps {
    state: QueueState;
}

export function QueueView({ state }: QueueViewProps) {
    const { items, front, rear, size, capacity, highlightedIndices = [], highlightType = 'visiting' } = state;

    if (!items || items.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">🚶</div>
                    <div className="text-sm">Empty Queue</div>
                </div>
            </div>
        );
    }

    const isCircular = capacity > 0;

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 gap-6">
            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-green-600 bg-green-100" />
                    <span className="text-gray-600">Front</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded border-2 border-red-600 bg-red-100" />
                    <span className="text-gray-600">Rear</span>
                </div>
                {isCircular && (
                    <div className="text-gray-600">
                        Circular: {size}/{capacity}
                    </div>
                )}
            </div>

            {/* Queue Slots */}
            <div className="flex gap-2 overflow-x-auto max-w-full px-4">
                {/* Front Indicator */}
                <div className="flex flex-col items-center justify-center mr-2">
                    <div className="text-xs font-semibold text-green-600 mb-1">FRONT</div>
                    <svg width="20" height="40" viewBox="0 0 20 40" className="text-green-500">
                        <path d="M2 20 L18 20 M18 20 L14 16 M18 20 L14 24" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                {/* Queue Items */}
                {items.map((val, idx) => {
                    const isFront = idx === front;
                    const isRear = idx === rear;
                    const isHighlighted = highlightedIndices.includes(idx);
                    const isEmpty = val === undefined || val === null || val === -1;

                    let borderColor = 'border-gray-300';
                    let bgColor = 'bg-white';

                    if (isFront) {
                        borderColor = 'border-green-600';
                        bgColor = 'bg-green-100';
                    } else if (isRear) {
                        borderColor = 'border-red-600';
                        bgColor = 'bg-red-100';
                    } else if (isHighlighted) {
                        const colors = getColorClasses(highlightType);
                        borderColor = colors.border;
                        bgColor = colors.bg.replace('400', '100');
                    } else if (isEmpty) {
                        bgColor = 'bg-gray-50';
                    }

                    return (
                        <div
                            key={idx}
                            className={`flex flex-col items-center min-w-[60px] transition-all duration-300 hover:scale-105`}
                        >
                            {/* Slot Box */}
                            <div className={`flex items-center justify-center h-16 w-full rounded-lg border-2 ${borderColor} ${bgColor} shadow-sm`}>
                                {isEmpty ? (
                                    <span className="text-xs text-gray-400">-</span>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="text-lg font-bold text-gray-800">{val}</div>
                                    </div>
                                )}
                            </div>
                            {/* Index Label */}
                            <div className="text-[10px] text-gray-400 mt-1">{idx}</div>
                        </div>
                    );
                })}

                {/* Rear Indicator */}
                <div className="flex flex-col items-center justify-center ml-2">
                    <div className="text-xs font-semibold text-red-600 mb-1">REAR</div>
                    <svg width="20" height="40" viewBox="0 0 20 40" className="text-red-500">
                        <path d="M18 20 L2 20 M2 20 L6 16 M2 20 L6 24" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            </div>

            {/* Circular Queue Wrap Indicator */}
            {isCircular && front > rear && (
                <div className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                    <span>↻</span> Wrapped around
                </div>
            )}
        </div>
    );
}
