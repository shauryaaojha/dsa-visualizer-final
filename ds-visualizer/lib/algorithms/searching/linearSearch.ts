import { AlgorithmResult, StepState } from '../types';

export function linearSearchSteps(input: number[], target: number): AlgorithmResult {
    const array = [...input];
    const steps: StepState[] = [];
    let comparisons = 0;

    steps.push({
        array: [...array],
        message: `Starting Linear Search for ${target}`,
        lineNumber: 1,
    });

    for (let i = 0; i < array.length; i++) {
        comparisons++;
        steps.push({
            array: [...array],
            highlights: { indices: [i], type: 'current' },
            variables: { i, target },
            message: `Checking index ${i}: Is ${array[i]} == ${target}?`,
            lineNumber: 2,
        });

        if (array[i] === target) {
            steps.push({
                array: [...array],
                highlights: { indices: [i], type: 'found' },
                variables: { i, target },
                message: `Found ${target} at index ${i}!`,
                lineNumber: 3,
            });
            return { steps, meta: { comparisons } };
        }
    }

    steps.push({
        array: [...array],
        message: `${target} not found in the array.`,
        lineNumber: 5,
    });

    return { steps, meta: { comparisons } };
}
