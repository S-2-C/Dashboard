'use client'
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
import SearchBar from '../searchBar'; //importing the SearchBar component
import { useEffect } from "react";
import { useState } from "react";
import { fetchListQueues } from "@/fetching/fetchingListQueues";
import { fetchCurrentMetricData } from "@/fetching/fetchingGetCurrentMetricData";

function getChannelsQueues(channels: any, data: any) {
    let getChannelsQueues = []
    for (let i = 0; i < channels.length; i++) {
        for (let j = 0; j < data.data.length; j++) {
            if (channels[i] === data.data[j].Name) {
                getChannelsQueues.push(data.data[j])
            }
        }
    }
    return getChannelsQueues
}
export default function Notifications() {
    // Make a useState for the data
    const [QueueMetrics, setQueueMetrics] = useState([]);
    const [CurrentMetricData, setMetricData] = useState([]);
    //I need to create a set for currentMetricData

    useEffect(() => {
        const channels = ["Walmart Pass", "Walmart Physical Store", "Walmart Online", "Walmart Delivery"]
        const fetchData = async () => {
            const data = await fetchListQueues();
           
            const channelsQueues = getChannelsQueues(channels, data)

            localStorage.setItem("queueData", JSON.stringify(channelsQueues)); // Saving data to local storage
            // Get all queues 
            const QueueIds = channelsQueues.map((queue: any) => queue.Id)
            // Join the QueueIds to a string
            const QueueIdsString = QueueIds.join(",")

            // Fetch the current metric data
            const currentMetricData = await fetchCurrentMetricData(QueueIdsString);
            console.log("queue",currentMetricData);
            // Set the state of the data
            setMetricData(currentMetricData.data);
            // Set the state of the data
            setQueueMetrics(currentMetricData.data);

            //Need to create a set for currentMetric data



        };
        fetchData();
    }, []);

    console.log("helo",QueueMetrics)

    return (
        <div>
            <div className="h-screen flex w-full">
                <Home />
                <div className="mt-12  flex-col ml-40 w-full">
                    {/* <div className="flex justify-end">
                        <SearchBar />
                    </div> */}
                    <div className="h-12 p-4 m-1">
                        <h1 className="text-figma-figma5 font-bold text-4xl">Channels</h1>
                        <h1 className="text-figma-figma5 font-bold text-4xl">
    {QueueMetrics.length > 0 && QueueMetrics[0].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value}
</h1>
                    </div>
                    <div className="w-full h-screen overflow-y-auto">
                        <Accordion className="" type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex items-center">Online Store
                                    <div className="bg-figma-figma8 h-4 w-4 flex justify-end rounded-2xl items-center m-1"></div>
                                    <div className="w-2/4 "></div>
                                </AccordionTrigger>
                                <div className="w-full bg-figma-figma6 rounded-full overflow-hidden shadow-md ">
                                    <div className="h-4 bg-figma-figma8 rounded-full w-1/2"></div>
                                </div>
                                <AccordionContent>
                                    <div className="h-20 p-1 bg-figma-figma6 flex w-full rounded-2xl shadow-md mt-2">
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Calls in queue</div>
                                            <div className="flex flex-row justify-end">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faPhone} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">5</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Total Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                <b className="text-xl">{QueueMetrics.length > 0 && (QueueMetrics[0].queue_metrics.find(metric => metric.Metric === 'AGENTS_ON_CALL')?.Value || 0) + (QueueMetrics[0].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value || 0)}</b>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="mr-4 p-2 w-1/3">
                                            <div>Available Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">{QueueMetrics.length > 0 && QueueMetrics[0].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion className="" type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex items-center">Fisical Store
                                    <div className="bg-figma-figma9 h-4 w-4 flex justify-end rounded-2xl items-center m-1"></div>
                                    <div className="w-2/4 "></div>
                                </AccordionTrigger>
                                <div className="w-full bg-figma-figma6 rounded-full overflow-hidden shadow-md ">
                                    <div className="h-4 bg-figma-figma9 rounded-full w-3/5"></div>
                                </div>
                                <AccordionContent>
                                    <div className="h-20 p-1 bg-figma-figma6 flex w-full rounded-2xl shadow-md mt-2">
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Calls in queue</div>
                                            <div className="flex flex-row justify-end">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faPhone} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">5</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Total Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                <b className="text-xl">{QueueMetrics.length > 0 && (QueueMetrics[1].queue_metrics.find(metric => metric.Metric === 'AGENTS_ON_CALL')?.Value || 0) + (QueueMetrics[1].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value || 0)}</b>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="mr-4 p-2 w-1/3">
                                            <div>Available Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">{QueueMetrics.length > 0 && QueueMetrics[1].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion className="" type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex items-center">Walmart Express
                                    <div className="bg-figma-figma10 h-4 w-4 flex justify-end rounded-2xl items-center m-1"></div>
                                    <div className="w-2/4 "></div>
                                </AccordionTrigger>
                                <div className="w-full bg-figma-figma6 rounded-full overflow-hidden shadow-md ">
                                    <div className="h-4 bg-figma-figma10 rounded-full w-3/4"></div>
                                </div>
                                <AccordionContent>
                                    <div className="h-20 p-1 bg-figma-figma6 flex w-full rounded-2xl shadow-md mt-2">
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Calls in queue</div>
                                            <div className="flex flex-row justify-end">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faPhone} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">5</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Total Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                <b className="text-xl">{QueueMetrics.length > 0 && (QueueMetrics[2].queue_metrics.find(metric => metric.Metric === 'AGENTS_ON_CALL')?.Value || 0) + (QueueMetrics[2].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value || 0)}</b>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="mr-4 p-2 w-1/3">
                                            <div>Available Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">{QueueMetrics.length > 0 && QueueMetrics[2].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion className="" type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="flex items-center">Delivery
                                    <div className="bg-figma-figma8 h-4 w-4 flex justify-end rounded-2xl items-center m-1"></div>
                                    <div className="w-2/4 "></div>
                                </AccordionTrigger>
                                <div className="w-full bg-figma-figma6 rounded-full overflow-hidden shadow-md ">
                                    <div className="h-4 bg-figma-figma8 rounded-full w-1/3"></div>
                                </div>
                                <AccordionContent>
                                    <div className="h-20 p-1 bg-figma-figma6 flex w-full rounded-2xl shadow-md mt-2">
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Calls in queue</div>
                                            <div className="flex flex-row justify-end">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faPhone} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">5</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mr-4  p-2 w-1/3">
                                            <div>Total Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">{QueueMetrics.length > 0 && (QueueMetrics[3].queue_metrics.find(metric => metric.Metric === 'AGENTS_ON_CALL')?.Value || 0) + (QueueMetrics[3].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value || 0)}</b>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="mr-4 p-2 w-1/3">
                                            <div>Available Agents</div>
                                            <div className="flex">
                                                <div className="pr-4 w-1/3">
                                                    <FontAwesomeIcon icon={faUser} className="text-figma-figma5 my-1 text-2xl" />
                                                </div>
                                                <div className=" pt-4 w-2/3 flex justify-center">
                                                    <b className="text-xl">{QueueMetrics.length > 0 && QueueMetrics[3].queue_metrics.find(metric => metric.Metric === 'AGENTS_AVAILABLE')?.Value}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>

    )
}