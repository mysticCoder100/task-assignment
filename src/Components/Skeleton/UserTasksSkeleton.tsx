export const TaskCardSkeleton = () => {

    return (
        <div className="p-4 card w-full bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="card-header">
                <div className={`card-title px-2 rounded rounded-b-xl text-lg font-semibold`}>
                    <span className={"skeleton w-2 h-3"}></span>
                    <h2 className={"skeleton w-5 h-3"}></h2>
                </div>
            </div>
        </div>
    );
};

export const UserTasksSkeleton = () => {
    return (
        <div className="card p-3 bg-base-100 shadow-lg">
            <div className="card-header">
                <h2 className="skeleton w-20 h-3 card-title text-xl font-semibold text-primary"></h2>
                <p className="skeleton mt-3 mx-auto w-30 d-block h-3 text-gray-500">
                </p>
            </div>
            <div className="card-body">
                {
                    Array.from({length: 3}).map((_, index) => <TaskCardSkeleton key={index} />)
                }
            </div>
        </div>
    );
};

