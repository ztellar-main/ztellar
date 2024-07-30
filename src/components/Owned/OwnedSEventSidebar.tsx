import { FaArrowLeftLong } from "react-icons/fa6";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { RiLiveFill } from "react-icons/ri";
import { PiIdentificationCardFill } from "react-icons/pi";
import { useAppSelector } from "../../state/store";

type Props = {
  setOpenSide: any;
  openSidebar: any;
  page: string;
  productId: string;
};

const OwnedSEventSidebar = ({
  setOpenSide,
  openSidebar,
  page,
  productId,
}: Props) => {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const buttonLinskDetails = [
    {
      name: "Credentials",
      icon: (
        <PiIdentificationCardFill className="h-[20px] w-[auto] mr-[10px]" />
      ),
      route: `/owned/event/credentials?id=${productId}`,
    },
    {
      name: "S D L",
      icon: <FaBookOpen className="h-[20px] w-[auto] mr-[10px]" />,
      route: `/owned/event/sdl?id=${productId}`,
    },
    {
      name: "Quiz",
      icon: <FaBookOpen className="h-[20px] w-[auto] mr-[10px]" />,
      route: `/owned/event/quiz?id=${productId}`,
    },
    {
      name: "Live",
      icon: <RiLiveFill className="h-[20px] w-[auto] mr-[10px]" />,
      route: `/owned/event/live?id=${productId}`,
    },
  ];
  return (
    <>
      <div
        className={`w-[300px] mobile:w-100 h-[100vh] bg-indigo-900 sticky mobile:fixed top-0 tablet:fixed ease-in-out duration-300 z-[25] min-w-[300px]
       ${
         openSidebar
           ? "tabletMin:ml-0 tabletMin:left-0:"
           : "tabletMin:ml-[-300px] tabletMin:left-[-300px]"
       }
       ${!openSidebar ? "tablet:left-0" : "tablet:left-[-100%]"}
       `}
      >
        <div className="w-100 p-[10px] ">
          {/* ARROW */}
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

          {/* USER DETAILS */}
          <div className="w-100 p-[10px] bg-indigo-400 rounded flex items-center">
            <div className="w-[50px] h-[50px] bg-white rounded-circle ">
              <img
                src={user?.avatar}
                alt=""
                className="h-100 w-100 border border-blue-900 bg-blue-900 rounded-circle mr-[5px]"
              />
            </div>
            <div className="ml-[10px] text-white font-semibold text-lg tracking-wider">
              {user?.fname} {user?.lname}
            </div>
          </div>
          {/* USER DETAILS END */}

          <hr className="my-[10px]" />

          {buttonLinskDetails?.map((data, i) => {
            return (
              <button
                onClick={() =>
                  data?.name === "Live"
                    ? (window.location.href = data?.route)
                    : navigate(data?.route)
                }
                key={i}
                className={`w-100 p-[10px] flex items-center ${
                  page === data?.name
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-500"
                } rounded   mb-[10px] tracking-widest cursor-pointer`}
              >
                {data?.icon}
                {data?.name}
              </button>
            );
          })}

          <hr className="my-[10px]" />

          <button
            onClick={() => navigate("/")}
            className={`w-100 p-[10px] flex items-center text-white rounded hover:bg-white hover:text-gray-900 active:bg-white active:text-gray-900   mb-[10px] tracking-widest`}
          >
            <TiHome className="h-[20px] w-[auto] mr-[10px]" />
            Back to Home Page
          </button>
        </div>
      </div>
    </>
  );
};

export default OwnedSEventSidebar;
