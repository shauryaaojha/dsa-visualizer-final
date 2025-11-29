import { bubbleSortSteps } from './sorting/bubbleSort';
import { selectionSortSteps } from './sorting/selectionSort';
import { insertionSortSteps } from './sorting/insertionSort';
import { linearSearchSteps } from './searching/linearSearch';
import { binarySearchSteps } from './searching/binarySearch';
import { linkedListSteps } from './data-structures/linkedList';
import { bstSteps } from './data-structures/bst';
import { mergeSortSteps } from './divide-conquer/mergeSort';
import { quickSortSteps } from './divide-conquer/quickSort';
import { lcsSteps } from './dp/lcs';
import { knapsack01Steps } from './dp/knapsack01';
import { dfsSteps, bfsSteps } from './graphs/traversal';
import { dijkstraSteps } from './graphs/dijkstra';
import { nQueensSteps } from './backtracking/nQueens';
import { huffmanSteps } from './greedy/huffman';
import { stackSteps } from './data-structures/stack';
import { queueSteps } from './data-structures/queue';
import { circularQueueSteps } from './data-structures/circularQueue';
import { evaluatePostfixSteps, infixToPostfixSteps } from './data-structures/expressionEval';
import { queueUsingStacksSteps } from './data-structures/queueUsingStacks';
import { mcmSteps } from './dp/mcm';
import { avlSteps } from './data-structures/avl';
import { minHeapSteps, maxHeapSteps, heapSortSteps } from './data-structures/heap';
import { linearProbingSteps, quadraticProbingSteps, chainingSteps } from './data-structures/hashing';
import { polynomialAdditionSteps } from './applications/polynomial';
import { sparseMatrixSteps } from './applications/sparseMatrix';
import { masterTheoremSteps } from './daa/masterTheorem';
import { vertexCoverSteps } from './daa/approximation';
import { floydWarshallSteps, bellmanFordSteps, topologicalSortSteps } from './graphs/advanced';
import { doublyLinkedListSteps } from './data-structures/doublyLinkedList';
import { primSteps, kruskalSteps } from './graphs/mst';
import { AlgorithmResult } from './types';

export type AlgorithmCategory =
    | 'level1'
    | 'dsa-module1'
    | 'dsa-module2'
    | 'dsa-module3'
    | 'dsa-module4'
    | 'dsa-module5'
    | 'daa-unit1'
    | 'daa-unit2'
    | 'daa-unit3'
    | 'daa-unit4'
    | 'daa-unit5'
    | 'daa-greedy';

export interface AlgorithmConfig {
    id: string;
    name: string;
    category: AlgorithmCategory;
    categoryLabel: string;
    course: '21CSC201J' | '21CSC204J' | 'Both';
    fn: (...args: any[]) => AlgorithmResult;
    inputType: 'array' | 'array+target' | 'array+operation' | 'tree+operation' | 'strings' | 'items+capacity' | 'graph+node' | 'number' | 'frequencies' | 'expression' | 'dimensions' | 'polynomial' | 'matrix';
    operations?: string[];
    description: string;
}

export const ALGORITHM_REGISTRY: Record<string, AlgorithmConfig> = {
    // Level 1 - Core Algorithms
    'bubble-sort': {
        id: 'bubble-sort',
        name: 'Bubble Sort',
        category: 'level1',
        categoryLabel: 'Level 1 - Core',
        course: 'Both',
        fn: bubbleSortSteps,
        inputType: 'array',
        description: 'Simple comparison-based sorting',
    },
    'selection-sort': {
        id: 'selection-sort',
        name: 'Selection Sort',
        category: 'level1',
        categoryLabel: 'Level 1 - Core',
        course: 'Both',
        fn: selectionSortSteps,
        inputType: 'array',
        description: 'Select minimum and swap',
    },
    'insertion-sort': {
        id: 'insertion-sort',
        name: 'Insertion Sort',
        category: 'level1',
        categoryLabel: 'Level 1 - Core',
        course: 'Both',
        fn: insertionSortSteps,
        inputType: 'array',
        description: 'Insert elements in sorted position',
    },
    'linear-search': {
        id: 'linear-search',
        name: 'Linear Search',
        category: 'level1',
        categoryLabel: 'Level 1 - Core',
        course: 'Both',
        fn: linearSearchSteps,
        inputType: 'array+target',
        description: 'Sequential search',
    },
    'binary-search': {
        id: 'binary-search',
        name: 'Binary Search',
        category: 'level1',
        categoryLabel: 'Level 1 - Core',
        course: 'Both',
        fn: binarySearchSteps,
        inputType: 'array+target',
        description: 'Divide and conquer search',
    },

    // DSA Module 1: Arrays & Linked Lists
    'linked-list': {
        id: 'linked-list',
        name: 'Singly Linked List',
        category: 'dsa-module1',
        categoryLabel: 'Module 1 - Linked Lists',
        course: '21CSC201J',
        fn: linkedListSteps,
        inputType: 'array+operation',
        operations: ['insert-begin', 'insert-end', 'insert-middle', 'delete-begin', 'delete-end', 'search', 'traverse'],
        description: 'Linked list operations',
    },
    'doubly-linked-list': {
        id: 'doubly-linked-list',
        name: 'Doubly Linked List',
        category: 'dsa-module1',
        categoryLabel: 'Module 1 - Linked Lists',
        course: '21CSC201J',
        fn: doublyLinkedListSteps,
        inputType: 'array+operation',
        operations: ['insert-begin', 'insert-end', 'delete-begin', 'traverse-forward', 'traverse-backward'],
        description: 'Doubly linked list operations',
    },

    // DSA Module 2: Stacks & Queues
    'stack': {
        id: 'stack',
        name: 'Stack Operations',
        category: 'dsa-module2',
        categoryLabel: 'Module 2 - Stacks & Queues',
        course: '21CSC201J',
        fn: stackSteps,
        inputType: 'array+operation',
        operations: ['push', 'pop', 'peek', 'is-empty'],
        description: 'LIFO data structure operations',
    },
    'queue': {
        id: 'queue',
        name: 'Queue Operations',
        category: 'dsa-module2',
        categoryLabel: 'Module 2 - Stacks & Queues',
        course: '21CSC201J',
        fn: queueSteps,
        inputType: 'array+operation',
        operations: ['enqueue', 'dequeue', 'peek', 'is-empty'],
        description: 'FIFO data structure operations',
    },
    'circular-queue': {
        id: 'circular-queue',
        name: 'Circular Queue',
        category: 'dsa-module2',
        categoryLabel: 'Module 2 - Stacks & Queues',
        course: '21CSC201J',
        fn: circularQueueSteps,
        inputType: 'array+operation',
        operations: ['enqueue', 'dequeue', 'is-full', 'is-empty'],
        description: 'Fixed size queue with wrap-around',
    },
    'postfix-eval': {
        id: 'postfix-eval',
        name: 'Postfix Evaluation',
        category: 'dsa-module2',
        categoryLabel: 'Module 2 - Stacks & Queues',
        course: '21CSC201J',
        fn: evaluatePostfixSteps,
        inputType: 'expression',
        description: 'Evaluate postfix expression using stack',
    },
    'infix-to-postfix': {
        id: 'infix-to-postfix',
        name: 'Infix to Postfix',
        category: 'dsa-module2',
        categoryLabel: 'Module 2 - Stacks & Queues',
        course: '21CSC201J',
        fn: infixToPostfixSteps,
        inputType: 'expression',
        description: 'Convert infix expression to postfix',
    },
    'queue-using-stacks': {
        id: 'queue-using-stacks',
        name: 'Queue using Stacks',
        category: 'dsa-module2',
        categoryLabel: 'Module 2 - Stacks & Queues',
        course: '21CSC201J',
        fn: queueUsingStacksSteps,
        inputType: 'array+operation',
        operations: ['enqueue', 'dequeue', 'peek'],
        description: 'Implement queue behavior using two stacks',
    },

    // DSA Module 3: Trees
    'bst': {
        id: 'bst',
        name: 'Binary Search Tree',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees',
        course: '21CSC201J',
        fn: bstSteps,
        inputType: 'tree+operation',
        operations: ['insert', 'search', 'inorder', 'preorder', 'postorder'],
        description: 'BST operations and traversals',
    },
    'avl': {
        id: 'avl',
        name: 'AVL Tree',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees',
        course: '21CSC201J',
        fn: avlSteps,
        inputType: 'array',
        description: 'Self-balancing BST with rotations',
    },
    'min-heap': {
        id: 'min-heap',
        name: 'Min Heap',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees',
        course: '21CSC201J',
        fn: minHeapSteps,
        inputType: 'array',
        description: 'Binary Heap where parent <= children',
    },
    'max-heap': {
        id: 'max-heap',
        name: 'Max Heap',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees',
        course: '21CSC201J',
        fn: maxHeapSteps,
        inputType: 'array',
        description: 'Binary Heap where parent >= children',
    },
    'heap-sort': {
        id: 'heap-sort',
        name: 'Heap Sort',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees',
        course: '21CSC201J',
        fn: heapSortSteps,
        inputType: 'array',
        description: 'Sorting using Max Heap',
    },
    'linear-probing': {
        id: 'linear-probing',
        name: 'Hashing (Linear Probing)',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees & Hashing',
        course: '21CSC201J',
        fn: linearProbingSteps,
        inputType: 'array',
        description: 'Hash Table with Linear Probing',
    },
    'quadratic-probing': {
        id: 'quadratic-probing',
        name: 'Hashing (Quadratic Probing)',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees & Hashing',
        course: '21CSC201J',
        fn: quadraticProbingSteps,
        inputType: 'array',
        description: 'Hash Table with Quadratic Probing',
    },
    'chaining': {
        id: 'chaining',
        name: 'Hashing (Chaining)',
        category: 'dsa-module3',
        categoryLabel: 'Module 3 - Trees & Hashing',
        course: '21CSC201J',
        fn: chainingSteps,
        inputType: 'array',
        description: 'Hash Table with Separate Chaining',
    },

    // DSA Module 5: Applications
    'polynomial-addition': {
        id: 'polynomial-addition',
        name: 'Polynomial Addition',
        category: 'dsa-module5',
        categoryLabel: 'Module 5 - Applications',
        course: '21CSC201J',
        fn: (poly1, poly2) => polynomialAdditionSteps(poly1, poly2),
        inputType: 'polynomial', // Need to add this input type
        description: 'Adding two polynomials using Linked List',
    },
    'sparse-matrix': {
        id: 'sparse-matrix',
        name: 'Sparse Matrix Representation',
        category: 'dsa-module5',
        categoryLabel: 'Module 5 - Applications',
        course: '21CSC201J',
        fn: sparseMatrixSteps,
        inputType: 'matrix',
        description: 'Converting Matrix to Triplet Representation',
    },

    // DAA Unit 1: Algorithm Design
    'master-theorem': {
        id: 'master-theorem',
        name: 'Master Theorem Solver',
        category: 'daa-unit1', // Need to add this category
        categoryLabel: 'Unit 1 - Algorithm Design',
        course: '21CSC204J',
        fn: masterTheoremSteps,
        inputType: 'array', // Using array [a, b, k]
        description: 'Solve Recurrences T(n) = aT(n/b) + O(n^k)',
    },

    // DAA Unit 2: Divide and Conquer
    'merge-sort': {
        id: 'merge-sort',
        name: 'Merge Sort',
        category: 'daa-unit2',
        categoryLabel: 'Unit 2 - Divide & Conquer',
        course: '21CSC204J',
        fn: mergeSortSteps,
        inputType: 'array',
        description: 'Recursive divide and conquer sorting',
    },

    // DAA Unit 3: Dynamic Programming
    'lcs': {
        id: 'lcs',
        name: 'Longest Common Subsequence',
        category: 'daa-unit3',
        categoryLabel: 'Unit 3 - Dynamic Programming',
        course: '21CSC204J',
        fn: lcsSteps,
        inputType: 'strings',
        description: 'DP solution for LCS problem',
    },
    'knapsack-01': {
        id: 'knapsack-01',
        name: '0/1 Knapsack',
        category: 'daa-unit2',
        categoryLabel: 'Unit 2 - Divide & Conquer',
        course: '21CSC204J',
        fn: knapsack01Steps,
        inputType: 'items+capacity',
        description: 'DP solution for 0/1 Knapsack',
    },

    // Graphs (DSA Module 4)
    'dfs': {
        id: 'dfs',
        name: 'Depth First Search (DFS)',
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges, start) => dfsSteps(nodes, edges, start),
        inputType: 'graph+node',
        description: 'DFS graph traversal',
    },
    'bfs': {
        id: 'bfs',
        name: 'Breadth First Search (BFS)',
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges, start) => bfsSteps(nodes, edges, start),
        inputType: 'graph+node',
        description: 'BFS graph traversal',
    },
    'dijkstra': {
        id: 'dijkstra',
        name: "Dijkstra's Shortest Path",
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges, start) => dijkstraSteps(nodes, edges, start),
        inputType: 'graph+node',
        description: 'Shortest path algorithm',
    },
    'prims': {
        id: 'prims',
        name: "Prim's Algorithm",
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges, start) => primSteps(nodes, edges, start),
        inputType: 'graph+node',
        description: 'Minimum Spanning Tree (Greedy)',
    },
    'kruskals': {
        id: 'kruskals',
        name: "Kruskal's Algorithm",
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges) => kruskalSteps(nodes, edges),
        inputType: 'graph+node',
        description: 'Minimum Spanning Tree (Greedy)',
    },
    'floyd-warshall': {
        id: 'floyd-warshall',
        name: "Floyd-Warshall Algorithm",
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges) => floydWarshallSteps(nodes, edges),
        inputType: 'graph+node',
        description: 'All-pairs shortest path (Dynamic Programming)',
    },
    'bellman-ford': {
        id: 'bellman-ford',
        name: "Bellman-Ford Algorithm",
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges, start) => bellmanFordSteps(nodes, edges, start),
        inputType: 'graph+node',
        description: 'Single-source shortest path (handles negative weights)',
    },
    'topological-sort': {
        id: 'topological-sort',
        name: 'Topological Sort',
        category: 'dsa-module4',
        categoryLabel: 'Module 4 - Graphs',
        course: '21CSC201J',
        fn: (nodes, edges) => topologicalSortSteps(nodes, edges),
        inputType: 'graph+node',
        description: 'Linear ordering of vertices in DAG',
    },

    // Backtracking (DAA Unit 4)
    'n-queens': {
        id: 'n-queens',
        name: 'N-Queens Problem',
        category: 'daa-unit4',
        categoryLabel: 'Unit 4 - Backtracking',
        course: '21CSC204J',
        fn: nQueensSteps,
        inputType: 'number',
        description: 'Place N queens on N×N board (backtracking)',
    },

    // DAA Unit 5: Approximation Algorithms
    'vertex-cover': {
        id: 'vertex-cover',
        name: 'Vertex Cover (Approximation)',
        category: 'daa-unit5',
        categoryLabel: 'Unit 5 - Approximation',
        course: '21CSC204J',
        fn: (nodes, edges) => vertexCoverSteps(nodes, edges),
        inputType: 'graph+node',
        description: '2-Approximation for Vertex Cover problem',
    },

    // Greedy
    'huffman': {
        id: 'huffman',
        name: 'Huffman Encoding',
        category: 'daa-greedy',
        categoryLabel: 'Greedy Algorithms',
        course: '21CSC204J',
        fn: huffmanSteps,
        inputType: 'frequencies',
        description: 'Greedy algorithm for optimal prefix codes',
    },
};

export function getAlgorithm(id: string): AlgorithmConfig | undefined {
    return ALGORITHM_REGISTRY[id];
}

export function getAlgorithmsByCategory(category: AlgorithmCategory): AlgorithmConfig[] {
    return Object.values(ALGORITHM_REGISTRY).filter(algo => algo.category === category);
}

export function getAllCategories(): { category: AlgorithmCategory; label: string; course: string }[] {
    return [
        { category: 'level1', label: 'Level 1 - Core Algorithms', course: 'Both' },
        { category: 'dsa-module1', label: 'Module 1 - Arrays & Linked Lists', course: '21CSC201J' },
        { category: 'dsa-module2', label: 'Module 2 - Stacks & Queues', course: '21CSC201J' },
        { category: 'dsa-module3', label: 'Module 3 - Trees, Heaps & Hashing', course: '21CSC201J' },
        { category: 'dsa-module4', label: 'Module 4 - Graphs', course: '21CSC201J' },
        { category: 'dsa-module5', label: 'Module 5 - Applications', course: '21CSC201J' },
        { category: 'daa-unit1', label: 'Unit 1 - Algorithm Design', course: '21CSC204J' },
        { category: 'daa-unit2', label: 'Unit 2 - Divide & Conquer', course: '21CSC204J' },
        { category: 'daa-unit3', label: 'Unit 3 - Dynamic Programming', course: '21CSC204J' },
        { category: 'daa-unit4', label: 'Unit 4 - Backtracking', course: '21CSC204J' },
        { category: 'daa-unit5', label: 'Unit 5 - Approximation Algorithms', course: '21CSC204J' },
        { category: 'daa-greedy', label: 'Greedy Algorithms', course: '21CSC204J' },
    ];
}
