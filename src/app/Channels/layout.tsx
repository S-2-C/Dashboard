import React from "react";
import { ReactNode } from "react";

export default function ControlPanelLayout({
  children,
  SmartNotif,
}: {
  children: ReactNode;
  SmartNotif: ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        {/* First column for children */}
        <div className="flex-col w-3/5">{children}</div>

        {/* Second column container */}
        <div className="flex-col w-2/5 p-8">
          {/* Scrollable content below SearchBar */}
          <div className="mt-24 h-4/5">
            {/* <div className="mt-20"> */}
            {SmartNotif}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* {Home} */}
    </>
  );
}
