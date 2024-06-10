import { Button } from "@aws-amplify/ui-react";
import { useState , useEffect} from "react";

interface textReaderProps {
    content: {
        title: string;
        description: string;
        content: string;
        date: string;
    };
    index: number;
}

const AgentDocumentReader = ({content, index}: textReaderProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [substringLength, setSubstringLength] = useState(20);

    useEffect(() => {
        const updateSubstringLength = () => {
          if (window.innerWidth >= 1280) { // 'xl' size in Tailwind CSS (≥1280px)
            setSubstringLength(30);
          } else {
            setSubstringLength(20);
          }
        };
    
        updateSubstringLength();
        window.addEventListener('resize', updateSubstringLength);
        return () => window.removeEventListener('resize', updateSubstringLength);
      }, []);

    return (
        <div key={index} className="flex flex-col">
            <button
                key={index}
                className="bg-figma-figma4 h-32 w-full m-2 p-4 flex justify-between items-center rounded-2xl shadow-lg text-left hover:bg-blue"
                onClick={() => setIsPopoverVisible(true)}
              >
               
                <div className="text-3xl font-bold mb-2 ">
                 {content.title.length > 10 ? content.title.substring(0, substringLength) + "..." : content.title}
                </div>
                <div className="font-bold mb-2">
                {content.description.length > 40 ? content.description.substring(0, 50) + "..." : content.description}
                </div>
                <div className="text-sm text-left justify-end">
                Last Updated: {content.date}
                </div>
                
            </button>
            {isPopoverVisible && (
                <div className="flex justify-center items-center left-0 top-0 fixed w-screen h-screen">
                    <div className=" absolute w-screen h-screen backdrop-blur-lg bg-black bg-opacity-50" onClick={() => setIsPopoverVisible(false)}/>
                    <div className=" relative w-2/3 h-2/3 rounded-lg shadow-white overflow-y-scroll no-scrollbar shadow-md bg-stone-200 border-white z-[9999] p-10">
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

export default AgentDocumentReader;