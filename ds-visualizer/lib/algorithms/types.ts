export type HighlightType =
  | 'compare'
  | 'swap'
  | 'pivot'
  | 'found'
  | 'low'
  | 'high'
  | 'mid'
  | 'current'
  | 'sorted'
  | 'visiting'
  | 'visited'
  | 'path'
  | 'selected'
  | 'candidate';

export type VisualStructureKind =
  | 'array'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'tree'
  | 'heap'
  | 'hash-table'
  | 'graph'
  | 'matrix'
  | 'dp-table'
  | 'string'
  | 'other';

// Linked List Node
export interface LinkedListNode {
  value: number;
  next: number | null; // index of next node
  id: number;
}

export interface LinkedListState {
  nodes: LinkedListNode[];
  head: number | null;
  tail: number | null;
  highlightedNodes?: number[];
  highlightType?: HighlightType;
}

// Doubly Linked List Node
export interface DoublyLinkedListNode {
  value: number;
  next: number | null;
  prev: number | null;
  id: number;
}

export interface DoublyLinkedListState {
  nodes: DoublyLinkedListNode[];
  head: number | null;
  tail: number | null;
  highlightedNodes?: number[];
  highlightType?: HighlightType;
}

// Stack State
export interface StackState {
  items: number[];
  top: number;
  highlightedIndex?: number;
  highlightType?: HighlightType;
}

// Queue State
export interface QueueState {
  items: number[];
  front: number;
  rear: number;
  size: number;
  capacity: number;
  highlightedIndices?: number[];
  highlightType?: HighlightType;
}

// Tree Node
export interface TreeNode {
  value: number;
  left: number | null;  // index of left child
  right: number | null; // index of right child
  parent: number | null;
  id: number;
  height?: number; // for AVL
  balanceFactor?: number; // for AVL
}

export interface TreeState {
  nodes: TreeNode[];
  root: number | null;
  highlightedNodes?: number[];
  highlightType?: HighlightType;
  treeType?: 'binary' | 'bst' | 'avl' | 'btree';
}

// Heap State
export interface HeapState {
  array: number[];
  highlightedIndices?: number[];
  highlightType?: HighlightType;
  heapType: 'min' | 'max';
}

// Hash Table State
export interface HashSlot {
  key: number;
  value: number;
  status: 'empty' | 'occupied' | 'deleted';
  chain?: Array<{ key: number; value: number }>; // for chaining
}

export interface HashTableState {
  slots: HashSlot[];
  size: number;
  collisionMethod: 'linear' | 'quadratic' | 'double' | 'chaining';
  highlightedSlots?: number[];
  highlightType?: HighlightType;
}

// Graph State
export interface GraphEdge {
  from: number;
  to: number;
  weight?: number;
  directed?: boolean;
}

export interface GraphNode {
  id: number;
  value: number;
  x?: number; // for visualization positioning
  y?: number;
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  highlightedNodes?: number[];
  highlightedEdges?: Array<{ from: number; to: number }>;
  highlightType?: HighlightType;
  directed?: boolean;
  weighted?: boolean;
}

// Matrix State
export interface MatrixState {
  data: number[][];
  rows: number;
  cols: number;
  highlightedCells?: Array<{ row: number; col: number }>;
  highlightType?: HighlightType;
}

// DP Table State
export interface DpTableState {
  table: (number | string)[][];
  rows: number;
  cols: number;
  highlightedCells?: Array<{ row: number; col: number; color?: string }>;
  highlightType?: HighlightType;
  rowLabels?: string[];
  colLabels?: string[];
}

// String State (for string matching algorithms)
export interface StringState {
  text: string;
  pattern: string;
  textHighlights?: number[];
  patternHighlights?: number[];
  highlightType?: HighlightType;
}

export interface StepState {
  array?: number[];
  highlights?: {
    indices: number[];
    type: HighlightType;
  };
  variables?: Record<string, number | string>;
  message: string;
  lineNumber?: number;

  // Structure-specific states
  structureKind?: VisualStructureKind;
  linkedList?: LinkedListState;
  doublyLinkedList?: DoublyLinkedListState;
  stack?: StackState;
  queue?: QueueState;
  tree?: TreeState;
  heap?: HeapState;
  hashTable?: HashTableState;
  graph?: GraphState;
  matrix?: MatrixState;
  dpTable?: DpTableState;
  stringState?: StringState;
}

export interface AlgorithmMeta {
  comparisons: number;
  swaps?: number;
  operations?: number;
  recursiveCalls?: number;
  nodesExpanded?: number;
  pathLength?: number;
  timeTaken?: number;
}

export interface AlgorithmResult {
  steps: StepState[];
  meta: AlgorithmMeta;
}

// Operation types for different data structures
export type LinkedListOperation = 'insert-begin' | 'insert-end' | 'insert-middle' | 'delete-begin' | 'delete-end' | 'delete-middle' | 'search' | 'traverse';
export type StackOperation = 'push' | 'pop' | 'peek' | 'is-empty';
export type QueueOperation = 'enqueue' | 'dequeue' | 'peek' | 'is-empty';
export type TreeOperation = 'insert' | 'delete' | 'search' | 'inorder' | 'preorder' | 'postorder' | 'levelorder';
export type GraphOperation = 'dfs' | 'bfs' | 'dijkstra' | 'prim' | 'kruskal' | 'topological-sort';
export type HashOperation = 'insert' | 'search' | 'delete';
