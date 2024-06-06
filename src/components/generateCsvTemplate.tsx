import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';

export default function generateCsvTemplategenerateCSV(title: any, description: any, timeSpan: any, elementName:any, metrics: any, type: any) {

    const formatDate = timeSpan.startDate + ' - ' + timeSpan.endDate;

    const csvData = [
      { A: title },
      { A: 'Description', B: description },
      { A: 'Time span', B: formatDate },
      {},
      { A: type, B: elementName },
      ...metrics.map((metric: any) => ({ A: metric.Metric, B: metric.Value? metric.Value.toFixed(2) : "N/A" })),
    ];
  
    const json2csvParser = new Parser({ header: false });
    const csv = json2csvParser.parse(csvData);
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }