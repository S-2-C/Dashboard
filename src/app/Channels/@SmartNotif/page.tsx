import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTriangleExclamation,
    faUser
} from '@fortawesome/free-solid-svg-icons';
export default async function SaturationSlot() {
    return (
        <div className="flex flex-col justify-start items-center h-full w-full pt-30 ">
            <div className="h-40 bg-figma-figma7 w-5/6 rounded-2xl p-4">
                <div className="h-2/3 flex">
                    <div>
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-figma-figma10 my-4 text-6xl" />
                    </div>
                    <div className="p-4 text-figma-figma4">
                        <p>You should consider reassgining more agents to the Walmart.com channel</p>
                    </div>
                </div>

                <div className="mb-4 flex justify-center">
                    <button className="bg-figma-figma10 test-figma-figma4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Reassign
                    </button>
                </div>
            </div>
            <div className="h-16 bg-figma-figma1 w-5/6 mt-5 rounded-2xl p-4"> hello</div>
            <div className="h-16 bg-figma-figma3 w-5/6 mt-5 rounded-2xl p-4"> hello</div>
            <div className="h-32 bg-figma-figma1 w-5/6 mt-5 rounded-2xl p-4"> hello</div>
        </div>
    );
}