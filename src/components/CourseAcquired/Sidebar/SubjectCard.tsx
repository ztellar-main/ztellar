import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import VideoCard from './VideoCard';

const SubjectCard = () => {
  return (
    <>
      <div className="h-[72px] w-full  flex justify-between items-center px-2 cursor-pointer bg-gray-50">
        <div className="line-clamp-2 text-gray-900 font-semibold">
          Subject 1: Asdasda asdasd a asd sas dasd asd asd asd asd as das dasd
          asd
        </div>

        <div className="h-full ml-2 ">
          <MdOutlineKeyboardArrowDown className="w-6 h-6 items-start mt-4" />
        </div>
      </div>
      {/* video card */}
      <div className="">
        <VideoCard />
      </div>
    </>
  );
};

export default SubjectCard;
