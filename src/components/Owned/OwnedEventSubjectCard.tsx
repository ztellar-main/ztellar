import { MdSubject } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";

// COMPONENTS
import OwnedEventVideoCard from "./OwnedEventVideoCard";
import { useState } from "react";

type Props = {
  subjectData: any;
  index: any;
  setVideoDataPresent: any;
  setOpenSDLSidebar:any
};

const OwnedEventSubjectCard = ({
  subjectData,
  index,
  setVideoDataPresent,
  setOpenSDLSidebar
}: Props) => {
  const [openvideoContainer, setVideoOpenContainer] = useState(false);
  return (
    <>
      <div
        onClick={() =>
          openvideoContainer
            ? setVideoOpenContainer(false)
            : setVideoOpenContainer(true)
        }
        className="w-100 p-[10px] text-white font-semibold flex items-center cursor-pointer bg-indigo-700"
      >
        <MdSubject className="mr-[10px] w-[20px] h-[20px] min-w-[20px] min-h-[20px]" />

        <div className="line-clamp-2 grow">
          {index + 1}.) {subjectData?._id?.title}
        </div>

        <RiArrowDownSLine />
      </div>

      {openvideoContainer && (
        <div className="class">
          {subjectData?.videos?.map((videoData: any, i: any) => {
            return (
              <OwnedEventVideoCard key={i} link={subjectData?._id?.link} videoData={videoData} index={i} subjectIndex={index} setVideoDataPresent={setVideoDataPresent} setOpenSDLSidebar={setOpenSDLSidebar} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default OwnedEventSubjectCard;
