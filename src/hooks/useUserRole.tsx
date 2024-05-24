import { useEffect, useState } from "react";
import { GetUserQuery } from "@/API";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";

export const useUserRole = () => {
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

  return agent;
};
