"use client";
import { useState, useEffect, useRef } from "react";
import Home from "../NavBar" // Importing the NavBar component
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";


export default function Notifications(){
    return (
        <div className=" h-full flex">
            <Home />
            <div className="mt-20 flex flex-col ml-40">
                <div className=" ">
                    <h1 className="text-figma-figma1">Notifications</h1>
                    <h2>Category</h2>
               
                <div className="">
                    <div>OverView</div>
                    <div>Walmart.com</div>
                    <div>Walmart Express</div>
                </div>
                </div>
            </div>
        </div>
    )
}