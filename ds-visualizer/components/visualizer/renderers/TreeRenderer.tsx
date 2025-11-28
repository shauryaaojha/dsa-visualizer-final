import { TreeState } from '@/lib/algorithms/types';

interface TreeRendererProps {
    state: TreeState;
}

export function TreeRenderer({ state }: TreeRendererProps) {
    const { nodes, root, highlightedNodes = [], highlightType } = state;

    if (root === null || nodes.length === 0) {
        return <div className="text-gray-400 text-center py-8">Empty tree</div>;
    }

    const getNodeColor = (nodeId: number) => {
        if (highlightedNodes.includes(nodeId)) {
            switch (highlightType) {
                case 'current': return 'bg-purple-400 border-purple-600';
                case 'visiting': return 'bg-yellow-400 border-yellow-600';
                case 'found': return 'bg-green-500 border-green-700';
                case 'visited': return 'bg-blue-400 border-blue-600';
                default: return 'bg-orange-400 border-orange-600';
            }
        }
        return 'bg-gray-200 border-gray-400';
    };

    // Simple tree layout (BFS level-based)
    const renderNode = (nodeId: number | null, level: number, x: number, levelWidth: number): JSX.Element | null => {
        if (nodeId === null) return null;

        const node = nodes.find(n => n.id === nodeId);
        if (!node) return null;

        const spacing = levelWidth / Math.pow(2, level + 1);

        return (
            <div key={nodeId} className="relative" style={{ marginLeft: `${spacing}px`, marginRight: `${spacing}px` }}>
                <div className={`w-12 h-12 rounded-full border-2 ${getNodeColor(nodeId)} flex items-center justify-center font-bold text-sm shadow-md transition-all mx-auto`}>
                    {node.value}
                </div>
                <div className="flex justify-center mt-4 gap-8">
                    {renderNode(node.left, level + 1, x - spacing / 2, levelWidth)}
                    {renderNode(node.right, level + 1, x + spacing / 2, levelWidth)}
                </div>
            </div>
        );
    };

    return (
        <div className="p-8 overflow-auto">
            {renderNode(root, 0, 400, 800)}
        </div>
    );
}
