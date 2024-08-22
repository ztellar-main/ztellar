import { FaArrowLeftLong } from "react-icons/fa6";
import { Tooltip } from "@material-tailwind/react";

type Props = {
  setopenSidebar: any;
  openSidebar: boolean;
};

const Sidebar = ({ setopenSidebar, openSidebar }: Props) => {
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
        <div className="w-100 h-[40px] flex items-center justify-end pr-[10px]">
          <Tooltip content="Close sidebar" placement="bottom">
            <div className="" onClick={() => setopenSidebar((i:any) => !i)}>
              <FaArrowLeftLong className="w-[auto] h-[20px] text-white cursor-pointer" />
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
