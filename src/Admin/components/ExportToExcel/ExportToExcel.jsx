import React from 'react';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { Button } from '@chakra-ui/react';

const ExportToExcel = ({ data, fileName }) => {
    const handleDownload = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blobData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(blobData, fileName + '.xlsx');
    };

    return (
        <Button size="sm" colorScheme="green" onClick={handleDownload}>
            <p className='font-[Poppins] font-[400] tracking-wider'
            >
                Download Excel
            </p>
        </Button>

    );
};

export default ExportToExcel;
