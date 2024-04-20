"use client";
import { useState, useEffect, useRef } from "react";
import Home from "../NavBar" // Importing the NavBar component
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";


export default function Notifications(){
    return (
        <div className=" h-full flex">
            <Home />
            <div className=" h-full ml-4">
                <h1 className="text-figma-figma1">Notifications</h1>
            </div>
        </div>
    )
}