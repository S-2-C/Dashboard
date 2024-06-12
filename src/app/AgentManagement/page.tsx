"use client";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { fetchAllAgents } from "@/fetching/fetchingDataFunctions";
import Link from "next/link";
import { User } from "@/API";
import useUserUpdates from "@/hooks/useUserUpdates";
import SearchBar from "../searchBar"; //importing the SearchBar component

export default function AgentManagement() {
    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    const [alertUsers, setAlertUsers] = useState<User[]>([]);
    const [offlineUsers, setOfflineUsers] = useState<User[]>([]);
    const [offlineSupervisors, setOfflineSupervisors] = useState<User[]>([]);

    const [activeWarnings, setActiveWarnings] = useState<User[]>([]);

    const [totalCalls, setTotalCalls] = useState<number>(0);

    const userChange = useUserUpdates(); // This will hold the latest user update

    const addUserToState = (user: User, setter: any) => {
        setter((prev: any) => [...(prev || []), user]);
    };

    const removeUserFromAllState = (user: User) => {
        setAlertUsers((prev) => prev?.filter((u) => u.id !== user.id));
        setActiveUsers((prev) => prev?.filter((u) => u.id !== user.id));
        setOfflineUsers((prev) => prev?.filter((u) => u.id !== user.id));
        setOfflineSupervisors((prev) => prev?.filter((u) => u.id !== user.id));
    };

    useEffect(() => {
        if (userChange) {
            removeUserFromAllState(userChange);
            if (userChange?.needsHelp) {
                addUserToState(userChange, setAlertUsers);
            } else if (userChange?.isOnCall) {
                addUserToState(userChange, setActiveUsers);
            } else if (!userChange?.isOnCall && userChange?.role == "AGENT") {
                addUserToState(userChange, setOfflineUsers);
            } else if (!userChange?.isOnCall && userChange?.role == "SUPERVISOR") {
                addUserToState(userChange, setOfflineSupervisors);
            }
        }
    }, [userChange]);

    useEffect(() => {
        async function fetchAgents() {
            const res = await fetchAllAgents();

            setTotalCalls(res?.items?.length || 0);

            res?.items?.forEach((agent: User) => {
                if (agent?.needsHelp) {
                    setAlertUsers((prev) => [...(prev || []), agent]);
                    setActiveWarnings((prev) => [...(prev || []), agent]);
                } else if (agent?.isOnCall) {
                    setActiveUsers((prev) => [...(prev || []), agent]);
                    setActiveWarnings((prev) => [...(prev || []), agent]);
                } else if (!agent?.isOnCall && agent?.role == "AGENT") {
                    setOfflineUsers((prev) => [...(prev || []), agent]);
                } else if (!agent?.isOnCall && agent?.role == "SUPERVISOR") {
                    setOfflineSupervisors((prev) => [...(prev || []), agent]);
                }
            });
        }

        fetchAgents();
    }, []);

    // Function to format the date to Mexican timezone
    const formatDateToMexicanTimezone = (timestamp: any) => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            timeZone: "America/Mexico_City",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };
        return date.toLocaleString("es-MX", options);
    };

    return (
        <div className="flex h-screen bg-background text-foreground relative">
            <div className="flex flex-col flex-1 p-10 pt-6 ml-20">
                <div className="flex justify-between items-center mb-6">
                    <Heading level={1} fontWeight="Bold">
                        Agent Management
                    </Heading>
                    <SearchBar />
                </div>

                <div className="mt-4">
                    <Flex direction="column" gap="2rem">
                        <Flex gap="2rem">
                            <div className="w-2/4">
                                {activeWarnings.length > 0 &&
                                    activeWarnings.map((user, index) => (
                                        <div
                                            className="grid gap-2 my-1 grid-cols-12 h-16 bg-agenman-agenmangray rounded-xl transition-colors ease-in hover:bg-neutral-300"
                                            key={index}
                                        >
                                            <div className=" m-0 order-1 col-span-2  flex items-center justify-center">
                                                <h1 className="m-0">
                                                    {user?.name
                                                        ? user.name.split(" ")[0]
                                                        : user.id.split("@")[0]}
                                                </h1>
                                            </div>
                                            <div
                                                className=" order-2 col-span-3 "
                                                style={{ padding: "8px" }}
                                            >
                                                <span className="font-bold">
                                                    {user?.id ? user.id.split("@")[0] : " No ID "}
                                                </span>
                                                <br />
                                                <span className="text-xs">Walmart®️.com</span>
                                            </div>
                                            <div className="order-3 col-span-4 flex items-center ">
                                                {user?.needsHelp ? (
                                                    <img
                                                        src={"images/Warning.svg"}
                                                        className="h-10 w-10"
                                                        alt="Agent"
                                                    />
                                                ) : (
                                                    <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="h-10 w-10"
                                                        alt="Agent"
                                                    />
                                                )}
                                                <h1>
                                                    {user?.needsHelp ? "Needs help" : "Ongoing call"}
                                                </h1>
                                            </div>
                                            <div className="order-4 col-span-2 flex items-center text-xs">
                                                <h1>{formatDateToMexicanTimezone(user.updatedAt)}</h1>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="w-2/4 pb-3">
                                <Flex direction="column">
                                    <div className="flex items-center">
                                        <div className="h-6 w-6 bg-agenman-agenmanred rounded-full mr-2"></div>
                                        <div className="text-2xl">
                                            <Text>Alert for Agent on Call</Text>
                                        </div>
                                    </div>
                                    <div className="h-4 flex bg-neutral-300 items-center rounded-xl shadow-md">
                                        <div
                                            className="h-full bg-agenman-agenmanred rounded-xl"
                                            style={{
                                                width: `${(alertUsers.length / totalCalls) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="alertUsers flex h-32 w-full overflow-x-scroll no-scrollbar bg-agenman-agenmansblue1 p-2.5 rounded-xl">
                                        {alertUsers?.map((user, index) => (
                                            <div className="w-min p-1" key={index}>
                                                <Link href={`/ManageCall/${user?.id}`}>
                                                    <div className="flex flex-col items-center w-20">
                                                        <img
                                                            src="images/AgentRed.svg"
                                                            className="h-20 w-20 mx-auto"
                                                            alt="Agent"
                                                        />
                                                        <p className="text-center text-sm text-red-500">
                                                            {user?.name
                                                                ? user.name.split(" ")[0]
                                                                : user.id.split("@")[0]}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </Flex>

                                <Flex direction="column">
                                    <div
                                        className="flex items-center"
                                        style={{ paddingTop: "30px" }}
                                    >
                                        <div className="h-6 w-6 bg-agenman-agenmanyellow rounded-full mr-2"></div>
                                        <div className="text-2xl">
                                            <Text>Agent on Call</Text>
                                        </div>
                                    </div>
                                    <div className="h-4 flex bg-neutral-300 items-center rounded-xl shadow-md">
                                        <div
                                            className="h-full bg-agenman-agenmanyellow rounded-xl"
                                            style={{
                                                width: `${(activeUsers.length / totalCalls) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="activeUsers h-32 last: flex bg-agenman-agenmansblue2 items-center rounded-xl"
                                    >
                                        {activeUsers?.map((user, index) => (
                                            <Link href={`/ManageCall/${user?.id}`} key={index}>
                                                <div className="pl-5">
                                                    <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                    />
                                                    <p
                                                        className={
                                                            "text-center text-sm text-agenman-agenmanyellow"
                                                        }
                                                    >
                                                        {user?.name
                                                            ? user.name.split(" ")[0]
                                                            : user.id.split("@")[0]}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </Flex>

                                <div className="flex gap-2">
                                    <div
                                        className="w-2/4 flex items-center"
                                        style={{ paddingTop: "30px", paddingBottom: "15px" }}
                                    >
                                        <div className="h-6 w-6 bg-agenman-agenmanblue rounded-full mr-2"></div>
                                        <div className="text-xl">
                                            <Text>Agent Available</Text>
                                        </div>
                                    </div>
                                    <div
                                        className="w-2/4 flex items-center"
                                        style={{ paddingTop: "30px", paddingBottom: "15px" }}
                                    >
                                        <div className="h-6 w-6 bg-agenman-agenmandarkblue rounded-full mr-2"></div>
                                        <div className="text-xl">
                                            <Text>Supervisor Available</Text>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="w-2/4 h-4 flex bg-neutral-400 items-center rounded-xl shadow-md">
                                        <div
                                            className="h-full bg-agenman-agenmandarkblue rounded-xl"
                                            style={{
                                                width: `${(offlineUsers.length / totalCalls) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="w-2/4 h-4 flex bg-neutral-400 items-center rounded-xl shadow-md">
                                        <div
                                            className="h-full bg-agenman-agenmandarkblue rounded-xl"
                                            style={{
                                                width: `${(offlineSupervisors.length / totalCalls) * 100
                                                    }%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2" style={{ paddingTop: "15px" }}>
                                    <div
                                        className="offlineUsers w-2/4 h-40 flex flex-col bg-agenman-agenmansblue3 rounded-xl overflow-scroll no-scrollbar pt-1 p-3"
                                    /*style={{ padding: "8px" }}*/
                                    >
                                        {offlineUsers?.map((user, index) => (
                                            <Link href={`/ManageCall/${user?.id}`} key={index}>
                                                <div className="text-4xl flex items-center h-10 w-10">
                                                    <img
                                                        src={"images/AgentBlue.svg"}
                                                        className="mx-auto h-8 w-8"
                                                        alt="Agent"
                                                    />
                                                    <p className="text-white text-sm px-1">
                                                        {user?.name
                                                            ? user?.name.split(" ")[0]
                                                            : user.id.split("@")[0]}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div
                                        className="offlineSupervisors w-2/4 h-40 flex flex-col bg-agenman-agenmansblue3 rounded-xl overflow-scroll no-scrollbar pt-1 p-3"
                                    /*style={{ padding: "10px" }}*/
                                    >
                                        {offlineSupervisors?.map((user, index) => (
                                            <Link href={`/ManageCall/${user?.id}`} key={index}>
                                                <div className="text-4xl flex items-center h-10 w-10">
                                                    <img
                                                        src={"images/AgentWhite.svg"}
                                                        className="mx-auto h-8 w-8"
                                                        alt="Agent"
                                                    />
                                                    <p className="text-white text-sm px-1">
                                                        {user?.name
                                                            ? user?.name.split(" ")[0]
                                                            : user.id.split("@")[0]}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </div>
    );
}
