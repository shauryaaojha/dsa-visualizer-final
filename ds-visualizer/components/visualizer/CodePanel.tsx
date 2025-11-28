import { Card } from '../ui/Card';

interface CodePanelProps {
    code: string;
    activeLine?: number;
}

export function CodePanel({ code, activeLine }: CodePanelProps) {
    const lines = code.split('\n');

    return (
        <Card title="Pseudocode" className="h-full">
            <div className="font-mono text-xs overflow-x-auto">
                {lines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isActive = lineNum === activeLine;
                    return (
                        <div
                            key={idx}
                            className={`px-2 py-0.5 whitespace-pre ${isActive ? 'bg-yellow-100 text-yellow-900 font-bold' : 'text-gray-600'}`}
                        >
                            <span className="inline-block w-6 text-gray-300 select-none">{lineNum}</span>
                            {line}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
