import { Key, useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from "../../state/store";
import { CgSpinnerTwoAlt } from "react-icons/cg";

import { useNavigate } from "react-router-dom";

// COMPONENTS
import EventCards from "../../components/Author/EventCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AddEvent = () => {
  const navigate = useNavigate();
  const [openSidebar, setOpenSide] = useState(true);
  const token = useAppSelector((e) => e.user.token);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
  }, []);

  // GET ALL AUTHOR EVENTS
  type Asd = {
    data:any,
    isLoading:any
  }
  const { data: eventData, isLoading }:Asd = useQuery({
    queryKey: ["Event list"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: "/product/get-all-author-events",
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
        <div className="w-[100px] h-[100px] ml-[50%] translate-x-[-50%] mt-[30px]">
          <CgSpinnerTwoAlt className="w-[auto] h-100 text-indigo-900 animate-spin" />
        </div>
      );
    }
  };

  return (
    <>
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

            <p className="mr-[10px]">Add-event</p>
          </div>

          {/* MAIN BODY */}

          <div className="grow p-[10px]">
            {/* BODY TOP CONTAINER START */}
            <div className="bg-white shadow rounded p-[10px]">
              <button
                onClick={() => navigate("/author/add-event-page")}
                className="bg-indigo-600 text-white py-[10px] px-[20px] rounded flex items-center pl-[15px]"
              >
                <IoIosAddCircleOutline className="w-[auto] h-[20px] mr-[5px]" />
                Add event
              </button>

              <div className="flex items-center tablet:flex-col py-[10px]">
                <p className="text-lg my-[10px] font-semibold">
                  List of events
                </p>
                {/* SEARCH INPUT */}
                <div className="w-[300px] tablet:w-100 relative bg-red-100 tabletMin:ml-[20px]">
                  <input
                    type="text"
                    placeholder="Search event title"
                    className=" border text-lg p-[5px] px-[10px] w-100  rounded border-indigo-400 pl-[40px]"
                  />
                  <CiSearch className="w-[auto] h-[20px] absolute top-[50%] translate-y-[-50%] left-[10px]" />
                </div>
              </div>
            </div>
            {/* BODY TOP CONTAINER END */}

            <div className="bg-white w-100 h-[300px] mt-[10px] shadow rounded p-[10px]">
              <table className="table-auto w-full">
                <thead className="bg-white border-b-2 border-indigo-500 text-left text-gray-700">
                  <tr className="">
                    <th className="p-3 text-sm tracking-wide">#</th>
                    <th className="p-3 text-sm tracking-wide">Title</th>
                    <th className="p-3 text-sm tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData?.map((dataEvent: any, i: Key) => {
                    return <EventCards key={i} data={dataEvent} index={i} />;
                  })}
                </tbody>
              </table>
              <Loading />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
