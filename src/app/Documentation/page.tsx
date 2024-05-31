"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import {
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Home from "../NavBar"; // Importing the NavBar component
import SearchBar from "../searchBar"; //importing the SearchBar component
import { documents } from "@/app/content/relevantFiles";
import DocumentReader from "@/components/documentReader";

const ITEMS_PER_PAGE = 8;

export default function Documentation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("All");

  const filteredDocuments =
    filterType === "All"
      ? documents
      : documents.filter((doc) => doc.type === filterType);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (type: any) => {
    setFilterType(type);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            {["All", "Sales", "Walmart.com", "Walmart Express", "Agent Training", "FAQ"].map((type) => (
              <button
                key={type}
                className={`w-36 p-2 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6 ${
                  filterType === type
                    ? "bg-figma-figma1 text-blue"
                    : "bg-blue text-figma-figma1"
                }`}
                onClick={() => handleFilterChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap">
            {currentDocuments.map((item, index) => (
              <DocumentReader content={item} index={index} key={index} />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 p-2 rounded disabled:opacity-0"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 p-2 rounded mr-10 disabled:opacity-0"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
