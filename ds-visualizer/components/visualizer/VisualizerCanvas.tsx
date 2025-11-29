import { StepState } from '@/lib/algorithms/types';
import { LinkedListRenderer } from './renderers/LinkedListRenderer';
import { TreeRenderer } from './renderers/TreeRenderer';
import { GraphRenderer } from './renderers/GraphRenderer';
import { DpTableRenderer } from './renderers/DpTableRenderer';
import { MatrixRenderer } from './renderers/MatrixRenderer';
import { StackRenderer } from './renderers/StackRenderer';
import { QueueRenderer } from './renderers/QueueRenderer';
import { HashTableRenderer } from './renderers/HashTableRenderer';
import { ArrayView } from './views/ArrayView';
import { LinkedListView } from './views/LinkedListView';
import { StackView } from './views/StackView';
import { QueueView } from './views/QueueView';
import { TreeView } from './views/TreeView';
import { GraphView } from './views/GraphView';
import { DpTableView } from './views/DpTableView';
import { MatrixView } from './views/MatrixView';

interface VisualizerCanvasProps {
    step: StepState | null;
    category: string;
}

export function VisualizerCanvas({ step, category }: VisualizerCanvasProps) {
    if (!step) {
        return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 text-gray-400">
                <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-sm">Enter input and click Run to start</div>
                </div>
            </div>
        );
    }

    // Canvas container with fixed height and overflow handling
    const canvasClass = "bg-white rounded-lg border-2 border-gray-200 shadow-md overflow-hidden";
    const canvasStyle = "h-[420px] md:h-[480px]";

    // Module 1: Use new ArrayView for array visualizations
    if (step.array && !step.structureKind) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <ArrayView array={step.array} highlights={step.highlights} />
            </div>
        );
    }

    // Module 1: Use new LinkedListView
    if (step.structureKind === 'linked-list' && step.linkedList) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <LinkedListView state={step.linkedList} />
            </div>
        );
    }

    // Module 2: Stack - Use new StackView
    if (step.structureKind === 'stack' && step.stack) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <StackView state={step.stack} />
            </div>
        );
    }

    // Module 2: Queue - Use new QueueView
    if (step.structureKind === 'queue' && step.queue) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <QueueView state={step.queue} />
            </div>
        );
    }

    // Module 3: Hash Table (keep existing for now)
    if (step.structureKind === 'hash-table' && step.hashTable) {
        return (
            <div className={`${canvasClass} ${canvasStyle} overflow-auto`}>
                <HashTableRenderer state={step.hashTable} />
            </div>
        );
    }

    // Module 3: Tree - Use new TreeView
    if (step.structureKind === 'tree' && step.tree) {
        return (
            <div className={`${canvasClass} h-[480px] md:h-[540px]`}>
                <TreeView state={step.tree} />
            </div>
        );
    }

    // Module 4: Graph - Use new GraphView
    if (step.structureKind === 'graph' && step.graph) {
        return (
            <div className={`${canvasClass} h-[480px] md:h-[540px]`}>
                <GraphView state={step.graph} />
            </div>
        );
    }

    // Module 5 & DAA: DP Table - Use new DpTableView
    if (step.structureKind === 'dp-table' && step.dpTable) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <DpTableView state={step.dpTable} />
            </div>
        );
    }

    // Module 5: Matrix - Use new MatrixView
    if (step.structureKind === 'matrix' && step.matrix) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <MatrixView state={step.matrix} />
            </div>
        );
    }

    // Fallback: Old array visualization for compatibility
    if (step.array) {
        return (
            <div className={`${canvasClass} ${canvasStyle}`}>
                <ArrayView array={step.array} highlights={step.highlights} />
            </div>
        );
    }

    return (
        <div className={`${canvasClass} ${canvasStyle} flex items-center justify-center text-gray-400`}>
            <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div className="text-sm">No visualization available for this step</div>
            </div>
        </div>
    );
}
