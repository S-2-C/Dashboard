"use client";
import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Frequently() {
  const [agent, setAgent] = useState<GetUserQuery["getUser"]>();

  useEffect(() => {
    async function fetchAgent() {
      const user = await fetchAuthSession(); //Funcion que me da la información del user tokens.signInDetails.loginId
      console.log(user);
      // @ts-ignore
      const email = user?.tokens?.signInDetails?.loginId;
      console.log(email);
      const agent = await fetchOneAgent(email);
      console.log("agent", agent);
      setAgent(agent);
    }

    fetchAgent();
  }, []);

  return (
    <div>
      {agent?.role === "SUPERVISOR" ? (
        <>
      <div className="flex">
        <div className="bg-teal-FU p-4 xl:p-8 lg:p-1 md:p-4 sm:p-2 rounded-tl-lg rounded-bl-lg sm:w-full md:w-auto lg:w-[calc(60vw-32rem)] flex items-center justify-center">
          <h1 className="text-4xl md:text-2xl sm:text-lg lg:text-2xl xl:text-4xl font-bold text-white">
            Quick Access
          </h1>
        </div>

        <div className="flex-grow flex  items-center  bg-teal-background rounded-tr-lg rounded-br-lg ">
          <div>
            <div className="flex items-start justify-between sm:p-1 xl:p-4 md:p-2 lg:p-3">
              <Link href="/AgentManagement">
                <button className="bg-background focus:bg-blue-teal hover:bg-blue-teal text-gray hover:text-background active:text-background font-bold py-2 px-4 rounded">
                  Agent Management
                </button>
              </Link>
              <Link href="/Notifications">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Notifications
                </button>
              </Link>
              <Link href="/Metrics">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Metrics
                </button>
              </Link>
              <Link href="/Reports">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Reports
                </button>
              </Link>
              <Link href="/Chat">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Chat
                </button>
              </Link>
              <Link href="/Channels">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Channels
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>
    ) : (
      <div>
      </div>
    )}
    </div>
  );
}
