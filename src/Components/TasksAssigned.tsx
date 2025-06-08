"use client"

import React, { useEffect } from 'react';
import Link from "next/link";
import { ChevronLeft, Shuffle, SquarePen } from "lucide-react";
import { UserTasks } from "@/Components/TaskCard";
import { AssignTask } from "@/Helper/AssignTask";
import { AssignedTaskType } from "@/Type/AssignedTaskType";
import { UserTasksSkeleton } from "@/Components/Skeleton/UserTasksSkeleton";

function TasksAssigned({ users, tasks }: {
    users: string;
    tasks: string;
}) {
    const [results, setResults] = React.useState<AssignedTaskType | []>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const getTasks = (): void => setResults(new AssignTask(users, tasks).performAssignment());

    useEffect(() => {
        getTasks();
        setIsLoading(false);
    }, [users, tasks])

    return (
        <div className="flex flex-col h-full w-full">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Assigned Tasks</h1>
                    <div className="flex items-center gap-4 flex-wrap">
                        <Link
                            href="/"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-colors duration-200"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Link>
                        <Link
                            href={`/?users=${users}&tasks=${tasks}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 transition-colors duration-200"
                        >
                            <SquarePen className="w-4 h-4 mr-1" />
                            Edit
                        </Link>
                        <button
                            onClick={getTasks}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 transition-colors duration-200"
                        >
                            <Shuffle className="w-4 h-4 mr-1" />
                            Shuffle
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array.from({ length: 9 }).map((_, index) => (
                                <UserTasksSkeleton key={index} />
                            ))
                        ) : (
                            Object.entries(results).map(([user, tasks]) => (
                                <UserTasks key={user} user={user} tasks={tasks} />
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TasksAssigned;