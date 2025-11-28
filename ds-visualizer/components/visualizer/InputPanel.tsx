'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { getAlgorithm } from '@/lib/algorithms';

interface InputPanelProps {
    onRun: (params: any) => void;
    algorithmId: string;
}

export function InputPanel({ onRun, algorithmId }: InputPanelProps) {
    const [arrayInput, setArrayInput] = useState('10, 5, 8, 3, 1, 9');
    const [targetValue, setTargetValue] = useState('8');
    const [operation, setOperation] = useState('');
    const [value, setValue] = useState('15');
    const [text1, setText1] = useState('ABCDGH');
    const [text2, setText2] = useState('AEDFHR');
    const [items, setItems] = useState('10:60, 20:100, 30:120'); // weight:value
    const [capacity, setCapacity] = useState('50');
    const [graphInput, setGraphInput] = useState('0-1:2, 0-2:4, 1-2:1, 1-3:7, 2-3:3'); // from-to:weight
    const [startNode, setStartNode] = useState('0');
    const [numberInput, setNumberInput] = useState('4');
    const [frequencies, setFrequencies] = useState('a:5, b:9, c:12, d:13, e:16'); // char:freq
    const [expression, setExpression] = useState('5 3 + 2 *'); // postfix default

    const algorithm = getAlgorithm(algorithmId);
    if (!algorithm) return null;

    const handleRun = () => {
        try {
            const arr = arrayInput.split(/[\s,]+/).filter(x => x).map(Number);

            switch (algorithm.inputType) {
                case 'array':
                    onRun({ array: arr });
                    break;

                case 'array+target':
                    onRun({ array: arr, target: Number(targetValue) });
                    break;

                case 'array+operation':
                    if (!operation) {
                        alert('Please select an operation');
                        return;
                    }
                    onRun({ array: arr, operation, value: Number(value) });
                    break;

                case 'tree+operation':
                    if (!operation) {
                        alert('Please select an operation');
                        return;
                    }
                    onRun({ array: arr, operation, value: operation === 'insert' || operation === 'search' ? Number(value) : undefined });
                    break;

                case 'strings':
                    onRun({ text1, text2 });
                    break;

                case 'items+capacity':
                    const parsedItems = items.split(',').map(item => {
                        const [weight, value] = item.trim().split(':').map(Number);
                        return { weight, value };
                    });
                    onRun({ items: parsedItems, capacity: Number(capacity) });
                    break;

                case 'graph+node':
                    const edges = graphInput.split(',').map(edge => {
                        const [nodes, weight] = edge.trim().split(':');
                        const [from, to] = nodes.split('-').map(Number);
                        return { from, to, weight: weight ? Number(weight) : 1, directed: true };
                    });
                    const graphNodes = Array.from(new Set(edges.flatMap(e => [e.from, e.to]))).map(id => ({ id, value: id }));
                    onRun({ nodes: graphNodes, edges, start: Number(startNode) });
                    break;

                case 'number':
                    onRun({ n: Number(numberInput) });
                    break;

                case 'frequencies':
                    const freqs = frequencies.split(',').map(item => {
                        const [char, freq] = item.trim().split(':');
                        return { char: char.trim(), freq: Number(freq) };
                    });
                    onRun({ frequencies: freqs });
                    break;

                case 'expression':
                    onRun({ expression });
                    break;

                case 'dimensions':
                    const dims = arrayInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                    onRun({ dimensions: dims });
                    break;

                default:
                    onRun({ array: arr });
            }
        } catch (error) {
            alert('Invalid input format');
        }
    };

    const generateRandom = () => {
        const len = Math.floor(Math.random() * 10) + 5;
        const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
        setArrayInput(arr.join(', '));
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-700">{algorithm.name}</h3>
            <p className="text-xs text-gray-500">{algorithm.description}</p>

            {(algorithm.inputType === 'array' || algorithm.inputType === 'array+target' || algorithm.inputType === 'array+operation' || algorithm.inputType === 'tree+operation') && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        {algorithm.inputType.includes('tree') ? 'Initial Tree Values' : 'Array Input'} (comma separated)
                    </label>
                    <input
                        type="text"
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. 10, 5, 8, 1"
                    />
                </div>
            )}

            {algorithm.inputType === 'array+target' && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Target Value</label>
                    <input
                        type="number"
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-24"
                    />
                </div>
            )}

            {(algorithm.inputType === 'array+operation' || algorithm.inputType === 'tree+operation') && (
                <>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Operation</label>
                        <select
                            value={operation}
                            onChange={(e) => setOperation(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select operation...</option>
                            {algorithm.operations?.map(op => (
                                <option key={op} value={op}>{op.replace(/-/g, ' ').toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    {(operation === 'insert-begin' || operation === 'insert-end' || operation === 'insert' || operation === 'search') && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Value</label>
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-24"
                            />
                        </div>
                    )}
                </>
            )}

            {algorithm.inputType === 'strings' && (
                <>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Text 1</label>
                        <input
                            type="text"
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Text 2</label>
                        <input
                            type="text"
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        />
                    </div>
                </>
            )}

            {algorithm.inputType === 'items+capacity' && (
                <>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Items (weight:value, comma separated)</label>
                        <input
                            type="text"
                            value={items}
                            onChange={(e) => setItems(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                            placeholder="10:60, 20:100, 30:120"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Knapsack Capacity</label>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-24"
                        />
                    </div>
                </>
            )}

            {algorithm.inputType === 'graph+node' && (
                <>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Graph Edges (from-to:weight, comma separated)</label>
                        <input
                            type="text"
                            value={graphInput}
                            onChange={(e) => setGraphInput(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                            placeholder="0-1:2, 0-2:4, 1-2:1"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Start Node</label>
                        <input
                            type="number"
                            value={startNode}
                            onChange={(e) => setStartNode(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-24"
                        />
                    </div>
                </>
            )}

            {algorithm.inputType === 'number' && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Number (N for N-Queens)</label>
                    <input
                        type="number"
                        value={numberInput}
                        onChange={(e) => setNumberInput(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-24"
                    />
                </div>
            )}

            {algorithm.inputType === 'frequencies' && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Character Frequencies (char:freq, comma separated)</label>
                    <input
                        type="text"
                        value={frequencies}
                        onChange={(e) => setFrequencies(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        placeholder="a:5, b:9, c:12"
                    />
                </div>
            )}

            {algorithm.inputType === 'expression' && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Expression</label>
                    <input
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        placeholder={algorithm.id === 'infix-to-postfix' ? '(A+B)*C' : '5 3 + 2 *'}
                    />
                </div>
            )}

            {algorithm.inputType === 'dimensions' && (
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Matrix Dimensions (e.g. 10, 30, 5, 60)</label>
                    <input
                        type="text"
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        placeholder="10, 30, 5, 60"
                    />
                </div>
            )}

            <div className="flex gap-2 mt-2">
                <Button onClick={handleRun} size="sm">Run Algorithm</Button>
                {(algorithm.inputType === 'array' || algorithm.inputType.includes('array') || algorithm.inputType.includes('tree')) && (
                    <Button onClick={generateRandom} variant="secondary" size="sm">Randomize</Button>
                )}
            </div>
        </div>
    );
}
