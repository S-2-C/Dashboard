import React from "react";
import { ReactNode } from "react";
// import Home from '../NavBar'
import SearchBar from '../searchBar';

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
        <div className="flex-col">
          <div className="flex justify-end mt-8  m-12">
            <SearchBar />
          </div>
          <div className="mt-20 ">
            {SmartNotif}
          </div>

        </div>
      </div>

      {/* {Home} */}
    </>
  );
}
