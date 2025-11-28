import { AlgorithmResult, StepState } from '../types';

export function huffmanSteps(frequencies: { char: string; freq: number }[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    interface HuffmanNode {
        char?: string;
        freq: number;
        left?: HuffmanNode;
        right?: HuffmanNode;
    }

    // Priority queue (min-heap simulation)
    const nodes: HuffmanNode[] = frequencies.map(f => ({ char: f.char, freq: f.freq }));
    nodes.sort((a, b) => a.freq - b.freq);

    steps.push({
        message: `Starting Huffman Encoding with ${frequencies.length} characters`,
        variables: { totalNodes: nodes.length },
        lineNumber: 1,
    });

    while (nodes.length > 1) {
        operations++;

        const left = nodes.shift()!;
        const right = nodes.shift()!;

        steps.push({
            message: `Combining nodes: freq ${left.freq} and ${right.freq}`,
            variables: { leftFreq: left.freq, rightFreq: right.freq, remaining: nodes.length },
            lineNumber: 2,
        });

        const newNode: HuffmanNode = {
            freq: left.freq + right.freq,
            left,
            right,
        };

        // Insert in sorted position
        let inserted = false;
        for (let i = 0; i < nodes.length; i++) {
            if (newNode.freq < nodes[i].freq) {
                nodes.splice(i, 0, newNode);
                inserted = true;
                break;
            }
        }
        if (!inserted) nodes.push(newNode);

        steps.push({
            message: `Created new node with frequency ${newNode.freq}`,
            variables: { newFreq: newNode.freq, remaining: nodes.length },
            lineNumber: 3,
        });
    }

    const root = nodes[0];

    steps.push({
        message: `Huffman tree constructed. Root frequency: ${root.freq}`,
        lineNumber: 4,
    });

    // Generate codes (simplified display)
    const codes: Record<string, string> = {};
    function generateCodes(node: HuffmanNode, code: string = '') {
        if (node.char) {
            codes[node.char] = code || '0';
            return;
        }
        if (node.left) generateCodes(node.left, code + '0');
        if (node.right) generateCodes(node.right, code + '1');
    }

    generateCodes(root);

    steps.push({
        message: `Huffman codes generated: ${JSON.stringify(codes)}`,
        lineNumber: 5,
    });

    return { steps, meta: { comparisons: 0, operations } };
}
