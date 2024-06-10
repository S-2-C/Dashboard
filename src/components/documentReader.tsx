import { useState } from "react";

interface textReaderProps {
    content: {
        title: string;
        description: string;
        content: string;
        date: string;
    };
    index: number;
}

const DocumentReader = ({ content, index }: textReaderProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 m-1 h-60 w-full justify-between"> {/* Standardized padding and margin */}
            <button
                className="flex flex-col justify-center items-center text-center hover:bg-blue-50 rounded-2xl w-full h-full"
                onClick={() => setIsPopoverVisible(true)}
            >
                <div className="text-2xl font-bold mb-2"> {/* Increased font size to 2xl */}
                    {content.title}
                </div>
                <div className="mb-2 w-full text-gray-600 text-lg"> {/* Increased font size to lg */}
                    {content.description}
                </div>
                <div className="text-sm font-extralight w-full text-gray-500">
                    Last Updated: {content.date}
                </div>
            </button>
            {isPopoverVisible && (
                <div className="flex justify-center items-center left-0 top-0 fixed w-screen h-screen">
                    <div className="absolute w-screen h-screen backdrop-blur-lg bg-black bg-opacity-50" onClick={() => setIsPopoverVisible(false)} />
                    <div className="relative w-2/3 h-2/3 rounded-lg shadow-white overflow-y-scroll no-scrollbar shadow-md bg-stone-200 border-white z-[9999] p-10">
                        <button className="absolute top-5 right-5 hover:scale-125 hover:text-red-600 transition-all ease-in" onClick={() => setIsPopoverVisible(false)}>X</button>
                        <div className="sticky -top-10 py-5 bg-stone-200">
                            <h1 className="text-3xl font-bold mb-4">{content.title}</h1> {/* Increased font size to 3xl */}
                            <p className="text-base font-extralight pb-1">{content.description}</p>
                            <p className="text-base font-extralight pb-1">{content.date}</p>
                        </div>
                        <p className="text-lg">
                            {content.content}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DocumentReader;
