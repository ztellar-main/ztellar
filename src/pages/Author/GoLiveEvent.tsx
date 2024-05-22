import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const GoLiveEvent = () => {
  const [openSidebar, setOpenSide] = useState(true);
  const token = useAppSelector((e) => e.user.token);
  const user = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("id") || "";

  // GET ALL AUTHOR EVENTS
  const { data: eventData, isLoading } = useQuery({
    queryKey: ["golive"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/product/get-single-author-event?id=${eventId}`,
        headers: {
          authorization: `Token ${token}`,
        },
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

  const userId = user?._id;

  const roomId = eventData?.liveId;
  const name = `${user?.fname} ${user?.lname}`;

  const appID = 1419563012;
  const serverSecret = "7f853fd9293aa601543f494dabd96943";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    userId,
    name
  );
  // start the call
  const myMeeting = async (element: any) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Host,
        },
      },
      showPreJoinView: false,
      lowerLeftNotification: {
        showUserJoinAndLeave: true, // Whether to display notifications on the lower left area when participants join and leave the room. Displayed by default.
        showTextChat: true, // Whether to display the latest messages on the lower left area. Displayed by default.
      },
    });
  };

  return (
    <>
      <div className="flex">
        <AuthorSidebar
          page="event/live-list"
          openSidebar={openSidebar}
          setOpenSide={setOpenSide}
        />
        <div className={`grow bg-gray-50 `}>
          <div className="bg-indigo-900 p-[5px] w-100 sticky top-0 left-0">
            <p className="text-white text-center">Author dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px]">
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

            <p className="mr-[10px]">Choose live</p>
          </div>

          {/* MAIN BODY */}
          <div className="w-100">
            {/* <Loading /> */}
            {/* LIVE */}
            <div className="w-100 bg-blue-900 h-[calc(100dvh-70px)]">
              <div
                className="myCallContainer"
                ref={myMeeting}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoLiveEvent;
