"use client";
import React, { useEffect, useState } from "react";
import Home from "../NavBar";
import SearchBar from "../searchBar";
import { Flex, Heading, Text, Button } from "@aws-amplify/ui-react";
import { useQueueMetrics, useAgentMetrics } from "@/hooks/useDataMetricV2"; // Updated import
import { fetchListUsers } from "@/fetching/fetchingListAgent";
import Modal from "@/components/ui/Modal";

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

const getMetricColor = (
  metric: any,
  goodThreshold: any,
  badThreshold: any,
  isHigherBetter = true
) => {
  if (metric === "N/A") return "black"; // neutral for "N/A"
  const metricValue = parseFloat(metric);
  if (isNaN(metricValue)) return "black"; // neutral for NaN
  if (isHigherBetter) {
    return metricValue >= goodThreshold
      ? "green"
      : metricValue <= badThreshold
      ? "red"
      : "black";
  } else {
    return metricValue <= goodThreshold
      ? "green"
      : metricValue >= badThreshold
      ? "red"
      : "black";
  }
};

export default function Metrics() {
  const [agents, setAgents] = useState<Agent[]>([]);
  // const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [weeksAgo, setWeeksAgo] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchListUsers();
      setAgents(response.data);
      console.log("Agents", response.data);
    };

    fetchData();
  }, []);

  const handleWeeksChange = (weeks: number) => {
    setWeeksAgo(weeks);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const { getMetricValue: getMetricValueAgent } = useAgentMetrics(
    selectedAgents.map((agent) => agent.Id),
    weeksAgo * 7
  );

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgents((prevSelectedAgents) => {
      if (prevSelectedAgents.find((a) => a.Id === agent.Id)) {
        return prevSelectedAgents.filter((a) => a.Id !== agent.Id);
      } else {
        return [...prevSelectedAgents, agent];
      }
    });
  };

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
  // const formatDecimals = (value:any, decimal:any, unit:any) => {
  //   if (value !== undefined && value !== null && !isNaN(value)) {
  //     return `${Number(value).toFixed(decimal)} ${unit}`;
  //   }
  //   return value; // Return NaN or other invalid values as is, without the unit
  // };

  return (
    <div className="flex h-screen bg-background text-foreground relative ">
      <Home />
      <div className="flex flex-col flex-1 p-10 ml-20">
        <div className="flex justify-between items-center mb-6">
          <Heading level={1} fontWeight="Bold">
            Performance Metrics
          </Heading>
          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>
        </div>
        <div
          className="flex flex-col "
          style={{ height: "calc(100vh - 130px)" }}
        >
          {/* <Text className="text-sans mb-6">Here are some metrics</Text> */}

          <div className="flex mb-6">
            <div className="flex ">
              <button
                className=" mr-2 w-36 p-2 rounded-xl shadow-md flex justify-center items-center  hover:bg-figma-figma6 bg-blue text-figma-figma1"
                onClick={() => handleWeeksChange(1)}
              >
                1 Week
              </button>
              <button
                className=" mr-2 w-36 p-2 rounded-xl shadow-md flex justify-center items-center hover:bg-figma-figma6 bg-blue text-figma-figma1"
                onClick={() => handleWeeksChange(2)}
              >
                2 Weeks
              </button>
              <button
                className=" mr-2 w-36 p-2 rounded-xl shadow-md flex justify-center items-center hover:bg-figma-figma6 bg-blue text-figma-figma1"
                onClick={() => handleWeeksChange(3)}
              >
                3 Weeks
              </button>
              <button
                className=" mr-2 w-36 p-2 rounded-xl shadow-md flex justify-center items-center hover:bg-figma-figma6 bg-blue text-figma-figma1"
                onClick={() => handleWeeksChange(4)}
              >
                4 Weeks
              </button>
            </div>
            <div className="flex">
              <button
                className=" mr-2 w-36 p-2 rounded-xl shadow-md flex justify-center items-center hover:bg-figma-figma6 bg-blue text-figma-figma1"
                onClick={handleOpenModal}
              >
                Show Agents
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
            {/* General Metrics */}
            <div className="flex-1  overflow-scroll no-scrollbar">
              <div className="flex-1  overflow-scroll">
                <div className="h-full overflow-scroll 0">
                  {metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-figma-figma13 rounded-xl p-4 shadow-md flex flex-col mb-4"
                    >
                      <p className="text-xl font-bold mb-2">{metric.title}</p>
                      {Object.entries(metric.values).map(
                        ([key, value], idx) => (
                          <p key={idx} className="text-lg">
                            {key}: {value}
                          </p>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-scroll no-scrollbar">
              {selectedAgents.length > 0 ? (
                selectedAgents.map((agent) => (
                  <div key={agent.Id} className="pb-4">
                    <Text className="text-lg">
                      Selected Agent: {agent.Username}
                    </Text>
                    <div className="bg-figma-figma11 rounded-xl p-4 shadow-md flex flex-col mt-4">
                      <p className="text-xl font-bold mb-2">Agent Metrics</p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(
                              agent.Id,
                              "AVG_CONTACT_DURATION"
                            ),
                            180,
                            300,
                            false
                          ),
                        }}
                      >
                        Average Contact Duration:{" "}
                        {formatDecimals(
                          getMetricValueAgent(agent.Id, "AVG_CONTACT_DURATION"),
                          2,
                          "s"
                        )}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(agent.Id, "AVG_HANDLE_TIME"),
                            300,
                            600,
                            false
                          ),
                        }}
                      >
                        Average Handle Time:{" "}
                        {formatDecimals(
                          getMetricValueAgent(agent.Id, "AVG_HANDLE_TIME"),
                          2,
                          "s"
                        )}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(agent.Id, "CONTACTS_HANDLED"),
                            10,
                            5,
                            true
                          ),
                        }}
                      >
                        Contacts Handled:{" "}
                        {formatDecimals(
                          getMetricValueAgent(agent.Id, "CONTACTS_HANDLED"),
                          0,
                          ""
                        )}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(agent.Id, "AVG_HOLD_TIME"),
                            300,
                            90,
                            false
                          ),
                        }}
                      >
                        Average Hold Time:{" "}
                        {formatDecimals(
                          getMetricValueAgent(agent.Id, "AVG_HOLD_TIME"),
                          1,
                          "s"
                        )}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(
                              agent.Id,
                              "AVG_INTERRUPTIONS_AGENT"
                            ),
                            8,
                            3,
                            false
                          ),
                        }}
                      >
                        Average Interruptions Agent:{" "}
                        {getMetricValueAgent(
                          agent.Id,
                          "AVG_INTERRUPTIONS_AGENT"
                        ) || "N/A"}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(agent.Id, "AGENT_OCCUPANCY"),
                            90,
                            60,
                            true
                          ),
                        }}
                      >
                        Agent Occupancy:{" "}
                        {formatDecimals(
                          getMetricValueAgent(agent.Id, "AGENT_OCCUPANCY"),
                          4,
                          "%"
                        )}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(
                              agent.Id,
                              "SUM_NON_PRODUCTIVE_TIME_AGENT"
                            ),
                            300,
                            600,
                            false
                          ),
                        }}
                      >
                        Sum Non-Productive Time Agent:{" "}
                        {getMetricValueAgent(
                          agent.Id,
                          "SUM_NON_PRODUCTIVE_TIME_AGENT"
                        ) || "N/A"}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(agent.Id, "AGENT_NON_RESPONSE"),
                            3,
                            7,
                            false
                          ),
                        }}
                      >
                        Agent Non-Response:{" "}
                        {getMetricValueAgent(agent.Id, "AGENT_NON_RESPONSE") ||
                          "N/A"}
                      </p>
                      <p
                        className="text-lg"
                        style={{
                          color: getMetricColor(
                            getMetricValueAgent(agent.Id, "AGENT_ANSWER_RATE"),
                            85,
                            60,
                            true
                          ),
                        }}
                      >
                        Agent Answer Rate:{" "}
                        {formatDecimals(
                          getMetricValueAgent(agent.Id, "AGENT_ANSWER_RATE"),
                          4,
                          "%"
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <Text className="text-lg">No agents selected</Text>
              )}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <Heading level={2} fontWeight="Bold">
              Agents
            </Heading>
            <ul>
              {agents.map((agent) => (
                <li key={agent.Id} className="text-lg">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAgents.some((a) => a.Id === agent.Id)}
                      onChange={() => handleAgentSelect(agent)}
                    />
                    {agent.Username}
                  </label>
                </li>
              ))}
            </ul>
          </Modal>
        )}
      </div>
    </div>
  );
}
