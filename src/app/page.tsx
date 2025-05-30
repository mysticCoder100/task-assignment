import InputForm from "@/Components/InputForm";
import {queryIsEmpty} from "@/Helper/Checks";
import {AssignTask} from "@/Helper/AssignTask";
import {ChipType} from "@/Type/ChipsType";

export default async function Home({searchParams}: {
    searchParams: {
        users: string, tasks: string,
    }
}) {
    const params = await searchParams;

    let usersChip: ChipType = [];
    let tasksChip: ChipType = [];

    if (!queryIsEmpty(params)) {
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
