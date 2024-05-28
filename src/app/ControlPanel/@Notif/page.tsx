"use client";
import useNotificationCreations from "@/hooks/useNotificationCreations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Notification } from "@/API";
import { useUserRole } from "@/hooks/useUserRole";
import { fetchAllNotifications } from "@/fetching/fetchingDataFunctions";

export default function NotifSlot() {
  const agent = useUserRole();
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const lastNotification = useNotificationCreations();

  useEffect(() => {
    // define a function to fetch all notifications
    const fetchNotifications = async () => {
      // fetch all notifications
      const notifs = await fetchAllNotifications();
      console.log("Notifications", notifs);
      // set the notifications to the state
      setNotificationList(notifs);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (lastNotification) {
      setNotificationList((prev: Notification[]) => [
        ...prev,
        lastNotification,
      ]);
    }
  }, [lastNotification]);

  const handleNotificationClick = (action: string) => {
    console.log("Notification action", action);
    switch (action) {
      case "MOVE_AGENTS_TO_QUEUE_DELIVERY":
        console.log("Moving agents to queue delivery");
        break;
      case "MOVE_AGENTS_TO_QUEUE_ONLINE":
        console.log("Moving agents to queue online");
        break;
      case "MOVE_AGENTS_TO_QUEUE_PHYSICAL":
        console.log("Moving agents to queue physical");
        break;
      case "MOVE_AGENTS_TO_QUEUE_PASS":
        console.log("Moving agents to queue pass");
        break;
      case "REASSIGN_OR_CHAT_WITH_AGENT":
        console.log("Reassign or chat with agent");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`flex flex-col p-4 rounded-lg h-full ${
        agent?.role === "SUPERVISOR" ? "bg-teal-background" : "bg-blue-dark"
      }`}
    >
      <h1 className="text-4xl font-bold text-white text-center p-4">
        Notifications
      </h1>

      {agent?.role === "SUPERVISOR" && (
        <div className="overflow-scroll no-scrollbar h-full flex flex-col">
          {/* Map over notifications here */}
          {notificationList.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.action)}
              className={`p-4 rounded-lg shadow-md mb-4 flex flex-row font-bold 
              ${notif.action && "cursor-pointer"}
               ${notif.urgency === "HIGH" ? "text-white" : "text-blue-dark"}
                ${
                  // Low, Medium, High, Regular enum
                  notif.urgency === "HIGH"
                    ? "bg-blue-dark"
                    : notif.urgency === "MEDIUM"
                    ? "bg-figma-figma1"
                    : notif.urgency === "LOW"
                    ? "bg-blue"
                    : "bg-white"
                }`}
            >
              {notif.urgency === "HIGH" && (
                <img
                  src="images/Warning.svg"
                  className="w-40 h-auto mx-auto"
                  alt="Agent"
                />
              )}
              <div className="flex flex-wrap flex-col">
                <span>{new Date(notif.createdAt).toLocaleString()}</span>{" "}
                <span>{notif.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
