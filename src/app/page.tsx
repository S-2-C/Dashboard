"use client";
import { useState, useEffect, useRef } from "react";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@aws-amplify/ui-react/styles.css";
import Home from "./NavBar" // Importing the NavBar component
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home2() {

  return (
    <div className="flex h-screen">
      <div className="bg-white h-full flex justify-center items-center w-3/5 flex-col">
        <div className="h-1/2  w-full flex flex-row pl-20 pt-20">
          <img src="/images/S2C Figma1 Logo.svg" className=" w-16 h-auto pb-64" />
          <h1 className="text-figma-figma1 font-bold text-4xl pt-4 pl-4">S2C</h1>

        </div>
        <div className="h-1/2  w-full pl-20 ">
          <Heading level={1} fontWeight="extrabold" className="mb-40">Welcome Supervisor</Heading>
          <p className="text-figma-figma5 font-bold text-xl w-3/5 mt-12 mb-8">Dynamic, agile task management system leveraging real-time insights for efficiency</p>

          <Link href="/AgentManagement">
            <Button className="w-48 h-12 bg-gradient-to-b from-figma-figma6 to-figma-figma1 hover:bg-figma-figma9 focus:bg-figma-figma10 active:bg-figma-figma10 text-background font-bold py-2 px-4 rounded-xl">
              Get Started
            </Button>
          </Link>
        </div>

      </div>

      <div className="w-1/5 h-full flex">
        <div className="w-1/3 bg-figma-figma11 h-full"></div>
        <div className="w-1/3 bg-figma-figma12 h-full"></div>
        <div className="w-1/3 bg-figma-figma13 h-full"></div>

      </div>

      <div className="w-1/5 bg-figma-figma1 pt-20 pl-40">
        <img src="/images/Walmart logo.svg" className=" w-16 h-auto pb-64" />
      </div>

    </div>

  );

}