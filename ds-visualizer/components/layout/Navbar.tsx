import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="h-16 border-b border-gray-200 bg-white flex items-center px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex flex-col">
                    <span className="font-bold text-xl text-blue-600 leading-tight">DSA Visualizer</span>
                    <span className="text-[10px] text-gray-500 font-medium tracking-wide">SRM IST - KATTANKULATHUR</span>
                </Link>
            </div>
            <div className="ml-auto flex items-center gap-4 text-sm text-gray-600">
                <span className="hidden md:inline">21CSC201J (DSA)</span>
                <span className="hidden md:inline text-gray-300">|</span>
                <span className="hidden md:inline">21CSC204J (DAA)</span>
            </div>
        </nav>
    );
}
