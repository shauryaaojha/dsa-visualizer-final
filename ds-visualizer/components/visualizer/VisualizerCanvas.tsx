import { StepState } from '@/lib/algorithms/types';
import { LinkedListRenderer } from './renderers/LinkedListRenderer';
import { TreeRenderer } from './renderers/TreeRenderer';
import { GraphRenderer } from './renderers/GraphRenderer';
import { DpTableRenderer } from './renderers/DpTableRenderer';
import { MatrixRenderer } from './renderers/MatrixRenderer';

interface VisualizerCanvasProps {
    step: StepState | null;
    category: string;
}

export function VisualizerCanvas({ step, category }: VisualizerCanvasProps) {
    if (!step) {
        return (
            <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-400">
                Enter input and click Run to start
            </div>
        );
    }

    // Render based on structure kind
    if (step.structureKind === 'linked-list' && step.linkedList) {
        return (
            <div className="min-h-64 bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
                <LinkedListRenderer state={step.linkedList} />
            </div>
        );
    }

    if (step.structureKind === 'tree' && step.tree) {
        return (
            <div className="min-h-96 bg-white rounded-lg border border-gray-200 shadow-sm overflow-auto">
                <TreeRenderer state={step.tree} />
            </div>
        );
    }

    if (step.structureKind === 'graph' && step.graph) {
        return (
            <div className="min-h-96 bg-white rounded-lg border border-gray-200 shadow-sm overflow-auto">
                <GraphRenderer state={step.graph} />
            </div>
        );
    }

    if (step.structureKind === 'dp-table' && step.dpTable) {
        return (
            <div className="min-h-64 bg-white rounded-lg border border-gray-200 shadow-sm overflow-auto">
                <DpTableRenderer state={step.dpTable} />
            </div>
        );
    }

    if (step.structureKind === 'matrix' && step.matrix) {
        return (
            <div className="min-h-64 bg-white rounded-lg border border-gray-200 shadow-sm overflow-auto">
                <MatrixRenderer state={step.matrix} />
            </div>
        );
    }

    // Default: Array visualization (existing Level 1 code)
    if (step.array) {
        const { array, highlights } = step;
        const maxVal = Math.max(...array, 1);

        return (
            <div className="h-80 flex items-end justify-center gap-2 p-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
                {array.map((val, idx) => {
                    let colorClass = 'bg-blue-200 border-blue-300'; // Default

                    if (highlights) {
                        if (highlights.indices.includes(idx)) {
                            switch (highlights.type) {
                                case 'compare': colorClass = 'bg-yellow-400 border-yellow-500'; break;
                                case 'swap': colorClass = 'bg-red-400 border-red-500'; break;
                                case 'found': colorClass = 'bg-green-500 border-green-600'; break;
                                case 'current': colorClass = 'bg-purple-400 border-purple-500'; break;
                                case 'mid': colorClass = 'bg-orange-400 border-orange-500'; break;
                                case 'low': colorClass = 'bg-gray-400 border-gray-500'; break;
                                case 'high': colorClass = 'bg-gray-400 border-gray-500'; break;
                                case 'sorted': colorClass = 'bg-green-300 border-green-400'; break;
                            }
                        }
                    }

                    const heightPercent = (val / maxVal) * 100;

                    return (
                        <div key={idx} className="flex flex-col items-center gap-1 group relative">
                            {/* Value Label */}
                            <span className="text-xs font-medium text-gray-600 mb-1">{val}</span>

                            {/* Bar */}
                            <div
                                className={`w-8 rounded-t-md border transition-all duration-200 ${colorClass}`}
                                style={{ height: `${Math.max(heightPercent, 10)}%` }} // Min height for visibility
                            ></div>

                            {/* Index Label */}
                            <span className="text-[10px] text-gray-400 mt-1">{idx}</span>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-400">
            No visualization available
        </div>
    );
}
