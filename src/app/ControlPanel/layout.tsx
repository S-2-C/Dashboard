import React from "react";
import { ReactNode } from "react";
// import Home from '../NavBar'

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
  Metrics:ReactNode;
  Metrics2:ReactNode;
}) {
  return (
    <>
    <div className="h-screen">
      
    <div className="h-full flex">
  <div className="flex-grow">{children}</div>
  <div className="h-full flex flex-col">
    {/* Row for children and components */}
    <div className="flex flex-grow">
      {/* Second column for Agent, Saturation, and Notif */}
      <div className="h-full flex justify-between p-4 px-20">
        <div className="p-4">{Agent}{Metrics}</div>
        <div className="p-4">{Saturation} {Metrics2}</div>
        <div className="p-4">{Notif}</div>
      </div>
    </div>
    {/* Third column for FU at the bottom */}
    <div className="h-full flex justify-between px-20">
    <div className="p-4 flex" >{FU}</div>
    </div>
  </div>
</div>
</div>
      {/* {Home} */}
    </>
  );
}
