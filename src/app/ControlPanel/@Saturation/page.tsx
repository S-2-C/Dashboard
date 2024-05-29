"use client";
import React from "react";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import { documents } from "@/app/content/relevantFiles";
import AgentDocumentReader from "@/components/agentDocumentReader";
import { useState } from "react";

const ITEMS_PER_PAGE = 9;

export default function SaturationSlot() {
  const agent = useUserRole();
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
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div className="bg-blue-dark flex flex-col rounded-lg shadow-md h-96">
            <Link href="/Channels">
              <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
                  Saturation in channels
                </h1>
              </div>
            </Link>
            <div className="overflow-auto h-[65%] no-scrollbar">
              <div className="text-white sm:w-full,px-2 md:w-full lg:w-[calc(60vw-32rem)],px-2 xl:w-[calc(60vw-32rem)] px-8 flex-wrap">
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Physical Store</span>
                  <div className="bg-figma-figma9 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Walmart®.com</span>
                  <div className="bg-figma-figma10 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Walmart Express</span>
                  <div className="bg-figma-figma8 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
                <div className="flex items-center justify-between py-4 md:py-7">
                  <span className="text-white text-xl">Delivery</span>
                  <div className="bg-figma-figma8 h-4 w-4 flex rounded-full ml-4 md:ml-8"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blue-dark flex flex-col rounded-lg shadow-md  overflow-auto">
          <Link href="/Documentation">
            <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
                Documentation
              </h1>
            </div>
          </Link>
          <div className="mt-3 px-4 flex flex-wrap h-full overflow-scroll no-scrollbar">
            <div className="flex flex-wrap pr-4">
              {currentDocuments.map((item, index) => (
                 <AgentDocumentReader content={item} index={index} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
