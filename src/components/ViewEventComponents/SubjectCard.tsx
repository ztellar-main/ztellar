import VideoCard from './VideoCard';
import { useState } from 'react';
import { CiFolderOn } from 'react-icons/ci';
import { GoChevronDown } from 'react-icons/go';

type Props = {
  subjectData: any;
};

const SubjectCard = ({ subjectData }: Props) => {
  const [openVideoCard, setOpenVideoCard] = useState(false);
  return (
    <>
      <tr
        className="cursor-pointer border border-[#CFD8DC] bg-transparent hover:bg-gray-100"
        onClick={() => setOpenVideoCard((e: any) => !e)}
      >
        <div className="px-2 py-3">
          <div className="flex items-center">
            <div className="w-8 mr-2 flex justify-center items-center">
              <CiFolderOn size={24} color="#333333" />
            </div>
            <div className="flex-1">
              <p className="text-sm tracking-[1px]">
                {subjectData?._id?.title}
              </p>
            </div>
          </div>
        </div>
        <td className="p-2 tracking-[1px] text-sm">
          {subjectData?.videos?.length} videos
        </td>
        <td>
          <GoChevronDown className={`${openVideoCard ? "rotate-180" : "rotate-0"} transition-all`} />
        </td>
      </tr>
      {openVideoCard && <VideoCard videos={subjectData?.videos} />}
    </>
  );
};

export default SubjectCard;
