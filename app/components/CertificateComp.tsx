"use client"
import React, { useRef } from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

type Certificate = {
  id: string;
  userId: string;
  courseId: string;
  hash: string;
  userName: string;
  courseTitle: string;
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  certificateContent: Certificate;
};

const CertificateComp: React.FC<Props> = ({ certificateContent }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
  
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
  
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificateContent.userName}_certificate.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
        sx={{
          backgroundColor: '#1a365d',
          '&:hover': { backgroundColor: '#2c5282' },
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        Download Certificate
      </Button>

      <div
        ref={certificateRef}
        className="bg-white w-[1100px] h-[780px] shadow-2xl border-[12px] border-yellow-600 rounded-lg px-20 py-14 relative"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 font-serif">Certificate of Completion</h1>
          <p className="text-md text-gray-600 mt-2">
            This certificate is proudly presented to
          </p>

          <h2 className="text-3xl font-bold text-indigo-700 mt-6">{certificateContent.userName}</h2>

          <p className="text-lg text-gray-700 mt-6">
            For successfully completing the course:
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-2">
            {certificateContent.courseTitle}
          </h3>

          <div className="mt-12 flex justify-between px-10">
            <div className="text-left">
              <h2 className="text-sm text-gray-500">Issued On</h2>
              <p className="text-md font-semibold text-gray-700">
                {new Date(certificateContent.issuedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="text-md font-mono text-blue-600">
                {certificateContent?.hash}
              </p>
            </div>
          </div>

        <div className='absolute flex flex-row left-1/2 mt-28 transform -translate-x-1/2'>
          <h1 className='font-extrabold text-midnight-blue-950 m-2 p-2'>ISSUED BY:</h1>
          <p className='font-extrabold text-midnight-blue-950 m-2 p-2'>pytechhub</p>
        </div>
          {/* Signature Placeholder */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <div className="border-t border-gray-400 w-48 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-1">Authorized Signature</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 print:hidden">
        Verify this certificate at pytechhub.com/verify
      </p>
    </div>
  );
};

export default CertificateComp;
