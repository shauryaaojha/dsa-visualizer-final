import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
            {title && (
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-700">{title}</h3>
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
}
