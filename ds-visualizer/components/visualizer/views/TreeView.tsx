import React from 'react';
import { TreeState, TreeNode } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface TreeViewProps {
    state: TreeState;
}

interface TreeNodePosition {
    node: TreeNode;
    x: number;
    y: number;
    level: number;
}

export function TreeView({ state }: TreeViewProps) {
    const { nodes, root, highlightedNodes = [], highlightType = 'visiting', treeType = 'binary' } = state;

    if (!nodes || nodes.length === 0 || root === null) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">🌳</div>
                    <div className="text-sm">Empty Tree</div>
                </div>
            </div>
        );
    }

    // Calculate positions using level-order layout
    const positions: TreeNodePosition[] = [];
    const levelWidth = 80; // Horizontal spacing
    const levelHeight = 80; // Vertical spacing

    function calculatePositions(nodeIdx: number | null, x: number, y: number, level: number, offset: number) {
        if (nodeIdx === null || nodeIdx >= nodes.length) return;

        const node = nodes[nodeIdx];
        positions.push({ node, x, y, level });

        const newOffset = offset / 2;
        if (node.left !== null) {
            calculatePositions(node.left, x - offset, y + levelHeight, level + 1, newOffset);
        }
        if (node.right !== null) {
            calculatePositions(node.right, x + offset, y + levelHeight, level + 1, newOffset);
        }
    }

    const initialOffset = Math.min(nodes.length * 20, 150);
    calculatePositions(root, 300, 40, 0, initialOffset);

    // Find bounds
    const minX = Math.min(...positions.map(p => p.x)) - 50;
    const maxX = Math.max(...positions.map(p => p.x)) + 50;
    const maxY = Math.max(...positions.map(p => p.y)) + 50;

    const viewBoxWidth = maxX - minX;
    const viewBoxHeight = maxY + 50;

    return (
        <div className="h-full flex flex-col p-4 overflow-auto bg-gradient-to-br from-blue-50 to-green-50">
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
                <div className="text-gray-600 font-semibold">{treeType.toUpperCase()}</div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-blue-600" />
                    <span className="text-gray-600">Default</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-700" />
                    <span className="text-gray-600">Highlighted</span>
                </div>
            </div>

            {/* Tree SVG */}
            <svg
                viewBox={`${minX} 0 ${viewBoxWidth} ${viewBoxHeight}`}
                className="w-full h-full"
                style={{ minHeight: '300px' }}
            >
                {/* Edges */}
                {positions.map(({ node, x, y }) => (
                    <React.Fragment key={`edges-${node.id}`}>
                        {node.left !== null && nodes[node.left] && (
                            <line
                                x1={x}
                                y1={y}
                                x2={positions.find(p => p.node.id === nodes[node.left!].id)?.x || x}
                                y2={positions.find(p => p.node.id === nodes[node.left!].id)?.y || y}
                                stroke="#9ca3af"
                                strokeWidth="2"
                            />
                        )}
                        {node.right !== null && nodes[node.right] && (
                            <line
                                x1={x}
                                y1={y}
                                x2={positions.find(p => p.node.id === nodes[node.right!].id)?.x || x}
                                y2={positions.find(p => p.node.id === nodes[node.right!].id)?.y || y}
                                stroke="#9ca3af"
                                strokeWidth="2"
                            />
                        )}
                    </React.Fragment>
                ))}

                {/* Nodes */}
                {positions.map(({ node, x, y }) => {
                    const isHighlighted = highlightedNodes.includes(node.id);
                    const colors = isHighlighted ? getColorClasses(highlightType) : getColorClasses('default');

                    return (
                        <g key={`node-${node.id}`}>
                            {/* Node Circle */}
                            <circle
                                cx={x}
                                cy={y}
                                r={24}
                                className={`${colors.bg.replace('bg-', 'fill-')} stroke-2`}
                                stroke={colors.border.includes('blue') ? '#2563eb' : colors.border.includes('green') ? '#16a34a' : '#9ca3af'}
                                strokeWidth={isHighlighted ? 3 : 2}
                            />

                            {/* Value */}
                            <text
                                x={x}
                                y={y + 6}
                                textAnchor="middle"
                                className="text-sm font-bold fill-gray-800"
                            >
                                {node.value}
                            </text>

                            {/* AVL: Height/Balance Factor */}
                            {treeType === 'avl' && (node.height !== undefined || node.balanceFactor !== undefined) && (
                                <text
                                    x={x}
                                    y={y - 32}
                                    textAnchor="middle"
                                    className="text-[10px] fill-gray-600"
                                >
                                    {node.height !== undefined ? `h:${node.height}` : ''}
                                    {node.balanceFactor !== undefined ? ` bf:${node.balanceFactor}` : ''}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
