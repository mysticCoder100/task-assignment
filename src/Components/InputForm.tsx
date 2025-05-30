"use client";

import React, {useEffect, useState} from "react";
import ChipsInput from "@/Components/ChipsInput";
import {ChipType} from "@/Type/ChipsType";
import Form from "next/form";
import {computeTasks} from "@/Action/ComputeTasks";
import FormSkeleton from "@/Components/Skeleton/FormSkeleton";

interface InputFormProps {
    queryUsers: ChipType;
    queryTasks: ChipType;
}

const InputForm: React.FC<InputFormProps> = ({queryUsers, queryTasks}) => {
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
        computeTasks({userChips, tasksChips});
        setUserChips([]);
        setTaskChips([]);
    };

    return (
        <div
            className="card bg-base-100 p-4 shadow-2xl border border-primary border-8 w-full max-w-lg mx-auto pt-4 grid gap-4">
            <h1 className="text-3xl font-bold text-center text-primary mb-2">Taskflow</h1>
            {errorMessage && (
                <div role="alert" className="alert alert-vertical sm:alert-horizontal alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}
            <div className="card-body">
                {
                    isLoading ? (
                        <FormSkeleton/>
                    ) : (
                        <Form
                            action={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <ChipsInput label="Users" chips={userChips} setChips={setUserChips}/>
                            <ChipsInput label="Tasks" chips={tasksChips} setChips={setTaskChips}/>

                            <button type="submit" className="btn btn-primary w-full mt-2">
                                Submit
                            </button>
                        </Form>
                    )
                }
            </div>
        </div>
    );
};

export default InputForm;
