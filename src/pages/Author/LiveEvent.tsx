import { useState } from "react";
import OwnedSEventSidebar from "../../components/Owned/OwnedSEventSidebar";
import { FaArrowRightLong } from "react-icons/fa6";

const LiveEvent = () => {
  const [openSidebar, setOpenSide] = useState(true);
  return (
    <div>
      <div className="flex">
        <OwnedSEventSidebar
          page="event/live-list"
          setOpenSide={setOpenSide}
          openSidebar={openSidebar}
          productId=""
        />

        <div className={`grow bg-gray-100 `}>
          <div className="bg-indigo-900 h-[30px] w-100 sticky top-0 left-0 z-[10] flex items-center justify-center">
            <p className="text-white text-center">Aquired event dashboard</p>
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

            <p className="mr-[10px] text-gray-700">aquired event / SDL</p>
          </div>

          {/* MAIN BODY */}

          <div className="class"></div>
        </div>
      </div>
    </div>
  );
};

export default LiveEvent;
