import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getAllCategories } from "@/lib/algorithms";

export default function VisualizerPage() {
    const categories = getAllCategories();

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Algorithm Visualizer</h2>
                <p className="text-gray-600">Select a category to explore algorithms</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => {
                    const colors = {
                        'level1': { border: 'border-t-blue-500', text: 'text-blue-600' },
                        'dsa-module1': { border: 'border-t-green-500', text: 'text-green-600' },
                        'dsa-module2': { border: 'border-t-purple-500', text: 'text-purple-600' },
                        'dsa-module3': { border: 'border-t-orange-500', text: 'text-orange-600' },
                        'dsa-module4': { border: 'border-t-pink-500', text: 'text-pink-600' },
                        'daa-unit2': { border: 'border-t-indigo-500', text: 'text-indigo-600' },
                        'daa-unit3': { border: 'border-t-teal-500', text: 'text-teal-600' },
                        'daa-unit4': { border: 'border-t-red-500', text: 'text-red-600' },
                        'daa-greedy': { border: 'border-t-amber-500', text: 'text-amber-600' },
                    }[cat.category] || { border: 'border-t-gray-500', text: 'text-gray-600' };

                    return (
                        <Card key={cat.category} className={`hover:shadow-lg transition-shadow ${colors.border}`}>
                            <div className="flex flex-col h-full">
                                <div>
                                    <h3 className={`text-lg font-bold ${colors.text}`}>{cat.label}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{cat.course}</p>
                                </div>
                                <div className="mt-4">
                                    <Link href={`#${cat.category}`} className={`text-sm font-medium ${colors.text} hover:underline`}>
                                        Explore &rarr;
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
