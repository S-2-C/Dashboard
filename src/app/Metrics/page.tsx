"use client";
import React, { useEffect, useState } from "react";
import Home from "../NavBar";
import SearchBar from "../searchBar";
import { Flex, Heading, Text, Button } from "@aws-amplify/ui-react";
import { useQueueMetrics, useAgentMetrics } from "@/hooks/useDataMetricV2"; // Updated import
import { fetchListUsers } from "@/fetching/fetchingListAgent";
import Modal from "@/components/ui/Modal"; // Import your Modal component

interface Agent {
  Id: string;
  Username: string;
}

export default function Metrics() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [weeksAgo, setWeeksAgo] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
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
    selectedAgent ? selectedAgent.Id : null,
    weeksAgo * 7
  );

  return (
    <div className="flex h-screen bg-background text-foreground relative">
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
        <div className="mb-6">
          <Button onClick={() => handleWeeksChange(1)}>1 Week</Button>
          <Button onClick={() => handleWeeksChange(2)}>2 Weeks</Button>
          <Button onClick={() => handleWeeksChange(3)}>3 Weeks</Button>
          <Button onClick={() => handleWeeksChange(4)}>4 Weeks</Button>
        </div>

        <Text className="text-sans mb-6">Here are some metrics</Text>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1">
          {/* Average Talk Time */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-2">Average Talk Time</p>
            <p className="text-lg">
              Walmart Delivery: {getMetricValueWalmartDelivery("AVG_TALK_TIME")}
            </p>
            <p className="text-lg">
              Walmart Online: {getMetricValueWalmartOnline("AVG_TALK_TIME")}
            </p>
            <p className="text-lg">
              Walmart Physical Store:{" "}
              {getMetricValueWalmartPhysicalStore("AVG_TALK_TIME")}
            </p>
            <p className="text-lg">
              Walmart Pass: {getMetricValueWalmartPass("AVG_TALK_TIME")}
            </p>
          </div>

          {/* Average Resolution Time */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-2">Average Resolution Time</p>
            <p className="text-lg">
              Walmart Delivery:{" "}
              {getMetricValueWalmartDelivery("AVG_RESOLUTION_TIME")}
            </p>
            <p className="text-lg">
              Walmart Online:{" "}
              {getMetricValueWalmartOnline("AVG_RESOLUTION_TIME")}
            </p>
            <p className="text-lg">
              Walmart Physical Store:{" "}
              {getMetricValueWalmartPhysicalStore("AVG_RESOLUTION_TIME")}
            </p>
            <p className="text-lg">
              Walmart Pass: {getMetricValueWalmartPass("AVG_RESOLUTION_TIME")}
            </p>
          </div>

          {/* Contacts Queued */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-2">Contacts Queued</p>
            <p className="text-lg">
              Walmart Delivery:{" "}
              {getMetricValueWalmartDelivery("CONTACTS_QUEUED")}
            </p>
            <p className="text-lg">
              Walmart Online: {getMetricValueWalmartOnline("CONTACTS_QUEUED")}
            </p>
            <p className="text-lg">
              Walmart Physical Store:{" "}
              {getMetricValueWalmartPhysicalStore("CONTACTS_QUEUED")}
            </p>
            <p className="text-lg">
              Walmart Pass: {getMetricValueWalmartPass("CONTACTS_QUEUED")}
            </p>
          </div>

          {/* Contacts Handled */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-2">Contacts Handled</p>
            <p className="text-lg">
              Walmart Delivery:{" "}
              {getMetricValueWalmartDelivery("CONTACTS_HANDLED")}
            </p>
            <p className="text-lg">
              Walmart Online: {getMetricValueWalmartOnline("CONTACTS_HANDLED")}
            </p>
            <p className="text-lg">
              Walmart Physical Store:{" "}
              {getMetricValueWalmartPhysicalStore("CONTACTS_HANDLED")}
            </p>
            <p className="text-lg">
              Walmart Pass: {getMetricValueWalmartPass("CONTACTS_HANDLED")}
            </p>
          </div>

          {/* Average Queue Answer Time */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-2">Average Queue Answer Time</p>
            <p className="text-lg">
              Walmart Delivery:{" "}
              {getMetricValueWalmartDelivery("AVG_QUEUE_ANSWER_TIME")}
            </p>
            <p className="text-lg">
              Walmart Online:{" "}
              {getMetricValueWalmartOnline("AVG_QUEUE_ANSWER_TIME")}
            </p>
            <p className="text-lg">
              Walmart Physical Store:{" "}
              {getMetricValueWalmartPhysicalStore("AVG_QUEUE_ANSWER_TIME")}
            </p>
            <p className="text-lg">
              Walmart Pass: {getMetricValueWalmartPass("AVG_QUEUE_ANSWER_TIME")}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleOpenModal}>Show Agents</Button>
        </div>

        {selectedAgent && (
          <div className="mt-6">
            <Text className="text-lg">
              Selected Agent: {selectedAgent.Username}
            </Text>
            <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col mt-4">
              <p className="text-xl font-bold mb-2">Agent Metrics</p>
              <p className="text-lg">
                Average Contact Duration:{" "}
                {getMetricValueAgent("AVG_CONTACT_DURATION")}
              </p>
              <p className="text-lg">
                Average Handle Time: {getMetricValueAgent("AVG_HANDLE_TIME")}
              </p>
              <p className="text-lg">
                Contacts Handled: {getMetricValueAgent("CONTACTS_HANDLED")}
              </p>
              <p className="text-lg">
                Average Hold Time: {getMetricValueAgent("AVG_HOLD_TIME")}
              </p>
              <p className="text-lg">
                Average Interruptions Agent:{" "}
                {getMetricValueAgent("AVG_INTERRUPTIONS_AGENT")}
              </p>
              <p className="text-lg">
                Agent Occupancy: {getMetricValueAgent("AGENT_OCCUPANCY")}
              </p>
              <p className="text-lg">
                Sum Non-Productive Time Agent:{" "}
                {getMetricValueAgent("SUM_NON_PRODUCTIVE_TIME_AGENT")}
              </p>
              <p className="text-lg">
                Agent Non-Response: {getMetricValueAgent("AGENT_NON_RESPONSE")}
              </p>
              <p className="text-lg">
                Agent Answer Rate: {getMetricValueAgent("AGENT_ANSWER_RATE")}
              </p>
            </div>
          </div>
        )}

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
                      type="radio"
                      name="agent"
                      value={agent.Id}
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
