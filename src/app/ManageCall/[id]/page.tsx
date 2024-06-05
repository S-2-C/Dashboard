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
import { documents } from "@/app/content/relevantFiles";
import Link from "next/link";

//S2C components
import TextReader from "@/components/textReader";
import Timer from "@/components/timer";
import {
  formatDateToMexicanTimezone,
  getSentimentColor,
} from "@/functions/timeFunctions";

export default function ManageCall({ params }: { params: { id: string } }) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [agent, setAgent] = useState<GetUserQuery["getUser"] | null>(null);
  const [isOnCall, setIsOnCall] = useState<null | Contact>(null);
  const [transcript, setTranscript] = useState<any>(null);

  const [totalSentiment, setTotalSentiment] = useState(0);
  const [agentSentiment, setAgentSentiment] = useState(0);
  const [customerSentiment, setCustomerSentiment] = useState(0);

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
      if (!isAgentOnCall) {
        setIsOnCall(null);
        console.log("Agent is not on call");
        return;
      }

      const agentCalls = updatedAgent?.Contacts?.items;
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

      let totalSentiment = 0;
      let agentSentiment = 0;
      let customerSentiment = 0;

      for (let val of res.data) {
        if (val.Transcript) {
          if (val.Transcript.ParticipantRole === "AGENT") {
            agentSentiment +=
              val.Transcript.Sentiment == "POSITIVE"
                ? 1
                : val.Transcript.Sentiment == "NEGATIVE"
                ? -1
                : 0;
          } else {
            customerSentiment +=
              val.Transcript.Sentiment == "POSITIVE"
                ? 1
                : val.Transcript.Sentiment == "NEGATIVE"
                ? -1
                : 0;
          }

          totalSentiment +=
            val.Transcript.Sentiment == "POSITIVE"
              ? 1
              : val.Transcript.Sentiment == "NEGATIVE"
              ? -1
              : 0;
        }
      }

      setTotalSentiment(totalSentiment);
      setAgentSentiment(agentSentiment);
      setCustomerSentiment(customerSentiment);
    }, 3000);

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
          <div className="flex">
            <Link href={`/ProfileAgent/${agent?.id}`}>
              {/* {agent?.id} - Walmart®.com */}
              <h1 className=" text-3xl font-bold hover:underline hover:text-blue-400">
                {agent?.name || agent?.id.split("@")[0] + "- Walmart®.com"}
              </h1>
            </Link>

            {agent?.needsHelp && (
              <div className=" bg-red-500 shadow-lg shadow-red-600 rounded-full py-2 px-3 font-bold text-white justify-center items-center flex ml-5 text-xs">
                <p>Asking for help</p>
              </div>
            )}
          </div>

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

          <Flex direction="column" gap="0.5rem">
            <View
              backgroundColor="#8BC4E6"
              style={{
                ...commonShadowStyle,
                flex: 1,
                borderRadius: "8px",
                margin: "0.5rem",
                height: "350px",
              }}
            >
              <div className=" py-5 w-full h-full">
                {isOnCall ? (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex ">
                        <h1 className="font-bold pb-5 px-5 text-3xl pr-3">
                          Current call{" "}
                        </h1>
                        <Timer startTime={isOnCall?.callStart} />
                      </div>
                      {
                        // <div className="flex justify-center items-center gap-2">
                        //   <h3 className="font-bold pb-5 text-3xl" style={{ color: getSentimentColor(totalSentiment).color}}>{getSentimentColor(totalSentiment).text}</h3>
                        //   <div>
                        //     <h3 className="font-bold pb-5 text-3xl" style={{ color: getSentimentColor(agentSentiment).color}}>{getSentimentColor(agentSentiment).text}</h3>
                        //     <h3 className="font-bold pb-5 text-3xl" style={{ color: getSentimentColor(customerSentiment).color}}>{getSentimentColor(customerSentiment).text}</h3>
                        //   </div>
                        // </div>
                        <>
                          <div className="flex flex-col justify-center  gap-2">
                            <div
                              className=" flex w-full py-2 items-center"
                              style={{
                                backgroundColor:
                                  getSentimentColor(totalSentiment).color,
                              }}
                            >
                              <h1 className="font-bold text-lg text-black pl-5 pr-3">
                                Sentiment analysis:{" "}
                              </h1>
                              <h3
                                className="text-lg"
                                style={{ color: "black" }}
                              >
                                {" "}
                                {getSentimentColor(totalSentiment).text}
                              </h3>
                            </div>
                            <div className="flex  flex-col">
                              <div className=" px-10 py-2">
                                <h1 className="font-light text-sm text-neutral-500">
                                  Agent
                                </h1>
                                <div className="flex items-center">
                                  <h3
                                    className="font-bold text-lg pr-3"
                                    style={{
                                      color:
                                        getSentimentColor(agentSentiment).color,
                                    }}
                                  >
                                    {getSentimentColor(agentSentiment).text}{" "}
                                  </h3>
                                  {getSentimentColor(agentSentiment).icon}
                                </div>
                              </div>
                              <div className=" px-10 py-2">
                                <h1 className="font-light text-sm text-neutral-500">
                                  Customer
                                </h1>
                                <div className="flex items-center">
                                  <h3
                                    className="font-bold text-lg pr-3"
                                    style={{
                                      color:
                                        getSentimentColor(customerSentiment)
                                          .color,
                                    }}
                                  >
                                    {getSentimentColor(customerSentiment).text}
                                  </h3>
                                  {getSentimentColor(customerSentiment).icon}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </div>
                    <div className="justify-end items-end flex flex-col px-5">
                      <h3 className="">{agent?.Contacts?.items[0]?.phone}</h3>
                      <h3 className=" text-sm">
                        {formatDateToMexicanTimezone(isOnCall?.callStart)}
                      </h3>
                      <h3
                        className="text-sm"
                        onClick={() => {
                          navigator.clipboard.writeText(isOnCall?.user?.arn);
                          alert("User ARN Copied to clipboard");
                        }}
                      >
                        Copy ARN
                      </h3>
                      <h3
                        className="text-sm"
                        onClick={() => {
                          navigator.clipboard.writeText(isOnCall?.id);
                          alert("Contact ID Copied to clipboard");
                        }}
                      >
                        Copy Contact ID
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className=" font-bold pl-5">Not in call</h1>
                  </div>
                )}
              </div>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: "8px",
                margin: "0.5rem",
                minHeight: "300px",
                width: "400px",
              }}
            >
              <Heading
                level={5}
                fontWeight={"bold"}
                style={{ margin: "0.5rem" }}
              >
                Documentation Resources
              </Heading>
              <div className=" bg-neutral-50 shadow-inner overflow-y-scroll px-4 pt-4 h-64 w-full rounded-sm no-scrollbar">
                {documents.map((doc, index) => {
                  return <TextReader key={index} content={doc} index={index} />;
                })}
              </div>
            </View>
          </Flex>

          <div className=" flex  h-[85%] w-96 flex-col justify-center items-center">
            <Heading level={5} fontWeight={"bold"} style={{ margin: "0.5rem" }}>
              Transcript
            </Heading>
            <View
              className="flex flex-col gap-2"
              style={{
                ...commonShadowStyle,
                borderRadius: "8px",
                height: "100%",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex flex-col w-full gap-2 h-[600px]  overflow-y-scroll no-scrollbar">
                {transcript &&
                  transcript.map((t: any, index: any) => {
                    if (!t.Transcript) return;
                    return (
                      <div
                        key={index}
                        className={`flex rounded-lg flex-col ${
                          t.Transcript.ParticipantRole == "AGENT"
                            ? "items-end text-end"
                            : "items-start text-start"
                        } `}
                      >
                        <div
                          className={` w-2/3 px-2
                              ${
                                t.Transcript.ParticipantRole == "AGENT"
                                  ? " rounded-s-2xl"
                                  : "rounded-e-2xl"
                              } 
                                ${
                                  t.Transcript.Sentiment == "NEGATIVE"
                                    ? "bg-red-300"
                                    : t.Transcript.Sentiment == "POSITIVE"
                                    ? "bg-green-200"
                                    : "bg-gray-300"
                                }`}
                        >
                          <h1 className=" font-bold">
                            {t.Transcript.ParticipantRole}
                          </h1>
                          <h1>{t.Transcript.Content}</h1>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </View>
          </div>
        </Flex>
      </div>
    </div>
  );
}
