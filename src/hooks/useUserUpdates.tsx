import { useEffect, useRef, useState } from "react";
import { generateClient } from "aws-amplify/api";
import * as subscriptions from "../graphql/subscriptions"; // Ensure this path matches your subscription imports
import { User } from "@/API";

const client = generateClient();

const useUserUpdates = () => {
  const [lastUserUpdate, setLastUserUpdate] = useState<any>(null);

  useEffect(() => {
    const sub = client.graphql({
      query: subscriptions.onUpdateUser,
    });
    console.log("Subscribing to user updates");
    sub.subscribe({
      next: ({ data }: any) => {
        if (data.onUpdateUser) {
          setLastUserUpdate(data.onUpdateUser);
        }
      },
      error: (error: any) => {
        console.warn("Subscription error:", error);
      },
    });

    return () => {
      // TODO: Unsubscribe from the subscription
    };
  }, []);

  return lastUserUpdate as User;
};

export default useUserUpdates;
