// COMPONENTS
import Sidebar from '../../components/AuthorDashboard/Sidebar';

// ICONS
import { CiMenuBurger } from 'react-icons/ci';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../state/store';
import { useNavigate } from 'react-router-dom';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import toas from '../../utils/toas';

const AuthorDashboardUpdateAccount = () => {
  const token = useAppSelector((e: any) => e?.user?.token);
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  //   VALUES
  const [bankName, setBankName] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [tin, setTin] = useState('');
  const [companyRegistrationNumber, setCOmpanyRegistrationNumber] =
    useState('');
  const [landline, setLandline] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const submitFunction = async () => {
    if (!bankName || !bankAccountName || !bankAccountNumber || !mobileNumber) {
      toas('Please fill up all fields', 'error');
      return;
    }

    setButtonLoading(true);
    try {
      await axios({
        method: 'put',
        url: '/users/update-author-account-details',
        data: {
          bankName,
          bankAccountName,
          bankAccountNumber,
          mobileNumber,
          companyName,
          businessType,
          tin,
          companyRegistrationNumber,
          landline,
          companyAddress,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setButtonLoading(false);
      toas('Account details successfully updated', 'success');
      navigate('/author-new/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err?.response?.data?.message || err?.message;
        toas(error, 'error');
      }
    }
  };

  //   QUERY USER DATA
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user-data-for-update-account-details'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: '/users/author-details-update-account-details',
        headers: {
          authorization: `Token ${token}`,
        },
      });
      //   const asd = res?.data;
      //   bankName(asd?.bankName);

      setBankName(res?.data?.bankName);
      setBankAccountName(res?.data?.accountName);
      setBankAccountNumber(res?.data?.accountNumber);
      setMobileNumber(res?.data?.mobileNumber);
      setCompanyName(res?.data?.companyName);
      setBusinessType(res?.data?.businessType);
      setTin(res?.data?.tinNumber);
      setCOmpanyRegistrationNumber(res?.data?.companyRegNumber);
      setLandline(res?.data.landline);
      setCompanyAddress(res?.data?.companyAddress);

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
          <section className="w-full mb-2 text-2xl flex items-center bg-blue-gray-800 h-[57px] px-4 text-white">
            {!openSidebar && (
              <CiMenuBurger
                onClick={() => setOpenSidebar((e: any) => !e)}
                className="mr-6 cursor-pointer"
              />
            )}

            <h1 className="font-bold">Update Account Details</h1>
          </section>
          {/* 1ST SECTION END - PAGE NAME */}

          {/* 2ND SECTION START - CARDS */}
          <section className="w-full max-w-[800px] ml-[50%] translate-x-[-50%] p-3 bg-gray-100">
            {/* BANK NAME */}
            <input
              type="text"
              placeholder="Bank name"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setBankName(e?.target?.value)}
              value={bankName}
            />
            {/* BANK ACCOUNT NAME */}
            <input
              type="text"
              placeholder="Account name"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setBankAccountName(e?.target?.value)}
              value={bankAccountName}
            />
            {/* BACK ACCOUNT NUMBER */}
            <input
              type="text"
              placeholder="Account Number"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setBankAccountNumber(e?.target?.value)}
              value={bankAccountNumber}
            />
            {/* BACK ACCOUNT NUMBER */}
            <input
              type="text"
              placeholder="Mobile Number"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setMobileNumber(e?.target?.value)}
              value={mobileNumber}
            />
            {/* COMPANY NAME */}
            <input
              type="text"
              placeholder="Company Name"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setCompanyName(e?.target?.value)}
              value={companyName}
            />
            {/* COMPANY ADDRESS */}
            <input
              type="text"
              placeholder="Company Address"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setCompanyAddress(e?.target?.value)}
              value={companyAddress}
            />
            {/* BUSINESS TYPE */}
            <input
              type="text"
              placeholder="Business Type"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setBusinessType(e?.target?.value)}
              value={businessType}
            />
            {/* TIN */}
            <input
              type="text"
              placeholder="Tax Identification Number (TIN)"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setTin(e?.target?.value)}
              value={tin}
            />
            {/* COMPANY REGISTRATION NUMBER */}
            <input
              type="text"
              placeholder="Company Registration Number"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) =>
                setCOmpanyRegistrationNumber(e?.target?.value)
              }
              value={companyRegistrationNumber}
            />
            {/* LANDLINE */}
            <input
              type="text"
              placeholder="Landline"
              className="border rounded p-3 w-100 mb-3"
              onChange={(e: any) => setLandline(e?.target?.value)}
              value={landline}
            />

            {/* SUBMIT BUTTON */}
            <div className="grid grid-cols-2 gap-4">
              {/* CANCEL BUTTON */}
              <button
                onClick={() => navigate('/author-new/settings')}
                className="bg-gray-700 p-3 rounded text-white relative"
              >
                Cancel
              </button>

              {/* SUBMIT */}
              <button
                onClick={() => {
                  if (buttonLoading) {
                    return;
                  }
                  submitFunction();
                }}
                className="bg-indigo-900 p-3 rounded text-white relative"
              >
                Update
                {buttonLoading && (
                  <div className="absolute top-[50%] translate-y-[-50%] right-[-40px]">
                    <CgSpinnerTwoAlt className="text-indigo-900 animate-spin w-6 h-6" />
                  </div>
                )}
              </button>
            </div>
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

export default AuthorDashboardUpdateAccount;
