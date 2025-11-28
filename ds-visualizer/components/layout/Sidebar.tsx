'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllCategories, getAlgorithmsByCategory } from '@/lib/algorithms';

export function Sidebar() {
    const pathname = usePathname();
    const categories = getAllCategories();

    return (
        <aside className="w-64 border-r border-gray-200 bg-gray-50 h-[calc(100vh-4rem)] overflow-y-auto hidden md:block">
            <div className="p-4">
                {categories.map((cat) => {
                    const algorithms = getAlgorithmsByCategory(cat.category);
                    if (algorithms.length === 0) return null;

                    return (
                        <div key={cat.category} className="mb-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                {cat.label}
                            </h3>
                            <p className="text-[10px] text-gray-400 mb-2">{cat.course}</p>

                            <ul className="space-y-1">
                                {algorithms.map((algo) => {
                                    const href = `/visualizer/${algo.id}`;
                                    const isActive = pathname === href;

                                    return (
                                        <li key={algo.id}>
                                            <Link
                                                href={href}
                                                className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${isActive
                                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                                    }`}
                                            >
                                                {algo.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
