import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data: any[], fileName: string): void => {
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write workbook to binary array
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Create a Blob from the binary array and save it
  const dataBlob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  });
  saveAs(dataBlob, `${fileName}.xlsx`);
};
