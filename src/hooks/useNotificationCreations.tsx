import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import * as subscriptions from "../graphql/subscriptions"; // Ensure this path matches your subscription imports
import { Notification } from "@/API";

const client = generateClient();

const useNotificationCreations = () => {
    const [lastNotificationCreation, setLastNotificationCreation] =
        useState<Notification | null>(null);

    useEffect(() => {
        let subscription: any = null;

        const startSubscription = async () => {
            subscription = (client.graphql({
                query: subscriptions.onCreateNotification,
            })).subscribe({
                next: (value: any) => {
                    if (value.data.onCreateNotification) {
                        setLastNotificationCreation(value.data.onCreateNotification);
                    }
                },
                error: (error: any) => {
                    console.warn("Subscription error:", error);
                },
            });
        };

        startSubscription();

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    return lastNotificationCreation;
};

export default useNotificationCreations;