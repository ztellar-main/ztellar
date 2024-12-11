// COMPONENTS
import Sidebar from '../../components/AuthorDashboard/Sidebar';

// ICONS
import { CiMenuBurger } from 'react-icons/ci';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CardComponentProps = {
  title: string;
  link: string;
};

const CardComponent = ({ title, link }: CardComponentProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="p-4 bg-gray-300 cursor-pointer"
    >
      {title}
    </div>
  );
};

const AuthorDashboardSettings = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <div className="">
        {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} />}
        <div className="">
          {/* 1ST SECTION START - PAGE NAME */}
          <section className="w-full text-2xl flex items-center bg-blue-gray-800 h-[57px] px-4 text-white">
            {!openSidebar && (
              <CiMenuBurger
                onClick={() => setOpenSidebar((e: any) => !e)}
                className="mr-6 cursor-pointer"
              />
            )}

            <h1 className="font-bold">Settings</h1>
          </section>
          {/* 1ST SECTION END - PAGE NAME */}

          {/* 2ND SECTION START - COMPANY */}
          <section className="w-full max-w-[1280px] ml-[50%] translate-x-[-50%] p-3 bg-gray-100 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CardComponent
              title="Account details"
              link="/author-new/account-details"
            />
            <CardComponent
              title="Update account details"
              link="/author-new/update-account-details"
            />
          </section>
          {/* 2ND SECTION END - CARDS */}

          {/* 3RD SECTION START - LIST OF ACTIVE EVENTS */}
          <section className="w-full p-4 md:p-8 text-blue-gray-900"></section>
          {/* 3RD SECTION END - LIST OF ACTIVE EVENTS */}
        </div>
      </div>
    </>
  );
};

export default AuthorDashboardSettings;
