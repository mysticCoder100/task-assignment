import React from 'react';

function FormSkeleton() {
    return (
        <div className="card-body">
            <form className={"grid gap-6"} >

                {
                    Array.from({length: 2}).map((_, i) => (
                        <p key={i} className={"grid gap-2 w-full"}>
                            <span className={"skeleton w-6 h-8 p-2"}></span>
                            <span className={"skeleton w-full h-12 p-2"}></span>
                        </p>
                    ))
                }

                <button type="submit" className="skeleton w-full h-10 p-3">
                </button>
            </form>
        </div>
    );
}

export default FormSkeleton;