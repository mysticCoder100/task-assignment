import {XCircle} from "lucide-react";
import React from "react";

export function Chips({chip, index ,removeChip}: {
    chip: string;
    index : number;
    removeChip: (index: number) => void
}) {
    return (
        <div
            className="inline-flex flex-wrap items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold">
            <span className={"block break-words"}>{chip}</span>
            <button
                type="button"
                onClick={() => removeChip(index)}
                className="ml-1.5 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1 hover:bg-gray-200 text-gray-500"
                aria-label={`Remove chip ${index}`}
            >
                <XCircle className="h-4 w-4"/>
            </button>
        </div>
    )
}