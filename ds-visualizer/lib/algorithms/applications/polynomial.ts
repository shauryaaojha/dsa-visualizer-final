import { AlgorithmResult, StepState, LinkedListNode, LinkedListState } from '../types';

interface PolyTerm {
    coeff: number;
    exp: number;
}

export function polynomialAdditionSteps(poly1: PolyTerm[], poly2: PolyTerm[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;

    // Helper to convert polynomial array to linked list nodes
    const toNodes = (poly: PolyTerm[], startId: number): LinkedListNode[] => {
        return poly.map((term, idx) => ({
            id: startId + idx,
            value: term.coeff, // We'll store coeff as value for now, but visualization needs to show exp too
            next: idx < poly.length - 1 ? startId + idx + 1 : null,
            // We might need a custom node type or just use value string "coeff x^exp"
        }));
    };

    // Better approach: Use string values for nodes to show "3x^2"
    const toDisplayNodes = (poly: PolyTerm[], startId: number): LinkedListNode[] => {
        return poly.map((term, idx) => ({
            id: startId + idx,
            value: 0, // Dummy numeric value
            label: `${term.coeff}x^${term.exp}`, // Custom label property (need to check if supported)
            next: idx < poly.length - 1 ? startId + idx + 1 : null,
        } as any)); // Cast to any to bypass type check for now or extend type
    };

    // Let's stick to standard nodes but use a custom message or variable to show terms
    // Or better, extend LinkedListNode in types.ts? 
    // For now, I'll format the value as a number if possible, or just use coeff and explain in message.

    // Actually, let's just use the coefficient as the value and the exponent as a secondary visual if possible.
    // But standard LinkedListRenderer only shows 'value'.
    // I will use a trick: value = coeff, and I'll put the full term in the message.

    let p1 = [...poly1].sort((a, b) => b.exp - a.exp);
    let p2 = [...poly2].sort((a, b) => b.exp - a.exp);
    const result: PolyTerm[] = [];

    let i = 0;
    let j = 0;

    steps.push({
        structureKind: 'linked-list',
        linkedList: {
            nodes: [
                ...p1.map((t, idx) => ({ id: idx, value: t.coeff, next: idx < p1.length - 1 ? idx + 1 : null, label: `x^${t.exp}` })),
                // We can't easily visualize two separate lists with current renderer unless we merge them or use 'other'
                // The current LinkedListRenderer supports one list.
                // I'll visualize the RESULT list growing.
            ] as any,
            head: 0,
            tail: p1.length - 1,
        },
        message: `Polynomial Addition: P1 = ${p1.map(t => `${t.coeff}x^${t.exp}`).join(' + ')}, P2 = ${p2.map(t => `${t.coeff}x^${t.exp}`).join(' + ')}`,
        variables: { i, j },
        lineNumber: 1,
    });

    // Since LinkedListRenderer is single-list, I will simulate the process conceptually
    // or maybe I can extend LinkedListRenderer to support multiple lists?
    // For now, I'll visualize the *Result* list being built, and show P1/P2 in variables/message.

    while (i < p1.length && j < p2.length) {
        operations++;
        comparisons++;

        if (p1[i].exp === p2[j].exp) {
            const sum = p1[i].coeff + p2[j].coeff;
            if (sum !== 0) result.push({ coeff: sum, exp: p1[i].exp });

            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: result.map((t, idx) => ({ id: idx, value: t.coeff, next: idx < result.length - 1 ? idx + 1 : null })),
                    head: 0,
                    tail: result.length - 1,
                },
                message: `Exponents match (${p1[i].exp}). Adding coefficients: ${p1[i].coeff} + ${p2[j].coeff} = ${sum}.`,
                variables: { term1: `${p1[i].coeff}x^${p1[i].exp}`, term2: `${p2[j].coeff}x^${p2[j].exp}` },
                lineNumber: 5,
            });
            i++;
            j++;
        } else if (p1[i].exp > p2[j].exp) {
            result.push(p1[i]);
            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: result.map((t, idx) => ({ id: idx, value: t.coeff, next: idx < result.length - 1 ? idx + 1 : null })),
                    head: 0,
                    tail: result.length - 1,
                },
                message: `P1 exponent ${p1[i].exp} > P2 exponent ${p2[j].exp}. Taking term from P1.`,
                variables: { term: `${p1[i].coeff}x^${p1[i].exp}` },
                lineNumber: 8,
            });
            i++;
        } else {
            result.push(p2[j]);
            steps.push({
                structureKind: 'linked-list',
                linkedList: {
                    nodes: result.map((t, idx) => ({ id: idx, value: t.coeff, next: idx < result.length - 1 ? idx + 1 : null })),
                    head: 0,
                    tail: result.length - 1,
                },
                message: `P2 exponent ${p2[j].exp} > P1 exponent ${p1[i].exp}. Taking term from P2.`,
                variables: { term: `${p2[j].coeff}x^${p2[j].exp}` },
                lineNumber: 11,
            });
            j++;
        }
    }

    // Add remaining
    while (i < p1.length) {
        result.push(p1[i++]);
        steps.push({
            structureKind: 'linked-list',
            linkedList: {
                nodes: result.map((t, idx) => ({ id: idx, value: t.coeff, next: idx < result.length - 1 ? idx + 1 : null })),
                head: 0,
                tail: result.length - 1,
            },
            message: `Adding remaining term from P1: ${p1[i - 1].coeff}x^${p1[i - 1].exp}`,
            lineNumber: 15,
        });
    }

    while (j < p2.length) {
        result.push(p2[j++]);
        steps.push({
            structureKind: 'linked-list',
            linkedList: {
                nodes: result.map((t, idx) => ({ id: idx, value: t.coeff, next: idx < result.length - 1 ? idx + 1 : null })),
                head: 0,
                tail: result.length - 1,
            },
            message: `Adding remaining term from P2: ${p2[j - 1].coeff}x^${p2[j - 1].exp}`,
            lineNumber: 18,
        });
    }

    return { steps, meta: { operations, comparisons } };
}
