import { Button } from "@aws-amplify/ui-react";
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

const TextReader = ({content, index}: textReaderProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    return (
        <div key={index} className="flex flex-col pb-4 px-5">
            <h1 className=" text-base font-bold">{content.title}</h1>
            <p className=" text-sm font-extralight pb-1">{content.description}</p>
            <Button onClick={() => setIsPopoverVisible(true)} variation="primary">Open</Button>
            {isPopoverVisible && (
                <div className="flex justify-center items-center left-0 top-0 fixed w-screen h-screen">
                    <div className=" absolute w-screen h-screen backdrop-blur-lg bg-black bg-opacity-50" onClick={() => setIsPopoverVisible(false)}/>
                    <div className=" relative w-2/3 h-2/3 rounded-lg shadow-white overflow-y-scroll no-scrollbar shadow-md bg-stone-200 border-white z-50 p-10">
                    <button className=" absolute top-5 right-5 hover:scale-125 hover:text-red-600 transition-all ease-in" onClick={() => setIsPopoverVisible(false)}>X</button>
                        <div className=" sticky -top-10 py-5 bg-stone-200">
                            <h1 className=" text-2xl font-bold ">{content.title}</h1>
                            <p className=" text-base font-extralight pb-1 ">{content.description}</p>
                            <p className=" text-base font-extralight pb-1">{content.date}</p>
                        </div>
                        <p className=" text-lg">
                            {content.content}
                        </p>
                    </div>
                </div>   
            )}
        </div>
    )
}

export default TextReader;