"use client";
import { useState, useEffect, useRef } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import "../styles/styles.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API"; 

export default function Home2({ params }: { params: { id: string } }) {
  const [agent, setAgent] = useState<GetUserQuery["getUser"]>();
  useEffect(() => {
    async function fetchAgent() {
      const user = await fetchAuthSession(); //Funcion que me da la información del user tokens.signInDetails.loginId
      // @ts-ignore
      const email = user?.tokens?.signInDetails?.loginId;
      const agent = await fetchOneAgent(email);
      setAgent(agent);
    }

    fetchAgent();
  }, []);

  return (
    <>
    {agent?.role ?  
      (
    <div className="flex h-screen">
      <div
        className={`${
          agent?.role == "SUPERVISOR" ? "bg-white" : "bg-figma-figma7"
        } h-full flex justify-center items-center w-3/5 flex-col`}
      >
        <div className="h-1/3 xl:h-1/2 lg:h-1/2 md:h-1/2 sm:h-1/3  w-full flex flex-row pl-20 pt-20">
          <img
            src="/images/S2C Figma7 Logo.svg"
            className=" w-16 h-auto xl:pb-56 l:pb-56 md:pb-56 pb-28"
          />
          <h1 className="text-figma-figma1 font-bold text-4xl pt-4 pl-4">
            S2C
          </h1>
        </div>

        <div className="h-2/3 xl:h-1/2 lg:h-1/2 md:h-1/2 sm:h-2/3  w-full pl-20 ">
          <h1
            className={`${
              agent?.role == "SUPERVISOR" ? "text-black" : "text-white"
            } font-extrabold  text-4xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-4xl`}
          >
            Welcome {agent?.role == "SUPERVISOR" ? "Supervisor" : "Agente"}{" "}
          </h1>
          <p
            className={`${
              agent?.role == "SUPERVISOR" ? "text-black" : "text-white"
            } font-bold text-pink text-xl w-3/5 mt-12 mb-8`}
          >
            Dynamic, agile task management system leveraging real-time insights
            for efficiency
          </p>
          {agent?.role === "SUPERVISOR" ? (
            <>
              <Link href="/AgentManagement">
                <Button className="w-48 h-12 bg-gradient-to-b from-figma-figma6 to-figma-figma1 hover:bg-figma-figma9 focus:bg-figma-figma10 active:bg-figma-figma10 text-background font-bold py-2 px-4 rounded-xl">
                  Get started
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/ControlPanel">
              <Button className="w-48 h-12 bg-gradient-to-b from-figma-figma6 to-figma-figma1 hover:bg-figma-figma9 focus:bg-figma-figma10 active:bg-figma-figma10 text-background font-bold py-2 px-4 rounded-xl">
                Get started
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="w-1/5 h-full flex">
        <div
          className={`${
            agent?.role == "SUPERVISOR"
              ? "bg-figma-figma11"
              : "bg-figma-figma14"
          } w-1/3  h-full`}
        ></div>
        <div
          className={`${
            agent?.role == "SUPERVISOR"
              ? "bg-figma-figma12"
              : "bg-figma-figma15"
          } w-1/3 h-full`}
        ></div>
        <div
          className={`${
            agent?.role == "SUPERVISOR"
              ? "bg-figma-figma13"
              : "bg-figma-figma16"
          } w-1/3 h-full`}
        ></div>
      </div>

      <div className="w-1/5 bg-figma-figma1 pt-20  xl:pl-48 lg:pl-32 md:pl-20 sm:pl-12 pl-12  shrink-0">
        <img
          src="/images/Walmart logo.svg"
          className=" w-16 h-auto pb-64 shrink-0"
        />
      </div>
    </div>  
    )
    :
    (
      <div className="flex h-screen w-screen justify-center items-center">
        <div className=" justify-center  items-center flex flex-col">
          <img
              src="/images/S2C Figma7 Logo.svg"
              className=" w-32 h-auto"
            />
            <h4 className=" py-10 text-3xl font-extralight text-blue-800 ">Summit Service & Consulting</h4>
            <div className="loading-line-container">
              <div className="loading-line"></div>
            </div>
        </div>
      </div>  
        )
  }
  </>
  );
}
