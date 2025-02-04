import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';

type Props = {
  courseId: any;
  cert: any;
};

const DownloadCertificate = ({ courseId, cert }: Props) => {
  const { token, currentUser } = useAppSelector((state: any) => state?.user);

  const name = `${currentUser?.fname} ${currentUser?.lname}`;
  const position = {
    left: cert?.left,
    top: cert?.top,
  };
  const fontSize = cert?.font;

  // certificate
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = cert?.image; // Path to your certificate image

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = 'black'; // Text color

      // Measure text width
      const textWidth = ctx.measureText(name).width;

      // Center the name horizontally based on position.left
      const centeredX = position.left - textWidth / 2;

      ctx.fillText(name, centeredX, position.top);
    };
  }, [name, position, fontSize, cert?.image]);

  const downloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  };

  const { data, isLoading } = useQuery({
    queryKey: ['list-of-quiz-result'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/passed-answers-list?courseId=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full h-[calc(100lvh-50px)] overflow-scroll overflow-x-hidden bg-white">
      <div className="mt-5 ml-[50%] translate-x-[-50%] w-[95%] lg:w-[70%] py-4">
        <p className="text-center mb-5 text-sm">
          You can download your certificate after passing all the quizzes listed
          below. Once you pass all the quizzes, a "Download Certificate" button
          will appear at the bottom of the list.
        </p>

        <table className="w-full shadow mb-5">
          <thead>
            <tr className="bg-blue-gray-600 text-white text-left">
              <th className="text-xs p-2 tracking-wider">#</th>
              <th className="text-xs p-2 tracking-wider">Subject Title</th>
              <th className="text-xs p-2 tracking-wider">Status</th>
            </tr>
            {data?.data?.map((data: any, i: any) => {
              return (
                <tr key={i} className="border">
                  <td className="text-xs p-2 tracking-wider border">{i + 1}</td>
                  <td className="text-xs p-2 tracking-wider border">
                    {data?.title}
                  </td>
                  <td className="cursor-pointer text-xs p-2 tracking-wider border">
                    {data?.status}
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>

        {data?.allPassed && (
          <>
            <p className="text-sm text-center mb-2">
              Congratulations! You passed all the quizzes in this course. You
              can now download your certificate.
            </p>
            <button
              onClick={() => {
                downloadPDF();
              }}
              className="bg-blue-gray-500 px-4 py-2 rounded ml-[50%] translate-x-[-50%] text-white text-sm mb-2"
            >
              Download Certificate
            </button>
            <div>
              <div className="w-full">
                <canvas
                  ref={canvasRef}
                  style={{ border: '1px solid black' }}
                  className="w-full"
                ></canvas>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DownloadCertificate;
