import { QueueState } from '@/lib/algorithms/types';

interface QueueRendererProps {
    state: QueueState;
}

export function QueueRenderer({ state }: QueueRendererProps) {
    const { items, front, rear, size, capacity, highlightedIndices = [], highlightType } = state;

    if (items.length === 0 || size === 0) {
        return <div className="text-gray-400 text-center py-8">Empty Queue</div>;
    }

    const getItemColor = (index: number) => {
        if (highlightedIndices.includes(index)) {
            switch (highlightType) {
                case 'current': return 'bg-purple-400 border-purple-600';
                case 'found': return 'bg-green-500 border-green-700';
                case 'visiting': return 'bg-yellow-400 border-yellow-600';
                default: return 'bg-blue-400 border-blue-600';
            }
        }
        return 'bg-gray-200 border-gray-400';
    };

    // For circular queue, show all slots
    const displayItems = capacity > items.length ?
        Array(capacity).fill(null).map((_, i) => items[i] ?? null) :
        items;

    return (
        <div className="p-8">
            <div className="flex items-center gap-2 overflow-x-auto">
                <div className="text-sm text-gray-500 font-bold mr-2">FRONT →</div>
                {displayItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`w-16 h-16 flex items-center justify-center border-2 rounded-md ${item !== null ? getItemColor(index) : 'bg-white border-dashed border-gray-300'
                                } transition-all shadow-sm`}
                        >
                            {item !== null && (
                                <span className="font-bold text-gray-900">{item}</span>
                            )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {index === front && '↑ F'}
                            {index === rear && '↑ R'}
                        </div>
                    </div>
                ))}
                <div className="text-sm text-gray-500 font-bold ml-2">← REAR</div>
            </div>
            <div className="text-sm text-gray-500 mt-4 font-mono text-center">
                Size: {size}/{capacity} | Front: {front} | Rear: {rear}
            </div>
        </div>
    );
}
