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

const parseContent = (content: string) => {
  const cleanedContent = content.replace(/[*#]/g, '');
  const sections = cleanedContent.split('\n\n').map(section => {
    const [header, ...body] = section.split('\n');
    return { header, body: body.join(' ') };
  });
  return sections;
};

export const generatePdfTemplate = async ({ headerContent, content, imageUrl1, imageUrl2, centeredTitle, smallDescription }: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  // Load fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

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
  sections.forEach(section => {
    // Draw section header
    page.drawText(section.header, {
      x: 50,
      y: yPosition,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 15;

    // Draw section body
    const wrappedText = wrapText(section.body, font, 12, width - 100);
    wrappedText.forEach(line => {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 10;
    });

    // Add extra space after each section
    yPosition -= 10;
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
