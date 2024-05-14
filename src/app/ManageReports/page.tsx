"use client";
import React from 'react';
import Home from "../NavBar";
import { Card, Flex, Heading, Text } from "@aws-amplify/ui-react";

interface ReportCardProps {
  title: string;
  lastUpdated: string;
  uploadedBy: string;
}

const ReportCard = ({ title, lastUpdated, uploadedBy }: ReportCardProps) => {
  const commonShadowStyle = {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
  };

  return (
    // Apply the commonShadowStyle directly to the Card component
    <Card variation="outlined" style={commonShadowStyle}>
      <Flex direction="column" gap="0.5rem">
        <Text fontWeight="semibold">{title}</Text>
        <Text fontSize="small">Last Updated {lastUpdated}</Text>
        <Text fontSize="small">Uploaded By: {uploadedBy}</Text>
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

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <Home />
      <div className="flex flex-col flex-1 p-10 ml-20">
        <Flex direction="column" gap="2rem">
          <Heading level={1}>Manage Reports</Heading>
          <Text className="text-sans">Browse by Category</Text>
          <Flex wrap="wrap" gap="1rem">
            <ReportCard {...reportData1} />
            <ReportCard {...reportData2} />
            <ReportCard {...reportData3} />
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
