import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';

const DashboardNewAuthor = () => {
  const [openSidebar, setopenSidebar] = useState(true);

  return (
    <div className="bg-gray-50 flex">
      <Sidebar
        setopenSidebar={setopenSidebar}
        openSidebar={openSidebar}
        page="Dashboard"
      />
      <div className="w-100">
        <Header />
        <SubHeader
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="/dashboard"
        />

        {/* MAIN BODY */}
        <div className="w-100 p-[10px]"></div>
      </div>
    </div>
  );
};

export default DashboardNewAuthor;
