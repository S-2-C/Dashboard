"use client";
import useNotificationCreations from "@/hooks/useNotificationCreations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Notification } from "@/API";
import { useUserRole } from "@/hooks/useUserRole";
import { fetchAllNotifications } from "@/fetching/fetchingDataFunctions";
import { updateRoutingProfiles } from "@/fetching/updateRoutingProfilesAutomatic";

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
      setNotificationList(sortNotifications(notifs));
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

  const handleNotificationClick = (action: string, email?: string | null) => {
    console.log("Notification action", action);
    switch (action) {
      case "CHECK_QUEUE_WAIT_TIME" || "MOVE_AGENTS_TO_QUEUE":
        console.log("Moving agents");
        updateRoutingProfiles();
        window.location.href = `/Channels`;
        break;
      case "REASSIGN_OR_CHAT_WITH_AGENT":
        console.log(
          "Reassign or chat with agent, redirecting: " + `/ManageCall/${email}`
        );
        window.location.href = `/ManageCall/${email}`;
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`flex flex-col p-4 rounded-lg h-full shadow-lg ${
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
              onClick={() =>
                handleNotificationClick(notif.action, notif.agentEmail)
              }
              className={`p-4 rounded-lg shadow-md mb-4 flex flex-row font-normal 
              ${notif.action && "cursor-pointer"}
               ${notif.urgency === "HIGH" ? "text-white" : "text-blue-dark"}
                ${
                  notif.urgency === "HIGH"
                    ? "bg-blue-dark"
                    : notif.urgency === "MEDIUM"
                    ? "bg-blue"
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
