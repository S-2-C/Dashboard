"use client";
import React, { useEffect } from "react";
import Home from "../NavBar";
import SearchBar from "../searchBar";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import { fetchMetricDataV2Queue } from "@/fetching/fetchingMetricDataV2Queue";

export default function Metrics() {
  useEffect(() => {
    const fetchData = async () => {
      const queueId =
        "4948d5e2-1434-44dd-a78f-37cbeb96d1d9,46bf33f7-3381-4db1-a3f7-85eafdf04578,1c2614e0-66db-45a2-8186-31f3c70654ff";
      const date = "2024-05-03";
      const res = await fetchMetricDataV2Queue(queueId, date);
      console.log(res);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <Home />

      <div className="flex flex-col flex-1 p-10 ml-20">
        <div className="flex justify-between items-center mb-6">
          <Heading level={1} fontWeight="Bold">
            {" "}
            Performance Metrics{" "}
          </Heading>
          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>
        </div>

        {/* Descripción */}
        <Text className="text-sans mb-6">Here are some metrics</Text>
        <div>
          <br></br>
        </div>

        {/* Añadiendo bloques de color para las métricas */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1">
          {/* Bloque 1 */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-auto">
              Minutes on Call Per Agent
            </p>
          </div>

          {/* Bloque 2 */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-auto">
              Agent Average Performance
            </p>
          </div>

          {/* Bloque 3 */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-auto">Call Type Distribution</p>
          </div>

          {/* Bloque 4 */}
          <div className="bg-metrics rounded-xl p-4 shadow-md flex flex-col">
            <p className="text-xl font-bold mb-auto">Call Volume</p>
          </div>
        </div>
      </div>
    </div>
  );
}
