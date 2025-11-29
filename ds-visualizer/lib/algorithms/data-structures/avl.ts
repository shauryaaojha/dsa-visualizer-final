import { AlgorithmResult, StepState, TreeNode, TreeState } from '../types';

export function avlSteps(values: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    let nodes: TreeNode[] = [];
    let rootIndex: number | null = null;
    let nextId = 0;

    function createNode(value: number): number {
        const node: TreeNode = {
            id: nextId++,
            value,
            left: null,
            right: null,
            parent: null,
            height: 1,
            balanceFactor: 0
        };
        nodes.push(node);
        return nodes.length - 1;
    }

    function getHeight(index: number | null): number {
        if (index === null) return 0;
        return nodes[index].height || 0;
    }

    function updateHeight(index: number) {
        nodes[index].height = 1 + Math.max(getHeight(nodes[index].left), getHeight(nodes[index].right));
    }

    function getBalance(index: number | null): number {
        if (index === null) return 0;
        return getHeight(nodes[index].left) - getHeight(nodes[index].right);
    }

    function rightRotate(yIndex: number): number {
        const xIndex = nodes[yIndex].left!;
        const T2Index = nodes[xIndex].right;

        // Perform rotation
        nodes[xIndex].right = yIndex;
        nodes[yIndex].left = T2Index;

        // Update parents
        nodes[xIndex].parent = nodes[yIndex].parent;
        nodes[yIndex].parent = xIndex;
        if (T2Index !== null) nodes[T2Index].parent = yIndex;

        // Update heights
        updateHeight(yIndex);
        updateHeight(xIndex);

        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                root: rootIndex,
                highlightedNodes: [xIndex, yIndex],
                highlightType: 'swap',
                treeType: 'avl'
            },
            message: `Right Rotation at Node ${nodes[yIndex].value}`,
            variables: { y: nodes[yIndex].value, x: nodes[xIndex].value },
            lineNumber: 10
        });

        return xIndex;
    }

    function leftRotate(xIndex: number): number {
        const yIndex = nodes[xIndex].right!;
        const T2Index = nodes[yIndex].left;

        // Perform rotation
        nodes[yIndex].left = xIndex;
        nodes[xIndex].right = T2Index;

        // Update parents
        nodes[yIndex].parent = nodes[xIndex].parent;
        nodes[xIndex].parent = yIndex;
        if (T2Index !== null) nodes[T2Index].parent = xIndex;

        // Update heights
        updateHeight(xIndex);
        updateHeight(yIndex);

        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                root: rootIndex,
                highlightedNodes: [xIndex, yIndex],
                highlightType: 'swap',
                treeType: 'avl'
            },
            message: `Left Rotation at Node ${nodes[xIndex].value}`,
            variables: { x: nodes[xIndex].value, y: nodes[yIndex].value },
            lineNumber: 11
        });

        return yIndex;
    }

    function insert(nodeIndex: number | null, value: number, parentIndex: number | null): number {
        if (nodeIndex === null) {
            operations++;
            const newNodeIndex = createNode(value);
            nodes[newNodeIndex].parent = parentIndex;

            steps.push({
                structureKind: 'tree',
                tree: {
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    root: rootIndex === null ? newNodeIndex : rootIndex,
                    highlightedNodes: [newNodeIndex],
                    highlightType: 'found',
                    treeType: 'avl'
                },
                message: `Inserted ${value}`,
                variables: { value },
                lineNumber: 1
            });
            return newNodeIndex;
        }

        comparisons++;
        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: JSON.parse(JSON.stringify(nodes)),
                root: rootIndex,
                highlightedNodes: [nodeIndex],
                highlightType: 'visiting',
                treeType: 'avl'
            },
            message: `Comparing ${value} with ${nodes[nodeIndex].value}`,
            variables: { value, current: nodes[nodeIndex].value },
            lineNumber: 2
        });

        if (value < nodes[nodeIndex].value) {
            nodes[nodeIndex].left = insert(nodes[nodeIndex].left, value, nodeIndex);
        } else if (value > nodes[nodeIndex].value) {
            nodes[nodeIndex].right = insert(nodes[nodeIndex].right, value, nodeIndex);
        } else {
            return nodeIndex; // Duplicate keys not allowed
        }

        // Update height
        updateHeight(nodeIndex);

        // Get balance factor
        const balance = getBalance(nodeIndex);
        nodes[nodeIndex].balanceFactor = balance;

        // Left Left Case
        if (balance > 1 && value < nodes[nodes[nodeIndex].left!].value) {
            return rightRotate(nodeIndex);
        }

        // Right Right Case
        if (balance < -1 && value > nodes[nodes[nodeIndex].right!].value) {
            return leftRotate(nodeIndex);
        }

        // Left Right Case
        if (balance > 1 && value > nodes[nodes[nodeIndex].left!].value) {
            nodes[nodeIndex].left = leftRotate(nodes[nodeIndex].left!);
            return rightRotate(nodeIndex);
        }

        // Right Left Case
        if (balance < -1 && value < nodes[nodes[nodeIndex].right!].value) {
            nodes[nodeIndex].right = rightRotate(nodes[nodeIndex].right!);
            return leftRotate(nodeIndex);
        }

        return nodeIndex;
    }

    // Process all values
    for (const val of values) {
        rootIndex = insert(rootIndex, val, null);
    }

    return { steps, meta: { operations, comparisons } };
}
