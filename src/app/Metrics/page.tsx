"use client";
import React from "react";
import Home from "../NavBar";
import SearchBar from "../searchBar";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import useQueueMetrics from "@/hooks/useDataMetricV2";

export default function Metrics() {
  const channelIds = {
    walmartDelivery: "46bf33f7-3381-4db1-a3f7-85eafdf04578",
    walmartOnline: "4948d5e2-1434-44dd-a78f-37cbeb96d1d9",
    walmartPhysicalStore: "f617a7d6-2be6-4f9b-b365-600fd3fc8646",
    walmartPass: "fe0bd989-c3d1-4959-a47c-b7d27def9a99",
  };

  const { getMetricValue: getMetricValueWalmartDelivery } = useQueueMetrics(
    channelIds.walmartDelivery
  );
  const { getMetricValue: getMetricValueWalmartOnline } = useQueueMetrics(
    channelIds.walmartOnline
  );
  const { getMetricValue: getMetricValueWalmartPhysicalStore } =
    useQueueMetrics(channelIds.walmartPhysicalStore);
  const { getMetricValue: getMetricValueWalmartPass } = useQueueMetrics(
    channelIds.walmartPass
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
      </div>
    </div>
  );
}
