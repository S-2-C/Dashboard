"use client";
import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text } from "@aws-amplify/ui-react";
import SearchBar from "../searchBar";
import { fetchMetricDataV2Agent } from '@/fetching/fetchingMetricDataV2Agent';
import { fetchMetricDataV2Queue } from '@/fetching/fetchingMetricDataV2Queue';
import NewReport from '@/components/newReport';

const ManageReports = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [allReports, setAllReports] = useState<any>([]);

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
    
    return (
    <div className="flex h-screen bg-background text-foreground relative">
    <div className="flex flex-col flex-1 p-10 ml-20">
    <div className="flex justify-end px-16 pt-4">
    </div>
    <div className='h-full w-full'>
    <div className="flex justify-between items-center mb-6">
          <Heading level={1} fontWeight="Bold">
            Create Reports
          </Heading>
          <SearchBar />
        </div>
    <div className='flex w-full p-4 items-center'>
    {allReports.map((report: any) => (
    <NewReport key={report.index} props={report} onSave={handleSave} onDelete={() => handleDelete(report.index)} />
    ))}
    <button onClick={createReport} className='text-white text-2xl h-12 flex justify-center items-center bg-slate-400 rounded-lg p-5'>
    New
    </button>
    </div>
    </div>
    </div>
    </div>
    );
    }
    
    export default ManageReports;
    
