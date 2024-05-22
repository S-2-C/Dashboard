"use client";
import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import a question mark icon
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MetricsSlot() {
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
    <div className="py-4 ">
       {agent?.role === "SUPERVISOR" ? (
         <>
      <div className="bg-metrics rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-bold text-center p-4">
            Metric 2
          </h1>
      </div>
      </>
      ) : (
        <div className="bg-metrics rounded-lg shadow-md p-4">
        <h1 className="text-3xl font-bold text-center p-4">
          Chat bot
        </h1>
    </div>
    
    
    )}
  </div>
    );
  }