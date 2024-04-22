import Home from "../NavBar" // Importing the NavBar component
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartBar, 
    faTasks, 
    faUsers, 
    faCalendar, 
    faComments, 
    faUserTie, 
    faChartLine, 
    faBell, 
    faBook, 
    faFileAlt, 
    faCog, 
    faSignOutAlt 
  } from '@fortawesome/free-solid-svg-icons';



export default function Notifications(){
    return (
        <div className=" h-full flex">
            <Home />
            <div className="mt-20 flex flex-col ml-40">
                <div className="w-200">
                    <div className="h-16 w-64 p-4 m-4">
                        <h1 className="text-figma-figma1">Channels</h1>
                    </div>
                    
                    <div className="h-16 p-4 m-4">
                        <h2>Sales</h2>
                        <div className=" h-8 relative bg-figma-figma6 w-156"> 
                            <div className="absolute h-8 top-0 left-0 w-64 bg-figma-figma8"></div>
                        </div> 
                    </div>
                    <div className="p-4 m-4">
                        <h2>FAQ</h2>
                        <div className=" h-8 relative bg-figma-figma6 w-128"> 
                            <div className="h-8 absolute top-0 left-0 w-32 bg-figma-figma9"></div>
                        </div> 
                    </div>

                    <div className="h-16 p-4 m-4 bg-figma-figma1 flex ">
                        <div>
                            <div>Calls in queue</div>
                            <div>
                                <FontAwesomeIcon icon={faUsers} className="text-teal my-4 text-2xl" />
                            </div>
                        </div>
                        <div>
                            <p>Agents in this Channel</p>
                        </div>
                        <div>
                            <p>Available Agents</p>
                        </div>
                    </div>

                    <div className="h-16 p-4 m-4">
                        <h2>Walmart.com</h2>
                        <div className=" h-8 relative bg-figma-figma6 w-128">Hello 
                            <div className="absolute h-8 top-0 left-0 w-32 bg-figma-figma10"></div>
                        </div> 
                    </div>
                    <div className="h-16 p-4 m-4">
                        <h2>Walmart Express</h2>
                        <div className=" relative h-8 bg-figma-figma6 w-128">Hello 
                            <div className="absolute h-8 top-0 left-0 w-32 bg-figma-figma8"></div>
                        </div> 
                    </div>


                    <div className="h-16 p-4 m-4">
                        <h2>Walmart Express</h2>
                        <div className=" relative h-8 bg-figma-figma6 w-128">Hello 
                            <div className="absolute h-8 top-0 left-0 w-32 bg-figma-figma9"></div>
                        </div> 
                    </div>
                    
            
                </div>
            </div>
        </div>
    )
}