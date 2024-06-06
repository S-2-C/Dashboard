import React from "react";
import "./agentConnectPopup.css";
import { ConnectStatusBar } from "./connectStatusBar";
import { ConnectCallModal } from "./connectCallModal";

const CCPContainer: React.FC = () => {
  return (
    <>
      <div id="ccp-container" style={{ display: "none" }}></div>
      <ConnectCallModal />
      <ConnectStatusBar />
    </>
  );
};

export default CCPContainer;
