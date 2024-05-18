import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
// import { useAppSelector } from "../../state/store";

import { useLocation } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";

// COMPONENTS
import AddSubjectOnEventPopup from "../../components/Author/AddSubjectOnEventPopup";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import EventSubjectCard from "../../components/Author/EventSubjectCard";

const EventSetup = () => {
  const token = useAppSelector((e) => e.user.token);
  const [openSidebar, setOpenSide] = useState(true);
  const [openAddSubjectPopup, setOpenAddSubjectPopup] = useState(false);
  const [refresher, setRefresher] = useState(false);
  //   const token = useAppSelector((e) => e.user.token);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("id") || "";

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
  }, []);

  const { data: eventData, isLoading } = useQuery({
    queryKey: [refresher],
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

  const Loading = () => {
    if (isLoading) {
      return (
        <div className="w-[70px] h-[70px] ml-[50%] translate-x-[-50%] mt-[30px]">
          <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
        </div>
      );
    }
  };



  return (
    <>
      {openAddSubjectPopup && (
        <>
          <div
            onClick={() => setOpenAddSubjectPopup(false)}
            className="w-100 h-[100dvh] fixed bg-gray-900 z-[21] opacity-[50%]"
          />
          <AddSubjectOnEventPopup
            eventId={eventId}
            setOpenAddSubjectPopup={setOpenAddSubjectPopup}
            refresher={refresher}
            setRefresher={setRefresher}
          />
        </>
      )}

      <div className="flex">
        <AuthorSidebar
          page="add-event"
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

            <p className="mr-[10px]">Setup-event</p>
          </div>

          {/* MAIN BODY */}

          <div className="grow p-[10px] bg-gray-100">
            {/* SDL START */}
            <div className="shadowrounded">
              <div className="bg-indigo-600 p-[10px] text-white rounded-t font-semibold tracking-wider">
                Self Direct Learning
              </div>
              <div className="w-100 p-[10px] bg-white rounded-b">
                <div className="w-100 flex items-center justify-end mb-[10px]">
                  <button
                    onClick={() => setOpenAddSubjectPopup(true)}
                    className="bg-blue-600 text-white p-[10px] rounded shadow"
                  >
                    Add Subject
                  </button>
                </div>

                <hr className="border-indigo-100 py-[10px]" />

                <div className="w-100 p-[5px] ">
                  {/* TABLE HEADER */}
                  <div className="w-100  p-[10px] flex border-b-[2px] border-indigo-900">
                    {/* NUMBER */}
                    <div className="w-[50px] ">#</div>
                    {/* TITLE */}
                    <div className="grow ">Title</div>
                    {/* ACTION */}
                    <div className=" w-[100px] pl-[10px]">Action</div>
                  </div>

                  {eventData?.subjects?.map((eData: any, i: any) => {
                    return <EventSubjectCard key={i} data={eData} index={i} />;
                  })}
                </div>
                <Loading />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventSetup;
