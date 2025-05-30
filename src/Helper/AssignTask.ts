import { ChipType } from "@/Type/ChipsType";
import { AssignedTaskType } from "@/Type/AssignedTaskType";

export class AssignTask {
	private readonly tasksArray: Array<string>;
	private readonly usersArray: Array<string>;

	constructor(users: string, tasks: string) {
		this.usersArray = users.split(",");
		this.tasksArray = tasks.split(",");
	}

	public performAssignment() {
		const result: AssignedTaskType = {};

		this.usersArray.forEach((user) => {
			result[user] = [];
		});

		this.shuffleTasks();

		for (let i = 0; i < this.tasksArray.length; i++) {
			const user = this.usersArray[i % this.usersArray.length];
			result[user].push(this.tasksArray[i]);
		}
		return result;
	}

	public generateArrayChip(): {
		users: ChipType;
		tasks: ChipType;
	} {
		return {
			users: this.usersArray,
			tasks: this.tasksArray,
		};
	}

	private shuffleTasks(): void {
		for (let i = this.tasksArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.tasksArray[i], this.tasksArray[j]] = [
				this.tasksArray[j],
				this.tasksArray[i],
			];
		}
	}
}
