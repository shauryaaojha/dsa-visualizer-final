import { AlgorithmResult, StepState, HashSlot } from '../types';

const TABLE_SIZE = 11;

function createEmptyTable(size: number): HashSlot[] {
    return Array(size).fill(null).map((_, idx) => ({
        key: -1,
        value: -1,
        status: 'empty',
        chain: []
    }));
}

export function linearProbingSteps(values: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const slots = createEmptyTable(TABLE_SIZE);

    steps.push({
        structureKind: 'hash-table',
        hashTable: {
            slots: JSON.parse(JSON.stringify(slots)),
            size: TABLE_SIZE,
            collisionMethod: 'linear',
            highlightedSlots: [],
        },
        message: `Initialized Hash Table of size ${TABLE_SIZE}`,
        lineNumber: 1,
    });

    for (const val of values) {
        operations++;
        let h = val % TABLE_SIZE;
        let i = 0;
        let inserted = false;

        steps.push({
            structureKind: 'hash-table',
            hashTable: {
                slots: JSON.parse(JSON.stringify(slots)),
                size: TABLE_SIZE,
                collisionMethod: 'linear',
                highlightedSlots: [h],
                highlightType: 'visiting',
            },
            message: `Inserting ${val}. Hash: ${val} % ${TABLE_SIZE} = ${h}`,
            variables: { val, hash: h },
            lineNumber: 2,
        });

        while (i < TABLE_SIZE) {
            const idx = (h + i) % TABLE_SIZE;
            comparisons++;

            if (slots[idx].status === 'empty' || slots[idx].status === 'deleted') {
                slots[idx] = { key: val, value: val, status: 'occupied', chain: [] };
                inserted = true;

                steps.push({
                    structureKind: 'hash-table',
                    hashTable: {
                        slots: JSON.parse(JSON.stringify(slots)),
                        size: TABLE_SIZE,
                        collisionMethod: 'linear',
                        highlightedSlots: [idx],
                        highlightType: 'found',
                    },
                    message: `Inserted ${val} at index ${idx}`,
                    variables: { val, index: idx },
                    lineNumber: 5,
                });
                break;
            } else {
                steps.push({
                    structureKind: 'hash-table',
                    hashTable: {
                        slots: JSON.parse(JSON.stringify(slots)),
                        size: TABLE_SIZE,
                        collisionMethod: 'linear',
                        highlightedSlots: [idx],
                        highlightType: 'compare',
                    },
                    message: `Collision at index ${idx}. Probing next...`,
                    variables: { val, index: idx },
                    lineNumber: 6,
                });
            }
            i++;
        }

        if (!inserted) {
            steps.push({
                structureKind: 'hash-table',
                hashTable: {
                    slots: JSON.parse(JSON.stringify(slots)),
                    size: TABLE_SIZE,
                    collisionMethod: 'linear',
                    highlightedSlots: [],
                },
                message: `Table full. Could not insert ${val}`,
                variables: { val },
                lineNumber: 10,
            });
        }
    }

    return { steps, meta: { operations, comparisons } };
}

export function quadraticProbingSteps(values: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const slots = createEmptyTable(TABLE_SIZE);

    steps.push({
        structureKind: 'hash-table',
        hashTable: {
            slots: JSON.parse(JSON.stringify(slots)),
            size: TABLE_SIZE,
            collisionMethod: 'quadratic',
            highlightedSlots: [],
        },
        message: `Initialized Hash Table of size ${TABLE_SIZE}`,
        lineNumber: 1,
    });

    for (const val of values) {
        operations++;
        let h = val % TABLE_SIZE;
        let i = 0;
        let inserted = false;

        steps.push({
            structureKind: 'hash-table',
            hashTable: {
                slots: JSON.parse(JSON.stringify(slots)),
                size: TABLE_SIZE,
                collisionMethod: 'quadratic',
                highlightedSlots: [h],
                highlightType: 'visiting',
            },
            message: `Inserting ${val}. Hash: ${val} % ${TABLE_SIZE} = ${h}`,
            variables: { val, hash: h },
            lineNumber: 2,
        });

        while (i < TABLE_SIZE) {
            const idx = (h + i * i) % TABLE_SIZE;
            comparisons++;

            if (slots[idx].status === 'empty' || slots[idx].status === 'deleted') {
                slots[idx] = { key: val, value: val, status: 'occupied', chain: [] };
                inserted = true;

                steps.push({
                    structureKind: 'hash-table',
                    hashTable: {
                        slots: JSON.parse(JSON.stringify(slots)),
                        size: TABLE_SIZE,
                        collisionMethod: 'quadratic',
                        highlightedSlots: [idx],
                        highlightType: 'found',
                    },
                    message: `Inserted ${val} at index ${idx} (Probe ${i}^2)`,
                    variables: { val, index: idx, probe: i },
                    lineNumber: 5,
                });
                break;
            } else {
                steps.push({
                    structureKind: 'hash-table',
                    hashTable: {
                        slots: JSON.parse(JSON.stringify(slots)),
                        size: TABLE_SIZE,
                        collisionMethod: 'quadratic',
                        highlightedSlots: [idx],
                        highlightType: 'compare',
                    },
                    message: `Collision at index ${idx}. Probing next (i=${i + 1}, offset=${(i + 1) * (i + 1)})...`,
                    variables: { val, index: idx },
                    lineNumber: 6,
                });
            }
            i++;
        }

        if (!inserted) {
            steps.push({
                structureKind: 'hash-table',
                hashTable: {
                    slots: JSON.parse(JSON.stringify(slots)),
                    size: TABLE_SIZE,
                    collisionMethod: 'quadratic',
                    highlightedSlots: [],
                },
                message: `Could not insert ${val} after ${TABLE_SIZE} probes`,
                variables: { val },
                lineNumber: 10,
            });
        }
    }

    return { steps, meta: { operations, comparisons } };
}

export function chainingSteps(values: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const slots = createEmptyTable(TABLE_SIZE);

    steps.push({
        structureKind: 'hash-table',
        hashTable: {
            slots: JSON.parse(JSON.stringify(slots)),
            size: TABLE_SIZE,
            collisionMethod: 'chaining',
            highlightedSlots: [],
        },
        message: `Initialized Hash Table of size ${TABLE_SIZE}`,
        lineNumber: 1,
    });

    for (const val of values) {
        operations++;
        const h = val % TABLE_SIZE;

        steps.push({
            structureKind: 'hash-table',
            hashTable: {
                slots: JSON.parse(JSON.stringify(slots)),
                size: TABLE_SIZE,
                collisionMethod: 'chaining',
                highlightedSlots: [h],
                highlightType: 'visiting',
            },
            message: `Inserting ${val}. Hash: ${val} % ${TABLE_SIZE} = ${h}`,
            variables: { val, hash: h },
            lineNumber: 2,
        });

        // Insert into chain
        if (!slots[h].chain) slots[h].chain = [];
        slots[h].chain!.push({ key: val, value: val });
        slots[h].status = 'occupied'; // Mark as occupied if it has a chain

        steps.push({
            structureKind: 'hash-table',
            hashTable: {
                slots: JSON.parse(JSON.stringify(slots)),
                size: TABLE_SIZE,
                collisionMethod: 'chaining',
                highlightedSlots: [h],
                highlightType: 'found',
            },
            message: `Inserted ${val} into chain at index ${h}`,
            variables: { val, index: h },
            lineNumber: 5,
        });
    }

    return { steps, meta: { operations, comparisons } };
}
