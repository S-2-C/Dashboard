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
  Metrics: ReactNode;
  Metrics2: ReactNode;
}) {
  return (
    <>
      <div className="h-screen">
        <div className="h-full flex ">
          <div className="flex-grow">{children}</div>
          <div>
              {/* Row for children and components */}
                {/* Second column for Agent, Saturation, and Notif */}
                <div className="flex h-4/5 justify-between p-4 px-20">
                  <div>
                    <div className="p-4">{Agent}</div>
                    <div className="p-4">{Metrics}</div>
                  </div>
                  <div >
                    <div className="p-4">{Saturation}</div>
                    <div className="p-4">{Metrics2}</div>
                  </div>
                  <div className="p-4">{Notif}</div>
                </div>
            <div className="justify-between px-20">
              <div className="p-4 ">{FU}</div>
            </div>
          </div>
        </div>
      </div>
      {/* {Home} */}
    </>
  );
}
