import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import { CgSpinnerTwoAlt } from "react-icons/cg";

// COMPONENTS
import EventCashPaymentCard from "../../components/Author/EventCashPaymentCard";

const EventListCashPayment = () => {
  const [openSidebar, setOpenSide] = useState(true);
  const token = useAppSelector((state) => state.user.token);

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
  const { data: eventData, isLoading } = useQuery({
    queryKey: ["Live event list"],
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
          page="event/event-cash-payment-list"
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

            <p className="mr-[10px]">Choose event cash payment.</p>
          </div>

          {/* MAIN BODY */}
          <div className="w-100">
            <table className="table-auto w-full">
              <thead className="bg-white border-b-2 border-indigo-500 text-left text-gray-700">
                <tr className="">
                  <th className="p-3 text-sm tracking-wide">#</th>
                  <th className="p-3 text-sm tracking-wide">Title</th>
                  <th className="p-3 text-sm tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="class">
                {eventData?.map((eData: any, i: any) => {
                //   return <GoLiveEventCard key={i} index={i} data={eData} />;
                  return <EventCashPaymentCard data={eData} key={i} index={i} />
                })}
              </tbody>
            </table>
            <Loading />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventListCashPayment;
