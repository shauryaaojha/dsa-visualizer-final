import { AlgorithmResult, StepState, GraphState, GraphNode, GraphEdge } from '../types';

export function dfsSteps(nodes: GraphNode[], edges: GraphEdge[], startNode: number): AlgorithmResult {
    const steps: StepState[] = [];
    const visited = new Set<number>();
    const stack: number[] = [];
    let operations = 0;

    steps.push({
        structureKind: 'graph',
        graph: { nodes, edges, directed: false },
        message: `Starting DFS from node ${startNode}`,
        lineNumber: 1,
    });

    function dfs(nodeId: number) {
        visited.add(nodeId);
        operations++;

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: [nodeId],
                highlightType: 'visiting',
            },
            variables: { current: nodeId, visited: visited.size },
            message: `Visiting node ${nodeId}`,
            lineNumber: 2,
        });

        // Get adjacent nodes
        const adjacentEdges = edges.filter(e => e.from === nodeId || (!e.directed && e.to === nodeId));
        const adjacent = adjacentEdges.map(e => e.from === nodeId ? e.to : e.from);

        for (const neighbor of adjacent) {
            if (!visited.has(neighbor)) {
                steps.push({
                    structureKind: 'graph',
                    graph: {
                        nodes,
                        edges,
                        highlightedNodes: [nodeId, neighbor],
                        highlightedEdges: [{ from: nodeId, to: neighbor }],
                        highlightType: 'current',
                    },
                    variables: { current: nodeId, neighbor, visited: visited.size },
                    message: `Exploring edge from ${nodeId} to ${neighbor}`,
                    lineNumber: 3,
                });

                dfs(neighbor);
            }
        }

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: Array.from(visited),
                highlightType: 'visited',
            },
            message: `Backtracking from node ${nodeId}`,
            lineNumber: 4,
        });
    }

    dfs(startNode);

    steps.push({
        structureKind: 'graph',
        graph: {
            nodes,
            edges,
            highlightedNodes: Array.from(visited),
            highlightType: 'found',
        },
        message: `DFS completed. Visited ${visited.size} nodes`,
        lineNumber: 5,
    });

    return { steps, meta: { comparisons: 0, operations } };
}

export function bfsSteps(nodes: GraphNode[], edges: GraphEdge[], startNode: number): AlgorithmResult {
    const steps: StepState[] = [];
    const visited = new Set<number>();
    const queue: number[] = [startNode];
    visited.add(startNode);
    let operations = 0;

    steps.push({
        structureKind: 'graph',
        graph: { nodes, edges },
        message: `Starting BFS from node ${startNode}`,
        variables: { queueSize: queue.length },
        lineNumber: 1,
    });

    while (queue.length > 0) {
        const current = queue.shift()!;
        operations++;

        steps.push({
            structureKind: 'graph',
            graph: {
                nodes,
                edges,
                highlightedNodes: [current],
                highlightType: 'visiting',
            },
            variables: { current, queueSize: queue.length, visited: visited.size },
            message: `Visiting node ${current}`,
            lineNumber: 2,
        });

        // Get adjacent nodes
        const adjacentEdges = edges.filter(e => e.from === current || (!e.directed && e.to === current));
        const adjacent = adjacentEdges.map(e => e.from === current ? e.to : e.from);

        for (const neighbor of adjacent) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);

                steps.push({
                    structureKind: 'graph',
                    graph: {
                        nodes,
                        edges,
                        highlightedNodes: [current, neighbor],
                        highlightedEdges: [{ from: current, to: neighbor }],
                        highlightType: 'current',
                    },
                    variables: { current, neighbor, queueSize: queue.length },
                    message: `Found unvisited neighbor ${neighbor}, adding to queue`,
                    lineNumber: 3,
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
        message: `BFS completed. Visited ${visited.size} nodes`,
        lineNumber: 4,
    });

    return { steps, meta: { comparisons: 0, operations } };
}
