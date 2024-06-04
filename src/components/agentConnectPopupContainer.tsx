"use client";

import AgentConnectPopup from "@/components/agentConnectPopup";
import React from "react";
import { useUserRole } from "@/hooks/useUserRole";

const AgentConnectPopupContainer: React.FC = () => {
  const userRole = useUserRole();

  console.log("userRole: ", userRole);

  return <>{userRole?.role === "AGENT" && <AgentConnectPopup />}</>;
};

export default AgentConnectPopupContainer;
