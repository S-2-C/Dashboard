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
    faSignOutAlt,
    faPhone,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



export default function Notifications() {
    return (
        <div>
            <div className="h-full flex">
                <Home />
                <div className="mt-20  flex-col ml-40">
                    <div className="">
                        <div className="h-16 p-4 m-4">
                            <h1 className="text-figma-figma5 font-bold text-4xl">Channels</h1>
                        </div>
                        <div>
                            <Accordion className="w-full" type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Sales </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="h-21 p-2 bg-figma-figma6 flex w-full rounded-2xl">
                                            <div className="mr-4 bg-figma-figma1 p-2 w-1/3">
                                                <div>Calls in queue</div>
                                                <div className="flex flex-row justify-end">
                                                    <div className="pr-4 w-1/3">
                                                        <FontAwesomeIcon icon={faPhone} className="text-figma-figma5 my-4 text-2xl" />
                                                    </div>
                                                    <div className="bg-figma-figma2 pt-4 w-2/3 flex justify-center">
                                                        <p className="text-xl">5</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mr-4 bg-figma-figma1 p-2 w-1/3">
                                                <div>Total Agents</div>
                                                <div className="flex">
                                                    <div className="pr-4 w-1/3">
                                                        <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-4 text-2xl" />
                                                    </div>
                                                    <div className="bg-figma-figma2 pt-4 w-2/3 flex justify-center">
                                                        <p className="text-xl">5</p>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="mr-4 bg-figma-figma1 p-2 w-1/3">
                                                <div>Available Agents</div>
                                                <div className="flex">
                                                    <div className="pr-4 w-1/3">
                                                        <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-4 text-2xl" />
                                                    </div>
                                                    <div className="bg-figma-figma2 pt-4 w-2/3 flex justify-center">
                                                        <p className="text-xl">5</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                
                            </Accordion>
                        </div>
                        <div>
                            <Accordion className="w-full" type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Sales </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="h-21 p-2 bg-figma-figma6 flex w-full rounded-2xl">
                                            <div className="mr-4 bg-figma-figma1 p-2 w-1/3">
                                                <div>Calls in queue</div>
                                                <div className="flex flex-row justify-end">
                                                    <div className="pr-4 w-1/3">
                                                        <FontAwesomeIcon icon={faPhone} className="text-figma-figma5 my-4 text-2xl" />
                                                    </div>
                                                    <div className="bg-figma-figma2 pt-4 w-2/3 flex justify-center">
                                                        <p className="text-xl">5</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mr-4 bg-figma-figma1 p-2 w-1/3">
                                                <div>Total Agents</div>
                                                <div className="flex">
                                                    <div className="pr-4 w-1/3">
                                                        <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-4 text-2xl" />
                                                    </div>
                                                    <div className="bg-figma-figma2 pt-4 w-2/3 flex justify-center">
                                                        <p className="text-xl">5</p>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="mr-4 bg-figma-figma1 p-2 w-1/3">
                                                <div>Available Agents</div>
                                                <div className="flex">
                                                    <div className="pr-4 w-1/3">
                                                        <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-4 text-2xl" />
                                                    </div>
                                                    <div className="bg-figma-figma2 pt-4 w-2/3 flex justify-center">
                                                        <p className="text-xl">5</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                
                            </Accordion>
                        </div>

                        <div className="w-200 bg-figma- rounded-full overflow-hidden">
                            <div className="h-6 bg-green-500 rounded-full w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}