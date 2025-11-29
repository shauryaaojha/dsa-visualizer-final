// Standardized color palette for visualizations
export const visualColors = {
    // Highlight types
    visiting: {
        bg: 'bg-blue-400',
        border: 'border-blue-600',
        text: 'text-blue-900',
        hex: '#60a5fa',
    },
    compare: {
        bg: 'bg-yellow-400',
        border: 'border-yellow-600',
        text: 'text-yellow-900',
        hex: '#facc15',
    },
    swap: {
        bg: 'bg-red-400',
        border: 'border-red-600',
        text: 'text-red-900',
        hex: '#f87171',
    },
    found: {
        bg: 'bg-green-500',
        border: 'border-green-700',
        text: 'text-white',
        hex: '#22c55e',
    },
    sorted: {
        bg: 'bg-green-300',
        border: 'border-green-500',
        text: 'text-green-900',
        hex: '#86efac',
    },
    current: {
        bg: 'bg-purple-400',
        border: 'border-purple-600',
        text: 'text-purple-900',
        hex: '#c084fc',
    },
    pivot: {
        bg: 'bg-orange-400',
        border: 'border-orange-600',
        text: 'text-orange-900',
        hex: '#fb923c',
    },
    visited: {
        bg: 'bg-gray-300',
        border: 'border-gray-500',
        text: 'text-gray-700',
        hex: '#d1d5db',
    },
    default: {
        bg: 'bg-blue-200',
        border: 'border-blue-300',
        text: 'text-blue-800',
        hex: '#bfdbfe',
    },
} as const;

export type HighlightColorType = keyof typeof visualColors;

export function getColorClasses(type: string = 'default'): {
    bg: string;
    border: string;
    text: string;
} {
    const key = type as HighlightColorType;
    return visualColors[key] || visualColors.default;
}

export function getColorHex(type: string = 'default'): string {
    const key = type as HighlightColorType;
    return visualColors[key]?.hex || visualColors.default.hex;
}

// Legend data for common highlight types
export const commonLegend = [
    { type: 'visiting', label: 'Current/Visiting' },
    { type: 'compare', label: 'Comparing' },
    { type: 'swap', label: 'Swapping' },
    { type: 'found', label: 'Found/Selected' },
    { type: 'sorted', label: 'Sorted/Done' },
    { type: 'pivot', label: 'Pivot' },
] as const;
