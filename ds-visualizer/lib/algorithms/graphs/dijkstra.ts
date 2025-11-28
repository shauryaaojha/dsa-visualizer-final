import { AlgorithmResult, StepState, GraphState, GraphNode, GraphEdge } from '../types';

export function dijkstraSteps(nodes: GraphNode[], edges: GraphEdge[], startNode: number): AlgorithmResult {
    const steps: StepState[] = [];
    const n = nodes.length;
    const dist: number[] = Array(n).fill(Infinity);
    const visited = new Set<number>();
    const parent: (number | null)[] = Array(n).fill(null);

    dist[startNode] = 0;
    let operations = 0;

    steps.push({
        structureKind: 'graph',
        graph: { nodes, edges, weighted: true },
        message: `Starting Dijkstra's algorithm from node ${startNode}`,
        variables: { start: startNode },
        lineNumber: 1,
    });

    while (visited.size < n) {
        // Find minimum distance unvisited node
        let minDist = Infinity;
        let minNode = -1;

        for (let i = 0; i < n; i++) {
            if (!visited.has(i) && dist[i] < minDist) {
                minDist = dist[i];
                minNode = i;
            }
        }

        if (minNode === -1 || minDist === Infinity) break;

        visited.add(minNode);
        operations++;

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: [minNode],
                highlightType: 'visiting',
            },
            variables: { current: minNode, distance: dist[minNode] },
            message: `Visiting node ${minNode} with distance ${dist[minNode]}`,
            lineNumber: 2,
        });

        // Update distances to neighbors
        const adjacentEdges = edges.filter(e => e.from === minNode);

        for (const edge of adjacentEdges) {
            const neighbor = edge.to;
            const weight = edge.weight || 1;
            const newDist = dist[minNode] + weight;

            steps.push({
                structureKind: 'graph',
                graph: {
                    nodes,
                    edges,
                    highlightedNodes: [minNode, neighbor],
                    highlightedEdges: [{ from: minNode, to: neighbor }],
                    highlightType: 'compare',
                },
                variables: { current: minNode, neighbor, oldDist: dist[neighbor], newDist },
                message: `Checking edge ${minNode}→${neighbor} (weight ${weight})`,
                lineNumber: 3,
            });

            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                parent[neighbor] = minNode;

                steps.push({
                    structureKind: 'graph',
                    graph: {
                        nodes,
                        edges,
                        highlightedNodes: [neighbor],
                        highlightType: 'found',
                    },
                    variables: { neighbor, newDistance: newDist },
                    message: `Updated distance to node ${neighbor}: ${newDist}`,
                    lineNumber: 4,
                });
            }
        }
    }

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes,
            edges,
            highlightedNodes: Array.from(visited),
            highlightType: 'found',
        },
        message: `Dijkstra completed. Shortest paths found from node ${startNode}`,
        lineNumber: 5,
    });

    return { steps, meta: { comparisons: 0, operations } };
}
