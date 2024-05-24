"use client";
import React from 'react';
import Home from "../NavBar";
import SearchBar from "../searchBar";
import { Card, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


// Nav Bar not Move Add
// Connect Back
// PDF Download
// Add Filters


interface ReportCardProps {
  title: string;
  lastUpdated: string;
  uploadedBy: string;
}

const ReportCard = ({ title, lastUpdated, uploadedBy }: ReportCardProps) => {
  const commonShadowStyle = {
    // boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F7FAFC',
    minWidth: '340px',
    minHeight: '200px',
  };

  return (
    
    <Card style={commonShadowStyle}>
      <Flex direction="column" gap="0.5rem">
        <Text fontSize="large" fontWeight="bold">{title}</Text>
        <Text color="#4F7396">Last Updated {lastUpdated}</Text>
        <Text color="#4F7396">Uploaded By: {uploadedBy}</Text>
        <Flex justifyContent="flex-end" marginTop="auto">
          <FontAwesomeIcon icon={faFilePdf} size="2x" />
        </Flex>
      </Flex>
    </Card>
    
  );
};

export default function ManageReports() {
  // The individual report cards data
  const reportData1 = {
    title: 'Monthly Performance',
    lastUpdated: '30/03/2024',
    uploadedBy: 'Jane Doe'
  };
  const reportData2 = {
    title: 'Quarterly Sales',
    lastUpdated: '15/04/2024',
    uploadedBy: 'John Smith'
  };
  const reportData3 = {
    title: 'Annual Review',
    lastUpdated: '01/01/2024',
    uploadedBy: 'Alice Johnson'
  };
  const reportData4 = {
    title: 'Monthly Performance',
    lastUpdated: '30/03/2024',
    uploadedBy: 'Jane Doe'
  };
  const reportData5 = {
    title: 'Quarterly Sales',
    lastUpdated: '15/04/2024',
    uploadedBy: 'John Smith'
  };
  const reportData6 = {
    title: 'Annual Review',
    lastUpdated: '01/01/2024',
    uploadedBy: 'Alice Johnson'
  };

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <Home />
      <div className="flex flex-col flex-1 p-10 ml-20">
      <div className="flex justify-end  px-16 pt-4">
              <SearchBar />
            </div>
        <Flex direction="column" gap="2rem">
          <Heading level={1} fontWeight="bold">Manage Reports</Heading>
          <Text className="text-sans" fontSize="28px">&nbsp;&nbsp;&nbsp;&nbsp;Browse by Category</Text>
          <Flex wrap="wrap" gap="1rem">
            <ReportCard {...reportData1} />
            <ReportCard {...reportData2} />
            <ReportCard {...reportData3} />
            <ReportCard {...reportData4} />
            <ReportCard {...reportData5} />
            <ReportCard {...reportData6} />
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
