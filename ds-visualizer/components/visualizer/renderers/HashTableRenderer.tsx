import React from 'react';
import { HashTableState } from '@/lib/algorithms/types';

interface HashTableRendererProps {
    state: HashTableState;
}

export function HashTableRenderer({ state }: HashTableRendererProps) {
    const { slots, size, collisionMethod, highlightedSlots, highlightType } = state;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="text-sm font-medium text-gray-500">
                Hash Table (Size: {size}, Method: {collisionMethod})
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {slots.map((slot, idx) => {
                    let borderColor = 'border-gray-300';
                    let bgColor = 'bg-white';

                    if (highlightedSlots?.includes(idx)) {
                        switch (highlightType) {
                            case 'compare': borderColor = 'border-yellow-500'; bgColor = 'bg-yellow-50'; break;
                            case 'found': borderColor = 'border-green-500'; bgColor = 'bg-green-50'; break;
                            case 'visiting': borderColor = 'border-blue-500'; bgColor = 'bg-blue-50'; break;
                        }
                    }

                    return (
                        <div key={idx} className="flex flex-col items-center gap-1">
                            {/* Slot Index */}
                            <span className="text-xs text-gray-400">{idx}</span>

                            {/* Slot Content */}
                            <div className={`
                                w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all duration-300
                                ${borderColor} ${bgColor}
                            `}>
                                {slot.status === 'occupied' ? (
                                    <span className="font-bold text-gray-700">{slot.value}</span>
                                ) : slot.status === 'deleted' ? (
                                    <span className="text-xs text-red-300">DEL</span>
                                ) : (
                                    <span className="text-xs text-gray-300">Empty</span>
                                )}
                            </div>

                            {/* Chaining Visualization */}
                            {collisionMethod === 'chaining' && slot.chain && slot.chain.length > 0 && (
                                <div className="flex flex-col gap-1 mt-1">
                                    {slot.chain.map((node, nodeIdx) => (
                                        <div key={nodeIdx} className="flex flex-col items-center">
                                            <div className="w-0.5 h-2 bg-gray-300"></div>
                                            <div className="w-12 h-8 flex items-center justify-center bg-blue-100 rounded border border-blue-200 text-xs">
                                                {node.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
