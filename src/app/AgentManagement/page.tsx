"use client";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import Home from "../NavBar";
import { useEffect, useState } from "react";
import {  fetchAllAgents } from "@/fetching/fetchingDataFunctions";
import Link from "next/link";
import { Euphoria_Script } from "next/font/google";
import { GetContactQuery, ListUsersQuery, ListContactsQuery, Contact, User } from "@/API";


export default function AgentManagement() {
    const [ activeUsers, setActiveUsers ] = useState<User[]>([]);
    const [ alertUsers, setAlertUsers ] = useState<User[]>([]);
    const [ offlineUsers, setOfflineUsers ] = useState<User[]>([]);
    const [ offlineSupervisors, setOfflineSupervisors ] = useState<User[]>([]);

    useEffect(() => {
        async function fetchAgents() {
            const res = await fetchAllAgents();

            res?.items?.forEach((agent: User) => {
                console.log(agent);


                if (agent?.needsHelp) {
                    setAlertUsers((prev) => [...(prev || []), agent]);
                } else if (agent?.isOnCall) {
                    setActiveUsers((prev) => [...(prev || []), agent]);
                } else if (!agent?.isOnCall && agent?.role == "AGENT") {
                    setOfflineUsers((prev) => [...(prev || []), agent]);
                } else if (!agent?.isOnCall && agent?.role == "SUPERVISOR"){
                    setOfflineSupervisors((prev) => [...(prev || []), agent]);
                }
            }
            );

            console.log("res", res);

        }
        fetchAgents();
    }, []);

    return (
        <div className="flex h-screen bg-background text-foreground relative">
            <Home />
            <div className="flex flex-col flex-1 p-10 ml-20">
                <Flex direction="column" gap="2rem">
                    <Heading level={1} fontWeight="bold">Agent Management</Heading>
                </Flex>
                <div className="mt-12">
                    <Flex direction="column" gap="2rem">
                        <Flex gap="2rem">
                            <div className="w-2/4">
                                <div className="flex gap-2 h-16 bg-agenman rounded-xl">
                                        <div className="w-1/6 flex items-center justify-center">
                                            <Text>Col1</Text>
                                        </div>
                                        <div className="w-2/6 " style={{ padding: '8px' }}>
                                        <span className="font-bold text-m mt-8">Richard Hendricks</span>
                                            <br/>
                                            <span className="text-xs">Walmart®.com</span>
                                        </div>
                                        <div className="w-1/6 flex items-center justify-center">
                                                <img
                                                    src={"images/Warning.svg"}
                                                    className="mx-auto h-10 w-10"
                                                    alt="Agent"
                                                />
                                        </div>
                                        <div className="w-3/6  flex items-center text-xs">
                                            Hello
                                        </div>
                                </div>
                                <div className="flex gap-2 h-16 bg-agenman-agenmangray rounded-xl">
                                        <div className="w-1/6 flex items-center justify-center">
                                            <Text>Col1</Text>
                                        </div>
                                        <div className="w-2/6 " style={{ padding: '8px' }}>
                                        <span className="font-bold text-m mt-8">Dinesh Chugtai</span>
                                            <br/>
                                            <span className="text-xs">Walmart®.com</span>
                                        </div>
                                        <div className="w-1/6 flex items-center justify-center">
                                                <img
                                                    src={"images/OnCall.svg"}
                                                    className="mx-auto h-10 w-10"
                                                    alt="Agent"
                                                />
                                        </div>
                                        <div className="w-3/6  flex items-center text-xs">
                                            <Text>Ongoing Call</Text>
                                        </div>
                                </div>
                            </div>

                            <div className="w-2/4">
                                <Flex direction="column" >
                                    <div className="flex items-center">
                                        <div className="h-6 w-6 bg-agenman-agenmanred rounded-full mr-2"></div>
                                        <div className="text-2xl">
                                            <Text>Alert for Agent in Call</Text>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-agenman-agenmanred  items-center rounded-xl shadow-md"></div>
                                    <div className="flex w-full overflow-x-scroll no-scrollbar  bg-agenman-agenmansblue1 p-2.5 rounded-xl">
                                        {alertUsers?.map((user, index) => (
                                            <div className=" w-min p-1" key={index}>
                                            <Link href={`/ManageCall/${user?.id}`}>
                                                <div className="flex flex-col items-center w-20 ">
                                                    <img
                                                        src="images/AgentRed.svg"
                                                        className="h-20 w-20 mx-auto"
                                                        alt="Agent"
                                                    />
                                                    <p className="text-center text-sm text-red-500">
                                                    {user?.name ? user.name.split(" ")[0] : user.id.split("@")[0]}
                                                    </p>
                                                </div>
                                            </Link>
                                            </div>
                                        ))}
                                        </div>

                                </Flex>

                                <Flex direction="column" >
                                    <div className="flex items-center" style={{ paddingTop: '30px' }}>
                                        <div className="h-6 w-6 bg-agenman-agenmanyellow rounded-full mr-2" ></div>
                                        <div className="text-2xl">
                                            <Text>Agent on Call</Text>
                                        </div>
                                    </div>
                                    <div className="h-4 flex bg-agenman-agenmanyellow  items-center rounded-xl shadow-md"></div>
                                    <div className="flex bg-agenman-agenmansblue2 items-center rounded-xl" style={{ padding: '10px' }}>
                                        {activeUsers?.map((user, index) => (
                                            <Link href={`/ManageCall/${user?.id}`}>
                                            <div>
                                                <img
                                                        src={"images/AgentYellow.svg"}                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanyellow"}>
                                                {user?.name ? user.name.split(" ")[0] : user.id.split("@")[0]}
                                                </p>
                                            </div>
                                            </Link>
                                        ))}
                                    </div>
                                </Flex>

                                <div className="flex gap-2">
                                        <div className="w-2/4 flex items-center" style={{ paddingTop: '30px', paddingBottom: '15px'}}>
                                            <div className="h-6 w-6 bg-agenman-agenmanblue rounded-full mr-2"></div>
                                            <div className="text-xl">
                                                <Text>Agent Available</Text>
                                            </div>
                                        </div>
                                        <div className="w-2/4 flex items-center" style={{ paddingTop: '30px', paddingBottom: '15px'}}>
                                            <div className="h-6 w-6 bg-agenman-agenmandarkblue rounded-full mr-2"></div>
                                            <div className="text-xl">
                                                <Text>Supervisor Available</Text>
                                            </div>
                                        </div>
                                </div>

                                <div className="flex gap-2">
                                        <div className="w-2/4 h-4 flex bg-agenman-agenmanblue items-center rounded-xl shadow-md" ></div>
                                        <div className="w-2/4 h-4 flex bg-agenman-agenmandarkblue items-center rounded-xl shadow-md"></div>
                                </div>

                                <div className="flex gap-2" style={{ paddingTop: '15px'}}>
                                        <div className="w-2/4 flex flex-col  bg-agenman-agenmansblue3 rounded-xl" style={{ padding: '10px' }}>
                                            {offlineUsers?.map((user, index) => (
                                            <Link href={`/ManageCall/${user?.id}`}>
                                                <div className="text-4xl flex items-center  h-10 w-10">
                                                <img
                                                    src={"images/AgentBlue.svg"}
                                                    className="mx-auto h-10 w-10"
                                                    alt="Agent"
                                                />
                                                <p className=" text-white text-sm px-1"> {user?.name ? user?.name.split(" ")[0] : user.id.split("@")[0]}</p>
                                            </div>
                                            </Link>
                                            ))}
                                           
                                        </div>


                                        <div className="w-2/4 flex flex-col bg-agenman-agenmansblue3 rounded-xl" style={{ padding: '10px' }}>
                                            {offlineSupervisors?.map((user, index) => (
                                            <Link href={`/ManageCall/${user?.id}`}>
                                                <div className="text-4xl flex items-center  h-10 w-10">
                                                    <img
                                                        src={"images/AgentWhite.svg"}
                                                        className="mx-auto h-20 w-20"
                                                        alt="Agent"
                                                    />
                                                    <p className=" text-white text-sm px-1"> {user?.name ? user?.name.split(" ")[0] : user.id.split("@")[0]}</p>
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
