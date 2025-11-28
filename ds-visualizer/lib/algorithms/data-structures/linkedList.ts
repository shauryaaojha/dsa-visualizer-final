import { AlgorithmResult, StepState, LinkedListNode, LinkedListState } from '../types';

export type LinkedListOperation = 'insert-begin' | 'insert-end' | 'insert-middle' | 'delete-begin' | 'delete-end' | 'delete-middle' | 'search' | 'traverse';

export function linkedListSteps(
    initialValues: number[],
    operation: LinkedListOperation,
    value?: number,
    position?: number
): AlgorithmResult {
    // Initialize linked list from array
    let nodes: LinkedListNode[] = initialValues.map((val, idx) => ({
        value: val,
        id: idx,
        next: idx < initialValues.length - 1 ? idx + 1 : null,
    }));

    let head = initialValues.length > 0 ? 0 : null;
    let tail = initialValues.length > 0 ? initialValues.length - 1 : null;
    let nextId = initialValues.length;

    const steps: StepState[] = [];
    let operations = 0;

    // Initial state
    steps.push({
        structureKind: 'linked-list',
        linkedList: {
            nodes: [...nodes],
            head,
            tail,
        },
        message: `Initial linked list`,
        variables: { head, tail, size: nodes.length },
        lineNumber: 1,
    });

    switch (operation) {
        case 'insert-begin':
            if (value === undefined) break;

            const newNodeBegin: LinkedListNode = {
                value,
                id: nextId++,
                next: head,
            };

            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: [...nodes, newNodeBegin],
                    head,
                    tail,
                    highlightedNodes: [newNodeBegin.id],
                    highlightType: 'current',
                },
                message: `Creating new node with value ${value}`,
                variables: { newNode: newNodeBegin.id },
                lineNumber: 2,
            });

            nodes.push(newNodeBegin);
            head = newNodeBegin.id;
            if (tail === null) tail = newNodeBegin.id;
            operations++;

            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: [...nodes],
                    head,
                    tail,
                    highlightedNodes: [newNodeBegin.id],
                    highlightType: 'found',
                },
                message: `Inserted ${value} at the beginning`,
                variables: { head, tail },
                lineNumber: 3,
            });
            break;

        case 'insert-end':
            if (value === undefined) break;

            const newNodeEnd: LinkedListNode = {
                value,
                id: nextId++,
                next: null,
            };

            if (tail !== null) {
                const tailNode = nodes.find(n => n.id === tail);
                if (tailNode) {
                    tailNode.next = newNodeEnd.id;
                }
            }

            nodes.push(newNodeEnd);
            if (head === null) head = newNodeEnd.id;
            tail = newNodeEnd.id;
            operations++;

            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: [...nodes],
                    head,
                    tail,
                    highlightedNodes: [newNodeEnd.id],
                    highlightType: 'found',
                },
                message: `Inserted ${value} at the end`,
                variables: { head, tail },
                lineNumber: 4,
            });
            break;

        case 'search':
            if (value === undefined) break;

            let current = head;
            let found = false;
            let searchPos = 0;

            while (current !== null) {
                operations++;
                const node = nodes.find(n => n.id === current);
                if (!node) break;

                steps.push({
                    structureKind: 'linked-list',
                    linkedList: {
                        nodes: [...nodes],
                        head,
                        tail,
                        highlightedNodes: [current],
                        highlightType: 'current',
                    },
                    message: `Checking node ${current}: value is ${node.value}`,
                    variables: { current, position: searchPos, target: value },
                    lineNumber: 5,
                });

                if (node.value === value) {
                    found = true;
                    steps.push({
                        structureKind: 'linked-list',
                        linkedList: {
                            nodes: [...nodes],
                            head,
                            tail,
                            highlightedNodes: [current],
                            highlightType: 'found',
                        },
                        message: `Found ${value} at position ${searchPos}`,
                        variables: { current, position: searchPos },
                        lineNumber: 6,
                    });
                    break;
                }

                current = node.next;
                searchPos++;
            }

            if (!found) {
                steps.push({
                    structureKind: 'linked-list',
                    linkedList: {
                        nodes: [...nodes],
                        head,
                        tail,
                    },
                    message: `Value ${value} not found in the list`,
                    lineNumber: 7,
                });
            }
            break;

        case 'delete-begin':
            if (head !== null) {
                const headNode = nodes.find(n => n.id === head);

                steps.push({
                    structureKind: 'linked-list',
                    linkedList: {
                        nodes: [...nodes],
                        head,
                        tail,
                        highlightedNodes: [head],
                        highlightType: 'current',
                    },
                    message: `Deleting first node (value: ${headNode?.value})`,
                    lineNumber: 8,
                });

                head = headNode?.next ?? null;
                nodes = nodes.filter(n => n.id !== headNode?.id);
                if (head === null) tail = null;
                operations++;

                steps.push({
                    structureKind: 'linked-list',
                    linkedList: {
                        nodes: [...nodes],
                        head,
                        tail,
                    },
                    message: `Deleted first node. New head: ${head}`,
                    variables: { head, tail },
                    lineNumber: 9,
                });
            }
            break;

        case 'traverse':
            current = head;
            let pos = 0;

            while (current !== null) {
                const node = nodes.find(n => n.id === current);
                if (!node) break;

                operations++;
                steps.push({
                    structureKind: 'linked-list',
                    linkedList: {
                        nodes: [...nodes],
                        head,
                        tail,
                        highlightedNodes: [current],
                        highlightType: 'visiting',
                    },
                    message: `Visiting node at position ${pos}: value = ${node.value}`,
                    variables: { current, position: pos },
                    lineNumber: 10,
                });

                current = node.next;
                pos++;
            }

            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: [...nodes],
                    head,
                    tail,
                },
                message: `Traversal completed`,
                lineNumber: 11,
            });
            break;
    }

    return {
        steps,
        meta: { comparisons: 0, operations },
    };
}
