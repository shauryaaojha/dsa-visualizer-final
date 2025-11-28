import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
