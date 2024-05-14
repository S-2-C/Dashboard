import React from "react";
import { ReactNode } from "react";
// import Home from '../NavBar'

export default function ControlPanelLayout({
    children,
    SmartNotif,
  }: // Home
  {
    children: ReactNode;
    SmartNotif: ReactNode;
    Home: ReactNode;
  }) {
    return (
      <>
      <div className="h-full flex h-screen">
        {/* First column for children */}
        {/* <div className="h-full flex-col">
          Header
        </div> */}
        <div className="h-full flex-col w-3/5">
          {children}
        </div>

        {/* Second column for Agent, Notif, and Saturation */}
        <div className="w-2/5 h-4/6  mt-40 mr-10">
          {SmartNotif}
        </div>
      </div>
        
        {/* {Home} */}
      </>
    );
  }
  