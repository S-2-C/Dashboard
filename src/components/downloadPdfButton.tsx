import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { generatePdfTemplate } from './generatePdfTemplate';
import { fetchMetricDataV2Queue } from '@/fetching/fetchingMetricDataV2Queue';
import { fetchMetricDataV2Agent } from '@/fetching/fetchingMetricDataV2Agent';
import { AIReportMaker } from '@/fetching/reportAICreator';

const DownloadPdfButton = ({title, description, date, siQueue, specifiesQueue, specifiesAgent, relevantKPI, rangeDate} : any) => {


  const handleDownload = async () => {

    // const metricData = await fetchMetricDataV2Agent("4f608bad-bbf2-493c-80d4-120e134d90bf", "2024-05-20");
    // console.log("metricData", metricData);

    let cleanContent = "";

    if (siQueue && specifiesQueue) {
      const metricDataQueue = await fetchMetricDataV2Queue(specifiesQueue.id, rangeDate.startDate, rangeDate.endDate);

      let cleanMetricDataQueue = metricDataQueue.data.filter((metricData: any) => relevantKPI.includes(metricData.Metric));

      //convert object into a string

      cleanMetricDataQueue = JSON.stringify(cleanMetricDataQueue);

      console.log("cleanMetricDataQueue", cleanMetricDataQueue);

      const AIContent = await AIReportMaker(cleanMetricDataQueue);

      console.log("AIContent", AIContent.ragChainResult.kwargs.content);

      cleanContent = specifiesQueue.name + "\n\n" + AIContent.ragChainResult.kwargs.content

    } else if(specifiesAgent) {
      console.log("specifiesAgent", specifiesAgent);
      const metricDataAgent = await fetchMetricDataV2Agent(specifiesAgent.arn, rangeDate.startDate, rangeDate.endDate);

      console.log("metricDataAgent", metricDataAgent);

      let cleanMetricDataAgent = metricDataAgent.data.filter((metricData: any) => relevantKPI.includes(metricData.Metric));

      //convert object into a string

      cleanMetricDataAgent = JSON.stringify(cleanMetricDataAgent);

      console.log("cleanMetricDataAgent", cleanMetricDataAgent);

      const AIContent = await AIReportMaker(cleanMetricDataAgent);

      console.log("AIContent", AIContent.ragChainResult.kwargs.content);

      cleanContent = specifiesAgent.name + "\n\n" + AIContent.ragChainResult.kwargs.content
    }


    const imageUrl1 = '/images/Logo design.png'; // Path to your first image in the public folder
    const imageUrl2 = '/images/Walmart-Logo.png'; // Path to your second image in the public folder

    const pdfBytes = await generatePdfTemplate({ headerContent: date, content: cleanContent, imageUrl1, imageUrl2, centeredTitle: title, smallDescription: description});
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'document.pdf');
  };

  return <button className=' font-light p-2  bg-gray-300 rounded-sm shadow hover:shadow-inner shadow-black text-lg mt-4' onClick={handleDownload}>Download PDF</button>;
};

export default DownloadPdfButton;
