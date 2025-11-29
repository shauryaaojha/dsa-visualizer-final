import React from 'react';
import { GraphState, GraphNode, GraphEdge } from '@/lib/algorithms/types';
import { getColorClasses } from '@/lib/utils/visualColors';

interface GraphViewProps {
    state: GraphState;
}

export function GraphView({ state }: GraphViewProps) {
    const {
        nodes,
        edges,
        highlightedNodes = [],
        highlightedEdges = [],
        highlightType = 'visiting',
        directed = false,
        weighted = false,
    } = state;

    if (!nodes || nodes.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">🕸️</div>
                    <div className="text-sm">Empty Graph</div>
                </div>
            </div>
        );
    }

    // Simple circular layout
    const centerX = 300;
    const centerY = 250;
    const radius = Math.min(200, 100 + nodes.length * 10);

    const nodePositions = nodes.map((node, i) => {
        const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
        return {
            ...node,
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
        };
    });

    return (
        <div className="h-full flex flex-col p-4 overflow-auto bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
                <div className="text-gray-600 font-semibold">
                    {directed ? 'Directed' : 'Undirected'} {weighted ? 'Weighted' : ''} Graph
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-blue-600" />
                    <span className="text-gray-600">Node</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-700" />
                    <span className="text-gray-600">Highlighted</span>
                </div>
            </div>

            {/* Graph SVG */}
            <svg
                viewBox="0 0 600 500"
                className="w-full h-full"
                style={{ minHeight: '400px' }}
            >
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3, 0 6" fill="#6b7280" />
                    </marker>
                    <marker
                        id="arrowhead-highlight"
                        markerWidth="10"
                        markerHeight="10"
                        refX="9"
                        refY="3"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3, 0 6" fill="#16a34a" />
                    </marker>
                </defs>

                {/* Edges */}
                {edges.map((edge, idx) => {
                    const fromNode = nodePositions.find(n => n.id === edge.from);
                    const toNode = nodePositions.find(n => n.id === edge.to);

                    if (!fromNode || !toNode) return null;

                    const isHighlighted = highlightedEdges.some(
                        e => e.from === edge.from && e.to === edge.to
                    );

                    const strokeColor = isHighlighted ? '#16a34a' : '#6b7280';
                    const strokeWidth = isHighlighted ? 3 : 2;

                    // Calculate edge endpoints (stop at node radius)
                    const dx = toNode.x - fromNode.x;
                    const dy = toNode.y - fromNode.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const nodeRadius = 22;

                    const startX = fromNode.x + (dx / dist) * nodeRadius;
                    const startY = fromNode.y + (dy / dist) * nodeRadius;
                    const endX = toNode.x - (dx / dist) * nodeRadius;
                    const endY = toNode.y - (dy / dist) * nodeRadius;

                    return (
                        <g key={`edge-${idx}`}>
                            <line
                                x1={startX}
                                y1={startY}
                                x2={endX}
                                y2={endY}
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                                markerEnd={directed ? (isHighlighted ? "url(#arrowhead-highlight)" : "url(#arrowhead)") : undefined}
                            />
                            {/* Weight Label */}
                            {weighted && edge.weight !== undefined && (
                                <text
                                    x={(fromNode.x + toNode.x) / 2}
                                    y={(fromNode.y + toNode.y) / 2 - 5}
                                    textAnchor="middle"
                                    className="text-xs fill-gray-700 font-semibold bg-white px-1"
                                >
                                    {edge.weight}
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodePositions.map((node) => {
                    const isHighlighted = highlightedNodes.includes(node.id);
                    const colors = isHighlighted ? getColorClasses(highlightType) : getColorClasses('default');

                    return (
                        <g key={`node-${node.id}`}>
                            {/* Node Circle */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={20}
                                className={`${colors.bg.replace('bg-', 'fill-')} stroke-2 cursor-pointer transition-all hover:r-24`}
                                stroke={colors.border.includes('blue') ? '#2563eb' : colors.border.includes('green') ? '#16a34a' : '#9ca3af'}
                                strokeWidth={isHighlighted ? 3 : 2}
                            />

                            {/* Node Label */}
                            <text
                                x={node.x}
                                y={node.y + 5}
                                textAnchor="middle"
                                className="text-sm font-bold fill-gray-800 pointer-events-none"
                            >
                                {node.value}
                            </text>

                            {/* ID Label (small, below) */}
                            <text
                                x={node.x}
                                y={node.y + 35}
                                textAnchor="middle"
                                className="text-[10px] fill-gray-500"
                            >
                                #{node.id}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
