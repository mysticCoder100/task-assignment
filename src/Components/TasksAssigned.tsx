"use client"

import React, {useEffect} from 'react';
import Link from "next/link";
import {ChevronLeft, Shuffle, SquarePen} from "lucide-react";
import {UserTasks} from "@/Components/TaskCard";
import {AssignTask} from "@/Helper/AssignTask";
import {AssignedTaskType} from "@/Type/AssignedTaskType";
import {UserTasksSkeleton} from "@/Components/Skeleton/UserTasksSkeleton";

function TasksAssigned({users, tasks}: {
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
        <>
            <div className="flex items-center justify-between sticky top-0 z-50 bg-base-200 py-6 p-4 gap-4 flex-wrap mb-8">
                <h1 className="text-3xl font-bold text-center text-primary">Tasks Assigned</h1>
                <div className={"flex gap-3 flex-wrap items-center justify-center"}>
                    <Link href={"/"} className="btn btn-outline  btn-sm">
                        <ChevronLeft/>
                        Back
                    </Link>

                    <Link href={`/?users=${users}&tasks=${tasks}`}
                          className="btn btn-success btn-outline btn-sm">
                        <SquarePen/>
                        Edit
                    </Link>

                    <button onClick={() => {
                        getTasks()
                    }} className="btn btn-outline btn-warning btn-sm">
                        <Shuffle/>
                        shuffle
                    </button>
                </div>
            </div>
            <div className="grid my-grid px-10">
                {
                    isLoading ? (
                        Array.from({length: 9}).map((_,index)=><UserTasksSkeleton key={index}/>)
                    ) : (
                        Object.entries(results).map(([user, tasks]) => {
                            return <UserTasks key={user} user={user} tasks={tasks}/>;
                        })
                    )
                }
            </div>
            <div className="mt-8 text-center text-gray-500 p-4">
                <p>This is a simplified representation. A real application would handle data persistence, user
                    authentication, and more complex task assignment logic.</p>
            </div>
        </>
    );
}

export default TasksAssigned;