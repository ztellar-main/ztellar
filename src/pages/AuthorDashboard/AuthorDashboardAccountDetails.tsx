// COMPONENTS
import Sidebar from '../../components/AuthorDashboard/Sidebar';

// ICONS
import { CiMenuBurger } from 'react-icons/ci';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';

type CardProps = {
  title: string;
  name: string;
};

const Card = ({ title, name }: CardProps) => {
  return (
    <div className="p-2">
      <p className="">{title}</p>
      <p className="font-semibold">{name}</p>
    </div>
  );
};

const AuthorDashboardAccountDetails = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const token = useAppSelector((e: any) => e?.user?.token);

  const { data: userData, isLoading } = useQuery({
    queryKey: ['author-dashboard-account-details'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: '/users/get-author-account-details',
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  console.log(userData);
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

          {/* 2ND SECTION START - COMPANY INFORMATION */}
          <section className="w-full max-w-[1280px] ml-[50%] translate-x-[-50%] p-3 bg-gray-100 mb-4">
            <h1 className="font-bold text-2xl py-4 border-b border-indigo-900">
              Company Information
            </h1>
            <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card title="Company Name" name={userData?.companyName} />
              <Card title="Business Type" name={userData?.businessType} />
              <Card
                title="Tax Identification Number (TIN)"
                name={userData?.companyTin}
              />
              <Card
                title="Company Registration Number"
                name={userData?.companyRegistrationNumber}
              />
              <Card title="Company Address" name={userData?.companyAddress} />
            </div>
          </section>
          {/* 2ND SECTION END - COMPANY INFORMATION */}

          {/* 3RD SECTION START - CONTACT INFORMATION */}
          <section className="w-full max-w-[1280px] ml-[50%] translate-x-[-50%] p-3 bg-gray-100 mb-4">
            <h1 className="font-bold text-2xl py-4 border-b border-indigo-900">
              Contact Information
            </h1>
            <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card title="Email Address" name={userData?.authorEmail} />
              <Card title="Mobile Number" name={userData?.mobileNumber} />
              <Card title="Landline" name={userData?.landline} />
            </div>
          </section>
          {/* 3RD SECTION END - CONTACT INFORMATION */}

          {/* 4TH SECTION START - BANK INFORMATION */}
          <section className="w-full max-w-[1280px] ml-[50%] translate-x-[-50%] p-3 bg-gray-100 mb-4">
            <h1 className="font-bold text-2xl py-4 border-b border-indigo-900">
              Bank Information
            </h1>
            <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card title="Bank Name" name={userData?.bankName} />
              <Card title="Account Name" name={userData?.accountName} />
              <Card title="Account Number" name={userData?.accountNumber} />
            </div>
          </section>
          {/* 4TH SECTION END - BANK INFORMATION */}
        </div>
      </div>
    </>
  );
};

export default AuthorDashboardAccountDetails;
