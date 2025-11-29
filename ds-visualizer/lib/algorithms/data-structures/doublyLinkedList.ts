import { AlgorithmResult, StepState, DoublyLinkedListNode, DoublyLinkedListState } from '../types';

export function doublyLinkedListSteps(values: number[], operation: string): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let nextId = 0;
    const nodes: DoublyLinkedListNode[] = [];
    let head: number | null = null;
    let tail: number | null = null;

    // Helper to create visualization
    const createState = (highlightedNodes: number[] = [], highlightType: any = 'visiting'): DoublyLinkedListState => ({
        nodes: JSON.parse(JSON.stringify(nodes)),
        head,
        tail,
        highlightedNodes,
        highlightType,
    });

    // Initialize list with values
    for (const val of values) {
        const node: DoublyLinkedListNode = {
            id: nextId,
            value: val,
            next: null,
            prev: tail,
        };

        if (tail !== null) {
            nodes[tail].next = nextId;
        }
        if (head === null) {
            head = nextId;
        }

        nodes.push(node);
        tail = nextId;
        nextId++;
    }

    steps.push({
        structureKind: 'linked-list', // We'll use linked-list renderer (it should work for doubly too)
        linkedList: createState() as any,
        message: `Initialized Doubly Linked List: [${values.join(' ⇄ ')}]`,
        lineNumber: 1,
    });

    // Perform operation
    switch (operation) {
        case 'insert-begin':
            const newVal = 99;
            const newNode: DoublyLinkedListNode = {
                id: nextId++,
                value: newVal,
                next: head,
                prev: null,
            };

            if (head !== null) {
                nodes[head].prev = newNode.id;
            }
            nodes.push(newNode);
            head = newNode.id;
            if (tail === null) tail = newNode.id;

            steps.push({
                structureKind: 'linked-list',
                linkedList: createState([newNode.id], 'found') as any,
                message: `Inserted ${newVal} at beginning`,
                lineNumber: 3,
            });
            break;

        case 'insert-end':
            const endVal = 88;
            const endNode: DoublyLinkedListNode = {
                id: nextId++,
                value: endVal,
                next: null,
                prev: tail,
            };

            if (tail !== null) {
                nodes[tail].next = endNode.id;
            }
            nodes.push(endNode);
            tail = endNode.id;
            if (head === null) head = endNode.id;

            steps.push({
                structureKind: 'linked-list',
                linkedList: createState([endNode.id], 'found') as any,
                message: `Inserted ${endVal} at end`,
                lineNumber: 5,
            });
            break;

        case 'delete-begin':
            if (head !== null) {
                const deleted = nodes[head].value;
                head = nodes[head].next;
                if (head !== null) {
                    nodes[head].prev = null;
                } else {
                    tail = null;
                }

                steps.push({
                    structureKind: 'linked-list',
                    linkedList: createState([], 'swap') as any,
                    message: `Deleted ${deleted} from beginning`,
                    lineNumber: 7,
                });
            }
            break;

        case 'traverse-forward':
            let curr = head;
            while (curr !== null) {
                steps.push({
                    structureKind: 'linked-list',
                    linkedList: createState([curr], 'visiting') as any,
                    message: `Visiting node ${nodes[curr].value}`,
                    lineNumber: 10,
                });
                curr = nodes[curr].next;
            }
            break;

        case 'traverse-backward':
            let currBack = tail;
            while (currBack !== null) {
                steps.push({
                    structureKind: 'linked-list',
                    linkedList: createState([currBack], 'visiting') as any,
                    message: `Visiting node ${nodes[currBack].value} (backward)`,
                    lineNumber: 12,
                });
                currBack = nodes[currBack].prev;
            }
            break;
    }

    return { steps, meta: { operations, comparisons: 0 } };
}
