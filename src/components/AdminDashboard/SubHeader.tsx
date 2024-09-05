import { FaArrowRightLong } from "react-icons/fa6";

type Props = {
  setopenSidebar: any;
  openSidebar: boolean;
  page: string;
};

const SubHeader = ({ setopenSidebar, openSidebar, page }: Props) => {
  return (
    <>
      <div className="w-100 h-[40px] flex items-center justify-between bg-blue-gray-50 sticky top-[40px] z-[5]">
        {openSidebar ? (
          <div className="bg-red-100 mobile:hidden tablet:hidden"></div>
        ) : (
          <div
            onClick={() => setopenSidebar(true)}
            className="bg-blue-900 w-[50px] h-[100%] flex items-center justify-center hover:bg-blue-800 cursor-pointer ease-in-out duration-300 mobile:hidden tablet:hidden"
          >
            <FaArrowRightLong className="w-[auto] h-[20px] text-white" />
          </div>
        )}

        {!openSidebar ? (
          <div className="tabletMin:hidden"></div>
        ) : (
          <div
            onClick={() => setopenSidebar(false)}
            className="bg-blue-900 w-[50px] h-[100%] flex items-center justify-center hover:bg-blue-800 cursor-pointer ease-in-out duration-300 tabletMin:hidden"
          >
            <FaArrowRightLong className="w-[auto] h-[20px] text-white" />
          </div>
        )}

        <p className="mr-[10px] text-gray-700">{page}</p>
      </div>
    </>
  );
};

export default SubHeader;
