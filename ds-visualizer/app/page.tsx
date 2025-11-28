import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          DSA Visualizer <span className="text-blue-600">SRM</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Interactive learning companion for Data Structures and Algorithms courses at SRM Institute of Science and Technology.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/visualizer">
            <Button size="lg">Open Visualizer</Button>
          </Link>
          <a href="https://www.srmist.edu.in/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">SRM Website</Button>
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="21CSC201J" className="border-t-4 border-t-blue-500">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Data Structures and Algorithms</h3>
            <p className="text-gray-600 text-sm">
              Master the fundamentals of data organization and manipulation. Visualize arrays, linked lists, stacks, queues, trees, and graphs.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-500 pt-2">
              <li>Sorting Algorithms</li>
              <li>Searching Techniques</li>
              <li>Linear Data Structures</li>
            </ul>
          </div>
        </Card>

        <Card title="21CSC204J" className="border-t-4 border-t-purple-500">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Design and Analysis of Algorithms</h3>
            <p className="text-gray-600 text-sm">
              Analyze algorithm efficiency and complexity. Explore advanced topics like dynamic programming, greedy algorithms, and backtracking.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-500 pt-2">
              <li>Time Complexity Analysis</li>
              <li>Divide and Conquer</li>
              <li>Optimization Problems</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
