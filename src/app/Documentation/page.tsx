import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTriangleExclamation,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import Home from "../NavBar" // Importing the NavBar component
import SearchBar  from '../searchBar'; //importing the SearchBar component
export default async function Documentation() {
    
    return (
        <div>
            <div className="h-screen flex w-full">
                <Home />
                <div className="flex flex-col mt-12 ml-40 w-full mr-36">
                    <div className="w-full flex text-left"> 
                        <SearchBar />
                    </div>
                    <div className="h-12 p-4 m-1 mb-8">
                        <h1 className="text-figma-figma5 font-bold text-4xl">Documentation</h1>
                    </div>
                    <div className="h-12 flex">
                        <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                            All
                        </button>
                        <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                            Sales
                        </button>
                        <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                            Walmart.com
                        </button>
                        <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                            Walmart Express
                        </button>
                        <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                            Agent Training
                        </button>
                        <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                            FAQ
                        </button>


                    </div>
                    <div className="h-full mt-8 flex flex-wrap">
                        <button className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue ">
                            <div className="text-3xl font-bold mb-2">Sentiment Analysis</div>
                            <div className="font-bold mb-2">How to use the sentiment analysis tool</div>
                            <div className="text-sm text-left justify-end">Last Updated: 2024<div />
                            </div>

                        </button>
                        <button className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue ">
                            <div className="text-3xl font-bold mb-2">Sentiment Analysis</div>
                            <div className="font-bold mb-2">How to use the sentiment analysis tool</div>
                            <div className="text-sm text-left justify-end">Last Updated: 2024<div />
                            </div>

                        </button>
                        <button className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue ">
                            <div className="text-3xl font-bold mb-2">Sentiment Analysis</div>
                            <div className="font-bold mb-2">How to use the sentiment analysis tool</div>
                            <div className="text-sm text-left justify-end">Last Updated: 2024<div />
                            </div>

                        </button>
                        <button className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue ">
                            <div className="text-3xl font-bold mb-2">Sentiment Analysis</div>
                            <div className="font-bold mb-2">How to use the sentiment analysis tool</div>
                            <div className="text-sm text-left justify-end">Last Updated: 2024<div />
                            </div>

                        </button>
                        <button className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue ">
                            <div className="text-3xl font-bold mb-2">Sentiment Analysis</div>
                            <div className="font-bold mb-2">How to use the sentiment analysis tool</div>
                            <div className="text-sm text-left justify-end">Last Updated: 2024<div />
                            </div>

                        </button>
                        <button className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue ">
                            <div className="text-3xl font-bold mb-2">Sentiment Analysis</div>
                            <div className="font-bold mb-2">How to use the sentiment analysis tool</div>
                            <div className="text-sm text-left justify-end">Last Updated: 2024<div />
                            </div>

                        </button>                       
                    </div>
                </div>
            </div>



        </div>

    );
}