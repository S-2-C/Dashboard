"use client";
import React, { createContext, useEffect, useState } from "react";
import "amazon-connect-streams";

// Extendiendo la interfaz Window para incluir 'connect'
declare global {
  interface Window {
    connect: {
      contact: (callback: (contact: any) => void) => void;
      core: {
        initCCP: (container: HTMLElement, config: any) => void;
      };
    };
  }
}

interface CCPContextType {
  currentAgent: connect.Agent | null;
  agentState: string;
  callTime: number;
  callStartTime: string;
  isContactAccepted: boolean;
  changeAgentState: (targetState: string) => void;
  acceptContact: () => void;
  rejectContact: () => void;
  hangUpContact: () => void;
  incomingContact: connect.Contact | null;
  logOut: () => Promise<void>;
  contacts: connect.Contact[];
  mute: () => void;
  unmute: () => void;
  isMuted: boolean;
}

const CCPContext = createContext<CCPContextType | null>(null);

export const CCPContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentAgent, setCurrentAgent] = useState<connect.Agent | null>(null);
  const [agentState, setAgentState] = useState("");
  const [incomingContact, setIncomingContact] =
    useState<connect.Contact | null>(null);
  const [contacts, setContacts] = useState<connect.Contact[]>([]);
  const [isContactAccepted, setIsContactAccepted] = useState(false);
  const [callTime, setCallTime] = useState(0);
  // const [callDuration, setCallDuration] = useState(0);
  const [callStartTime, setCallStartTime] = useState("");
  const [isMuted, setIsMuted] = useState(false); // Estado para gestionar el mute

  const mute = () => {
    const connection = incomingContact?.getAgentConnection();
    if (connection instanceof connect.VoiceConnection) { // Verificar que la conexión es una VoiceConnection
      connection.muteParticipant({
        success: () => {
          console.log("Muted successfully.");
          setIsMuted(true);
        },
        failure: (error) => {
          console.error("Failed to mute:", error);
        }
      });
    } else {
      console.log("Connection is not a voice connection.");
    }
  };

  const unmute = () => {
    const connection = incomingContact?.getAgentConnection();
    if (connection instanceof connect.VoiceConnection) { // Verificar que la conexión es una VoiceConnection
      connection.unmuteParticipant({
        success: () => {
          console.log("Unmuted successfully.");
          setIsMuted(false);
        },
        failure: (error) => {
          console.error("Failed to unmute:", error);
        }
      });
    } else {
      console.log("Connection is not a voice connection.");
    }
  };

  useEffect(() => {
    const ccpContainer = document.getElementById("ccp-container");
    console.log(
      "ccpContainer: ",
      ccpContainer,
      ", window.connect:",
      window.connect
    );

    if (!ccpContainer || !window.connect || ccpContainer.firstChild) {
      console.error("CCP container not found or already initialized");
      return;
    }

    window.connect.core.initCCP(ccpContainer, {
      ccpUrl: "https://ss2cc.my.connect.aws/connect/ccp-v2/",
      // ccpUrl: "https://bebopruebas.my.connect.aws/connect/ccp-v2/",
      loginPopup: true,
      region: "us-east-1",
      softphone: {
        allowFramedSoftphone: true,
      },
    });

    window.connect.agent(function (agent) {
      setCurrentAgent(agent);
      agent.onStateChange(function (stateChange) {
        setAgentState(stateChange.newState);
        if (stateChange.newState === "Busy") {
          setCallTime(0); // Reset call duration on new call
          const intervalId = setInterval(() => {
            const duration = agent.getStateDuration();
            setCallTime(duration / 1000); // Convert milliseconds to seconds
          }, 1000);
          return () => clearInterval(intervalId);
        }
      });
    });

    window.connect.contact(function (contact) {
      setIncomingContact(contact);
      console.log("Hello, incomingContact: ", contact);
      setContacts((prevContacts) => [...prevContacts, contact]);
    });
  }, [window.connect]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isContactAccepted) {
      setCallStartTime(new Date().toISOString());
      intervalId = setInterval(() => {
        setCallTime((prevTime) => prevTime + 1); // Incrementa el tiempo cada segundo
      }, 1000);
    } else {
      setCallTime(0);
      setCallStartTime("");
    }

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta o cambia el estado de aceptación
    };
  }, [isContactAccepted]);

  const changeAgentState = (targetState: string) => {
    if (incomingContact && isContactAccepted) {
      console.error("Cannot change state while on a call");
      return;
    }
    // Usamos la función callback para obtener la referencia del agente
    window.connect.agent((agent) => {
      const states = agent.getAgentStates();
      const desiredState = states.find((state) => state.name === targetState);
      if (desiredState && currentAgent) {
        currentAgent.setState(
          desiredState,
          {
            success: () => {
              setAgentState(desiredState.name);
              console.log(`State changed to ${desiredState.name}`);
            },
            failure: (err) => {
              console.error("Failed to change state:", err);
            },
          },
          { enqueueNextState: false }
        );
      }
    });
  };

  const acceptContact = () => {
    if (incomingContact) {
      incomingContact.accept();
    }
    setIsContactAccepted(true);
  };

  const rejectContact = () => {
    if (incomingContact) {
      incomingContact.reject();
    } else {
      console.error("No incoming contact to reject");
    }
    setIncomingContact(null);
  };

  const hangUpContact = () => {
    incomingContact?.getAgentConnection().destroy();

    // end contact
    incomingContact?.destroy();
    console.log("incomingContact: ", incomingContact);

    setIsContactAccepted(false);
    setIncomingContact(null);

    setIsContactAccepted(false);
    setIncomingContact(null);

    // wait for 1 second before changing the agent state
    setTimeout(() => {
      changeAgentState("Available");
    }, 1000);
  };

  const logOut = async () => {
    // https://ss2cc.awsapps.com/connect/logout

    await fetch("https://ss2cc.my.connect.aws/connect/logout", {
      method: "GET",
      mode: "no-cors",
      credentials: "include",
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.error("error: ", error);
      });

    window.connect.core.terminate();
    // window.location.href = "https://ss2cc.my.connect.aws/connect/logout";
  };

  return (
    <CCPContext.Provider
      value={{
        currentAgent,
        agentState,
        callTime,
        callStartTime,
        isContactAccepted,
        changeAgentState,
        acceptContact,
        rejectContact,
        hangUpContact,
        incomingContact,
        logOut,
        contacts,
        mute,
        unmute,
        isMuted,
      }}
    >
      {children}
    </CCPContext.Provider>
  );
};

export const useCCP = () => {
  const context = React.useContext(CCPContext);
  if (!context) {
    throw new Error("useCCP must be used within a CCPContextProvider");
  }
  return context;
};
