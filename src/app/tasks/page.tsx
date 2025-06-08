import React from 'react';
import { redirect } from "next/navigation";
import TasksAssigned from "@/Components/TasksAssigned";

async function Tasks({ searchParams }: {
    searchParams: Promise<{
        users?: string,
        tasks?: string,
    }>
}) {
    const params = await searchParams;

    if (!params || !params.users || !params.tasks) {
        redirect("/");
    }

    return (
        <main className="min-h-screen h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <TasksAssigned users={params.users} tasks={params.tasks} />
        </main>
    );
}

export default Tasks;