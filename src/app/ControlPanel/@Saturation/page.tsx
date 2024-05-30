"use client";
import React from "react";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import { documents } from "@/app/content/relevantFiles";
import AgentDocumentReader from "@/components/agentDocumentReader";
import { useEffect } from "react";
import { useState } from "react";
import { fetchListQueues } from "@/fetching/fetchingListQueues";
import { fetchCurrentMetricData } from "@/fetching/fetchingGetCurrentMetricData";
import { getChannelsQueues, sortQueues } from "@/app/Channels/page";

const ITEMS_PER_PAGE = 9;

interface Metric {
  Metric: string;
  Value: number;
}

interface QueueMetric {
  queue_metrics: Metric[];
}

export default function SaturationSlot() {
  const agent = useUserRole();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("All");
  const [QueueMetrics, setQueueMetrics] = useState<QueueMetric[]>([]);

  useEffect(() => {
    const channels = [
      "Walmart Pass",
      "Walmart Physical Store",
      "Walmart Online",
      "Walmart Delivery",
    ];

    const fetchData = async () => {
      const QueueIdsString =
        "fe0bd989-c3d1-4959-a47c-b7d27def9a99,f617a7d6-2be6-4f9b-b365-600fd3fc8646,4948d5e2-1434-44dd-a78f-37cbeb96d1d9,46bf33f7-3381-4db1-a3f7-85eafdf04578";

      // Fetch the current metric data
      const currentMetricData = await fetchCurrentMetricData(QueueIdsString);

      // sort the queues
      const sortedQueues = sortQueues(currentMetricData.data);

      // Set the state of the data
      // setMetricData(currentMetricData.data);
      // Set the state of the data
      setQueueMetrics(sortedQueues);
      console.log("QueueMetrics", sortedQueues);
    };

    fetchData(); // Fetch data immediately on component mount

    const intervalId = setInterval(fetchData, 10000); // Fetch data every 2 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  //Calculates percentage of agents that are busy.
  const calculateAgentsOnCallPercentage = (queueMetrics: Metric[]) => {
    const agentsOnCall =
      queueMetrics.find((metric) => metric.Metric === "AGENTS_ON_CALL")
        ?.Value || 0;
    const agentsAvailable =
      queueMetrics.find((metric) => metric.Metric === "AGENTS_AVAILABLE")
        ?.Value || 0;
    const queueLength =
      queueMetrics.find((metric) => metric.Metric === "CONTACTS_IN_QUEUE")
        ?.Value || 0;
    const totalAgents = agentsOnCall + agentsAvailable;
    if (queueLength > agentsAvailable && queueLength > 0) {
      // console.log("checking length, agents", queueLength, agentsAvailable)
      return 100;
    }
    // console.log("not 100")
    return totalAgents > 0 ? (agentsOnCall / totalAgents) * 100 : 0;
  };

  const filteredDocuments =
    filterType === "All"
      ? documents
      : documents.filter((doc) => doc.type === filterType);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (type: any) => {
    setFilterType(type);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div className="bg-blue-dark flex flex-col rounded-lg shadow-md h-96">
            <Link href="/Channels">
              <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
                  Saturation in channels
                </h1>
              </div>
            </Link>
            <div className="overflow-auto h-[65%] no-scrollbar">
              <div className="text-white sm:w-full,px-2 md:w-full lg:w-[calc(60vw-32rem)],px-2 xl:w-[calc(60vw-32rem)] px-8 flex-wrap">
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Physical Store</span>
                  <div
                    className={`${
                      QueueMetrics.length > 0
                        ? (() => {
                            const percentage = calculateAgentsOnCallPercentage(
                              QueueMetrics[2].queue_metrics
                            );
                            return percentage === 0
                              ? "bg-figma-figma8"
                              : percentage <= 33
                              ? "bg-figma-figma8"
                              : percentage > 33 && percentage <= 66
                              ? "bg-figma-figma9"
                              : "bg-figma-figma10";
                          })()
                        : "bg-figma-figma8"
                    } h-4 w-4 flex justify-end rounded-2xl items-center m-1`}
                  ></div>{" "}
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Walmart®.com</span>
                  {/* <div className="bg-figma-figma10 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div> */}
                  <div
                    className={`${
                      QueueMetrics.length > 0
                        ? (() => {
                            const percentage = calculateAgentsOnCallPercentage(
                              QueueMetrics[1].queue_metrics
                            );
                            return percentage === 0
                              ? "bg-figma-figma8"
                              : percentage <= 33
                              ? "bg-figma-figma8"
                              : percentage > 33 && percentage <= 66
                              ? "bg-figma-figma9"
                              : "bg-figma-figma10";
                          })()
                        : "bg-figma-figma8"
                    } h-4 w-4 flex rounded-full ml-4 md:ml-8`}
                  ></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Walmart Pass</span>
                  <div
                    className={`${
                      QueueMetrics.length > 0
                        ? (() => {
                            const percentage = calculateAgentsOnCallPercentage(
                              QueueMetrics[3].queue_metrics
                            );
                            return percentage === 0
                              ? "bg-figma-figma8"
                              : percentage <= 33
                              ? "bg-figma-figma8"
                              : percentage > 33 && percentage <= 66
                              ? "bg-figma-figma9"
                              : "bg-figma-figma10";
                          })()
                        : "bg-figma-figma8"
                    } h-4 w-4 flex justify-end rounded-2xl items-center m-1`}
                  ></div>{" "}
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Delivery</span>
                  <div
                    className={`${
                      QueueMetrics.length > 0
                        ? (() => {
                            const percentage = calculateAgentsOnCallPercentage(
                              QueueMetrics[0].queue_metrics
                            );
                            return percentage === 0
                              ? "bg-figma-figma8"
                              : percentage <= 33
                              ? "bg-figma-figma8"
                              : percentage > 33 && percentage <= 66
                              ? "bg-figma-figma9"
                              : "bg-figma-figma10";
                          })()
                        : "bg-figma-figma8"
                    } h-4 w-4 flex justify-end rounded-2xl items-center m-1`}
                  ></div>{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blue-dark flex flex-col rounded-lg shadow-md  overflow-auto">
          <Link href="/Documentation">
            <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
                Documentation
              </h1>
            </div>
          </Link>
          <div className="mt-3 px-4 flex flex-wrap h-full overflow-scroll no-scrollbar">
            <div className="flex flex-wrap pr-4">
              {currentDocuments.map((item, index) => (
                <AgentDocumentReader content={item} index={index} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
