"use client";
import { useState, useEffect, useRef } from "react";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import { fetchAuthSession } from 'aws-amplify/auth';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@aws-amplify/ui-react/styles.css";
import Home from "./NavBar" // Importing the NavBar component
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";

export default function Home2({ params }: { params: {id: string } }) {
  const[ agent, setAgent ] = useState<GetUserQuery["getUser"]>();
  useEffect(() => {
    async function fetchAgent() {
      // const res = await fetchOneAgent(params.id);
      // console.log(res);

    const user = await fetchAuthSession(); //Funcion que me da la información del user tokens.signInDetails.loginId
    const email = user?.tokens?.signInDetails?.loginId;
    console.log(email)
    const agent = await fetchOneAgent(email);
    console.log("agent", agent);
    setAgent(agent);
    // // {agent?.role == "SUPERVISOR" ? (
    // //   <Text fontWeight="bold">Supervisor</Text>
    // // )
    // console.log(agent);
    }

    fetchAgent();
  }, []);

  return (
    
    <div className="flex h-screen">
    
      <div className={`${agent?.role == "SUPERVISOR" ? "bg-white" : "bg-blue"} h-full flex justify-center items-center w-3/5 flex-col`}>
        <div className="h-1/2  w-full flex flex-row pl-20 pt-20">
          <img src="/images/S2C Figma1 Logo.svg" className=" w-16 h-auto pb-64" />
          <h1 className="text-figma-figma1 font-bold text-4xl pt-4 pl-4">S2C</h1>

        </div>
        <div className="h-1/2  w-full pl-20 ">
          <Heading level={1} fontWeight="extrabold" className="mb-40">Welcome {agent?.role == "SUPERVISOR" ? "Supervisor" : "Agente"}</Heading>
          <p className="text-figma-figma5 font-bold text-xl w-3/5 mt-12 mb-8">Dynamic, agile task management system leveraging real-time insights for efficiency</p>

          <Link href="/AgentManagement">
            <Button className="w-48 h-12 bg-gradient-to-b from-figma-figma6 to-figma-figma1 hover:bg-figma-figma9 focus:bg-figma-figma10 active:bg-figma-figma10 text-background font-bold py-2 px-4 rounded-xl">
              Get started
            </Button>
          </Link>
        </div>

      </div>

      <div className="w-1/5 h-full flex">
        <div className="w-1/3 bg-figma-figma11 h-full"></div>
        <div className="w-1/3 bg-figma-figma12 h-full"></div>
        <div className="w-1/3 bg-figma-figma13 h-full"></div>

      </div>

      <div className="w-1/5 bg-figma-figma1 pt-20 pl-40">
        <img src="/images/Walmart logo.svg" className=" w-16 h-auto pb-64" />
      </div>

    </div>

  );

}