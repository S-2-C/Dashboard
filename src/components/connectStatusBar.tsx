"use client";
import { useCCP } from "@/context/ccp";
import React from "react";

export const ConnectStatusBar = () => {
  const { currentAgent, agentState, callTime, changeAgentState } = useCCP();
  return (
    <div className="fixed bottom-1 left-1 z-[50]">
      {currentAgent ? (
        <div className="flex flex-col justify-center">
          {agentState === "Available" ? (
            <div
              onClick={() => changeAgentState("Offline")}
              className={`px-3 mb-2 text-center text-sm border rounded-lg shadow-lg py-1 flex items-center ${
                callTime > 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "cursor-pointer hover:border-blue-300 hover:shadow-md bg-blue-100 hover:bg-blue-200 transition duration-200 hover:text-blue-800 border-blue-200 text-gray-800"
              }`}
            >
              Go Offline
              <span className="text-red-500 text-2xl ml-2">●</span>
            </div>
          ) : (
            <div
              onClick={() => changeAgentState("Available")}
              className={`px-3 mb-2 text-center text-sm border rounded-lg shadow-lg py-1 flex items-center ${
                callTime > 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "cursor-pointer hover:border-blue-300 hover:shadow-md bg-blue-100 hover:bg-blue-200 transition duration-200 hover:text-blue-800 border-blue-200 text-gray-800"
              }`}
            >
              Go Available
              <span className="text-green-500 text-2xl ml-2">●</span>
            </div>
          )}
          <p className="px-3 text-center text-gray-500 text-sm bg-white border border-gray-200 rounded-lg shadow-lg py-1">
            You are currently {agentState}
          </p>
        </div>
      ) : (
        <p className="px-3 text-center text-gray-500 text-sm bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          Connecting to Amazon Connect
          <span className="loadingAnimation">...</span>
        </p>
      )}
    </div>
  );
};
