'use client';
import { useState } from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";
import SearchBar from "../searchBar"; //importing the SearchBar component
import { documents } from "@/app/content/relevantFiles";
import DocumentReader from "@/components/documentReader";

const ITEMS_PER_PAGE = 12;

export default function Documentation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("All");

  const filteredDocuments =
    filterType === "All"
      ? documents
      : documents.filter((doc) => doc.type === filterType);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Moving to page: ${pageNumber}`);
  };

  const handleFilterChange = (type: string) => {
    setFilterType(type);
    setCurrentPage(1); // Reset to the first page when filter changes
    console.log(`Filter changed to: ${type}`);
  };

  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen flex w-full">
      <div className="flex flex-col w-full p-4 ml-24"> {/* left margin */}
        <div className="flex justify-between items-center mb-6 mt-4"> {/* Added margin-top */}
          <Heading level={1} fontWeight="bold">
            Documentation
          </Heading>
          <SearchBar />
        </div>
        <div className="h-14 flex pt-4 justify-start border-b-2 border-gray-300">
          {["All", "Sales", "Walmart.com", "Walmart Express", "Agent Training", "FAQ"].map((type) => (
            <button
              key={type}
              className={`py-2 px-4 mx-1 rounded-t-lg border-b-2 ${
                filterType === type
                  ? "border-t-2 border-l-2 border-r-2 border-gray-300 text-blue"
                  : "border-gray-300 text-gray-700"
              }`}
              onClick={() => handleFilterChange(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"> {/* Adjusted gap to 2 */}
          {currentDocuments.map((item, index) => (
            <DocumentReader content={item} index={index} key={index} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
