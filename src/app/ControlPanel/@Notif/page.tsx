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
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [filterUrgency, setFilterUrgency] = useState<string>("");
  const lastNotification = useNotificationCreations();

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifs = await fetchAllNotifications();
      console.log("Notifications", notifs);
      setNotificationList(notifs);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (lastNotification) {
      setNotificationList((prev: Notification[]) => {
        const updatedList = [...prev, lastNotification];
        return sortNotifications(updatedList);
      });
    }
  }, [lastNotification]);

  useEffect(() => {
    setFilteredNotifications(applyFilters(notificationList));
  }, [notificationList, filterUrgency]);

  const sortNotifications = (notifications: Notification[]) => {
    return notifications.sort((a, b) => {
      const timeComparison =
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (timeComparison !== 0) return timeComparison;
      const urgencyOrder = ["HIGH", "MEDIUM", "LOW", "REGULAR"];
      return urgencyOrder.indexOf(a.urgency) - urgencyOrder.indexOf(b.urgency);
    });
  };

  const applyFilters = (notifications: Notification[]) => {
    if (!filterUrgency) return notifications;
    return notifications.filter((notif) => notif.urgency === filterUrgency);
  };

  const handleUrgencyFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterUrgency(e.target.value);
  };

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
          <div className="mb-4">
            <label htmlFor="urgencyFilter" className="text-white mr-2">
              Filter by urgency:
            </label>
            <select
              id="urgencyFilter"
              value={filterUrgency}
              onChange={handleUrgencyFilterChange}
              className="p-2 rounded-lg"
            >
              <option value="">All</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
              <option value="REGULAR">Regular</option>
            </select>
          </div>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.action)}
              className={`p-4 rounded-lg shadow-md mb-4 flex flex-row font-bold 
              ${notif.action && "cursor-pointer"}
               ${notif.urgency === "HIGH" ? "text-white" : "text-blue-dark"}
                ${
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
