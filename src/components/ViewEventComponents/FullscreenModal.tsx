import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface FullscreenModalProps {
  imageSrc: string;
  setOpenProgram: any;
  // altText: string;
  // onClose: () => void;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  imageSrc,
  setOpenProgram,
  // altText,
  // onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setOpenProgram(false)}
    >
      <div className=" w-[600px] h-[80%] flex flex-col items-center bg-white rounded">
        <div className="w-full flex justify-between p-2 rounded-t-md ">
          <a
            href={imageSrc}
            download
            className="bg-[#0D47A1] text-white font-normal px-5 py-3 rounded shadow hover:opacity-90 duration-300"
          >
            Download
          </a>
          <button
            onClick={() => setOpenProgram(false)}
            className="text-[#333333] font-normal px-1 py-3 hover:text-black duration-300"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <img src={imageSrc} alt="program-image" className="h-[100%]" />
      </div>
    </div>
  );
};

export default FullscreenModal;
