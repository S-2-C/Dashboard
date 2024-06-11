"use client";
import { useCCP } from "@/context/ccp";
import { useUserRole } from "@/hooks/useUserRole";
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
    mute,
    unmute,
    isMuted,
  } = useCCP();

  const user = useUserRole();

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${Math.floor(seconds).toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  if (user?.role === "AGENT") return (

    !isContactAccepted && !(agentState === "Busy") && !(agentState === "PendingConnectAgent") && !(agentState === "FailedConnectAgent") && !(agentState === "Available") && !(agentState === "AfterCallWork") &&
      !(agentState === "FailedConnectAgent" ||
        agentState === "Available" ||
        agentState === "AfterCallWork") ? (
      <div
        className={`bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row space-x-2 items-center absolute left-1/2 transform -translate-x-1/2 top-1 z-[50]${!incomingContact || !currentAgent ? " hidden" : ""
          }`}
      >
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
      </div>
    ) : (
      incomingContact && (agentState === "Connected" || agentState === "PendingConnectAgent" || agentState === "PendingBusy" || agentState === "Busy") && (
        <div
          className={`bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row space-x-2 items-center absolute left-1/2 transform -translate-x-1/2 top-1 z-[50]${!incomingContact || !currentAgent ? " hidden" : ""
            }`}
        >
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
          <button
            onClick={toggleMute}
            className={`px-3 text-center text-sm ${isMuted ? 'bg-yellow-500' : 'bg-green-500'} border border-green-600 rounded-lg shadow-lg py-1 cursor-pointer hover:bg-green-600 transition duration-200`}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      )
    )
  );
};