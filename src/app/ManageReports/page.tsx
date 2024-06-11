'use client';
import React, { useEffect, useState } from 'react';
import { Heading } from "@aws-amplify/ui-react";
import NewReport from '@/components/newReport';
import SearchBar from '../searchBar';

const ITEMS_PER_PAGE = 12;

const ManageReports = () => {
  const [allReports, setAllReports] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load reports from local storage
    const storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    setAllReports(storedReports);
  }, []);

  const saveReportsToLocalStorage = (reports: any) => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }

  const createReport = () => {
    const newReport = {
      index: allReports.length,
      title: "New Report",
      uploadedBy: "Admin",
      date: new Date().toDateString(),
      description: "This is a new report",
      isEditing: true,
      isReportModalOpen: true,
    };

    const updatedReports = [...allReports, newReport];
    setAllReports(updatedReports);
    saveReportsToLocalStorage(updatedReports);
  }

  const handleSave = (updatedReport: any) => {
    const updatedReports = allReports.map((report: any) => report.index === updatedReport.index ? updatedReport : report);
    setAllReports(updatedReports);
    saveReportsToLocalStorage(updatedReports);
  };
    
  const handleDelete = (reportIndex: number) => {
    const updatedReports = allReports.filter((report: any) => report.index !== reportIndex);
    setAllReports(updatedReports);
    saveReportsToLocalStorage(updatedReports);
  };

  const totalPages = Math.ceil(allReports.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log(`Moving to page: ${pageNumber}`);
  };

  const currentReports = allReports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <div className="flex flex-col flex-1 p-10 ml-20">
        <div className="flex justify-between items-center mb-6 mt-4">
          <Heading level={1} fontWeight="bold">
            Create Reports
          </Heading>
          <SearchBar />
        </div>
        <div className='h-full w-full'>
          <div className='flex justify-start mb-4'>
            <button 
              onClick={createReport} 
              className='text-white text-lg h-10 px-4 flex justify-center items-center bg-figma-figma14 hover:bg-figma-figma15 rounded-lg shadow-md transition-colors duration-300'
            >
              + New Report
            </button>
          </div>
          <div className='flex flex-wrap gap-4'>
            {currentReports.map((report: any) => (
              <NewReport key={report.index} props={report} onSave={handleSave} onDelete={() => handleDelete(report.index)} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-figma-figma14 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-figma-figma14 hover:text-white transition-colors duration-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageReports;
