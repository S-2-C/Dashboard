import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

// Control panel: Ask for help
// Ongoing call time,
// amazon connect instance
// documentation,
// Chat,
// wally (AI)

const time = {
  currentTime: "18:15:33",
};

interface ControlPanelAgentLayoutProps {
  children: ReactNode;
  ConnectIns: ReactNode;
  CallTime: ReactNode;
  Documentation: ReactNode;
  Chat: ReactNode;
  WallyChat: ReactNode;
}

export default function ControlPanelAgentLayout({
  children,
  CallTime,
  ConnectIns,
  Documentation,
  Chat,
  WallyChat,
}: ControlPanelAgentLayoutProps) {
  return (
    <>
      <div className="h-full flex">
        {/* First column for children */}
        <div className="h-full flex-col">{children}</div>
        {/* Second column for slots*/}
        <div className="h-full w-full">
          <h1 className="ml-40 mt-20 mb-8 text-4xl font-bold">Control Panel</h1>
          <div className="flex h-full ml-10">
            {/* First column of slots: call time, chat and ask for help*/}
            <div className="flex flex-col w-1/2">
              {CallTime}
              {Chat}
              <button className="bg-figma-figma2 hover:bg-figma-figma9 font-bold py-2 px-2 rounded shadow-lg">
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="text-white w-10 h-10 pr-4 pt-2 pl-2"
                  />
                  <div className="flex flex-col">
                    <label className="text-white text-2xl">Ask for help</label>
                    <label className="text-white">
                      {" "}
                      Requested at: {time.currentTime}
                    </label>
                  </div>
                </div>
              </button>
            </div>
            {/* Second column of slots: documentation and Wally chat */}
            <div className="flex flex-col ml-10 w-3/4">
              {Documentation}
              {WallyChat}
            </div>
            {/* Third column of slots: Connect instance*/}
            <div className="flex flex-col ml-10 w-3/4">{ConnectIns}</div>
          </div>
        </div>
      </div>
    </>
  );
}
