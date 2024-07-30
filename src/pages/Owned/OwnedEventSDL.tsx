import { useState } from "react";
import OwnedSEventSidebar from "../../components/Owned/OwnedSEventSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import OwnedEventSDLSidebar from "../../components/Owned/OwnedEventSDLSidebar";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import { Navigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import VideoPrivate from "../../components/VideoPrivate";

const OwnedEventSDL = () => {
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("id") || "";

  const [openSidebar, setOpenSide] = useState(true);
  const [openSDLSidebar, setOpenSDLSidebar] = useState(false);

  const [videoDataPresent, setVideoDataPresent] = useState({
    title: null,
    video_url: "",
    subject_index: 0,
    video_index: 0,
    subject_link: null,
  });

  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sdl"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `users/get-user-owned-event?id=${productId}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setVideoDataPresent({
        title: res?.data?.eventData?._id?.subjects[0]?.videos[0]?._id?.title,
        video_url:
          res?.data?.eventData?._id?.subjects[0]?.videos[0]?._id?.video_url,
        subject_index: 0,
        video_index: 0,
        subject_link: res?.data?.eventData?._id?.subjects[1]?._id?.link,
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[70px] h-[70px] fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/owned" />;
  }

  // console.log(videoDataPresent)

  console.log(eventData);

  return (
    <div>
      <div className="flex">
        <OwnedSEventSidebar
          setOpenSide={setOpenSide}
          openSidebar={openSidebar}
          page="S D L"
          productId={productId}
        />

        <div className={`grow bg-gray-100 `}>
          <div className="bg-indigo-900 h-[30px] w-100 sticky top-0 left-0 z-[10] flex items-center justify-center">
            <p className="text-white text-center">Aquired Event Dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px] sticky top-[30px] left-0 z-[10]">
            {openSidebar ? (
              <div className="tablet:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(true)}
                className="transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            {!openSidebar ? (
              <div className="mobileMin:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(false)}
                className="tabletMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            <p
              className={`first-line:mr-[10px] text-gray-700 ${
                !openSDLSidebar && "mr-[100px]"
              }`}
            >
              aquired event / SDL
            </p>
          </div>

          {/* MAIN BODY */}

          <div className="class">
            <OwnedEventSDLSidebar
              openSDLSidebar={openSDLSidebar}
              setOpenSDLSidebar={setOpenSDLSidebar}
              subjects={eventData?.eventData?._id?.subjects}
              setVideoDataPresent={setVideoDataPresent}
            />

            <div
              key={videoDataPresent?.video_url}
              className="w-100 h-[400px] bg-black flex items-center justify-center"
            >
              <VideoPrivate videoUrl={videoDataPresent?.video_url} />
              {/* <CloudinaryVideoNormal videoUrl={videoDataPresent?.video_url} /> */}
            </div>
            <div className="w-100 p-[10px] bg-indigo-900 text-white">
              Subject {videoDataPresent?.subject_index + 1} / Part{" "}
              {videoDataPresent?.video_index + 1}: {videoDataPresent?.title}
            </div>

            <div className="p-[10px]">
              {/* TITLE */}
              <div className="bg-blue-50 rounded p-[10px] shadow font-semibold text-lg text-gray-900 mb-[10px]">
                Event: {eventData?.eventData?._id?.title}
              </div>

              <p className="text-xs">
                Click this button to create an appointment with the author
              </p>

              <button
                onClick={() => {
                  window.open(
                    `${videoDataPresent?.subject_link}`,
                    "_blank" // <- This is what makes it open in a new window.
                  );
                }}
                className="bg-blue-800 text-white p-[10px] rounded hover:opacity-[80%] active:opacity-[60%]"
              >
                Create an appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedEventSDL;
