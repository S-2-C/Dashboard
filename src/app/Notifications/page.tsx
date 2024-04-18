"use client";
import { useState, useEffect, useRef } from "react";
import Home from "../NavBar.tsx"
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";

export default function Notifications(){
    return (
        <div className="flex h-screen bg-background text-foreground relative">
            
            <Home/>
            <div className={`flex flex-col flex-1 p-10 ml-20`}>
            <Flex direction="column" gap="2rem">
            <Heading level={1}>Notifications</Heading>
            <Text className="text-sans">Here is some text</Text>
            <Button>Click Me</Button>
            </Flex>
            <div className="absolute top-0 right-0 mt-4 mr-4">
            
          
        </div>
      </div>
        </div>
    )
}