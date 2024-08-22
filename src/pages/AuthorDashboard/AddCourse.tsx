import { useState } from "react";
import Header from "../../components/AuthorDashboard/Header";
import Sidebar from "../../components/AuthorDashboard/Sidebar";
import SubHeader from "../../components/AuthorDashboard/SubHeader";
import { Button, Tooltip } from "@material-tailwind/react";

const AuthorAddCourse = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  return (
    <>
      <div className="bg-gray-50 flex">
        <Sidebar setopenSidebar={setopenSidebar} openSidebar={openSidebar} />
        <div className="w-100">
          <Header />
          <SubHeader
            setopenSidebar={setopenSidebar}
            openSidebar={openSidebar}
            page="/add-course"
          />

          {/* MAIN BODY */}
          <div className="w-100 p-[10px]">
            <Tooltip content="Click to create new course">
              <Button
                placeholder={undefined}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="bg-blue-900"
              >
                Create Course
              </Button>
            </Tooltip>
          </div>

          <div className="class"></div>
        </div>
      </div>
    </>
  );
};

export default AuthorAddCourse;
