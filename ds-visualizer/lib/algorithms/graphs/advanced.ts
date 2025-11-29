import { AlgorithmResult, StepState, GraphNode, GraphEdge } from '../types';

export function floydWarshallSteps(nodes: GraphNode[], edges: GraphEdge[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const n = nodes.length;
    const INF = 999999;

    // Initialize distance matrix
    const dist: number[][] = Array(n).fill(0).map(() => Array(n).fill(INF));

    // Distance to self is 0
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }

    // Set initial edge weights
    for (const edge of edges) {
        dist[edge.from][edge.to] = edge.weight || 1;
        if (!edge.directed) {
            dist[edge.to][edge.from] = edge.weight || 1;
        }
    }

    steps.push({
        structureKind: 'dp-table',
        dpTable: {
            table: JSON.parse(JSON.stringify(dist)),
            rows: n,
            cols: n,
            rowLabels: nodes.map(node => `${node.id}`),
            colLabels: nodes.map(node => `${node.id}`),
        },
        message: `Initialized Distance Matrix. INF = ${INF}`,
        lineNumber: 1,
    });

    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                operations++;
                comparisons++;

                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];

                    steps.push({
                        structureKind: 'dp-table',
                        dpTable: {
                            table: JSON.parse(JSON.stringify(dist)),
                            rows: n,
                            cols: n,
                            rowLabels: nodes.map(node => `${node.id}`),
                            colLabels: nodes.map(node => `${node.id}`),
                            highlightedCells: [{ row: i, col: j, color: '#4ade80' }],
                        },
                        message: `Updated dist[${i}][${j}] = ${dist[i][j]} via vertex ${k}`,
                        variables: { k, i, j, newDist: dist[i][j] },
                        lineNumber: 5,
                    });
                }
            }
        }

        steps.push({
            structureKind: 'dp-table',
            dpTable: {
                table: JSON.parse(JSON.stringify(dist)),
                rows: n,
                cols: n,
                rowLabels: nodes.map(node => `${node.id}`),
                colLabels: nodes.map(node => `${node.id}`),
            },
            message: `Completed iteration k=${k}. All paths via vertex ${k} considered.`,
            variables: { k },
            lineNumber: 8,
        });
    }

    return { steps, meta: { operations, comparisons } };
}

export function bellmanFordSteps(nodes: GraphNode[], edges: GraphEdge[], start: number): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    let comparisons = 0;
    const n = nodes.length;
    const INF = 999999;
    const dist: number[] = Array(n).fill(INF);
    dist[start] = 0;

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes,
            edges,
            highlightedNodes: [start],
            highlightType: 'found',
        },
        message: `Bellman-Ford from vertex ${start}. Initial distances: [${dist.join(', ')}]`,
        variables: { start },
        lineNumber: 1,
    });

    // Relax edges n-1 times
    for (let i = 0; i < n - 1; i++) {
        for (const edge of edges) {
            operations++;
            comparisons++;
            const u = edge.from;
            const v = edge.to;
            const w = edge.weight || 1;

            if (dist[u] !== INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;

                steps.push({
                    structureKind: 'graph',
                    graph: {
                        nodes,
                        edges,
                        highlightedNodes: [u, v],
                        highlightedEdges: [edge],
                        highlightType: 'selected',
                    },
                    message: `Relaxed edge (${u}, ${v}). dist[${v}] = ${dist[v]}`,
                    variables: { u, v, dist: `[${dist.join(', ')}]` },
                    lineNumber: 5,
                });
            }
        }
    }

    // Check for negative cycles
    let hasNegCycle = false;
    for (const edge of edges) {
        const u = edge.from;
        const v = edge.to;
        const w = edge.weight || 1;

        if (dist[u] !== INF && dist[u] + w < dist[v]) {
            hasNegCycle = true;
            steps.push({
                structureKind: 'graph',
                graph: {
                    nodes,
                    edges,
                    highlightedEdges: [edge],
                    highlightType: 'compare',
                },
                message: `Negative cycle detected! Edge (${u}, ${v}) can still be relaxed.`,
                variables: { cycle: 'true' },
                lineNumber: 10,
            });
            break;
        }
    }

    if (!hasNegCycle) {
        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: [start],
                highlightType: 'sorted',
            },
            message: `Final shortest distances from ${start}: [${dist.join(', ')}]`,
            variables: { dist: `[${dist.join(', ')}]` },
            lineNumber: 12,
        });
    }

    return { steps, meta: { operations, comparisons } };
}

export function topologicalSortSteps(nodes: GraphNode[], edges: GraphEdge[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;
    const n = nodes.length;
    const inDegree: number[] = Array(n).fill(0);
    const result: number[] = [];

    // Calculate in-degrees
    for (const edge of edges) {
        inDegree[edge.to]++;
    }

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes,
            edges,
            highlightedNodes: [],
        },
        message: `In-degrees: [${inDegree.join(', ')}]`,
        variables: { inDegree: `[${inDegree.join(', ')}]` },
        lineNumber: 1,
    });

    // Queue for nodes with in-degree 0
    const queue: number[] = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        operations++;
        const u = queue.shift()!;
        result.push(u);

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: [u],
                highlightType: 'found',
            },
            message: `Processed vertex ${u}. Topological Order so far: [${result.join(', ')}]`,
            variables: { u, order: `[${result.join(', ')}]` },
            lineNumber: 5,
        });

        // Reduce in-degree for neighbors
        for (const edge of edges) {
            if (edge.from === u) {
                inDegree[edge.to]--;
                if (inDegree[edge.to] === 0) {
                    queue.push(edge.to);
                }
            }
        }
    }

    if (result.length !== n) {
        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: [],
            },
            message: `Cycle detected! Topological sort not possible.`,
            lineNumber: 10,
        });
    } else {
        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: result,
                highlightType: 'sorted',
            },
            message: `Topological Sort: [${result.join(', ')}]`,
            variables: { order: `[${result.join(', ')}]` },
            lineNumber: 12,
        });
    }

    return { steps, meta: { operations, comparisons: 0 } };
}
