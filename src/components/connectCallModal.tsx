"use client";
import { useCCP } from "@/context/ccp";
import React from "react";

export const ConnectCallModal = () => {
  const {
    incomingContact,
    isContactAccepted,
    acceptContact,
    rejectContact,
    hangUpContact,
    callTime,
    currentAgent,
    agentState,
  } = useCCP();

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row space-x-2 items-center absolute left-1/2 transform -translate-x-1/2 top-1 ${
        (!incomingContact || !currentAgent) && "hidden"
      }`}
    >
      {!isContactAccepted &&
      (agentState === "FailedConnectAgent" ||
        agentState === "MissedCallAgent" ||
        agentState === "Available" ||
        agentState === "AfterCallWork" ||
        agentState === "PendingBusy") ? (
        <>
          <h1 className="text-lg font-semibold text-gray-800 mr-6">
            Incoming Call
          </h1>
          <button
            onClick={() => acceptContact()}
            className="px-3 text-center text-white text-sm bg-blue-500 border border-blue-600 rounded-lg shadow-lg py-1 cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Accept
          </button>
          <button
            onClick={() => rejectContact()}
            className="px-3 text-center text-white text-sm bg-red-500 border border-red-600 rounded-lg shadow-lg py-1 cursor-pointer hover:bg-red-600 transition duration-200"
          >
            Reject
          </button>
        </>
      ) : (
        incomingContact &&
        isContactAccepted && (
          <>
            <h1 className="text-lg font-semibold text-gray-800 mr-6">
              Call Accepted &nbsp;
              <span className="text-gray-400">({formatTime(callTime)})</span>
            </h1>
            <button
              onClick={() => hangUpContact()}
              className="px-3 text-center text-white text-sm bg-red-500 border border-red-600 rounded-lg shadow-lg py-1 cursor-pointer hover:bg-red-600 transition duration-200"
            >
              Hang Up
            </button>
          </>
        )
      )}
    </div>
  );
};
