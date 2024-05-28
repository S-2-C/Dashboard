"use client";

import { useEffect, useState } from "react";
import { GetUserQuery } from "@/API";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";

export const useUserRole = () => {
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

  return agent;
};
