import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const fetchImageAsBytes = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

const wrapText = (text: string, font: any, fontSize: number, maxWidth: number) => {
  const words = text.split(' ');
  let lines: string[] = [];
  let currentLine = words[0];

  words.slice(1).forEach((word) => {
    const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  lines.push(currentLine);
  return lines;
};

const parseContent = (content: string) => {
  const lines = content.split('\n');
  const sections: { header: string; body: string }[] = [];
  let currentSection = { header: '', body: '' };

  lines.forEach((line) => {
    if (line.startsWith('##')) {
      if (currentSection.header || currentSection.body) {
        sections.push(currentSection);
        currentSection = { header: '', body: '' };
      }
      currentSection.header = line.slice(2).replace(/[#*]/g, '').trim();
    } else {
      currentSection.body += (currentSection.body ? '\n' : '') + line.replace(/[#*]/g, '').trim();
    }
  });

  if (currentSection.header || currentSection.body) {
    sections.push(currentSection);
  }

  return sections;
};

const drawTextWithWrapping = (page: any, text: string, x: number, y: number, font: any, fontSize: number, maxWidth: number, lineHeight: number) => {
  const paragraphs = text.split('\n');
  let currentY = y;

  paragraphs.forEach((paragraph) => {
    const lines = wrapText(paragraph, font, fontSize, maxWidth);

    lines.forEach((line) => {
      page.drawText(line, {
        x,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight;
    });
    currentY -= lineHeight; // Add an extra line height for the paragraph break
  });

  return currentY;
};

export const generatePdfTemplate = async ({ headerContent, content, imageUrl1, imageUrl2, centeredTitle, smallDescription }: any) => {
  const pdfDoc = await PDFDocument.create();

  // Function to create a new page and return it
  const addNewPage = (isFirstPage = false) => {
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    // Add images to the new page
    page.drawImage(picture1, {
      x: 50, // Position for the top left corner image
      y: height - 100,
      width: 50,
      height: 50,
    });

    page.drawImage(picture2, {
      x: width - 120, // Position for the top right corner image
      y: height - 100,
      width: 100,
      height: 50,
    });

    // Add header
    page.drawText(headerContent, {
      x: 50,
      y: height - 30,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });

    // Add footer
    page.drawText("Submit Service & Consulting, S2C.", {
      x: 50,
      y: 50,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    return page;
  };

  // Load fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Fetch and embed images
  const pictureBytes1 = await fetchImageAsBytes(imageUrl1);
  const pictureBytes2 = await fetchImageAsBytes(imageUrl2);
  const picture1 = await pdfDoc.embedPng(pictureBytes1);
  const picture2 = await pdfDoc.embedPng(pictureBytes2);

  let page = addNewPage(true);
  let { width, height } = page.getSize();

  // Add title
  const titleFontSize = 24;
  const textWidth = boldFont.widthOfTextAtSize(centeredTitle, titleFontSize);
  page.drawText(centeredTitle, {
    x: width / 2 - (textWidth / 2), // Adjust as necessary to center
    y: height - 150,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Add description below the title
  page.drawText(smallDescription, {
    x: 50,
    y: height - 190,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  // Add a line to define where the actual content starts
  page.drawLine({
    start: { x: 50, y: height - 210 },
    end: { x: width - 50, y: height - 210 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Parse and draw content sections
  const sections = parseContent(content);
  let yPosition = height - 240;
  const bottomMargin = 100; // Margin at the bottom of the page
  const topMargin = 140; // Starting position for new page content
  const lineHeight = 10; // Line height for text

  sections.forEach((section) => {
    // Draw section header
    if (section.header) {
      if (yPosition < bottomMargin) { // Add threshold
        page = addNewPage();
        yPosition = height - topMargin; // Reset yPosition for new page
      }
      page.drawText(section.header, {
        x: 50,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;
    }

    // Draw section body
    yPosition = drawTextWithWrapping(page, section.body, 50, yPosition, font, 10, width - 100, lineHeight);

    // Check if we need to add a new page for the next section
    if (yPosition < bottomMargin) {
      page = addNewPage();
      yPosition = height - topMargin;
    }
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
