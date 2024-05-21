"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllAgents } from "@/fetching/fetchingDataFunctions";
import {
  GetContactQuery,
  ListUsersQuery,
  ListContactsQuery,
  Contact,
  User,
} from "@/API";

export default function AgentSlot() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [alertUsers, setAlertUsers] = useState<User[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<User[]>([]);
  const [offlineSupervisors, setOfflineSupervisors] = useState<User[]>([]);

  useEffect(() => {
    async function fetchAgents() {
      const res = await fetchAllAgents();

      res?.items?.forEach((agent: User) => {
        console.log(agent);

        if (agent?.needsHelp) {
          setAlertUsers((prev) => [...(prev || []), agent]);
        } else if (agent?.isOnCall) {
          setActiveUsers((prev) => [...(prev || []), agent]);
        } else if (!agent?.isOnCall && agent?.role == "AGENT") {
          setOfflineUsers((prev) => [...(prev || []), agent]);
        } else if (!agent?.isOnCall && agent?.role == "SUPERVISOR") {
          setOfflineSupervisors((prev) => [...(prev || []), agent]);
        }
      });

      console.log("res", res);
    }
    fetchAgents();
  }, []);

  const combinedUsers = [
    ...alertUsers.map((user) => ({ ...user, status: "alert" })),
    ...activeUsers.map((user) => ({ ...user, status: "active" })),
    ...offlineUsers.map((user) => ({ ...user, status: "offline" })),
    ...offlineSupervisors.map((user) => ({ ...user, status: "offlineSuper" })),

  ];

  const getUserProperties = (status: string) => {
    switch (status) {
      case "alert":
        return {
          imgSrc: "images/AgentRed.svg",
          textClass: "text-red-500",
        };
      case "active":
        return {
          imgSrc: "images/AgentYellow.svg",
          textClass: "text-agenman-agenmanyellow",
        };
      case "offline":
        return {
          imgSrc: "images/AgentBlue.svg",
          textClass: "text-figma-figma1",
        };
        case "offlineSuper":
          return {
            imgSrc: "images/AgentBlack.svg",
            textClass: "text-black-500",
          };
      default:
        return {
          imgSrc: "",
          textClass: "",
        };
    }
  };

  return (
    <div
      className="bg-blue-highlight rounded-lg p-8 shadow-md h-96 overflow-hidden"
      style={{ display: "inline-block" }}
    >
      <div className="bg-blue-highlight rounded-lg">
        <Link href="/AgentManagement">
          <h1 className="text-4xl font-bold text-center ">Agents</h1>
        </Link>
      </div>
      <div className="h-full grid grid-cols-5 gap-x-16 gap-y-2 bg-blue-highlight p-4 overflow-y-auto  no-scrollbar">
      {combinedUsers.map((user, index) => {
          const { imgSrc, textClass } = getUserProperties(user.status);
          return (
            <div className="w-min p-1" key={index}>
              <Link href={`/ManageCall/${user?.id}`}>
                <div className="flex flex-col items-center w-20">
                  <img
                    src={imgSrc}
                    className="h-auto w-10 mx-auto"
                    alt="Agent"
                  />
                  <p className={`text-center text-sm ${textClass}`}>
                    {user?.name
                      ? user.name.split(" ")[0]
                      : user.id.split("@")[0]}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
