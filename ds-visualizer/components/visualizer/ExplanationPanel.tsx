import { Card } from '../ui/Card';

interface ExplanationPanelProps {
    message: string;
}

export function ExplanationPanel({ message }: ExplanationPanelProps) {
    return (
        <Card title="Explanation" className="bg-blue-50 border-blue-100">
            <p className="text-sm text-blue-900">
                {message || "Ready to start..."}
            </p>
        </Card>
    );
}
