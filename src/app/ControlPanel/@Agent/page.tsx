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

  return (
    <div
      className="bg-blue-highlight rounded-lg p-8 shadow-md h-96"
      style={{ display: "inline-block" }}
    >
      <div className="bg-blue-highlight rounded-lg">
        <Link href="/AgentManagement">
          <h1 className="text-4xl font-bold text-center ">Agents</h1>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-x-16 gap-y-2 bg-blue-highlight p-4">
        {alertUsers?.map((user, index) => (
          <div className=" w-min p-1" key={index}>
            <Link href={`/ManageCall/${user?.id}`}>
              <div className="flex flex-col items-center w-20 ">
                <img
                  src="images/AgentRed.svg"
                  className="h-auto w-10 mx-auto"
                  alt="Agent"
                />
                <p className="text-center text-sm text-red-500">
                  {user?.name ? user.name.split(" ")[0] : user.id.split("@")[0]}
                </p>
              </div>
            </Link>
          </div>
        ))}
        {activeUsers?.map((user, index) => (
          <div className=" w-min p-1" key={index}>
          <Link href={`/ManageCall/${user?.id}`}>
          <div className="flex flex-col items-center w-20 ">
              <img
                src={"images/AgentYellow.svg"}
                className="h-auto w-10 mx-auto"
                alt="Agent"
              />
              <p className={"text-center text-sm text-agenman-agenmanyellow"}>
                {user?.name ? user.name.split(" ")[0] : user.id.split("@")[0]}
              </p>
            </div>
          </Link>
          </div>
        ))}
        {offlineUsers?.map((user, index) => (
          <div className=" w-min p-1" key={index}>
          <Link href={`/ManageCall/${user?.id}`}>
            <div className="flex flex-col items-center w-20 ">
              <img
                src={"images/AgentBlue.svg"}
                className="h-auto w-10 mx-auto"
                alt="Agent"
              />
              <p className=" text-figma-figma1 text-sm px-1">
                {" "}
                {user?.name ? user?.name.split(" ")[0] : user.id.split("@")[0]}
              </p>
            </div>
          </Link>
          </div>
        ))}

        {/* {[...Array(20)].map((_, index) => (
      <div key={index} className="rounded-lg flex flex-col items-center justify-center">
        <div>
          <img
            src={index % 2 === 0 ? "images/AgentBlue.svg" : "images/AgentWhite.svg"}
            alt="Agent"
            className="w-10 h-auto mx-auto"
          />
          <p className={`text-center text-sm ${index % 2 === 0 ? "text-figma-figma1" : "text-white"}`}>
            #12DAC
          </p>
        </div>
      </div>
    ))}  */}
      </div>
    </div>
  );
}
