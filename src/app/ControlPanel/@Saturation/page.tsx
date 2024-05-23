"use client";
import React from "react";
import Notifications from "../../Channels/page";
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useEffect, useState } from "react";

export default function SaturationSlot() {
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

  const data = [
    {
      title: "Sentiment Analysis",
      description: "How to use the sentiment analysis tool",
      lastUpdated: "2024",
    },
    {
      title: "Sentiment Analysis",
      description: "How to use the sentiment analysis tool",
      lastUpdated: "2024",
    },
    {
      title: "Sentiment Analysis",
      description: "How to use the sentiment analysis tool",
      lastUpdated: "2024",
    },
    {
      title: "Sentiment Analysis",
      description: "How to use the sentiment analysis tool",
      lastUpdated: "2024",
    },
    // Add more items as needed
  ];

  return (
    <div>
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div className="bg-blue-dark flex flex-col rounded-lg shadow-md h-96">
            <Link href="/Channels">
              <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
                  Saturation in channels
                </h1>
              </div>
            </Link>
            <div className="overflow-auto h-[65%] no-scrollbar">
              <div className="text-white sm:w-full,px-2 md:w-full lg:w-[calc(60vw-32rem)],px-2 xl:w-[calc(60vw-32rem)] px-8 flex-wrap">
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Physical Store</span>
                  <div className="bg-figma-figma9 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Walmart®.com</span>
                  <div className="bg-figma-figma10 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Walmart Express</span>
                  <div className="bg-figma-figma8 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Delivery</span>
                  <div className="bg-figma-figma8 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blue-dark flex flex-col rounded-lg shadow-md h-96 ">
          <Link href="/Channels">
            <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
                Documentation
              </h1>
            </div>
          </Link>
          <div className="mt-3 px-2 flex flex-wrap h-full overflow-scroll no-scrollbar">
            {data.map((item, index) => (
              <button
                key={index}
                className="bg-figma-figma4 h-32 w-full m-2 p-4 flex justify-between items-center rounded-2xl shadow-lg text-left hover:bg-blue"
              >
                <div className="flex flex-col">
                  <div className="text-3xl font-bold mb-2 sm:mt-6 md:mt-6 lg:mt-4 xl:mt-0  text-blue-dark">
                    {item.title}
                  </div>
                  <div className="font-bold mb-2 text-blue-dark">
                    {item.description}
                  </div>
                  <div className="text-sm text-left text-blue-dark">
                    Last Updated: {item.lastUpdated}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
