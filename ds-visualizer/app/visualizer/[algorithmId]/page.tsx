'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getAlgorithm } from '@/lib/algorithms';
import { AlgorithmResult, StepState } from '@/lib/algorithms/types';
import { VisualizerCanvas } from '@/components/visualizer/VisualizerCanvas';
import { PlaybackControls } from '@/components/visualizer/PlaybackControls';
import { CodePanel } from '@/components/visualizer/CodePanel';
import { ExplanationPanel } from '@/components/visualizer/ExplanationPanel';
import { StateInspector } from '@/components/visualizer/StateInspector';
import { InputPanel } from '@/components/visualizer/InputPanel';

export default function AlgorithmPage() {
  const params = useParams();
  const algorithmId = params.algorithmId as string;

  const algorithm = getAlgorithm(algorithmId);

  const [result, setResult] = useState<AlgorithmResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when algorithm changes
  useEffect(() => {
    setResult(null);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithmId]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && result && currentStep < result.steps.length - 1) {
      const delay = 1000 / speed;
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, delay);
    } else if (currentStep >= (result?.steps.length || 0) - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, result, speed]);

  const handleRun = (params: any) => {
    if (!algorithm) return;

    try {
      let res: AlgorithmResult;

      switch (algorithm.inputType) {
        case 'array':
          res = algorithm.fn(params.array);
          break;
        case 'array+target':
          res = algorithm.fn(params.array, params.target);
          break;
        case 'array+operation':
          res = algorithm.fn(params.array, params.operation, params.value);
          break;
        case 'tree+operation':
          res = algorithm.fn(params.array, params.operation, params.value);
          break;
        case 'strings':
          res = algorithm.fn(params.text1, params.text2);
          break;
        case 'items+capacity':
          res = algorithm.fn(params.items, params.capacity);
          break;
        case 'graph+node':
          res = algorithm.fn(params.nodes, params.edges, params.start);
          break;
        case 'number':
          res = algorithm.fn(params.n);
          break;
        case 'frequencies':
          res = algorithm.fn(params.frequencies);
          break;
        case 'expression':
          res = algorithm.fn(params.expression);
          break;
        case 'dimensions':
          res = algorithm.fn(params.dimensions);
          break;
        default:
          res = algorithm.fn(params.array);
      }

      setResult(res);
      setCurrentStep(0);
      setIsPlaying(true);
    } catch (error) {
      console.error('Algorithm execution error:', error);
      alert('Error running algorithm. Check the console for details.');
    }
  };

  if (!algorithm) {
    return <div className="text-center py-20 text-gray-500">Algorithm not found</div>;
  }

  const currentStepData = result ? result.steps[currentStep] : null;

  // Pseudocode library
  const pseudocodeLibrary: Record<string, string> = {
    'bubble-sort': `procedure bubbleSort(A: list)
  n = length(A)
  for i = 0 to n-1
    for j = 0 to n-i-2
      if A[j] > A[j+1]
        swap(A[j], A[j+1])`,
    'selection-sort': `procedure selectionSort(A: list)
  n = length(A)
  for i = 0 to n-1
    minIdx = i
    for j = i+1 to n
      if A[j] < A[minIdx]
        minIdx = j
    swap(A[i], A[minIdx])`,
    'insertion-sort': `procedure insertionSort(A: list)
  for i = 1 to n-1
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key`,
    'linear-search': `procedure linearSearch(A, target)
  for i = 0 to length(A)-1
    if A[i] == target
      return i
  return -1`,
    'binary-search': `procedure binarySearch(A, target)
  low = 0, high = length(A)-1
  while low <= high
    mid = (low + high) / 2
    if A[mid] == target
      return mid
    else if A[mid] < target
      low = mid + 1
    else
      high = mid - 1
  return -1`,
    'merge-sort': `procedure mergeSort(A, left, right)
  if left < right
    mid = (left + right) / 2
    mergeSort(A, left, mid)
    mergeSort(A, mid+1, right)
    merge(A, left, mid, right)`,
    'quick-sort': `procedure quickSort(A, low, high)
  if low < high
    pivot = partition(A, low, high)
    quickSort(A, low, pivot-1)
    quickSort(A, pivot+1, high)`,
    'linked-list': `Linked List Operations:
- insert(value, position)
- delete(position)
- search(value)
- traverse()`,
    'stack': `Stack Operations (LIFO):
- push(x): Add x to top
- pop(): Remove top element
- peek(): View top element
- isEmpty(): Check if empty`,
    'queue': `Queue Operations (FIFO):
- enqueue(x): Add x to rear
- dequeue(): Remove front element
- peek(): View front element
- isEmpty(): Check if empty`,
    'circular-queue': `Circular Queue:
- enqueue(x): rear = (rear + 1) % N
- dequeue(): front = (front + 1) % N
- isFull(): (rear + 1) % N == front`,
    'postfix-eval': `Postfix Evaluation:
- Scan expression left to right
- If operand: push to stack
- If operator: 
    op2 = pop(), op1 = pop()
    result = op1 operator op2
    push result`,
    'infix-to-postfix': `Infix to Postfix:
- Scan expression left to right
- If operand: output it
- If '(': push to stack
- If ')': pop until '('
- If operator: pop higher precedence ops, then push`,
    'queue-using-stacks': `Queue using Stacks:
- Enqueue(x): Push x to Stack1
- Dequeue():
    If Stack2 empty:
        Pop all from Stack1, Push to Stack2
    Pop from Stack2`,
    'bst': `BST Operations:
- insert(value)
- search(value)
- inorder traversal
- preorder traversal
- postorder traversal`,
    'avl': `AVL Insert(node, value)
  if node is null return new Node(value)
  if value < node.value
    node.left = insert(node.left, value)
  else
    node.right = insert(node.right, value)
  
  update height(node)
  balance = getBalance(node)
  
  if balance > 1 && value < node.left.value
    return rightRotate(node)
  if balance < -1 && value > node.right.value
    return leftRotate(node)
  if balance > 1 && value > node.left.value
    node.left = leftRotate(node.left)
    return rightRotate(node)
  if balance < -1 && value < node.right.value
    node.right = rightRotate(node.right)
    return leftRotate(node)
  return node`,
    'min-heap': `Min-Heap Insert(A, val)
  A.push(val)
  i = A.length - 1
  while i > 0 and A[parent(i)] > A[i]
    swap(A[i], A[parent(i)])
    i = parent(i)`,
    'max-heap': `Max-Heap Insert(A, val)
  A.push(val)
  i = A.length - 1
  while i > 0 and A[parent(i)] < A[i]
    swap(A[i], A[parent(i)])
    i = parent(i)`,
    'heap-sort': `HeapSort(A)
  BuildMaxHeap(A)
  for i = n-1 down to 1
    swap(A[0], A[i])
    n = n - 1
    MaxHeapify(A, 0)`,
    'linear-probing': `LinearProbing(key)
  h = key % size
  i = 0
  while table[(h + i) % size] is occupied
    i = i + 1
  table[(h + i) % size] = key`,
    'quadratic-probing': `QuadraticProbing(key)
  h = key % size
  i = 0
  while table[(h + i*i) % size] is occupied
    i = i + 1
  table[(h + i*i) % size] = key`,
    'chaining': `Chaining(key)
  h = key % size
  insert key into linked list at table[h]`,
    'polynomial-addition': `PolyAdd(P1, P2)
  i = 0, j = 0
  while i < len(P1) and j < len(P2)
    if P1[i].exp == P2[j].exp
      sum = P1[i].coeff + P2[j].coeff
      append (sum, P1[i].exp) to Result
      i++, j++
    else if P1[i].exp > P2[j].exp
      append P1[i] to Result
      i++
    else
      append P2[j] to Result
      j++
  append remaining terms`,
    'sparse-matrix': `SparseMatrix(M)
  rows = M.rows, cols = M.cols
  for i = 0 to rows-1
    for j = 0 to cols-1
      if M[i][j] != 0
        add <i, j, M[i][j]> to TripletTable`,
    'master-theorem': `MasterTheorem(a, b, k)
  Calculate log_b(a)
  Compare k with log_b(a)
  Case 1: k < log_b(a) => T(n) = Θ(n^log_b(a))
  Case 2: k = log_b(a) => T(n) = Θ(n^k * log n)
  Case 3: k > log_b(a) => T(n) = Θ(n^k) (if regularity holds)`,
    'vertex-cover': `VertexCover(G)
  C = ∅
  while E ≠ ∅
    pick arbitrary edge (u,v) ∈ E
    C = C ∪ {u, v}
    remove all edges incident to u or v
  return C`,
    'floyd-warshall': `FloydWarshall(G)
  for k = 0 to n-1
    for i = 0 to n-1
      for j = 0 to n-1
        if dist[i][k] + dist[k][j] < dist[i][j]
          dist[i][j] = dist[i][k] + dist[k][j]`,
    'bellman-ford': `BellmanFord(G, s)
  dist[s] = 0, all others = INF
  for i = 1 to n-1
    for each edge (u,v) with weight w
      if dist[u] + w < dist[v]
        dist[v] = dist[u] + w
  check for negative cycles`,
    'topological-sort': `TopologicalSort(G)
  calculate in-degree for all vertices
  queue Q = vertices with in-degree 0
  while Q not empty
    u = Q.dequeue()
    output u
    for each neighbor v of u
      in-degree[v]--
      if in-degree[v] == 0
        Q.enqueue(v)`,
    'doubly-linked-list': `DoublyLinkedList Operations
  Insert at Beginning:
    newNode.next = head
    if head != null: head.prev = newNode
    head = newNode
  Traverse Forward: head → next → next...
  Traverse Backward: tail → prev → prev...`,
    'lcs': `LCS(X, Y)
  m = length(X), n = length(Y)
  for i = 1 to m
    for j = 1 to n
      if X[i] == Y[j]
        dp[i][j] = dp[i-1][j-1] + 1
      else
        dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  return dp[m][n]`,
    'knapsack-01': `Knapsack(items, W)
  for i = 1 to n
    for w = 0 to W
      if weight[i] <= w
        dp[i][w] = max(
          dp[i-1][w], 
          dp[i-1][w-weight[i]] + value[i]
        )
      else
        dp[i][w] = dp[i-1][w]
  return dp[n][W]`,
    'mcm': `MCM(p)
  n = p.length - 1
  for i = 1 to n
    m[i][i] = 0
  for L = 2 to n
    for i = 1 to n-L+1
      j = i+L-1
      m[i][j] = ∞
      for k = i to j-1
        q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]
        if q < m[i][j]
          m[i][j] = q`,
    'dfs': `DFS(G, start)
  mark start as visited
  for each neighbor of start
    if neighbor not visited
      DFS(G, neighbor)`,
    'bfs': `BFS(G, start)
  queue.enqueue(start)
  mark start as visited
  while queue not empty
    node = queue.dequeue()
    for each neighbor of node
      if neighbor not visited
        mark neighbor as visited
        queue.enqueue(neighbor)`,
    'dijkstra': `Dijkstra(G, start)
  for each node v
    dist[v] = ∞
  dist[start] = 0
  while unvisited nodes exist
    u = node with min dist
    mark u as visited
    for each neighbor v of u
      alt = dist[u] + weight(u,v)
      if alt < dist[v]
        dist[v] = alt`,
    'prims': `Prim(G, start)
  for each u in V
    key[u] = ∞
    parent[u] = null
  key[start] = 0
  Q = V
  while Q is not empty
    u = extract-min(Q)
    for each v in Adj[u]
      if v in Q and w(u,v) < key[v]
        parent[v] = u
        key[v] = w(u,v)`,
    'kruskals': `Kruskal(G)
  A = ∅
  for each v in V
    make-set(v)
  sort edges E by weight
  for each edge (u,v) in E
    if find-set(u) ≠ find-set(v)
      A = A ∪ {(u,v)}
      union(u,v)
  return A`,
    'n-queens': `NQueens(board, row)
  if row == n
    return solution
  for col = 0 to n-1
    if isSafe(board, row, col)
      place queen at (row, col)
      if NQueens(board, row+1)
        return true
      remove queen from (row, col)
  return false`,
    'huffman': `HuffmanCoding(frequencies)
  create leaf node for each char
  build min heap
  while heap.size() > 1
    left = extract min
    right = extract min
    parent = new node(left.freq + right.freq)
    parent.left = left
    parent.right = right
    insert parent into heap
  return heap.top() as root`,
  };

  const pseudocode = pseudocodeLibrary[algorithmId] || pseudocodeLibrary['bubble-sort'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{algorithm.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{algorithm.categoryLabel} • {algorithm.course}</p>
        </div>
        {result && (
          <div className="text-sm text-gray-500 space-x-4">
            {result.meta.comparisons !== undefined && (
              <span>Comparisons: <span className="font-bold text-gray-900">{result.meta.comparisons}</span></span>
            )}
            {result.meta.swaps !== undefined && (
              <span>Swaps: <span className="font-bold text-gray-900">{result.meta.swaps}</span></span>
            )}
            {result.meta.operations !== undefined && (
              <span>Operations: <span className="font-bold text-gray-900">{result.meta.operations}</span></span>
            )}
            {result.meta.recursiveCalls !== undefined && (
              <span>Recursive Calls: <span className="font-bold text-gray-900">{result.meta.recursiveCalls}</span></span>
            )}
            {result.meta.nodesExpanded !== undefined && (
              <span>Nodes Expanded: <span className="font-bold text-gray-900">{result.meta.nodesExpanded}</span></span>
            )}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Input & Canvas */}
        <div className="lg:col-span-2 space-y-6">
          <InputPanel onRun={handleRun} algorithmId={algorithmId} />

          <VisualizerCanvas step={currentStepData} category={algorithm.category} />

          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={() => setCurrentStep(Math.min(currentStep + 1, (result?.steps.length || 1) - 1))}
            onPrev={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            onReset={() => { setIsPlaying(false); setCurrentStep(0); }}
            speed={speed}
            onSpeedChange={setSpeed}
            currentStep={currentStep}
            totalSteps={result?.steps.length || 0}
          />
        </div>

        {/* Right Column: Code & Info */}
        <div className="space-y-6">
          <ExplanationPanel message={currentStepData?.message || "Configure input and click Run..."} />

          <div className="h-64">
            <CodePanel code={pseudocode} activeLine={currentStepData?.lineNumber} />
          </div>

          <StateInspector variables={currentStepData?.variables} />
        </div>
      </div>
    </div>
  );
}
