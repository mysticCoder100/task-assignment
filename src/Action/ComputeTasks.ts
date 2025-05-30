import {ChipType} from "@/Type/ChipsType";
import {redirect} from "next/navigation";

export function computeTasks({userChips, tasksChips}: {
    userChips: ChipType;
    tasksChips: ChipType;
}): void {
    const users = userChips.join(",");
    const tasks = tasksChips.join(",");

    redirect(`tasks?users=${users}&tasks=${tasks}`);
}