import React from "react";
import { ReactNode } from "react";
// import Home from '../NavBar'

export default function ControlPanelLayout({
  children,
  Agent,
  Notif,
  Saturation,
}: // Home
{
  children: ReactNode;
  Notif: ReactNode;
  Agent: ReactNode;
  Saturation: ReactNode;
  Home: ReactNode;
}) {
  return (
    <>
      <div className="h-full flex">
    {/* First column for children */}
    <div className="h-full flex-col">
      {children}
    </div>
    {/* Second column for Agent, Notif, and Saturation */}
    <div className="h-full">
      {Agent}
      {Notif}
      {Saturation}
    </div>
  </div>
      
      {/* {Home} */}
    </>
  );
}
