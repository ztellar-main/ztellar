import { useEffect, useState } from 'react';
import Header from '../../components/AuthorDashboard/Header';
import Sidebar from '../../components/AuthorDashboard/Sidebar';
import SubHeader from '../../components/AuthorDashboard/SubHeader';
import io from 'socket.io-client';


const DashboardNewAuthor = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const [count, setCount] = useState(0);
  console.log(count);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const socket = io('https://ztellar-api-backend.onrender.com');
      socket.emit('join_room', `3000`);
      socket.on('received_message', (data: any) => {
        console.log(data);
      });
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
        <div className="w-100 p-[10px]">asdasd</div>
      </div>
    </div>
  );
};

export default DashboardNewAuthor;
