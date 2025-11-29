import React from 'react';
import { LinkedListNode, LinkedListState } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface LinkedListViewProps {
    state: LinkedListState;
}

export function LinkedListView({ state }: LinkedListViewProps) {
    const { nodes, head, tail, highlightedNodes = [], highlightType = 'visiting' } = state;

    if (!nodes || nodes.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Empty list
            </div>
        );
    }

    // Build ordered list from head
    const orderedNodes: LinkedListNode[] = [];
    let curr = head;
    const visited = new Set<number>();

    while (curr !== null && !visited.has(curr)) {
        visited.add(curr);
        const node = nodes.find(n => n.id === curr);
        if (!node) break;
        orderedNodes.push(node);
        curr = node.next;
    }

    return (
        <div className="h-full flex flex-col p-4 overflow-x-auto">
            {/* Pointer Labels */}
            <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-600">Head</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-gray-600">Tail</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-600">Highlighted</span>
                </div>
            </div>

            {/* Linked List Nodes */}
            <div className="flex-1 flex items-center justify-start gap-2 min-h-0">
                {/* Head indicator */}
                {head !== null && (
                    <div className="flex flex-col items-center">
                        <div className="text-xs font-semibold text-green-600 mb-1">HEAD</div>
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                )}

                {/* Nodes */}
                {orderedNodes.map((node, idx) => {
                    const isHighlighted = highlightedNodes.includes(node.id);
                    const isHead = node.id === head;
                    const isTail = node.id === tail;

                    let borderColor = 'border-gray-400';
                    if (isHighlighted) {
                        const colors = getColorClasses(highlightType);
                        borderColor = colors.border;
                    } else if (isHead) {
                        borderColor = 'border-green-500';
                    } else if (isTail) {
                        borderColor = 'border-red-500';
                    }

                    return (
                        <React.Fragment key={node.id}>
                            {/* Node Box */}
                            <div
                                className={`flex flex-col items-center justify-center min-w-[80px] h-16 rounded-lg border-2 ${borderColor} bg-white shadow-sm transition-all duration-300 hover:scale-105`}
                            >
                                <div className="text-xs text-gray-500">Node {node.id}</div>
                                <div className="text-lg font-bold text-gray-800">{node.value}</div>
                            </div>

                            {/* Arrow to next */}
                            {node.next !== null && (
                                <div className="flex items-center text-gray-400">
                                    <svg width="30" height="20" viewBox="0 0 30 20" className="text-blue-500">
                                        <defs>
                                            <marker
                                                id={`arrow-${node.id}`}
                                                markerWidth="10"
                                                markerHeight="10"
                                                refX="9"
                                                refY="3"
                                                orient="auto"
                                                markerUnits="strokeWidth"
                                            >
                                                <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                                            </marker>
                                        </defs>
                                        <line
                                            x1="0"
                                            y1="10"
                                            x2="28"
                                            y2="10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            markerEnd={`url(#arrow-${node.id})`}
                                        />
                                    </svg>
                                </div>
                            )}

                            {/* NULL indicator */}
                            {node.next === null && idx === orderedNodes.length - 1 && (
                                <div className="flex items-center px-2">
                                    <span className="text-xs text-gray-400 font-mono">NULL</span>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

                {/* Tail indicator */}
                {tail !== null && (
                    <div className="flex flex-col items-center ml-2">
                        <div className="text-xs font-semibold text-red-600 mb-1">TAIL</div>
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                )}
            </div>
        </div>
    );
}
