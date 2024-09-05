import { useState } from 'react';
import Header from '../../components/AdminDashboard/Header';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import SubHeader from '../../components/AdminDashboard/SubHeader';

const AddVideo = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  // const courseId = query.get('courseId') || '';
  // const subjectId = query.get('subjectId') || '';
  const subjectTitle = query.get('title') || '';
  return (
    <div className="bg-gray-50 flex">
      <Sidebar
        setopenSidebar={setopenSidebar}
        openSidebar={openSidebar}
        page="Course"
      />
      <div className="w-100">
        <Header />
        <SubHeader
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="/course/setup/add-video"
        />

        {/* MAIN BODY */}
        <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
          Add Video
        </div>

        <p className="text-center my-[10px] tracking-wider font-semibold text-blue-800">
          {subjectTitle}
        </p>
      </div>
    </div>
  );
};

export default AddVideo;
