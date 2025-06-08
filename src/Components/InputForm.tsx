"use client";

import React, { useEffect, useState } from "react";
import ChipsInput from "@/Components/ChipsInput";
import { ChipType } from "@/Type/ChipsType";
import Form from "next/form";
import { computeTasks } from "@/Action/ComputeTasks";
import FormSkeleton from "@/Components/Skeleton/FormSkeleton";

interface InputFormProps {
    queryUsers: ChipType;
    queryTasks: ChipType;
}

const InputForm: React.FC<InputFormProps> = ({ queryUsers, queryTasks }) => {
    const [userChips, setUserChips] = useState<ChipType>([]);
    const [tasksChips, setTaskChips] = useState<ChipType>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let interval: string | number | NodeJS.Timeout | undefined;

    useEffect(() => {
        if (queryUsers) setUserChips(queryUsers);
        if (queryTasks) setTaskChips(queryTasks);
        setIsLoading(false)
    }, [queryUsers, queryTasks]);

    if (!queryTasks && !queryUsers) setIsLoading(false)

    const handleSubmit = () => {
        clearTimeout(interval);
        if (userChips.length <= 0 || tasksChips.length <= 0) {
            setErrorMessage('Please input at least one user and one task.');
            interval = setTimeout(() => {
                setErrorMessage("");
            }, 3000)
            return;
        }
        computeTasks({ userChips, tasksChips });
        setUserChips([]);
        setTaskChips([]);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center gap-2 transition-colors duration-200 animate-fadeIn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm">{errorMessage}</span>
                </div>
            )}
            <div className="overflow-hidden transition-all duration-200">
                <div className="">

                    {isLoading ? (
                        <FormSkeleton />
                    ) : (
                        <Form
                            action={handleSubmit}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <ChipsInput
                                    label="Team Members"
                                    chips={userChips}
                                    setChips={setUserChips}
                                />
                                <ChipsInput
                                    label="Task List"
                                    chips={tasksChips}
                                    setChips={setTaskChips}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5"
                            >
                                Assign Tasks
                            </button>
                        </Form>
                    )}
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Tasks will be randomly assigned to team members
                </p>
            </div>
        </div>
    );
};

export default InputForm;
