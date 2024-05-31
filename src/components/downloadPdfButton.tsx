import React from 'react';
import { saveAs } from 'file-saver';
import { generatePdfTemplate } from './generatePdfTemplate';

const DownloadPdfButton = ({title, description, date, relevantKPI, rangeDate} : any) => {
  const handleDownload = async () => {
    const headerContent = "This is the header";
    const footerContent = "This is the footer";
    const sections = [
      { title: "Section 1", content: "Content for section 1" },
      { title: "Section 2", content: "Content for section 2" },
    ];
    const imageUrl1 = '/images/Logo design.png'; // Path to your first image in the public folder
    const imageUrl2 = '/images/Walmart-Logo.png'; // Path to your second image in the public folder

    const pdfBytes = await generatePdfTemplate({ headerContent: date, footerContent, sections, content: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum ", imageUrl1, imageUrl2, centeredTitle: title, smallDescription: description});
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'document.pdf');
  };

  return <button className=' font-light p-2  bg-gray-300 rounded-sm shadow hover:shadow-inner shadow-black text-lg mt-4' onClick={handleDownload}>Download PDF</button>;
};

export default DownloadPdfButton;
