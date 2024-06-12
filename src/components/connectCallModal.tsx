"use client";
import { useCCP } from "@/context/ccp";
import { useUserRole } from "@/hooks/useUserRole";
import { MicOff, Mic, Phone, PhoneCall, PhoneOff, Pause, Play} from 'lucide-react';
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
    putOnHold,
    resumeCall,
    isOnHold, // Asume que esto también se maneja a través de useCCP
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
        className={`bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row space-x-5 items-center absolute left-1/2 transform -translate-x-1/2 top-1 z-[50]${!incomingContact || !currentAgent ? " hidden" : ""
          }`}
      >
        <h1 className="text-lg font-semibold text-gray-800 mr-0">
          Incoming Call
        </h1>
        <button
          onClick={() => acceptContact()}
          className="px-3 text-center text-white text-sm bg-green-800 border border-green-900 rounded-full shadow-lg py-3 cursor-pointer hover:bg-green-600 hover:animate-none transition duration-200"
        >
        <PhoneCall className='animate-wiggle'/>
        </button>
        <button
          onClick={() => rejectContact()}
          className="px-3 text-center text-white text-sm bg-red-500 border border-red-600 rounded-full shadow-lg py-3 cursor-pointer hover:bg-red-600 transition duration-200"
        >
        <Phone className='animate-spinBackAndForth'/>
        </button>
      </div>
    ) : (
      incomingContact && (agentState === "Connected" || agentState === "PendingConnectAgent" || agentState === "PendingBusy" || agentState === "Busy") && (
        <div
          className={`bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row space-x-5 items-center absolute left-1/2 transform -translate-x-1/2 top-1 z-[50]${!incomingContact || !currentAgent ? " hidden" : ""
            }`}
        >
          <h1 className="text-lg font-semibold text-gray-800 mr-0">
            Call Accepted &nbsp;
            <span className="text-gray-400">({formatTime(callTime)})</span>
          </h1>
          <button
            onClick={() => hangUpContact()}
            className="px-3 text-center text-white text-sm bg-red-500 border border-red-600 rounded-full shadow-lg py-3 cursor-pointer hover:bg-red-600 transition duration-200"
          >
          <Phone className='animate-spinBackAndForth'/>
          </button>
          <button
            onClick={toggleMute}
            className={`px-3 text-center text-sm text-white  ${isMuted ? 'bg-blue-darkhighlight hover:bg-blue-teal border-blue-teal ' : 'bg-blue-teal hover:bg-blue-darkhighlight border-blue-darkhighlight'} border  rounded-full shadow-lg py-3 cursor-pointer transition duration-200`}
          >
            {isMuted ? <MicOff/> : <Mic/>}
          </button>

          <button onClick={isOnHold ? resumeCall : putOnHold} className={`px-3 text-center text-white border text-sm ${isOnHold ? 'bg-yellow-600 border-yellow-500 hover:bg-yellow-500' : 'bg-yellow-500 border-yellow-600 hover:bg-yellow-600'} rounded-full shadow-lg py-3 cursor-pointer transition duration-200`}>
            {isOnHold ? <Play/> : <Pause/>}
          </button>
        </div>
      )
    )
  );
};