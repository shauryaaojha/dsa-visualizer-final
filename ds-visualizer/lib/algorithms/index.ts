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
import { AlgorithmResult } from './types';

export type AlgorithmCategory =
    | 'level1'
    | 'dsa-module1'
    | 'dsa-module2'
    | 'dsa-module3'
    | 'dsa-module4'
    | 'daa-unit2'
    | 'daa-unit3'
    | 'daa-unit4'
    | 'daa-greedy';

export interface AlgorithmConfig {
    id: string;
    name: string;
    category: AlgorithmCategory;
    categoryLabel: string;
    course: '21CSC201J' | '21CSC204J' | 'Both';
    fn: (...args: any[]) => AlgorithmResult;
    inputType: 'array' | 'array+target' | 'array+operation' | 'tree+operation' | 'strings' | 'items+capacity' | 'graph+node' | 'number' | 'frequencies';
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
        category: 'daa-unit3',
        categoryLabel: 'Unit 3 - Dynamic Programming',
        course: '21CSC204J',
        fn: knapsack01Steps,
        inputType: 'items+capacity',
        description: 'DP solution for 0/1 knapsack',
    },

    // More Divide & Conquer
    'quick-sort': {
        id: 'quick-sort',
        name: 'Quick Sort',
        category: 'daa-unit2',
        categoryLabel: 'Unit 2 - Divide & Conquer',
        course: '21CSC204J',
        fn: quickSortSteps,
        inputType: 'array',
        description: 'Partition-based divide and conquer sorting',
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
        { category: 'daa-unit2', label: 'Unit 2 - Divide & Conquer', course: '21CSC204J' },
        { category: 'daa-unit3', label: 'Unit 3 - Dynamic Programming', course: '21CSC204J' },
        { category: 'daa-unit4', label: 'Unit 4 - Backtracking', course: '21CSC204J' },
        { category: 'daa-greedy', label: 'Greedy Algorithms', course: '21CSC204J' },
    ];
}
