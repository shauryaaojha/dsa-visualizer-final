import { AlgorithmResult, StepState, GraphNode, GraphEdge } from '../types';

export function vertexCoverSteps(nodes: GraphNode[], edges: GraphEdge[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    // Clone edges to modify
    let remainingEdges = JSON.parse(JSON.stringify(edges)) as GraphEdge[];
    const cover: number[] = [];
    const visitedEdges: GraphEdge[] = []; // To track removed edges visually

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes: nodes,
            edges: edges,
            highlightedNodes: [],
            highlightedEdges: [],
        },
        message: `Initial Graph. Goal: Find Vertex Cover using 2-Approximation Algorithm.`,
        lineNumber: 1,
    });

    while (remainingEdges.length > 0) {
        operations++;

        // Pick an arbitrary edge (u, v)
        const edge = remainingEdges[0];
        const u = edge.from;
        const v = edge.to;

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes: nodes,
                edges: edges,
                highlightedNodes: cover,
                highlightedEdges: [edge],
                highlightType: 'visiting',
            },
            message: `Picked arbitrary edge (${u}, ${v}).`,
            variables: { u, v },
            lineNumber: 3,
        });

        // Add u and v to cover
        if (!cover.includes(u)) cover.push(u);
        if (!cover.includes(v)) cover.push(v);

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes: nodes,
                edges: edges,
                highlightedNodes: cover,
                highlightedEdges: [edge],
                highlightType: 'selected',
            },
            message: `Added vertices ${u} and ${v} to Vertex Cover set C.`,
            variables: { C: `[${cover.join(', ')}]` },
            lineNumber: 5,
        });

        // Remove all edges incident to u or v
        const edgesToRemove = remainingEdges.filter(e =>
            e.from === u || e.to === u || e.from === v || e.to === v
        );

        remainingEdges = remainingEdges.filter(e =>
            !(e.from === u || e.to === u || e.from === v || e.to === v)
        );

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes: nodes,
                edges: edges,
                highlightedNodes: cover,
                highlightedEdges: edgesToRemove,
                highlightType: 'visited', // Mark as removed/covered
            },
            message: `Removed ${edgesToRemove.length} edges incident to ${u} or ${v}.`,
            variables: { removedCount: edgesToRemove.length },
            lineNumber: 8,
        });
    }

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes: nodes,
            edges: edges,
            highlightedNodes: cover,
            highlightedEdges: [],
            highlightType: 'sorted', // Final state
        },
        message: `Vertex Cover Found: {${cover.join(', ')}}. Size: ${cover.length}. (2-Approximation)`,
        variables: { size: cover.length },
        lineNumber: 10,
    });

    return { steps, meta: { operations, comparisons: 0 } };
}
