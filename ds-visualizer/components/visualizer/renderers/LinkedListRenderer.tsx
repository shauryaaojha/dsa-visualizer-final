import { LinkedListState, HighlightType } from '@/lib/algorithms/types';

interface LinkedListRendererProps {
    state: LinkedListState;
}

export function LinkedListRenderer({ state }: LinkedListRendererProps) {
    const { nodes, head, highlightedNodes = [], highlightType } = state;

    if (nodes.length === 0) {
        return <div className="text-gray-400 text-center py-8">Empty list</div>;
    }

    const getNodeColor = (nodeId: number) => {
        if (highlightedNodes.includes(nodeId)) {
            switch (highlightType) {
                case 'current': return 'bg-purple-400 border-purple-600';
                case 'compare': return 'bg-yellow-400 border-yellow-600';
                case 'found': return 'bg-green-500 border-green-700';
                case 'swap': return 'bg-red-400 border-red-600';
                default: return 'bg-blue-400 border-blue-600';
            }
        }
        return 'bg-blue-200 border-blue-400';
    };

    // Build ordered list starting from head
    const orderedNodes: number[] = [];
    let current = head;
    while (current !== null && orderedNodes.length < nodes.length) {
        orderedNodes.push(current);
        const node = nodes.find(n => n.id === current);
        current = node?.next ?? null;
    }

    return (
        <div className="flex items-center gap-4 p-8 overflow-x-auto">
            {head === null && (
                <div className="text-sm text-gray-400">NULL</div>
            )}

            {orderedNodes.map((nodeId, idx) => {
                const node = nodes.find(n => n.id === nodeId);
                if (!node) return null;

                return (
                    <div key={nodeId} className="flex items-center gap-2">
                        <div className={`border-2 ${getNodeColor(nodeId)} px-6 py-4 rounded-lg shadow-md transition-all`}>
                            <div className="text-center font-bold text-gray-900">{node.value}</div>
                            <div className="text-xs text-gray-600 mt-1 text-center">ID:{nodeId}</div>
                        </div>

                        {node.next !== null && (
                            <div className="text-2xl text-gray-400">→</div>
                        )}

                        {node.next === null && idx === orderedNodes.length - 1 && (
                            <div className="text-sm text-gray-400 ml-2">NULL</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
