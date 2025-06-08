export const TaskCard = ({ task, number }: { task: string, number: number }) => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-2">
                <span className="text-gray-400 dark:text-gray-500 font-medium">{number + 1}.</span>
                <h2 className="text-gray-900 dark:text-gray-100 font-medium break-words">{task}</h2>
            </div>
        </div>
    );
};

export const UserTasks = ({ user, tasks }: { user: string; tasks: Array<string> }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{user}</h2>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {tasks.length} Tasks
                    </span>
                </div>
                <div className="space-y-3">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <TaskCard key={crypto.randomUUID()} task={task} number={index} />
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks assigned.</p>
                    )}
                </div>
            </div>
        </div>
    );
};