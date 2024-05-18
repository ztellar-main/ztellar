import { MdKeyboardArrowDown } from "react-icons/md";
import EventViewVideoCard from "./EventViewVideoCard";
import { MdSubject } from "react-icons/md";
import { useState } from "react";

type Props = {
  data: any;
  index: any;
};

const EventViewSubjectCard = ({ data, index }: Props) => {
  const [openVideoCardContainer, setOpenVideoCardContainer] = useState(false);
  return (
    <>
      <div
        onClick={() =>
          openVideoCardContainer
            ? setOpenVideoCardContainer(false)
            : setOpenVideoCardContainer(true)
        }
        className="w-100 bg-blue-800 p-[10px] text-white flex items-center justify-between border border-gray-400 cursor-pointer"
      >
        <div className="grow flex">
          <MdSubject className="w-[25px] h-[auto] mr-[10px] min-w-[25px]" />
          {index + 1}.) {data?._id?.title}
        </div>

        <MdKeyboardArrowDown />
      </div>

      {openVideoCardContainer && (
        <div className="w-100">
          {data?.videos?.map((videoData: any, i: any) => {
            return <EventViewVideoCard key={i} data={videoData} index={i} />;
          })}
        </div>
      )}
    </>
  );
};

export default EventViewSubjectCard;
