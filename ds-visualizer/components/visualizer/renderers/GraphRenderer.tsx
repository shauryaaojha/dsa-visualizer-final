import { GraphState } from '@/lib/algorithms/types';

interface GraphRendererProps {
    state: GraphState;
}

export function GraphRenderer({ state }: GraphRendererProps) {
    const { nodes, edges, highlightedNodes = [], highlightedEdges = [], highlightType, directed = false } = state;

    if (nodes.length === 0) {
        return <div className="text-gray-400 text-center py-8">Empty graph</div>;
    }

    const getNodeColor = (nodeId: number) => {
        if (highlightedNodes.includes(nodeId)) {
            switch (highlightType) {
                case 'current': return 'bg-purple-500 border-purple-700';
                case 'visiting': return 'bg-yellow-400 border-yellow-600';
                case 'visited': return 'bg-blue-500 border-blue-700';
                case 'path': return 'bg-green-500 border-green-700';
                default: return 'bg-orange-400 border-orange-600';
            }
        }
        return 'bg-gray-300 border-gray-500';
    };

    const isEdgeHighlighted = (from: number, to: number) => {
        return highlightedEdges.some(e => e.from === from && e.to === to);
    };

    // Simple circular layout
    const radius = 150;
    const angleStep = (2 * Math.PI) / nodes.length;
    const centerX = 200;
    const centerY = 200;

    const positionedNodes = nodes.map((node, idx) => ({
        ...node,
        x: node.x ?? centerX + radius * Math.cos(idx * angleStep),
        y: node.y ?? centerY + radius * Math.sin(idx * angleStep),
    }));

    return (
        <svg width="400" height="400" className="mx-auto border border-gray-200 rounded-lg bg-white">
            {/* Draw edges */}
            {edges.map((edge, idx) => {
                const fromNode = positionedNodes.find(n => n.id === edge.from);
                const toNode = positionedNodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const highlighted = isEdgeHighlighted(edge.from, edge.to);

                return (
                    <g key={idx}>
                        <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={highlighted ? '#ef4444' : '#9ca3af'}
                            strokeWidth={highlighted ? 3 : 2}
                        />
                        {edge.weight !== undefined && (
                            <text
                                x={(fromNode.x + toNode.x) / 2}
                                y={(fromNode.y + toNode.y) / 2}
                                fill="#1f2937"
                                fontSize="12"
                                fontWeight="bold"
                            >
                                {edge.weight}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Draw nodes */}
            {positionedNodes.map(node => (
                <g key={node.id}>
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={20}
                        className={`${getNodeColor(node.id)} transition-all`}
                        style={{ fill: getNodeColor(node.id).includes('bg-') ? undefined : getNodeColor(node.id) }}
                    />
                    <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#000"
                        fontSize="14"
                        fontWeight="bold"
                    >
                        {node.value}
                    </text>
                </g>
            ))}
        </svg>
    );
}
