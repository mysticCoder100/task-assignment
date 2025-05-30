export const TaskCard = ({ task, number }: { task: string, number: number }) => {

    return (
        <div className="p-4 card w-full overflow-hidden bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="card-header">
                <div className={`card-title w-full break-words px-2 rounded rounded-b-xl text-lg font-semibold`}>
                    <span>{number + 1}.</span>
                    <h2 className={"break-words"} >{task}</h2>
                </div>
            </div>
        </div>
    );
};

export const UserTasks = ({user, tasks}: { user: string; tasks: Array<string> }) => {
    return (
        <div className="card p-3 overflow-hidden  bg-base-100 shadow-lg">
            <div className="card-header">
                <h2 className="card-title text-xl font-semibold text-primary">{user}</h2>
                <p className="text-sm text-gray-500">
                    Assigned Tasks: <span className="badge badge-secondary">{tasks.length}</span>
                </p>
            </div>
            <div className="card-body">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => <TaskCard key={crypto.randomUUID()} task={task} number={index} />)
                ) : (
                    <p className="text-gray-500">No tasks assigned.</p>
                )}
            </div>
        </div>
    );
};