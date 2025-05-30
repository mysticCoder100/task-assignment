import React from 'react';
import {queryIsEmpty} from "@/Helper/Checks";
import {redirect} from "next/navigation";
import TasksAssigned from "@/Components/TasksAssigned";

async function Tasks({searchParams}: {
    searchParams: {
    users: string, tasks: string,
}}) {
    
    const params = await searchParams;

    if (queryIsEmpty(params)) {
        redirect("/")
    }

    return (
        <main className="h-full bg-base-200 grid grid-rows-[auto_1fr_auto] ">
            <TasksAssigned users={params.users} tasks={params.tasks} />
        </main>
    );
}

export default Tasks;