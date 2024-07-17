import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiLiveLine } from "react-icons/ri";
import { useAppSelector } from "../../state/store";

const pages = [
  {
    title: "Dashboard",
    page: "dashboard",
    icon: <MdOutlineSpaceDashboard className="w-[auto] h-[20px] mr-[10px]" />,
  },
  {
    title: "Add course - courses",
    page: "add-course",
    icon: <IoIosAddCircleOutline className="w-[auto] h-[20px] mr-[10px]" />,
  },
  {
    title: "Add event - events",
    page: "add-event",
    icon: <IoIosAddCircleOutline className="w-[auto] h-[20px] mr-[10px]" />,
  },
  {
    title: "Go Live - event",
    page: "event/live-list",
    icon: <RiLiveLine className="w-[auto] h-[20px] mr-[10px]" />,
  },
  {
    title: "Qr scan - event",
    page: "event/scan-qr-code",
    icon: <RiLiveLine className="w-[auto] h-[20px] mr-[10px]" />,
  },
  {
    title: "Pay cash - event",
    page: "event/event-cash-payment-list",
    icon: <RiLiveLine className="w-[auto] h-[20px] mr-[10px]" />,
  },
];

type Props = {
  page: string;
  openSidebar: boolean;
  setOpenSide: any;
};

const AuthorSidebar = ({ page, openSidebar, setOpenSide }: Props) => {
  const user = useAppSelector((state) => state.user.currentUser);
  return (
    <>
      <div
        className={`w-[300px] mobile:w-100 h-[100vh] bg-indigo-900 sticky mobile:fixed top-0 tablet:fixed ease-in-out duration-300 z-[11] min-w-[300px]
       ${
         openSidebar
           ? "tabletMin:ml-0 tabletMin:left-0:"
           : "tabletMin:ml-[-300px] tabletMin:left-[-300px]"
       }
       ${!openSidebar ? "tablet:left-0" : "tablet:left-[-100%]"}
       `}
      >
        <div className="w-100 p-[10px] ">
          <div className="text-white p-[10px] pt-0 flex items-center justify-end">
            {openSidebar ? (
              <FaArrowLeftLong
                onClick={() => setOpenSide(false)}
                className="w-[auto] h-[20px] cursor-pointer"
              />
            ) : (
              <FaArrowLeftLong
                onClick={() => setOpenSide(true)}
                className="w-[auto] h-[20px] cursor-pointer"
              />
            )}
          </div>

          {/* USER CONTAINER START */}
          <div className="flex p-[10px] items-center bg-indigo-700 rounded">
            <div className="border-[2px] border-white rounded-circle w-[45px] h-[45px]">
              <img
                src={user?.avatar}
                alt=""
                className="border-[2px] border-indigo-900 rounded-circle w-100 h-[100%]"
              />
            </div>

            <p className="text-white font-semibold text-xl ml-[10px]">
              {user?.fname} {user?.lname}
            </p>
          </div>
          {/* USER CONTAINER END */}

          <hr className="my-[10px] invert-[30%]" />

          {pages?.map((pageData, i) => {
            return (
              <Link to={`/author/${pageData?.page}`} key={i}>
                <button
                  // onClick={() => {
                  //   navigate(`/author/${pageData?.page}`);
                  //   // setOpenSide(true)
                  // }}

                  className={`w-100 p-[10px] flex items-center rounded transition-all mb-[5px] hover ${
                    pageData?.page === page
                      ? "bg-gray-50 text-gray-900"
                      : "text-white hover:text-gray-300 hover:scale-[1.03]"
                  }`}
                >
                  {pageData?.icon}
                  {pageData?.title}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AuthorSidebar;
