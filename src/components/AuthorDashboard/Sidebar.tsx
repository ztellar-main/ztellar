// ICONS
import { IoMdClose } from 'react-icons/io';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';

type Props = {
  setOpenSidebar: any;
};
const Sidebar = ({ setOpenSidebar }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {/* BACKGROUND CLOSER */}
      <div
        onClick={() => setOpenSidebar((e: any) => !e)}
        className="w-full h-lvh bg-black fixed top-0 left-0 opacity-40 z-40"
      />
      <div className="w-full h-lvh bg-blue-gray-50 md:w-[350px] fixed top-0 left-0 z-50">
        {/* HEADER */}
        <div className="w-full p-4 bg-blue-gray-800 text-white flex items-center justify-between">
          AUTHOR DASHBOARD
          <IoMdClose
            onClick={() => setOpenSidebar((e: any) => !e)}
            className="w-[25px] h-[25px] cursor-pointer"
          />
        </div>

        <div className="w-full p-4">
          {/* 1ST SECTION START - CLOSE */}
          <section className="flex items-center justify-between text-blue-gray-900">
            <h1 className="text-2xl font-bold ">Ztellar</h1>
          </section>
          {/* 1ST SECTION END - CLOSE */}

          <hr className="border-t my-3 border-blue-gray-300" />

          {/* 2ND SECTION START - BUTTON LINKS */}
          <section className="w-full text-blue-gray-900">
            {/* dashboard */}
            <button
              onClick={() => navigate('/author-new/dashboard')}
              className="border p-3 flex items-center text-lg"
            >
              <MdOutlineSpaceDashboard className="mr-4" />
              Dashboard
            </button>

            {/* SETTINGS */}
            <button
              onClick={() => navigate('/author-new/settings')}
              className="border p-3 flex items-center text-lg"
            >
              <IoSettingsOutline className="mr-4" />
              Settings
            </button>
          </section>
          {/* 2ND SECTION END - BUTTON LINKS */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
