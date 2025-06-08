import InputForm from "@/Components/InputForm";
import { AssignTask } from "@/Helper/AssignTask";
import { ChipType } from "@/Type/ChipsType";

export default async function Home({ searchParams }: {
    searchParams?: Promise<{
        users?: string,
        tasks?: string,
    }>
}) {
    const params = await searchParams;

    let usersChip: ChipType = [];
    let tasksChip: ChipType = [];

    if (params && params.users && params.tasks) {
        const assignTask = new AssignTask(params.users, params.tasks).generateArrayChip()
        usersChip = assignTask.users
        tasksChip = assignTask.tasks
    }


    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-lg transition-colors duration-300">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-700 dark:text-blue-300">Task Assignment App</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                    Enter users and tasks below. Tasks will be randomly assigned to users!
                </p>
                <InputForm queryUsers={usersChip} queryTasks={tasksChip} />
            </div>
            <footer className="mt-8 text-gray-400 dark:text-gray-500 text-sm text-center">
                &copy; {new Date().getFullYear()} Task Assignment. All rights reserved.
            </footer>
        </main>
    );
}
