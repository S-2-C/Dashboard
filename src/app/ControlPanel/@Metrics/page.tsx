"use client";
import Link from "next/link";
// import a question mark icon
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserRole } from "@/hooks/useUserRole";
import { useQueueMetrics } from "@/hooks/useDataMetricV2"; // Updated import
import { fetchListUsers } from "@/fetching/fetchingListAgent";
import { useEffect } from "react";
import { useState } from "react";

interface Agent {
  Id: string;
  Username: string;
}

export default function MetricsSlot() {
  const agent = useUserRole();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [weeksAgo, setWeeksAgo] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchListUsers();
      setAgents(response.data);
      console.log("Agents", response.data);
    };

    fetchData();
  }, []);

  const channelIds = {
    walmartDelivery: "46bf33f7-3381-4db1-a3f7-85eafdf04578",
    walmartOnline: "4948d5e2-1434-44dd-a78f-37cbeb96d1d9",
    walmartPhysicalStore: "f617a7d6-2be6-4f9b-b365-600fd3fc8646",
    walmartPass: "fe0bd989-c3d1-4959-a47c-b7d27def9a99",
  };

  const { getMetricValue: getMetricValueWalmartDelivery } = useQueueMetrics(
    channelIds.walmartDelivery,
    weeksAgo * 7
  );
  const { getMetricValue: getMetricValueWalmartOnline } = useQueueMetrics(
    channelIds.walmartOnline,
    weeksAgo * 7
  );
  const { getMetricValue: getMetricValueWalmartPhysicalStore } =
    useQueueMetrics(channelIds.walmartPhysicalStore, weeksAgo * 7);

  const { getMetricValue: getMetricValueWalmartPass } = useQueueMetrics(
    channelIds.walmartPass,
    weeksAgo * 7
  );

  const metrics = [
    {
      title: "Average Talk Time",
      values: {
        "Walmart Delivery": getMetricValueWalmartDelivery("AVG_TALK_TIME"),
        "Walmart Online": getMetricValueWalmartOnline("AVG_TALK_TIME"),
        "Walmart Physical Store":
          getMetricValueWalmartPhysicalStore("AVG_TALK_TIME"),
        "Walmart Pass": getMetricValueWalmartPass("AVG_TALK_TIME"),
      },
    },
    {
      title: "Average Resolution Time",
      values: {
        "Walmart Delivery": getMetricValueWalmartDelivery(
          "AVG_RESOLUTION_TIME"
        ),
        "Walmart Online": getMetricValueWalmartOnline("AVG_RESOLUTION_TIME"),
        "Walmart Physical Store": getMetricValueWalmartPhysicalStore(
          "AVG_RESOLUTION_TIME"
        ),
        "Walmart Pass": getMetricValueWalmartPass("AVG_RESOLUTION_TIME"),
      },
    },
    {
      title: "Contacts Queued",
      values: {
        "Walmart Delivery": getMetricValueWalmartDelivery("CONTACTS_QUEUED"),
        "Walmart Online": getMetricValueWalmartOnline("CONTACTS_QUEUED"),
        "Walmart Physical Store":
          getMetricValueWalmartPhysicalStore("CONTACTS_QUEUED"),
        "Walmart Pass": getMetricValueWalmartPass("CONTACTS_QUEUED"),
      },
    },
    {
      title: "Contacts Handled",
      values: {
        "Walmart Delivery": getMetricValueWalmartDelivery("CONTACTS_HANDLED"),
        "Walmart Online": getMetricValueWalmartOnline("CONTACTS_HANDLED"),
        "Walmart Physical Store":
          getMetricValueWalmartPhysicalStore("CONTACTS_HANDLED"),
        "Walmart Pass": getMetricValueWalmartPass("CONTACTS_HANDLED"),
      },
    },
    {
      title: "Average Queue Answer Time",
      values: {
        "Walmart Delivery": getMetricValueWalmartDelivery(
          "AVG_QUEUE_ANSWER_TIME"
        ),
        "Walmart Online": getMetricValueWalmartOnline("AVG_QUEUE_ANSWER_TIME"),
        "Walmart Physical Store": getMetricValueWalmartPhysicalStore(
          "AVG_QUEUE_ANSWER_TIME"
        ),
        "Walmart Pass": getMetricValueWalmartPass("AVG_QUEUE_ANSWER_TIME"),
      },
    },
  ];

  const handleNextMetric = () => {
    setCurrentMetricIndex((prevIndex) => (prevIndex + 1) % metrics.length);
  };

  const handlePrevMetric = () => {
    setCurrentMetricIndex(
      (prevIndex) => (prevIndex - 1 + metrics.length) % metrics.length
    );
  };

  return (
    <div className="py-4">
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div className="flex-1  ">
            <div className="h-full ">
              <div className=" bg-metrics overflow-scroll no-scrollbar sm:h-40 lg:h-40 xl:h-max  rounded-lg shadow-md p-4">
                <div className="p-4">
                  <h1 className="text-3xl font-bold text-center p-4">
                    {metrics[currentMetricIndex].title}
                  </h1>
                  {Object.entries(metrics[currentMetricIndex].values).map(
                    ([key, value], idx) => (
                      <p key={idx} className="text-lg">
                        <span className="font-bold">{key}</span>: {value}
                      </p>
                    )
                  )}
                </div>

                <div className="sm:flex hidden justify-between">
                  <button
                    className="bg-teal text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:shadow-teal-500/50 transition-shadow duration-300"
                    onClick={handlePrevMetric}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-teal text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:shadow-teal-500/50 transition-shadow duration-300"
                    onClick={handleNextMetric}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-red-500 hover:bg-figma-figma9 rounded-lg shadow-md p-4 overflow-hidden sm:h-56 md:h-64 lg:h-64 xl:h-full">
          <button className="w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center p-4">
              <FontAwesomeIcon
                icon={faQuestion}
                className="text-white text-4xl mr-4"
              />
              <h1 className="text-4xl font-bold text-white">Ask for help</h1>
            </div>
            <div className="flex items-center justify-center px-3">
              <text className="text-white">
                Ask your supervisor for help with a call or anything needed.
              </text>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
