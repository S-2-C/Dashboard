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
import useUserUpdates from "@/hooks/useUserUpdates";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useUserRole } from "@/hooks/useUserRole";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Timer from "@/components/timer";

export default function AgentSlot() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [alertUsers, setAlertUsers] = useState<User[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<User[]>([]);
  const [offlineSupervisors, setOfflineSupervisors] = useState<User[]>([]);
  const agent = useUserRole();

  const userChange = useUserUpdates(); // This will hold the latest user update
  const addUserToState = (user: User, setter: any) => {
    setter((prev: any) => [...(prev || []), user]);
  };
  const removeUserFromAllState = (user: User) => {
    setAlertUsers((prev) => prev?.filter((u) => u.id !== user.id));
    setActiveUsers((prev) => prev?.filter((u) => u.id !== user.id));
    setOfflineUsers((prev) => prev?.filter((u) => u.id !== user.id));
    setOfflineSupervisors((prev) => prev?.filter((u) => u.id !== user.id));
  };

  useEffect(() => {
    if (userChange) {
      removeUserFromAllState(userChange);
      if (userChange?.needsHelp) {
        console.log("User id", userChange.id, "needs help");
        addUserToState(userChange, setAlertUsers);
      } else if (userChange?.isOnCall) {
        addUserToState(userChange, setActiveUsers);
        console.log("User id", userChange.id, "just took a call");
      } else if (!userChange?.isOnCall && userChange?.role == "AGENT") {
        addUserToState(userChange, setOfflineUsers);
        console.log("User id", userChange.id, "is now offline");
      } else if (!userChange?.isOnCall && userChange?.role == "SUPERVISOR") {
        addUserToState(userChange, setOfflineSupervisors);
        console.log("Supervisor id", userChange.id, "is now offline");
      }
    }
  }, [userChange]);

  useEffect(() => {
    async function fetchAgents() {
      const res = await fetchAllAgents();

      res?.items?.forEach((agent: User) => {
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
    <div>
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div
            className="bg-blue-highlight rounded-lg sm:p-2 md:p-3 lg:p-4 xl:p-8 shadow-md h-96"
            style={{ display: "inline-block" }}
          >
            <div className="rounded-lg">
              <Link href="/AgentManagement">
                <h1 className="text-4xl font-bold text-center ">Agent</h1>
              </Link>
            </div>
            <div className="h-5/6 grid grid-cols-5 gap-x-16 gap-y-2 p-2 overflow-scroll no-scrollbar">
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
        </>
      ) : (
        <div
          className="bg-figma-figma1 rounded-lg sm:p-2 md:p-3 lg:p-24 xl:p-20 p-4 shadow-md h-full"
          style={{ display: "inline-block" }}
        >
          <div className="flex">
          <FontAwesomeIcon icon={faClock} className='text-white w-8 h-8 pr-3 pt-1' />
          <h1 className="xl:text-4xl lg:text-2xl  md:text-2xl sm:text-2xl text-center text-white font-bold items-align-top whitespace-nowrap pb-4">
            Ongoing Call Time
          </h1>
          </div>
          <div className="flex justify-center items-center">
          <div style={{ display: "inline-block" }}>
            <Timer startTime={"2024-05-23T22:30:50.133Z"} />
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
