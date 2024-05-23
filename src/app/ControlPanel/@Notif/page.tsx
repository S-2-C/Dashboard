"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useEffect, useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";

export default function NotifSlot() {
  const agent = useUserRole();


  return (
    <div
      className={`flex flex-col p-4 rounded-lg h-full ${
        agent?.role === "SUPERVISOR" ? "bg-teal-background" : "bg-blue-dark"
      }`}
    >
      {agent?.role === "SUPERVISOR" ? (
        <>
          <h1 className="text-4xl font-bold text-white text-center p-4">
            Notifications
          </h1>
          <div className="overflow-scroll no-scrollbar h-full flex flex-col">
            <div className="bg-blue p-4 rounded-lg shadow-md mb-4">
              <span className="font-bold">Notification</span>
            </div>
            <div className="bg-blue p-4 rounded-lg shadow-md mb-4">
              <span className="font-bold">Notification</span>
            </div>
            <div className="bg-figma-figma1 p-4 rounded-lg shadow-md mb-4">
              <span className="text-blue-dark font-bold">
                Notification Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut
              </span>
            </div>
            <div className="bg-figma-figma1 p-4 rounded-lg shadow-md mb-4">
              <span className="text-blue-dark font-bold">
                Notification Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut
              </span>
            </div>
            <div className="bg-figma-figma1 p-4 rounded-lg shadow-md mb-4">
              <span className="text-blue-dark font-bold">
                Notification Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut
              </span>
            </div>
            <div className="bg-blue-dark p-3 rounded-lg shadow-md mb-4 flex flex-col items-center justify-center">
              <div className="text-center mb-2 flex items-center">
                <img
                  src="images/AgentRed.svg"
                  className="w-40 h-auto mx-auto"
                  alt="Agent"
                />
                <span className="font-bold text-white p-4">
                  You should consider reassigning more agents to the
                  Walmart®.com channel
                </span>
              </div>
              <Link href="/">
                <button className="bg-figma-figma10 focus:bg-blue-teal active:bg-blue-teal text-background focus:text-blue-dark active:text-background font-bold py-2 px-4 rounded">
                  Reassign
                </button>
              </Link>
            </div>
            <div className="bg-figma-figma1 p-4 rounded-lg shadow-md mb-4">
              <span className="text-blue-dark font-bold">
                Notification Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut
              </span>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-white text-center p-4">
            Amazon Connect Embed
          </h1>
        </div>
      )}
    </div>
  );
}
