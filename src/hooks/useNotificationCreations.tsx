import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import * as subscriptions from "../graphql/subscriptions"; // Ensure this path matches your subscription imports
import { Notification } from "@/API";

const client = generateClient();

const useNotificationCreations = () => {
  const [lastNotificationCreation, setLastNotificationCreation] =
    useState<any>(null);

  useEffect(() => {
    const sub = client.graphql({
      query: subscriptions.onCreateNotification,
    });
    console.log("Subscribing to user updates");
    sub.subscribe({
      next: ({ data }: any) => {
        if (data.onCreateNotification) {
          setLastNotificationCreation(data.onCreateNotification);
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

  return lastNotificationCreation as Notification;
};

export default useNotificationCreations;
