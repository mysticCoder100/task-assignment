"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChipType } from "@/Type/ChipsType";
import { Chips } from "@/Components/Chips";


const ChipsInput = ({ label, chips, setChips }: {
    label: string;
    setChips: (chips: ChipType) => void;
    chips: ChipType;
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createChip = (text: string) => {
        if (text && !chips.some((chip) => chip.toLowerCase() === text.toLowerCase())) {
            setChips([...chips, text]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ',' || event.key === 'Enter') {
            event.preventDefault();
            createChip(inputValue.trim())
            setInputValue('');
        } else if (event.key === 'Backspace') {
            if (inputValue) {
                return
            }
            if (chips.length > 0) {
                const newChips: ChipType = chips.filter((chip, index) => index !== chips.length - 1);
                setChips(newChips);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const removeChip = (id: number) => {
        setChips(chips.filter((chip, index) => index !== id));
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="space-y-2">
            <label className="block text-left text-gray-900 dark:text-gray-100 mb-1.5">
                {label}
            </label>
            <div
                className={`flex flex-wrap items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-500/30 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all duration-200 ${chips.length > 0 ? 'min-h-[80px]' : ''}`}
            >
                {chips.map((chip, index) => (
                    <Chips key={index} chip={chip} index={index} removeChip={removeChip} />
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={chips.length === 0 ? `Add ${label.toLowerCase()}...` : ""}
                    className="flex-1 min-w-[120px] p-2 bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Press Enter or Comma (,) to add • Backspace to remove
            </p>
        </div>
    );
};

export default ChipsInput;
