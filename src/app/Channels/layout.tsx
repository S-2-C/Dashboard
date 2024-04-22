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
      <div className="h-full flex">
        {/* First column for children */}
        {/* <div className="h-full flex-col">
          Header
        </div> */}
        <div className="h-full flex-col w-2/3">
          {children}
        </div>
        {/* Second column for Agent, Notif, and Saturation */}
        <div className="mt-20">
          {SmartNotif}
        </div>
      </div>
        
        {/* {Home} */}
      </>
    );
  }
  