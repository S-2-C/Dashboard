"use client";
import { useState, useEffect, useRef } from "react";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import Home from "../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


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
                            <div className="w-2/4 bg-agenman">
                                <div className="flex gap-2 h-16 ">
                                        <div className="w-1/6 flex items-center justify-center">
                                            <Text>Col1</Text>
                                        </div>
                                        <div className="w-2/6 ">
                                        <span className="font-bold text-m mt-8">Richard Hendricks</span>
                                            <br/>
                                            <span className="text-xs">Walmart®.com</span>
                                        </div>
                                        <div className="w-1/6 flex items-center justify-center">
                                            <Text>Col3</Text>
                                        </div>
                                        <div className="w-3/6  flex items-center justify-center text-xs">
                                            <Text>Agent 10 has been in a call for 1:47:50</Text>
                                        </div>
                                </div>
                                <div className="flex gap-2 h-16 bg-agenman-agenmangray">
                                        <div className="w-1/6 flex items-center justify-center">
                                            <Text>Col1</Text>
                                        </div>
                                        <div className="w-2/6 ">
                                        <span className="font-bold text-m mt-8">Dinesh Chugtai</span>
                                            <br/>
                                            <span className="text-xs">Walmart®.com</span>
                                        </div>
                                        <div className="w-1/6 flex items-center justify-center">
                                            <Text>Col3</Text>
                                        </div>
                                        <div className="w-3/6  flex items-center justify-center text-xs">
                                            <Text>Ongoing Call</Text>
                                        </div>
                                </div>
                            </div>

                            <div className="w-2/4 bg-figma-figma4">
                                <Flex direction="column" >
                                    <div className="flex items-center">
                                        <div className="h-6 w-6 bg-agenman-agenmanred rounded-full mr-2"></div>
                                        <div className="text-2xl">
                                            <Text>Alert for Agent in Call</Text>
                                        </div>
                                    </div>
                                    <div className="h-4 flex bg-agenman-agenmanred  items-center rounded-xl"></div>
                                    <div className="flex bg-agenman-agenmansblue1 items-center rounded-xl">
                                            <div className="text-xl">
                                                <Text>NONE</Text>
                                            </div>
                                    </div>
                                </Flex>


                                <Flex direction="column" >
                                    <div className="flex items-center">
                                        <div className="h-6 w-6 bg-agenman-agenmanyellow rounded-full mr-2"></div>
                                        <div className="text-2xl">
                                            <Text>Agent on Call</Text>
                                        </div>
                                    </div>
                                    <div className="h-4 flex bg-agenman-agenmanyellow  items-center rounded-xl"></div>
                                    <div className="flex bg-agenman-agenmansblue2 items-center rounded-xl">
                                            <div className="text-xl">
                                                <Text>NONE</Text>
                                            </div>
                                    </div>
                                </Flex>

                                <div className="flex gap-2">
                                        <div className="w-2/4 flex items-center">
                                            <div className="h-6 w-6 bg-agenman-agenmanblue rounded-full mr-2"></div>
                                            <div className="text-xl">
                                                <Text>Agent on Call</Text>
                                            </div>
                                        </div>
                                        <div className="w-2/4 flex items-center">
                                            <div className="h-6 w-6 bg-agenman-agenmandarkblue rounded-full mr-2"></div>
                                            <div className="text-xl">
                                                <Text>Agent on Call</Text>
                                            </div>
                                        </div>
                                </div>

                                <div className="flex gap-2">
                                        <div className="w-2/4 h-4 flex bg-agenman-agenmanblue items-center rounded-xl"></div>
                                        <div className="w-2/4 h-4 flex bg-agenman-agenmandarkblue items-center rounded-xl"></div>
                                </div>

                                <div className="flex gap-2">
                                        <div className="w-2/4 flex bg-agenman-agenmansblue3 items-center rounded-xl">
                                            <div className="text-xl">
                                                <Text>10/40</Text>
                                            </div>
                                        </div>
                                        <div className="w-2/4 flex bg-agenman-agenmansblue3 items-center rounded-xl">
                                            <div className="text-xl">
                                                <Text>18/40</Text>
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
