import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
"use client";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import {
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Home from "../NavBar"; // Importing the NavBar component
import SearchBar from "../searchBar"; //importing the SearchBar component
export default async function Documentation() {
  const data = [
    {
      title: "Sentiment Analysis",
      description: "How to use the sentiment analysis tool",
      lastUpdated: "2024",
    },
    {
      title: "Sentiment Analysis",
      description: "How to use the sentiment analysis tool",
      lastUpdated: "2024",
    },
    {
        title: "Sentiment Analysis",
        description: "How to use the sentiment analysis tool",
        lastUpdated: "2024",
      },
      {
        title: "Sentiment Analysis",
        description: "How to use the sentiment analysis tool",
        lastUpdated: "2024",
      },
    // Add more items as needed
  ];

  return (
    <div>
      <div className="h-screen flex w-full">
        <Home />
        <div className="flex flex-col ml-40 w-full">
          <div className="flex justify-end px-16 pt-4">
            <SearchBar />
          </div>
          <div className="">
            <Flex direction="column" gap="2rem">
              <Heading level={1} fontWeight="bold">
                Documentation
              </Heading>
            </Flex>
          </div>
          <div className="h-14 flex pt-4 justify-between px-2">
            <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
              All
            </button>
            <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
              Sales
            </button>
            <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
              Walmart.com
            </button>
            <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
              Walmart Express
            </button>
            <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
              Agent Training
            </button>
            <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
              FAQ
            </button>
          </div>
          <div className="mt-8 flex flex-wrap">
            {data.map((item, index) => (
              <button
                key={index}
                className="bg-figma-figma4 h-60 w-72 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue"
              >
                <div className="text-3xl font-bold mb-2">{item.title}</div>
                <div className="font-bold mb-2">{item.description}</div>
                <div className="text-sm text-left justify-end">
                  Last Updated: {item.lastUpdated}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
