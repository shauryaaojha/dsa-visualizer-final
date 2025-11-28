import { StackState } from '@/lib/algorithms/types';

interface StackRendererProps {
    state: StackState;
}

export function StackRenderer({ state }: StackRendererProps) {
    const { items, top, highlightedIndex, highlightType } = state;

    if (items.length === 0) {
        return <div className="text-gray-400 text-center py-8">Empty Stack</div>;
    }

    const getItemColor = (index: number) => {
        if (highlightedIndex === index) {
            switch (highlightType) {
                case 'current': return 'bg-purple-400 border-purple-600';
                case 'found': return 'bg-green-500 border-green-700';
                case 'visiting': return 'bg-yellow-400 border-yellow-600';
                default: return 'bg-blue-400 border-blue-600';
            }
        }
        return 'bg-gray-200 border-gray-400';
    };

    return (
        <div className="flex flex-col-reverse items-center gap-2 p-8 min-h-64">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`w-32 px-6 py-3 border-2 rounded-md ${getItemColor(index)} transition-all shadow-sm`}
                >
                    <div className="text-center font-bold text-gray-900">{item}</div>
                    {index === top && (
                        <div className="text-xs text-center text-gray-600 mt-1">← TOP</div>
                    )}
                </div>
            ))}
            <div className="text-sm text-gray-500 mt-4 font-mono">
                Stack Size: {items.length} | Top: {top}
            </div>
        </div>
    );
}
