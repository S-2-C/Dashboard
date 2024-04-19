"use client";
import { useState, useEffect, useRef } from "react";
import Home from "../NavBar" // Importing the NavBar component
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";


export default function Notifications(){
    return (
        <div className="flex h-screen relative ">
            
            <Home/>
            <div className={`flex flex-col flex-1 p-10 ml-20 text-teal`}>
            <Flex direction="column" gap="2rem">
            <Heading level={1} className="text-figma1">Notifications</Heading>
            <Text className="text-teal">Here is some text</Text>
            <Button>Click Me</Button>
            </Flex>
            <div className="absolute top-0 right-0 mt-4 mr-4">
          
            </div>
        </div>
        </div>
    )
}