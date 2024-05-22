import { useEffect, useRef, useState } from "react";
import OwnedSEventSidebar from "../../components/Owned/OwnedSEventSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import { Navigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import { CgSpinnerTwoAlt } from "react-icons/cg";

const OwnedEventLive = () => {
  const token = useAppSelector((e) => e.user.token);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("id") || "";
  const [openSidebar, setOpenSide] = useState(true);

  const scrollInto: any = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      scrollInto.current?.scrollIntoView({ behavior: "smooth" });
    }, 2000);
  }, []);

  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["live"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `users/get-user-owned-event?id=${productId}`,
        headers: {
          Authorization: `Token ${token}`,
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

  if (isError) {
    return <Navigate to="/owned" />;
  }

  const myMeeting = (element: any) => {
    // Create instance object from Kit Token.
    const liveId = eventData.eventData?._id?.liveId;
    const qrCode = eventData.eventData?.qr_code;
    const fname = eventData.userData?.fname;
    const lname = eventData.userData?.lname;
    const fullName = `${fname} ${lname}`;
    const appID = 1419563012;
    const serverSecret = "7f853fd9293aa601543f494dabd96943";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      liveId,
      qrCode,
      fullName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Audience,
          liveStreamingMode: ZegoUIKitPrebuilt.LiveStreamingMode.RealTimeLive
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
    <div>
      <div className="flex">
        <OwnedSEventSidebar
          setOpenSide={setOpenSide}
          openSidebar={openSidebar}
          page="Live"
          productId={productId}
        />

        <div className={`grow bg-gray-100 `}>
          <div className="bg-indigo-900 h-[30px] w-100 sticky top-0 left-0 z-[10] flex items-center justify-center hidden">
            <p className="text-white text-center">Aquired event dashboard</p>
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

            <p className="mr-[10px] text-gray-700">aquired event / live</p>
          </div>
          {/* MAIN BODY */}
          {/* LIVE CONTAINER */}

          {/* <Live /> */}

          {/* <div ref={liveRef} className="class">asdasdas</div> */}
          <div className="w-100 bg-blue-900 h-[100dvh]">
            <div ref={myMeeting} className="w-100 h-[100%]" />
          </div>

          <div ref={scrollInto} className="w-100" />
        </div>
      </div>
    </div>
  );
};

export default OwnedEventLive;
