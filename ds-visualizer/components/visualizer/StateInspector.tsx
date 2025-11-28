import { Card } from '../ui/Card';

interface StateInspectorProps {
    variables?: Record<string, number | string>;
}

export function StateInspector({ variables }: StateInspectorProps) {
    return (
        <Card title="Variables">
            <div className="grid grid-cols-2 gap-2">
                {variables ? (
                    Object.entries(variables).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center bg-gray-50 px-2 py-1 rounded border border-gray-100">
                            <span className="text-xs font-mono text-gray-500">{key}</span>
                            <span className="text-sm font-bold text-gray-800">{val}</span>
                        </div>
                    ))
                ) : (
                    <span className="text-xs text-gray-400 italic">No variables to track</span>
                )}
            </div>
        </Card>
    );
}
