import { FaArrowLeftLong } from 'react-icons/fa6';
import { Tooltip } from '@material-tailwind/react';
import { MdOutlineSubject } from 'react-icons/md';
import { GoVideo } from 'react-icons/go';
import { useEffect, useState } from 'react';

type VideoCardProps = {
  videoDataMap: any;
  videoIndex: any;
  setCurrentVideo: any;
  subjectIndex: any;
  currentVideo: any;
};

const VideoCard = ({
  videoDataMap,
  videoIndex,
  setCurrentVideo,
  subjectIndex,
  currentVideo,
}: VideoCardProps) => {
  const cardOnClickFunction = () => {
    setCurrentVideo({ subjectIndex, videoIndex });
  };
  let changeBg = '';

  if (
    subjectIndex === currentVideo.subjectIndex &&
    videoIndex === currentVideo?.videoIndex
  ) {
    changeBg = 'bg-blue-gray-200';
  }
  return (
    <>
      {/* video card */}
      <div
        onClick={cardOnClickFunction}
        className={`p-[10px] flex items-top w-100 cursor-pointer hover:bg-blue-gray-100 ${changeBg}`}
      >
        <GoVideo className="w-[18px] min-w-[18px] h-[20px] mr-[5px]" />
        <div className="line-clamp-2 text-sm tracking-wider">
          {videoIndex + 1}. {videoDataMap?.data?.title}
        </div>
      </div>
    </>
  );
};

// SUBJECT CARD
type SubjectCardProps = {
  subectDataMap: any;
  subjectIndex: any;
  setCurrentVideo: any;
  currentVideo: any;
};

const SubjectCard = ({
  subectDataMap,
  subjectIndex,
  setCurrentVideo,
  currentVideo,
}: SubjectCardProps) => {
  const [openCard, setOpenCard] = useState(false);

  useEffect(() => {
    const func = () => {
      if (subjectIndex === currentVideo?.subjectIndex) {
        setOpenCard(true);
      }
    };
    func();
  });

  return (
    <>
      <div
        onClick={() => setOpenCard((e) => !e)}
        className="w-100 p-[10px] flex items-top cursor-pointer border-b border-blue-gray-100 hover:bg-blue-gray-100"
      >
        <MdOutlineSubject className="w-[20px] min-w-[20px] h-[20px] mr-[5px] mt-[2px]" />
        <div className="line-clamp-2 tracking-wide font-semibold">
          {subjectIndex + 1}. {subectDataMap?.data?.title}
        </div>
      </div>
      {openCard && (
        <div className="border-b border-blue-gray-100 bg-white">
          {subectDataMap?.videos?.map((videoDataMap: any, i: any) => {
            return (
              <VideoCard
                key={i}
                videoDataMap={videoDataMap}
                videoIndex={i}
                setCurrentVideo={setCurrentVideo}
                subjectIndex={subjectIndex}
                currentVideo={currentVideo}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

type Props = {
  setopenSidebar: any;
  openSidebar: boolean;
  courseData: any;
  setCurrentVideo: any;
  currentVideo: any;
};

const Sidebar = ({
  setopenSidebar,
  openSidebar,
  courseData,
  setCurrentVideo,
  currentVideo,
}: Props) => {
  return (
    <>
      <div
        className={`w-[300px] h-[100vh] bg-blue-gray-50 sticky tablet:fixed mobile:fixed mobile:w-100 top-0 ease-in-out duration-300 min-w-[300px] z-10
    ${
      openSidebar
        ? 'tabletMin:ml-0 tabletMin:left-0:'
        : 'tabletMin:ml-[-300px] tabletMin:left-[-300px]'
    }
      ${!openSidebar ? 'tablet:left-0' : 'tablet:left-[-100%]'}`}
      >
        {/* SECTION 1 - close container */}
        <div className="w-100 h-[40px] flex items-center justify-end pr-[10px]">
          <Tooltip content="Close sidebar" placement="bottom">
            <div className="" onClick={() => setopenSidebar((i: any) => !i)}>
              <FaArrowLeftLong className="w-[auto] h-[20px] text-blue-gray-800 cursor-pointer" />
            </div>
          </Tooltip>
        </div>

        {/* HR */}

        {/* LINKS/BUTTONS */}
        {/* {courseData} */}
        <div className="p-[5px]">
          {/* subject card */}
          {courseData?.course_subjects?.map((subectDataMap: any, i: any) => {
            return (
              <SubjectCard
                key={i}
                subectDataMap={subectDataMap}
                subjectIndex={i}
                setCurrentVideo={setCurrentVideo}
                currentVideo={currentVideo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
