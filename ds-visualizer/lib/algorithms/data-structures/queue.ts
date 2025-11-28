import { AlgorithmResult, StepState, QueueState, QueueOperation } from '../types';

export function queueSteps(
    initialValues: number[],
    operation: QueueOperation,
    value?: number
): AlgorithmResult {
    const steps: StepState[] = [];
    const items = [...initialValues];
    let operations = 0;

    // Initial state
    steps.push({
        structureKind: 'queue',
        queue: {
            items: [...items],
            front: 0,
            rear: items.length - 1,
            size: items.length,
            capacity: 10, // Arbitrary capacity for visualization
        },
        message: `Initial Queue with ${items.length} items`,
        variables: { front: 0, rear: items.length - 1, size: items.length },
        lineNumber: 1,
    });

    switch (operation) {
        case 'enqueue':
            if (value === undefined) break;
            operations++;

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front: 0,
                    rear: items.length - 1,
                    size: items.length,
                    capacity: 10,
                    highlightType: 'current',
                },
                message: `Preparing to enqueue ${value}`,
                variables: { value },
                lineNumber: 2,
            });

            items.push(value);

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front: 0,
                    rear: items.length - 1,
                    size: items.length,
                    capacity: 10,
                    highlightedIndices: [items.length - 1],
                    highlightType: 'found',
                },
                message: `Enqueued ${value} at the rear`,
                variables: { rear: items.length - 1, value },
                lineNumber: 3,
            });
            break;

        case 'dequeue':
            if (items.length === 0) {
                steps.push({
                    structureKind: 'queue',
                    queue: {
                        items: [],
                        front: -1,
                        rear: -1,
                        size: 0,
                        capacity: 10,
                    },
                    message: `Queue Underflow! Cannot dequeue from empty queue.`,
                    lineNumber: 4,
                });
                break;
            }

            operations++;
            const dequeuedVal = items[0];

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front: 0,
                    rear: items.length - 1,
                    size: items.length,
                    capacity: 10,
                    highlightedIndices: [0],
                    highlightType: 'visiting',
                },
                message: `Dequeuing front element: ${dequeuedVal}`,
                variables: { front: 0, value: dequeuedVal },
                lineNumber: 5,
            });

            items.shift();

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front: 0,
                    rear: items.length - 1,
                    size: items.length,
                    capacity: 10,
                },
                message: `Dequeued ${dequeuedVal}. New front is ${items.length > 0 ? items[0] : 'None'}`,
                variables: { front: 0, size: items.length },
                lineNumber: 6,
            });
            break;

        case 'peek':
            if (items.length === 0) {
                steps.push({
                    structureKind: 'queue',
                    queue: {
                        items: [],
                        front: -1,
                        rear: -1,
                        size: 0,
                        capacity: 10,
                    },
                    message: `Queue is empty. Nothing to peek.`,
                    lineNumber: 7,
                });
                break;
            }

            operations++;
            const peekVal = items[0];

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front: 0,
                    rear: items.length - 1,
                    size: items.length,
                    capacity: 10,
                    highlightedIndices: [0],
                    highlightType: 'found',
                },
                message: `Front element is ${peekVal}`,
                variables: { front: 0, value: peekVal },
                lineNumber: 8,
            });
            break;

        case 'is-empty':
            operations++;
            const isEmpty = items.length === 0;

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front: 0,
                    rear: items.length - 1,
                    size: items.length,
                    capacity: 10,
                },
                message: `Is Queue Empty? ${isEmpty}`,
                variables: { isEmpty, size: items.length },
                lineNumber: 9,
            });
            break;
    }

    return {
        steps,
        meta: { operations },
    };
}
