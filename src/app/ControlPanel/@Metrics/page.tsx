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
import { askForHelp } from "@/fetching/mutatationFunctions";

interface Agent {
  Id: string;
  Username: string;
}

const formatDecimals = (value: any, decimal: any, unit: any) => {
  if (value !== undefined && value !== null && !isNaN(value)) {
    return `${Number(value).toFixed(decimal)} ${unit}`;
  }
  return value; // Return NaN or other invalid values as is, without the unit
};

export default function MetricsSlot() {
  const agent = useUserRole();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [isAskingForHelp, setIsAskingForHelp] = useState<boolean>(false);
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

  useEffect(() => {
    if (agent) setIsAskingForHelp(agent?.needsHelp);
  }, [agent]);

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
        "Walmart Delivery": formatDecimals(
          getMetricValueWalmartDelivery("AVG_TALK_TIME"),
          2,
          "s"
        ),
        "Walmart Online": formatDecimals(
          getMetricValueWalmartOnline("AVG_TALK_TIME"),
          2,
          "s"
        ),
        "Walmart Physical Store": formatDecimals(
          getMetricValueWalmartPhysicalStore("AVG_TALK_TIME"),
          2,
          "s"
        ),
        "Walmart Pass": formatDecimals(
          getMetricValueWalmartPass("AVG_TALK_TIME"),
          2,
          "s"
        ),
      },
    },
    {
      title: "Average Resolution Time",
      values: {
        "Walmart Delivery": formatDecimals(
          getMetricValueWalmartDelivery("AVG_RESOLUTION_TIME"),
          2,
          "s"
        ),
        "Walmart Online": formatDecimals(
          getMetricValueWalmartOnline("AVG_RESOLUTION_TIME"),
          2,
          "s"
        ),
        "Walmart Physical Store": formatDecimals(
          getMetricValueWalmartPhysicalStore("AVG_RESOLUTION_TIME"),
          2,
          "s"
        ),
        "Walmart Pass": formatDecimals(
          getMetricValueWalmartPass("AVG_RESOLUTION_TIME"),
          2,
          "s"
        ),
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
        "Walmart Delivery": formatDecimals(
          getMetricValueWalmartDelivery("AVG_QUEUE_ANSWER_TIME"),
          2,
          "s"
        ),
        "Walmart Online": formatDecimals(
          getMetricValueWalmartOnline("AVG_QUEUE_ANSWER_TIME"),
          2,
          "s"
        ),
        "Walmart Physical Store": formatDecimals(
          getMetricValueWalmartPhysicalStore("AVG_QUEUE_ANSWER_TIME"),
          2,
          "s"
        ),
        "Walmart Pass": formatDecimals(
          getMetricValueWalmartPass("AVG_QUEUE_ANSWER_TIME"),
          2,
          "s"
        ),
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
          <div className="flex-1 bg-metrics sm:h-52 lg:h-52 xl:h-72 rounded-lg shadow-md p-4 ">
            <div className="h-5/6 p-2">
              <h1 className="sm:text-xl xl:text-2xl font-bold text-center p-2 pt-1 ">
                {metrics[currentMetricIndex].title}
              </h1>
              {Object.entries(metrics[currentMetricIndex].values).map(
                ([key, value], idx) => (
                  <p key={idx} className="sm:text-xs xl:text-lg">
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
        </>
      ) : (
        <div
          className={`${
            isAskingForHelp ? "bg-red-500 " : "bg-figma-figma9"
          }  rounded-lg shadow-md p-4 overflow-hidden sm:h-56 md:h-64 lg:h-64 xl:h-full`}
        >
          {agent ? (
            <button
              className="w-full flex flex-col items-center justify-center"
              onClick={() => {
                askForHelp(agent?.id, !isAskingForHelp);
                setIsAskingForHelp(!isAskingForHelp);
              }}
            >
              <div className="flex items-center justify-center p-4">
                <FontAwesomeIcon
                  icon={faQuestion}
                  className="text-white text-4xl mr-4"
                />
                <h1 className="text-4xl font-bold text-white">
                  {isAskingForHelp ? "Asking for help" : "Ask for help"}
                </h1>
              </div>
              <div className="flex items-center justify-center px-3">
                <text className="text-white">
                  Ask your supervisor for help with a call or anything needed.
                </text>
              </div>
            </button>
          ) : (
            <div className=" w-full h-full flex items-center justify-center">
              <div role="status" className="">
                <svg
                  aria-hidden="true"
                  className="w-20 h-20 text-[#8BC4E6] animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
