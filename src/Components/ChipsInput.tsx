"use client"

import React, {useState, useRef, useEffect} from 'react';
import {ChipType} from "@/Type/ChipsType";
import {Chips} from "@/Components/Chips";


const ChipsInput = ({label, chips, setChips}:{
    label: string;
    setChips: (chips: ChipType) => void;
    chips: ChipType;
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const createChip = (text: string) => {
        if (text && !chips.some((chip) => chip.toLowerCase() === text.toLowerCase())) {
            setChips([...chips,  text]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ',' || event.key==='Enter') {
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
        <div className="text-left grid gap-3">
            <label htmlFor="" className={""}>
                {label}
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md">
                {chips.map((chip, index) => (
                    <Chips key={index} chip={chip} index={index} removeChip={removeChip}/>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={chips.length === 0 ? "Type and press Enter or Comma(,)" : ""}
                    className="flex-1 border-none outline-none p-1 bg-transparent min-w-[100px] text-sm"
                />
            </div>
        </div>
    );
};

export default ChipsInput;
