import { useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";

const AddCourse = () => {
  const [openSidebar, setOpenSide] = useState(true);
  return (
    <>
      <div className="flex">
        <AuthorSidebar
          page="add-course"
          openSidebar={openSidebar}
          setOpenSide={setOpenSide}
        />
        <div className={`grow bg-gray-50 `}>
          <div className="bg-indigo-900 p-[5px] w-100">
            <p className="text-white text-center">Author dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px]">
            {openSidebar ? (
              <div className="mobile:hidden" />
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
                className="mobileMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            <p className="mr-[10px]">Add-course</p>
          </div>

          {/* MAIN BODY */}
        </div>
      </div>
    </>
  );
};

export default AddCourse;
