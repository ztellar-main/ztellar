import { FaArrowLeftLong } from "react-icons/fa6";
import { Tooltip } from "@material-tailwind/react";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

type Props = {
  setopenSidebar: any;
  openSidebar: boolean;
  page: string;
};

const buttonMap = [
  {
    name: "Dashboard",
    icon: <RxDashboard className="text-xl mr-[8px]" />,
    path: "/author-dashboard/dashboard",
  },
  {
    name: "Create Course",
    icon: <IoCreateOutline className="text-xl mr-[8px]" />,
    path: "/author-dashboard/add-course",
  },
];

const Sidebar = ({ setopenSidebar, openSidebar, page }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`w-[300px] h-[100vh] bg-blue-900 sticky tablet:fixed mobile:fixed mobile:w-100 top-0 ease-in-out duration-300 min-w-[300px] z-10
        ${
          openSidebar
            ? "tabletMin:ml-0 tabletMin:left-0:"
            : "tabletMin:ml-[-300px] tabletMin:left-[-300px]"
        }
          ${!openSidebar ? "tablet:left-0" : "tablet:left-[-100%]"}`}
      >
        {/* SECTION 1 - close container */}
        <div className="w-100 h-[40px] flex items-center justify-end pr-[10px]">
          <Tooltip content="Close sidebar" placement="bottom">
            <div className="" onClick={() => setopenSidebar((i: any) => !i)}>
              <FaArrowLeftLong className="w-[auto] h-[20px] text-white cursor-pointer" />
            </div>
          </Tooltip>
        </div>

        {/* SECTION 2 */}
        <div className="w-100 p-[10px]">
          {/* AUTHOR */}
          <div className="w-100 p-[10px] bg-blue-800 rounded flex items-center ">
            <div className="w-[50px] min-w-[50px] h-[50px] bg-white rounded-[50%] border-[2px] border-white">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/profile_pics%2FDenver%20Bigayanasd%2F49c773ac-2fb9-4ae2-a960-325f282a7bd2wilpower%203.jpg?alt=media&token=59e83c2c-eff5-4eda-af96-b9e97eafd5b4"
                alt=""
                className="w-100 h-[100%] object-cover rounded-[50%]"
              />
            </div>

            <div className="line-clamp-1 ml-[15px] font-semibold text-white text-lg">
              Juan Dela Cruz
            </div>
          </div>

          {/* HR */}
          <hr className="my-[10px]" />

          {/* LINKS/BUTTONS */}

          {buttonMap.map((buttonData: any, i: any) => {
            return (
              <button
                onClick={() => navigate(buttonData?.path)}
                key={i}
                className={`flex items-center w-100   p-[10px] text-lg rounded text-white mb-[5px]
                ${page === buttonData?.name && "bg-blue-800 border"}
                ${page !== buttonData?.name && "hover:text-gray-400"}
                `}
              >
                {buttonData?.icon}
                {buttonData?.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
