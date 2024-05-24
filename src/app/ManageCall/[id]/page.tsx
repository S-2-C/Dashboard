"use client";
import React, { useState, useEffect } from "react";
import Home from "../../NavBar";
import { Flex, Heading, Text, View, Button } from "@aws-amplify/ui-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Make sure the path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTimes } from "@fortawesome/free-solid-svg-icons";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { Contact, GetUserQuery } from "@/API";
import { fetchRealTimeData } from "@/fetching/transcript";

export default function ManageCall({ params }: { params: { id: string } }) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [agent, setAgent] = useState<GetUserQuery["getUser"] | null>(null);
  const [isOnCall, setIsOnCall] = useState<null | Contact>(null);
  const [transcript, setTranscript] = useState<any>(null);

  // Function to fetch agent data
  async function fetchAgent() {
    const res = await fetchOneAgent(params.id);
    setAgent(res);
  }

  // Polling function to fetch data every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedAgent = await fetchOneAgent(params.id); // Refetch the agent status
      setAgent(updatedAgent);

      const isAgentOnCall = updatedAgent?.isOnCall;
      console.log(isAgentOnCall);
      if (!isAgentOnCall) {
        setIsOnCall(null);
        console.log("Agent is not on call");
        return;
      }

      const agentCalls = updatedAgent?.Contacts?.items;
      console.log(agentCalls);
      const currentCall = agentCalls?.find(
        (call: any) => call?.callEnd === null
      ) as Contact;
      if (!currentCall) {
        console.log("No ongoing call");
        setIsOnCall(null);
        return;
      }
      if (!isOnCall) setIsOnCall(currentCall);

      const res = await fetchRealTimeData(currentCall?.id);
      setTranscript(res.data);
    }, 5000);

    return () => clearInterval(interval);
  }, [agent]);

  // Initial fetch of agent data
  useEffect(() => {
    fetchAgent();
  }, []);

  const commonShadowStyle = {
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <Home />
      <div className="flex flex-col flex-1 p-10 ml-20">
        <Flex direction="column" gap="2rem">
          <Heading level={1} fontWeight="bold">
            Manage Call
          </Heading>
          <Heading level={3} fontWeight="bold">
            {/* {agent?.id} - Walmart®.com */}
            {agent?.name || agent?.id.split("@")[0] + "- Walmart®.com"}
          </Heading>
          {agent?.role == "SUPERVISOR" ? (
            <Text fontWeight="bold">Supervisor</Text>
          ) : (
            <Text fontWeight="bold">Agent</Text>
          )}
          <Text>
            {" "}
            We believe that the best companies start with bold visions. We're
            here to help you turn those visions into reality.
          </Text>
        </Flex>

        <Flex direction="row" style={{ flex: 1 }}>
          {isPopoverVisible && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 5,
              }}
              onClick={() => setIsPopoverVisible(false)}
            />
          )}
          <Popover>
            <PopoverTrigger
              style={{
                display: "inline-block",
                borderRadius: "8px",
                padding: "1rem",
                height: "700px",
                width: "400px",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                ...commonShadowStyle,
              }}
              onClick={() => setIsPopoverVisible(true)}
            >
              <FontAwesomeIcon icon={faPhone} size="3x" color="darkblue" />
            </PopoverTrigger>
            {isPopoverVisible && (
              <PopoverContent
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  minWidth: "300px",
                  maxWidth: "90%",
                  maxHeight: "90%",
                  zIndex: 10,
                  ...commonShadowStyle,
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="self-end cursor-pointer"
                    onClick={() => setIsPopoverVisible(false)}
                  />
                  <Text fontWeight="bold" className="my-4">
                    You are now about to join the call
                  </Text>
                  <Button
                    onClick={() => setIsPopoverVisible(false)}
                    variation="primary"
                  >
                    Cancel
                  </Button>
                </div>
              </PopoverContent>
            )}
          </Popover>

          <Flex direction="column" style={{ flex: 1 }} gap="0.5rem">
            <Flex direction="row" gap="0.5rem">
              <View
                backgroundColor="#CAE5F4"
                style={{
                  ...commonShadowStyle,
                  flex: 1,
                  borderRadius: "8px",
                  margin: "0.5rem",
                  minHeight: "350px",
                }}
              >
                <Text padding="1rem" fontWeight="bold">
                  Sentiment Analysis Grade
                </Text>
              </View>
              <View
                backgroundColor="#8BC4E6"
                style={{
                  ...commonShadowStyle,
                  flex: 1,
                  borderRadius: "8px",
                  margin: "0.5rem",
                  minHeight: "350px",
                }}
              >
                <Text padding="1rem" fontWeight="bold">
                  Documentation Agent has Accessed
                </Text>
              </View>
            </Flex>
            <Flex direction="row" gap="0.5rem">
              <View
                backgroundColor="#057EC7"
                style={{
                  ...commonShadowStyle,
                  flex: 1,
                  borderRadius: "8px",
                  margin: "0.5rem",
                  minHeight: "350px",
                }}
              >
                <Text padding="1rem" fontWeight="bold">
                  {/* Ongoing Call Time */}
                  {isOnCall ? "Ongoing Call Time" : "No Ongoing Call"}
                  {/* Difference between currentCall.callStart and now */}
                  {isOnCall?.callStart &&
                    new Date().getTime() -
                      new Date(isOnCall?.callStart).getTime()}
                </Text>
              </View>
              <View
                backgroundColor="#057EC7"
                style={{
                  ...commonShadowStyle,
                  flex: 1,
                  borderRadius: "8px",
                  margin: "0.5rem",
                  minHeight: "350px",
                }}
              >
                <Text padding="1rem" fontWeight="bold">
                  Agent has asked for Supervisor support
                </Text>
              </View>
            </Flex>
          </Flex>

          <Flex
            direction="column"
            style={{ flex: 0.5 }}
            gap="0.5rem"
            marginRight="0.5rem"
          >
            <Heading level={5} fontWeight={"bold"} style={{ margin: "0.5rem" }}>
              Documentation Resources
            </Heading>
            <View
              backgroundColor="white"
              style={{
                ...commonShadowStyle,
                borderRadius: "8px",
                margin: "0.5rem",
                flex: 0.9,
                minHeight: "200px",
              }}
            ></View>

            <Heading level={5} fontWeight={"bold"} style={{ margin: "0.5rem" }}>
              Transcript
            </Heading>
            <View
              className="flex flex-col gap-2"
              style={{
                ...commonShadowStyle,
                borderRadius: "8px",
                minHeight: "300px",
              }}
            >
              <div className="flex flex-col gap-2 h-96 overflow-y-scroll">
                {transcript &&
                  transcript.map((t: any, index: any) => {
                    if (!t.Transcript) return;
                    return (
                      <div
                        key={index}
                        className={`flex rounded-lg  flex-col ${
                          t.Transcript.ParticipantRole == "AGENT"
                            ? "items-end text-end"
                            : "items-start text-start"
                        } ${
                          t.Transcript.Sentiment == "NEGATIVE"
                            ? "bg-red-300"
                            : t.Transcript.Sentiment == "POSITIVE"
                            ? "bg-green-200"
                            : "bg-gray-300"
                        }
                  `}
                      >
                        <Text>{t.Transcript.ParticipantRole}</Text>
                        <Text>{t.Transcript.Content}</Text>
                      </div>
                    );
                  })}
              </div>
            </View>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
