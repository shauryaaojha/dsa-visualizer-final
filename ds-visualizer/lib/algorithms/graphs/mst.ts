import { AlgorithmResult, StepState, GraphNode, GraphEdge } from '../types';

export function primSteps(nodes: GraphNode[], edges: GraphEdge[], startNodeId: number): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;

    const visited = new Set<number>();
    const mstEdges: GraphEdge[] = [];
    const distances: Record<number, number> = {};
    const parents: Record<number, number | null> = {};

    // Initialize distances
    nodes.forEach(node => {
        distances[node.id] = Infinity;
        parents[node.id] = null;
    });
    distances[startNodeId] = 0;

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes,
            edges,
            highlightedNodes: [startNodeId],
            highlightType: 'current',
            weighted: true,
        },
        message: `Initialize Prim's Algorithm starting from Node ${startNodeId}`,
        variables: { startNode: startNodeId },
        lineNumber: 1,
    });

    while (visited.size < nodes.length) {
        // Find node with min distance
        let u: number | null = null;
        let minDist = Infinity;

        for (const node of nodes) {
            if (!visited.has(node.id) && distances[node.id] < minDist) {
                minDist = distances[node.id];
                u = node.id;
            }
        }

        if (u === null) break; // Disconnected graph or done

        visited.add(u);
        operations++;

        if (parents[u] !== null) {
            // Add edge to MST
            const parent = parents[u]!;
            mstEdges.push({ from: parent, to: u, weight: minDist });
        }

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: Array.from(visited),
                highlightedEdges: mstEdges.map(e => ({ from: e.from, to: e.to })),
                highlightType: 'visited',
                weighted: true,
            },
            message: `Selected Node ${u} with min distance ${minDist}. Added to MST.`,
            variables: { u, minDist },
            lineNumber: 4,
        });

        // Update neighbors
        const neighbors = edges.filter(e => e.from === u || e.to === u);
        for (const edge of neighbors) {
            const v = edge.from === u ? edge.to : edge.from;
            if (!visited.has(v)) {
                const weight = edge.weight || 1;
                comparisons++;
                if (weight < distances[v]) {
                    distances[v] = weight;
                    parents[v] = u;

                    steps.push({
                        structureKind: 'graph',
                        graph: {
                            nodes,
                            edges,
                            highlightedNodes: [...Array.from(visited), v],
                            highlightedEdges: [...mstEdges.map(e => ({ from: e.from, to: e.to })), { from: u!, to: v }],
                            highlightType: 'candidate',
                            weighted: true,
                        },
                        message: `Updated distance for Node ${v} to ${weight} via Node ${u}`,
                        variables: { u, v, newDist: weight },
                        lineNumber: 8,
                    });
                }
            }
        }
    }

    return { steps, meta: { operations, comparisons } };
}

export function kruskalSteps(nodes: GraphNode[], edges: GraphEdge[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;

    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => (a.weight || 0) - (b.weight || 0));
    const mstEdges: GraphEdge[] = [];

    // Union-Find structure
    const parent: Record<number, number> = {};
    nodes.forEach(n => parent[n.id] = n.id);

    function find(i: number): number {
        if (parent[i] === i) return i;
        return find(parent[i]);
    }

    function union(i: number, j: number) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes,
            edges,
            highlightedEdges: [],
            weighted: true,
        },
        message: `Initialize Kruskal's Algorithm. Sorted ${edges.length} edges by weight.`,
        variables: { edgeCount: edges.length },
        lineNumber: 1,
    });

    for (const edge of sortedEdges) {
        operations++;
        const u = edge.from;
        const v = edge.to;
        const weight = edge.weight || 0;

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedEdges: [...mstEdges.map(e => ({ from: e.from, to: e.to })), { from: u, to: v }],
                highlightType: 'current',
                weighted: true,
            },
            message: `Considering edge (${u}, ${v}) with weight ${weight}`,
            variables: { u, v, weight },
            lineNumber: 3,
        });

        comparisons++;
        if (find(u) !== find(v)) {
            union(u, v);
            mstEdges.push(edge);

            steps.push({
                structureKind: 'graph',
                graph: {
                    nodes,
                    edges,
                    highlightedEdges: mstEdges.map(e => ({ from: e.from, to: e.to })),
                    highlightType: 'selected',
                    weighted: true,
                },
                message: `Edge (${u}, ${v}) does not form a cycle. Added to MST.`,
                variables: { u, v, added: 'true' },
                lineNumber: 5,
            });
        } else {
            steps.push({
                structureKind: 'graph',
                graph: {
                    nodes,
                    edges,
                    highlightedEdges: [...mstEdges.map(e => ({ from: e.from, to: e.to })), { from: u, to: v }],
                    highlightType: 'visited', // Red/Different color to show rejected? 'visited' usually implies processed.
                    weighted: true,
                },
                message: `Edge (${u}, ${v}) forms a cycle. Skipped.`,
                variables: { u, v, added: 'false' },
                lineNumber: 6,
            });
        }
    }

    return { steps, meta: { operations, comparisons } };
}
