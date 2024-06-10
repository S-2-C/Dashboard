"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../searchBar";
import { Flex, Heading, Text, Button } from "@aws-amplify/ui-react";
import { useQueueMetrics, Metric } from "@/hooks/useDataMetricV2"; // Updated import
import { fetchListUsers } from "@/fetching/fetchingListAgent";
import Modal from "@/components/ui/Modal";
import BarChartSeconds from "@/components/barChart";
import { LucideTableCellsMerge } from "lucide-react";
import { fetchMetricDataV2Agent } from "@/fetching/fetchingMetricDataV2Agent";

interface Agent {
  Id: string;
  Username: string;
}

const formatDecimals = (
  value: number | "N/A" | void,
  decimal: number,
  unit: string
) => {
  if (value === "N/A") return value;
  return Number(value).toFixed(decimal) + unit;
};

const formatDecimalsChart = (value: any, decimal: any) => {
  if (value !== undefined && value !== null && !isNaN(value)) {
    return Number(value).toFixed(decimal);
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
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [agentMetricsData, setAgentMetricsData] = useState<any>({});
  const [agentMetrics, setAgentMetrics] = useState<Record<string, Metric[]>>(
    {}
  );
  const daysAgo = weeksAgo * 7;
  const [agentIds, setAgentIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchListUsers();
      setAgents(response.data);
      console.log("Agents", response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set agentIds to the selected agents' IDs
    setAgentIds(selectedAgents.map((agent) => agent.Id));
  }, [selectedAgents]);

  useEffect(() => {
    if (!agentIds || agentIds.length === 0) return;

    const fetchData = async () => {
      const today = new Date();
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - daysAgo);
      const date = pastDate.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'

      const metricsData = await Promise.all(
        agentIds.map((agentId) =>
          fetchMetricDataV2Agent(
            agentId,
            date,
            today.toISOString().split("T")[0]
          )
        )
      );

      const newAgentMetrics = agentIds.reduce((acc, agentId, index) => {
        acc[agentId] = metricsData[index].data;
        return acc;
      }, {} as Record<string, Metric[]>);

      setAgentMetrics(newAgentMetrics);
    };

    fetchData();
  }, [agentIds, daysAgo]);

  useEffect(() => {
    console.log("Selected agents changed", selectedAgents);
    const fetchAgentMetricsData = async () => {
      if (selectedAgents.length > 0) {
        const data = {} as any;

        for (const agent of selectedAgents) {
          data[agent.Id] = {
            "Average Contact Duration": {
              threshold: {
                low: 180,
                mid: 300,
                isHigh: false,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AVG_CONTACT_DURATION"
                )?.Value || "N/A",
                2,
                "s"
              ),
            },
            "Average Handle Time": {
              threshold: {
                low: 300,
                mid: 600,
                isHigh: false,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AVG_HANDLE_TIME"
                )?.Value || "N/A",
                2,
                "s"
              ),
            },
            "Contacts Handled": {
              threshold: {
                low: 10,
                mid: 5,
                isHigh: true,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "CONTACTS_HANDLED"
                )?.Value || "N/A",
                0,
                ""
              ),
            },
            "Avg Hold Time": {
              threshold: {
                low: 30,
                mid: 90,
                isHigh: false,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AVG_HOLD_TIME"
                )?.Value || "N/A",
                2,
                "s"
              ),
            },
            "Avg Interruptions Agent": {
              threshold: {
                low: 8,
                mid: 3,
                isHigh: false,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AVG_INTERRUPTIONS_AGENT"
                )?.Value || "N/A",
                0,
                ""
              ),
            },
            "Agent Occupancy": {
              threshold: {
                low: 90,
                mid: 60,
                isHigh: true,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AGENT_OCCUPANCY"
                )?.Value || "N/A",
                2,
                "%"
              ),
            },
            "Sum Non-Productive Time Agent": {
              threshold: {
                low: 300,
                mid: 600,
                isHigh: false,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "SUM_NON_PRODUCTIVE_TIME_AGENT"
                )?.Value || "N/A",
                2,
                ""
              ),
            },
            "Agent Non-Response": {
              threshold: {
                low: 3,
                mid: 7,
                isHigh: false,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AGENT_NON_RESPONSE"
                )?.Value || "N/A",
                0,
                ""
              ),
            },
            "Agent Answer Rate": {
              threshold: {
                low: 85,
                mid: 60,
                isHigh: true,
              },
              value: formatDecimals(
                agentMetrics[agent.Id]?.find(
                  (m) => m.Metric === "AGENT_ANSWER_RATE"
                )?.Value || "N/A",
                2,
                "%"
              ),
            },
          };
        }
        setAgentMetricsData(data);
      }
    };

    fetchAgentMetricsData();
  }, [selectedAgents, weeksAgo, agentMetrics]);

  const handleWeeksChange = (weeks: number) => {
    setWeeksAgo(weeks);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenGuideModal = () => {
    setIsGuideModalOpen(true);
  };

  const handleCloseGuideModal = () => {
    setIsGuideModalOpen(false);
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

  const WalmartDelivery = [
    formatDecimalsChart(getMetricValueWalmartDelivery("AVG_TALK_TIME"), 2),
    formatDecimalsChart(
      getMetricValueWalmartDelivery("AVG_RESOLUTION_TIME"),
      2
    ),
    formatDecimalsChart(
      getMetricValueWalmartDelivery("AVG_QUEUE_ANSWER_TIME"),
      2
    ),
  ];
  const WalmartOnline = [
    formatDecimalsChart(getMetricValueWalmartOnline("AVG_TALK_TIME"), 2),
    formatDecimalsChart(getMetricValueWalmartOnline("AVG_RESOLUTION_TIME"), 2),
    formatDecimalsChart(
      getMetricValueWalmartOnline("AVG_QUEUE_ANSWER_TIME"),
      2
    ),
  ];
  const WalmartPhysicalStore = [
    formatDecimalsChart(getMetricValueWalmartPhysicalStore("AVG_TALK_TIME"), 2),
    formatDecimalsChart(
      getMetricValueWalmartPhysicalStore("AVG_RESOLUTION_TIME"),
      2
    ),
    formatDecimalsChart(
      getMetricValueWalmartPhysicalStore("AVG_QUEUE_ANSWER_TIME"),
      2
    ),
  ];
  const WalmartPass = [
    formatDecimalsChart(getMetricValueWalmartPass("AVG_TALK_TIME"), 2),
    formatDecimalsChart(getMetricValueWalmartPass("AVG_RESOLUTION_TIME"), 2),
    formatDecimalsChart(getMetricValueWalmartPass("AVG_QUEUE_ANSWER_TIME"), 2),
  ];
  const label = [
    "Avg. Call Length",
    "Avg. Resolution Time",
    "Avg. Queue Wait Time",
  ];

  const WalmartDeliveryCount = [
    getMetricValueWalmartDelivery("CONTACTS_QUEUED"),
    getMetricValueWalmartDelivery("CONTACTS_HANDLED"),
  ];
  const WalmartOnlineCount = [
    getMetricValueWalmartOnline("CONTACTS_QUEUED"),
    getMetricValueWalmartOnline("CONTACTS_HANDLED"),
  ];
  const WalmartPhysicalStoreCount = [
    getMetricValueWalmartPhysicalStore("CONTACTS_QUEUED"),
    getMetricValueWalmartPhysicalStore("CONTACTS_HANDLED"),
  ];
  const WalmartPassCount = [
    getMetricValueWalmartPass("CONTACTS_QUEUED"),
    getMetricValueWalmartPass("CONTACTS_HANDLED"),
  ];
  const labelCount = ["Calls Queued", "Calls Handled"];

  return (
    <div className="flex h-screen bg-background text-foreground relative ">
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
            <div className="flex justify-end ml-auto">
              <button
                className="mr-2 w-36 p-2 rounded-xl shadow-md flex justify-center items-center hover:bg-figma-figma6 bg-blue text-figma-figma1"
                onClick={handleOpenGuideModal}
              >
                Metric Guide
              </button>
            </div>

            <div className="flex"></div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
            {/* General Metrics */}
            <div className="flex-1  overflow-scroll no-scrollbar">
              <div className="flex-1  overflow-scroll">
                <BarChartSeconds
                  WalmartDelivery={WalmartDelivery}
                  WalmartOnline={WalmartOnline}
                  WalmartPhysicalStore={WalmartPhysicalStore}
                  WalmartPass={WalmartPass}
                  label={label}
                  title={"Time Metrics"}
                />
                <BarChartSeconds
                  WalmartDelivery={WalmartDeliveryCount}
                  WalmartOnline={WalmartOnlineCount}
                  WalmartPhysicalStore={WalmartPhysicalStoreCount}
                  WalmartPass={WalmartPassCount}
                  label={labelCount}
                  title={"Count Metrics"}
                />

                <div className="h-full overflow-scroll 0 mt-4">
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
                  <div key={agent.Id} className="pb-4 pt-3">
                    {/* <Text className="text-lg">
                      Selected Agent: {agent.Username}
                    </Text> */}
                    <div className="bg-figma-figma11 rounded-xl p-4 shadow-md flex flex-col mt-4">
                      <p className="text-xl font-bold mb-2">Agent Metrics: {agent.Username}</p>
                      {agentMetricsData && agentMetricsData[agent.Id] ? (
                        Object.entries(agentMetricsData[agent.Id]).map(
                          ([key, value], idx) => (
                            <p
                              key={idx}
                              className="text-lg"
                              style={{
                                color: getMetricColor(
                                  value.value,
                                  value.threshold.low,
                                  value.threshold.mid,
                                  value.threshold.isHigh
                                ),
                              }}
                            >
                              {key}: {value.value}
                            </p>
                          )
                        )
                      ) : (
                        <Text className="text-lg">No data</Text>
                      )}
                      {/* <p
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
                          getMetricValueAgent(
                            agent.Id,
                            "AVG_CONTACT_DURATION"
                          ) || "N/A",
                          2,
                          "s"
                        )}
                      </p> */}
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

        {isGuideModalOpen && (
          <Modal onClose={handleCloseGuideModal}>
            <Heading level={2} fontWeight="Bold">
              Metric Guide
            </Heading>
            <div className="p-4">
              <h3 className="font-bold">Agent Metrics</h3>
              <ul>
                <li>
                  <b>Average Talk Time:</b> The average time an agent spends
                  talking with customers.
                </li>
                <li>
                  <b>Average Resolution Time:</b> The average time it takes for
                  an agent to resolve an issue.
                </li>
                <li>
                  <b>Contacts Queued:</b> The number of contacts waiting in the
                  queue.
                </li>
                <li>
                  <b>Contacts Handled:</b> The number of contacts handled by an
                  agent.
                </li>
                <li>
                  <b>Average Queue Answer Time:</b> The average time it takes
                  for an agent to answer a contact in the queue.
                </li>
                <li>
                  <b>Average Contact Duration:</b> The average duration of a
                  contact handled by the agent.
                </li>
                <li>
                  <b>Average Handle Time:</b> The average time spent by the
                  agent on handling contacts.
                </li>
                <li>
                  <b>Average Hold Time:</b> The average time an agent puts a
                  contact on hold.
                </li>
                <li>
                  <b>Average Interruptions Agent:</b> The average number of
                  interruptions faced by the agent.
                </li>
                <li>
                  <b>Agent Occupancy:</b> The percentage of time an agent is
                  occupied with contacts.
                </li>
                <li>
                  <b>Sum Non-Productive Time Agent:</b> The total non-productive
                  time of the agent.
                </li>
                <li>
                  <b>Agent Non-Response:</b> The number of times the agent
                  failed to respond.
                </li>
                <li>
                  <b>Agent Answer Rate:</b> The percentage of contacts answered
                  by the agent.
                </li>
              </ul>
              <h2 className="font-bold mt-4">Queue Metrics</h2>
              <ul>
                <li>
                  <b>Average Talk Time:</b> The average talk time for contacts
                  in the queue.
                </li>
                <li>
                  <b>Average Resolution Time:</b> The average resolution time
                  for contacts in the queue.
                </li>
                <li>
                  <b>Contacts Queued:</b> The total number of contacts currently
                  in the queue.
                </li>
                <li>
                  <b>Contacts Handled:</b> The total number of contacts handled
                  from the queue.
                </li>
                <li>
                  <b>Average Queue Answer Time:</b> The average time taken to
                  answer a contact in the queue.
                </li>
              </ul>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
