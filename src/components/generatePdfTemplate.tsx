import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const fetchImageAsBytes = async (url: any) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

const wrapText = (text: any, font: any, fontSize: any, maxWidth: any) => {
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];

  words.slice(1).forEach((word: any) => {
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

export const generatePdfTemplate = async ({ headerContent, content, imageUrl1, imageUrl2, centeredTitle, smallDescription }: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  // Load fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 24; // Adjust this value to change the size of the text
  const textWidth = font.widthOfTextAtSize(centeredTitle, fontSize);

  // Fetch and embed images
  const pictureBytes1 = await fetchImageAsBytes(imageUrl1);
  const pictureBytes2 = await fetchImageAsBytes(imageUrl2);
  const picture1 = await pdfDoc.embedPng(pictureBytes1);
  const picture2 = await pdfDoc.embedPng(pictureBytes2);

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

  // Add title
  page.drawText(centeredTitle, {
    x: width / 2 - (textWidth / 2), // Adjust as necessary to center
    y: height - 150,
    size: 24,
    font,
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

  // Wrap and draw content text
  const wrappedText = wrapText(content, font, 12, width - 100);
  let yPosition = height - 240;
  wrappedText.forEach(line => {
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= 15;
  });

  // Add footer
  page.drawText("Submit Service & Consulting, S2C.", {
    x: 50,
    y: 50,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
