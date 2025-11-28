export function parseInput(input: string): number[] {
    if (!input.trim()) return [];

    const items = input.split(/[\s,]+/).filter(item => item.trim() !== '');
    const numbers = items.map(item => {
        const num = Number(item);
        if (isNaN(num)) {
            throw new Error(`Invalid number: "${item}"`);
        }
        return num;
    });

    return numbers;
}
