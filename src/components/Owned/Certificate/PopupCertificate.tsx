import { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import { IoCloseOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../state/store';

type Props = {
  certData: any;
  setShowCertificate: any;
};

const PopupCertificate = ({ certData, setShowCertificate }: Props) => {
  const { currentUser } = useAppSelector((state: any) => state?.user);
  const middleName = currentUser?.mname
    ? `${currentUser?.mname?.charAt(0).toUpperCase()}`
    : '';
  const name = `${currentUser?.fname} ${middleName}. ${currentUser?.lname}`;
  const position = {
    left: certData?.left,
    top: certData?.top,
  };
  const fontSize = 60;

  // certificate
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = certData?.image_url; // Path to your certificate image

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = certData?.font_color; // Text color

      // Measure text width
      const textWidth = ctx.measureText(name).width;

      // Center the name horizontally based on position.left
      const centeredX = position.left - textWidth / 2;

      ctx.fillText(name, centeredX, position.top);
    };
  }, [name, position, fontSize, certData?.image]);

  const downloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'px', [canvas.width, canvas.height]);

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  };
  return (
    <div className="bg-white shadow-lg fixed top-[50%] left-[50%]  translate-y-[-50%] translate-x-[-50%] p-4 flex justify-center z-40 rounded">
      <div className="">
        <div className="flex justify-end">
          <IoCloseOutline
            onClick={() => setShowCertificate((e: any) => !e)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <p className="text-blue-gray-900 mb-2">
          Description: {certData?.title}
        </p>
        <button
          onClick={() => {
            downloadPDF();
          }}
          className="bg-blue-gray-500 px-4 py-2 rounded text-white text-sm mb-2"
        >
          Download Certificate
        </button>
        <div className="w-[350px] relative">
          <canvas
            ref={canvasRef}
            style={{ border: '1px solid black' }}
            className="w-full"
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default PopupCertificate;
