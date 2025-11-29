import { AlgorithmResult, StepState } from '../types';

export function masterTheoremSteps(params: number[]): AlgorithmResult {
    const steps: StepState[] = [];
    let operations = 0;

    // Expect params = [a, b, k] for T(n) = aT(n/b) + O(n^k)
    // Default values if not provided
    const a = params[0] || 2;
    const b = params[1] || 2;
    const k = params[2] || 0;

    steps.push({
        message: `Analyzing Recurrence: T(n) = ${a}T(n/${b}) + O(n^${k})`,
        variables: { a, b, k },
        lineNumber: 1,
    });

    // Calculate log_b(a)
    const log_b_a = Math.log(a) / Math.log(b);
    const log_b_a_display = log_b_a.toFixed(2);

    steps.push({
        message: `Step 1: Calculate log_b(a)`,
        variables: {
            calculation: `log_${b}(${a}) ≈ ${log_b_a_display}`,
            k: k
        },
        lineNumber: 2,
    });

    // Compare k with log_b(a)
    let result = "";
    let caseNum = 0;

    if (Math.abs(k - log_b_a) < 0.0001) {
        // Case 2: k == log_b(a)
        caseNum = 2;
        result = `T(n) = Θ(n^${k} * log n)`;
        steps.push({
            message: `Step 2: Compare k with log_b(a)`,
            variables: { comparison: `${k} == ${log_b_a_display}` },
            lineNumber: 3,
        });
        steps.push({
            message: `Result: Case 2 applies. Since k = log_b(a), T(n) = Θ(n^k * log n)`,
            variables: { result },
            lineNumber: 4,
        });
    } else if (k < log_b_a) {
        // Case 1: k < log_b(a)
        caseNum = 1;
        result = `T(n) = Θ(n^${log_b_a_display})`;
        steps.push({
            message: `Step 2: Compare k with log_b(a)`,
            variables: { comparison: `${k} < ${log_b_a_display}` },
            lineNumber: 3,
        });
        steps.push({
            message: `Result: Case 1 applies. Since k < log_b(a), T(n) = Θ(n^log_b(a))`,
            variables: { result },
            lineNumber: 4,
        });
    } else {
        // Case 3: k > log_b(a)
        caseNum = 3;
        result = `T(n) = Θ(n^${k})`;
        steps.push({
            message: `Step 2: Compare k with log_b(a)`,
            variables: { comparison: `${k} > ${log_b_a_display}` },
            lineNumber: 3,
        });

        // Regularity condition check for Case 3
        // a * (n/b)^k <= c * n^k
        // a * n^k / b^k <= c * n^k
        // a / b^k <= c
        // We need to check if a < b^k for some c < 1
        const regularity = a < Math.pow(b, k);

        if (regularity) {
            steps.push({
                message: `Result: Case 3 applies. Since k > log_b(a) and regularity holds, T(n) = Θ(n^k)`,
                variables: { result },
                lineNumber: 4,
            });
        } else {
            steps.push({
                message: `Warning: Case 3 candidate, but regularity condition might fail. Assuming standard Master Theorem holds: T(n) = Θ(n^${k})`,
                variables: { result },
                lineNumber: 4,
            });
        }
    }

    // Visualization using a "Tree" to show the recursion depth?
    // Or just text steps.
    // Let's create a dummy tree to visualize the recursion structure for depth 2 or 3

    // Level 0: n^k
    // Level 1: a nodes of (n/b)^k
    // Level 2: a^2 nodes of (n/b^2)^k

    // We can use the 'tree' structure to show the first few levels of recursion
    // Root: n^k
    // Children: a children

    // Limit 'a' for visualization to avoid crash if a is large (e.g. 100)
    const visA = Math.min(a, 4);
    const nodes = [];
    let nextId = 0;

    // Root
    nodes.push({ id: nextId++, value: 0, label: `n^${k}`, parent: null }); // Value 0 as dummy

    // Level 1
    const level1Start = nextId;
    for (let i = 0; i < visA; i++) {
        nodes.push({ id: nextId++, value: 0, label: `(n/${b})^${k}`, parent: 0 });
    }

    // Level 2 (only for first child to save space)
    if (visA > 0) {
        for (let i = 0; i < visA; i++) {
            nodes.push({ id: nextId++, value: 0, label: `(n/${b * b})^${k}`, parent: level1Start });
        }
    }

    // We need to adapt this to the TreeState structure which expects binary tree (left/right)
    // My TreeState currently supports 'left' and 'right'.
    // If 'a' > 2, I can't easily visualize it with the current TreeRenderer unless I extend it or use a generic Graph.
    // I'll skip the tree visualization for now and stick to the text steps which are the core of this "algorithm".
    // Or I can use 'graph' structure which is generic.

    return { steps, meta: { operations, comparisons: 0 } };
}
