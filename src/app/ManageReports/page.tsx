"use client";
import { useState, useEffect, useRef } from "react";
import Home from "../NavBar"; // Importing the NavBar component
import { Card, Flex, Heading, Text } from "@aws-amplify/ui-react";

interface ReportCardProps {
  title: string;
  lastUpdated: string;
  uploadedBy: string;
}

const ReportCard = ({ title, lastUpdated, uploadedBy }: ReportCardProps) => {
  return (
    <Card elevation="1" variation="outlined">
      <Flex direction="column" gap="0.5rem">
        <Text fontWeight="semibold">{title}</Text>
        <Text fontSize="small">Last Updated {lastUpdated}</Text>
        <Text fontSize="small">Uploaded By: {uploadedBy}</Text>
      </Flex>
    </Card>
  );
};

export default function ManageReports() {
  // Example report data
  const reportData: ReportCardProps = {
    title: 'Monthly Performance',
    lastUpdated: '30/03/2024',
    uploadedBy: 'Jane Doe'
  };

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <Home />
      <div className={`flex flex-col flex-1 p-10 ml-20`}>
        <Flex direction="column" gap="2rem">
          <Heading level={1}>Manage Reports</Heading>
          <Text className="text-sans">Browse by Category</Text>
          {/* Single Report Card */}
          <ReportCard {...reportData} />
        </Flex>
      </div>
    </div>
  );
}
