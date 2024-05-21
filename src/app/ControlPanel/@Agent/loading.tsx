'use client';
export default function Loading() {
    return (
       
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">
            <span className="sr-only">Loading...</span>
            <h1 className="text-4xl font-bold text-center ">Loading...</h1>
        </div>
    );
    }