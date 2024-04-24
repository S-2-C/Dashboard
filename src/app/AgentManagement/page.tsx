"use client";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import Home from "../NavBar";


export default function AgentManagement() {
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
                                            <Text>Agent 10 has been in a call for 1:47:50</Text>
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
                                    <div className="h-4 flex bg-agenman-agenmanred  items-center rounded-xl shadow-md"></div>
                                    <div className="flex bg-agenman-agenmansblue1 items-center rounded-xl" style={{ padding: '10px' }}>
                                             <div>
                                                <img
                                                        src={"images/AgentRed.svg"}
                                                        className="mx-auto h-20 w-20"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanred"}>
                                                    #10
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentRed.svg"}
                                                        className="mx-auto h-20 w-20"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanred"}>
                                                    #20
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentRed.svg"}
                                                        className="mx-auto h-20 w-20"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanred"}>
                                                    #24
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentRed.svg"}
                                                        className="mx-auto h-20 w-20"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanred"}>
                                                    #72
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentRed.svg"}
                                                        className="mx-auto h-20 w-20"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanred"}>
                                                    #81
                                                </p>
                                            </div>
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
                                            <div>
                                                <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanyellow"}>
                                                    #12
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanyellow"}>
                                                    #7
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanyellow"}>
                                                    #4
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanyellow"}>
                                                    #26
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                        src={"images/AgentYellow.svg"}
                                                        className="mx-auto h-10 w-10"
                                                        alt="Agent"
                                                />
                                                <p className = {"text-center text-sm text-agenman-agenmanyellow"}>
                                                    #30
                                                </p>
                                            </div>
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
                                                <Text>Agent Off-line</Text>
                                            </div>
                                        </div>
                                </div>

                                <div className="flex gap-2">
                                        <div className="w-2/4 h-4 flex bg-agenman-agenmanblue items-center rounded-xl shadow-md" ></div>
                                        <div className="w-2/4 h-4 flex bg-agenman-agenmandarkblue items-center rounded-xl shadow-md"></div>
                                </div>

                                <div className="flex gap-2" style={{ paddingTop: '15px'}}>
                                        <div className="w-2/4 flex items-center bg-agenman-agenmansblue3 rounded-xl" style={{ padding: '10px' }}>
                                            <div className="text-4xl flex items-center">
                                                <img
                                                    src={"images/AgentBlue.svg"}
                                                    className="mx-auto h-20 w-20"
                                                    alt="Agent"
                                                />
                                                <Text></Text>
                                            </div>
                                        </div>


                                        <div className="w-2/4 flex items-center bg-agenman-agenmansblue3 rounded-xl" style={{ padding: '10px' }}>
                                            <div className="text-4xl flex items-center">
                                                <img
                                                    src={"images/AgentWhite.svg"}
                                                    className="mx-auto h-20 w-20"
                                                    alt="Agent"
                                                />
                                                <Text></Text>
                                            </div>
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
