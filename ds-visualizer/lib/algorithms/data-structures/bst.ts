import { AlgorithmResult, StepState, TreeNode, TreeState } from '../types';

export type BSTOperation = 'insert' | 'search' | 'delete' | 'inorder' | 'preorder' | 'postorder';

export function bstSteps(
    initialValues: number[],
    operation: BSTOperation,
    value?: number
): AlgorithmResult {
    let nodes: TreeNode[] = [];
    let root: number | null = null;
    let nextId = 0;

    const steps: StepState[] = [];
    let comparisons = 0;
    let operations = 0;

    // Build initial BST
    for (const val of initialValues) {
        const newNode: TreeNode = {
            value: val,
            left: null,
            right: null,
            parent: null,
            id: nextId++,
        };

        if (root === null) {
            root = newNode.id;
            nodes.push(newNode);
        } else {
            insertNode(nodes, root, newNode);
        }
    }

    steps.push({
        structureKind: 'tree',
        tree: {
            nodes: [...nodes],
            root,
            treeType: 'bst',
        },
        message: 'Initial Binary Search Tree',
        lineNumber: 1,
    });

    switch (operation) {
        case 'insert':
            if (value === undefined) break;

            const newNode: TreeNode = {
                value,
                left: null,
                right: null,
                parent: null,
                id: nextId++,
            };

            if (root === null) {
                root = newNode.id;
                nodes.push(newNode);

                steps.push({
                    structureKind: 'tree',
                    tree: {
                        nodes: [...nodes],
                        root,
                        highlightedNodes: [root],
                        highlightType: 'found',
                        treeType: 'bst',
                    },
                    message: `Inserted ${value} as root`,
                    lineNumber: 2,
                });
            } else {
                const path = insertNodeWithSteps(nodes, root, newNode, steps, comparisons);
                nodes = path.nodes;
                comparisons = path.comparisons;
                operations++;
            }
            break;

        case 'search':
            if (value === undefined) break;
            searchNodeWithSteps(nodes, root, value, steps, comparisons);
            break;

        case 'inorder':
            inorderTraversal(nodes, root, steps);
            break;
    }

    return {
        steps,
        meta: { comparisons, operations },
    };
}

function insertNode(nodes: TreeNode[], rootId: number, newNode: TreeNode): void {
    const root = nodes.find(n => n.id === rootId);
    if (!root) return;

    if (newNode.value < root.value) {
        if (root.left === null) {
            root.left = newNode.id;
            newNode.parent = root.id;
            nodes.push(newNode);
        } else {
            insertNode(nodes, root.left, newNode);
        }
    } else {
        if (root.right === null) {
            root.right = newNode.id;
            newNode.parent = root.id;
            nodes.push(newNode);
        } else {
            insertNode(nodes, root.right, newNode);
        }
    }
}

function insertNodeWithSteps(
    nodes: TreeNode[],
    rootId: number,
    newNode: TreeNode,
    steps: StepState[],
    comparisons: number
): { nodes: TreeNode[]; comparisons: number } {
    let current = rootId;

    while (true) {
        const node = nodes.find(n => n.id === current);
        if (!node) break;

        comparisons++;
        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: [...nodes],
                root: rootId,
                highlightedNodes: [current],
                highlightType: 'current',
                treeType: 'bst',
            },
            message: `Comparing ${newNode.value} with ${node.value}`,
            variables: { current, value: newNode.value },
            lineNumber: 3,
        });

        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode.id;
                newNode.parent = node.id;
                nodes.push(newNode);

                steps.push({
                    structureKind: 'tree',
                    tree: {
                        nodes: [...nodes],
                        root: rootId,
                        highlightedNodes: [newNode.id],
                        highlightType: 'found',
                        treeType: 'bst',
                    },
                    message: `Inserted ${newNode.value} as left child of ${node.value}`,
                    lineNumber: 4,
                });
                break;
            } else {
                current = node.left;
            }
        } else {
            if (node.right === null) {
                node.right = newNode.id;
                newNode.parent = node.id;
                nodes.push(newNode);

                steps.push({
                    structureKind: 'tree',
                    tree: {
                        nodes: [...nodes],
                        root: rootId,
                        highlightedNodes: [newNode.id],
                        highlightType: 'found',
                        treeType: 'bst',
                    },
                    message: `Inserted ${newNode.value} as right child of ${node.value}`,
                    lineNumber: 5,
                });
                break;
            } else {
                current = node.right;
            }
        }
    }

    return { nodes, comparisons };
}

function searchNodeWithSteps(
    nodes: TreeNode[],
    rootId: number | null,
    value: number,
    steps: StepState[],
    comparisons: number
): void {
    if (rootId === null) {
        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: [...nodes],
                root: rootId,
                treeType: 'bst',
            },
            message: `Value ${value} not found`,
            lineNumber: 6,
        });
        return;
    }

    let current: number | null = rootId;

    while (current !== null) {
        const node = nodes.find(n => n.id === current);
        if (!node) break;

        comparisons++;
        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: [...nodes],
                root: rootId,
                highlightedNodes: [current],
                highlightType: 'current',
                treeType: 'bst',
            },
            message: `Comparing ${value} with ${node.value}`,
            variables: { current, target: value },
            lineNumber: 7,
        });

        if (value === node.value) {
            steps.push({
                structureKind: 'tree',
                tree: {
                    nodes: [...nodes],
                    root: rootId,
                    highlightedNodes: [current],
                    highlightType: 'found',
                    treeType: 'bst',
                },
                message: `Found ${value}!`,
                lineNumber: 8,
            });
            return;
        } else if (value < node.value) {
            current = node.left;
        } else {
            current = node.right;
        }
    }

    steps.push({
        structureKind: 'tree',
        tree: {
            nodes: [...nodes],
            root: rootId,
            treeType: 'bst',
        },
        message: `Value ${value} not found`,
        lineNumber: 9,
    });
}

function inorderTraversal(nodes: TreeNode[], rootId: number | null, steps: StepState[]): void {
    const result: number[] = [];

    function traverse(nodeId: number | null) {
        if (nodeId === null) return;

        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        traverse(node.left);

        result.push(node.value);
        steps.push({
            structureKind: 'tree',
            tree: {
                nodes: [...nodes],
                root: rootId,
                highlightedNodes: [nodeId],
                highlightType: 'visiting',
                treeType: 'bst',
            },
            message: `Visiting node ${node.value} (inorder)`,
            variables: { current: nodeId },
            lineNumber: 10,
        });

        traverse(node.right);
    }

    traverse(rootId);

    steps.push({
        structureKind: 'tree',
        tree: {
            nodes: [...nodes],
            root: rootId,
            treeType: 'bst',
        },
        message: `Inorder traversal: [${result.join(', ')}]`,
        lineNumber: 11,
    });
}
