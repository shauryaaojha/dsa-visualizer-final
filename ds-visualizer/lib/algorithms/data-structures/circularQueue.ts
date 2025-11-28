import { AlgorithmResult, StepState } from '../types';

export function circularQueueSteps(
    initialValues: number[],
    operation: 'enqueue' | 'dequeue' | 'peek' | 'is-empty' | 'is-full',
    value?: number,
    capacity: number = 5
): AlgorithmResult {
    const steps: StepState[] = [];
    let items = [...initialValues];
    let front = 0;
    let rear = items.length - 1;
    let size = items.length;
    let operations = 0;

    // Initial state
    steps.push({
        structureKind: 'queue',
        queue: {
            items: [...items],
            front,
            rear,
            size,
            capacity,
        },
        message: `Circular Queue (capacity=${capacity}): ${size} items`,
        variables: { front, rear, size, capacity },
        lineNumber: 1,
    });

    switch (operation) {
        case 'enqueue':
            if (value === undefined) break;

            if (size >= capacity) {
                steps.push({
                    structureKind: 'queue',
                    queue: { items: [...items], front, rear, size, capacity },
                    message: `Queue Overflow! Cannot enqueue (capacity full)`,
                    lineNumber: 2,
                });
                break;
            }

            operations++;
            rear = (rear + 1) % capacity;
            items[rear] = value;
            size++;

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front,
                    rear,
                    size,
                    capacity,
                    highlightedIndices: [rear],
                    highlightType: 'found',
                },
                message: `Enqueued ${value} at rear=${rear} (circular)`,
                variables: { front, rear, size, value },
                lineNumber: 3,
            });
            break;

        case 'dequeue':
            if (size === 0) {
                steps.push({
                    structureKind: 'queue',
                    queue: { items: [], front: -1, rear: -1, size: 0, capacity },
                    message: `Queue Underflow! Cannot dequeue (queue empty)`,
                    lineNumber: 4,
                });
                break;
            }

            operations++;
            const dequeuedVal = items[front];

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front,
                    rear,
                    size,
                    capacity,
                    highlightedIndices: [front],
                    highlightType: 'visiting',
                },
                message: `Dequeuing from front=${front}: ${dequeuedVal}`,
                variables: { front, value: dequeuedVal },
                lineNumber: 5,
            });

            items[front] = 0; // Clear the spot
            front = (front + 1) % capacity;
            size--;

            steps.push({
                structureKind: 'queue',
                queue: {
                    items: [...items],
                    front,
                    rear,
                    size,
                    capacity,
                },
                message: `Dequeued ${dequeuedVal}. New front=${front}`,
                variables: { front, rear, size },
                lineNumber: 6,
            });
            break;

        case 'is-full':
            operations++;
            const isFull = size >= capacity;
            steps.push({
                structureKind: 'queue',
                queue: { items: [...items], front, rear, size, capacity },
                message: `Is Queue Full? ${isFull}`,
                variables: { isFull: String(isFull), size, capacity },
                lineNumber: 7,
            });
            break;

        case 'is-empty':
            operations++;
            const isEmpty = size === 0;
            steps.push({
                structureKind: 'queue',
                queue: { items: [...items], front, rear, size, capacity },
                message: `Is Queue Empty? ${isEmpty}`,
                variables: { isEmpty: String(isEmpty), size },
                lineNumber: 8,
            });
            break;
    }

    return { steps, meta: { operations, comparisons: 0 } };
}
