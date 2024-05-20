'use client';
import React from "react";
import { useEffect, useState } from "react";

import { ReactNode } from "react";
// import Home from '../NavBar'
import SearchBar from "../searchBar";

export default function ControlPanelLayout({
  children,
  Agent,
  Notif,
  Saturation,
  FU,
  Metrics,
  Metrics2,
}: // Home
{
  children: ReactNode;
  Notif: ReactNode;
  Agent: ReactNode;
  Saturation: ReactNode;
  Home: ReactNode;
  FU: ReactNode;
  Metrics: ReactNode;
  Metrics2: ReactNode;
}) {
  return (
    <>
      <div className="h-screen">
        <div className="h-full flex flex-warp">
          <div className="flex-grow">{children}</div>
          <div className=" overflow-scroll  no-scrollbar">
            {/* Row for children and components */}
            {/* Second column for Agent, Saturation, and Notif */}
            <div className="flex justify-end  px-16 pt-4">
              <SearchBar />
            </div>
            <div className="flex h-4/5 justify-between pl-20 ">
              <div>
                <div className="p-4">{Agent}</div>
                <div className="p-4">{Metrics}</div>
              </div>
              <div>
                <div className="p-4">{Saturation}</div>
                <div className="p-4">{Metrics2}</div>
              </div>
              <div className="p-4">{Notif}</div>
            </div>
            <div className="justify-between pl-20">
              <div className="p-4 ">{FU}</div>
            </div>
          </div>
        </div>
      </div>
      {/* {Home} */}
    </>
  );
}
