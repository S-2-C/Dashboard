import React from "react";
import { ReactNode } from "react";
import SearchBar from "../searchBar";
import NotifSlot from '@/app/ControlPanel/@Notif/page';

export default function ControlPanelLayout({
  children,
  SmartNotif,
  Notif,
}: // Home
{
  children: ReactNode;
  SmartNotif: ReactNode;
  Notif: ReactNode;
  Home: ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        {/* First column for children */}
        <div className="flex-col w-3/5">{children}</div>

        {/* Second column container */}
        <div className="flex-col w-2/5 p-8">
          {/* Fixed position for SearchBar */}
          <div className="flex justify-end mt-8 m-12 fixed right-0 top-0">
            <SearchBar />
          </div>

          {/* Scrollable content below SearchBar */}
          <div className="mt-24 h-4/5">
            {/* <div className="mt-20"> */}
              <NotifSlot />
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* {Home} */}
    </>
  );
}
