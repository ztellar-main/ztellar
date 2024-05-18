import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import EventVideoCard from "./EventVideoCard";

type Props = {
  data: any;
  index: any;
};

const EventSubjectCard = ({ data, index }: Props) => {
  const [openVideos, setOpenVideos] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <>
        <div className="w-100 p-[10px] flex items-center bg-gray-100 relative">
          {/* NUMBER */}
          <div className="w-[50px] min-w-[50px] ">{index + 1}.</div>
          {/* TITLE */}
          <div className="grow tracking-wider">{data?._id?.title}</div>
          {/* ACTION */}
          <div className="  pl-[10px] flex items-center tablet:w-[140px] tablet:min-w-[140px]">
            <div className="relative w-[120px] tablet:w-[90px] ">
              <button
                onClick={() => setOpenAction(true)}
                className="w-100 p-[10px] bg-gray-300 rounded flex items-center justify-center"
              >
                Action <IoIosArrowDown className="ml-[10px]" />
              </button>

              {openAction && (
                <div className="w-[inherit] bg-white shadow rounded absolute z-[22] p-[5px] top-[calc(100%+5px)]">
                  <button
                    onClick={() =>
                      navigate(
                        `/author/event/setup/add-video-to-subject?productId=${data?._id?.product_id}&subjectId=${data?._id?._id}&subjectTitle=${data?._id?.title}`
                      )
                    }
                    className="bg-blue-600 w-100 p-[5px] text-white rounded hover:bg-blue-400 active:bg-blue-600"
                  >
                    Add Video
                  </button>
                </div>
              )}
            </div>

            <IoIosArrowDown
              onClick={() => {
                openVideos ? setOpenVideos(false) : setOpenVideos(true);
              }}
              className="ml-[15px]"
            />
          </div>
        </div>
        {/* VIDEOS CONTAINER */}
        {openVideos && (
          <div className="w-100 bg-gray-600">
            {data.videos?.map((videoData:any, i:any) => {
              return <EventVideoCard key={i} videoData={videoData} index={i} />;
            })}
          </div>
        )}
      </>
      {openAction && (
        <div
          onClick={() => setOpenAction(false)}
          className="fixed w-100 h-[100dvh] z-[21] left-0 top-0"
        />
      )}
    </>
  );
};

export default EventSubjectCard;
