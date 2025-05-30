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
        <main className="grid gap-4 py-12">
            <div>
                <InputForm queryUsers={usersChip} queryTasks={tasksChip} />
            </div>
        </main>
    );
}
