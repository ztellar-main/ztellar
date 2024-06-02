import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import OwnedEventSubjectCard from "./OwnedEventSubjectCard";

type Props = {
  openSDLSidebar: any;
  setOpenSDLSidebar: any;
  subjects: any;
  setVideoDataPresent: any;
};

const OwnedEventSDLSidebar = ({
  openSDLSidebar,
  setOpenSDLSidebar,
  subjects,
  setVideoDataPresent,
}: Props) => {
  return (
    <>
      <div
        className={`w-[300px] h-[calc(100dvh-30px)] bg-indigo-900 fixed right-0 ease-in-out top-[30px] duration-300 z-[23] mobile:w-100
    ${openSDLSidebar ? "translate-x-0" : "translate-x-full"}
    `}
      >
        {!openSDLSidebar && (
          <button
            onClick={() => setOpenSDLSidebar(true)}
            className="bg-indigo-600 absolute p-[10px] left-[-90px] w-[90px] flex items-center justify-center text-white text-xs"
          >
            <FaArrowLeftLong className=" w-[30px] h-[20px] " />
            outline
          </button>
        )}

        {/* START */}
        <div className="text-white w-100 p-[10px]">
          <FaArrowRightLong
            onClick={() => setOpenSDLSidebar(false)}
            className="w-[35px] h-[25px]"
          />
        </div>

        {/* MAIN BODY START */}
        <div className=" w-100 h-[calc(100dvh-75px)] overflow-auto">
          <div className="p-[5px]">
            {/* SUBJECT CARD */}
            {subjects?.map((subjectData: any, i: any) => {
              return (
                <OwnedEventSubjectCard
                  key={i}
                  subjectData={subjectData}
                  index={i}
                  setVideoDataPresent={setVideoDataPresent}
                  setOpenSDLSidebar={setOpenSDLSidebar}
                />
              );
            })}
          </div>
        </div>
      </div>
      {openSDLSidebar && (
        <div
          onClick={() => setOpenSDLSidebar(false)}
          className="w-100 h-[100vh] fixed z-[22] top-0 left-0 bg-black opacity-[30%] mobile:opacity-[90%]"
        />
      )}
    </>
  );
};

export default OwnedEventSDLSidebar;
