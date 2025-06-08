import { XCircle } from "lucide-react";
import React from "react";

export function Chips({ chip, index, removeChip }: {
    chip: string;
    index: number;
    removeChip: (index: number) => void
}) {
    return (
        <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm transition-all duration-200 hover:shadow-md group animate-fadeIn">
            <span className="break-words">{chip}</span>
            <button
                type="button"
                onClick={() => removeChip(index)}
                className="ml-1 p-0.5 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 transition-colors duration-200"
                aria-label={`Remove ${chip}`}
            >
                <XCircle className="h-4 w-4" />
            </button>
        </div>
    )
}