import { IoCloseOutline } from 'react-icons/io5';
import toas from '../utils/toas';
import axios from 'axios';
import { useAppSelector } from '../state/store';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

type Props = {
  eventTitle: String;
  fileUrl: string;
  setOpenForm: any;
  productId: string;
  setRefresh: any;
  bootData: any;
  mainBootId: any;
};

const SponsorNowReserve = ({
  eventTitle,
  fileUrl,
  setOpenForm,
  productId,
  setRefresh,
  bootData,
  mainBootId,
}: Props) => {
  const user = useAppSelector((e) => e.user.currentUser);
  const senderEmail = user?.email;
  const token = useAppSelector((e) => e.user.token);
  const [openDropDown, setOpenDropDown] = useState(false);

  // VALUES
  const [companyName, setCompanyName] = useState('');
  const [contact, setContact] = useState(null);
  const [learnFrom, setLearnFrom] = useState('');

  function formatToPeso(number: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(number);
  }

  console.log(bootData);

  const submitButtonFunction = async () => {
    try {
      await axios({
        method: 'put',
        url: 'users/sponsor-reserve',
        data: {
          productId,
          senderEmail,
          eventTitle,
          bootData,
          mainBootId,
          companyName,
          contact,
          learnFrom,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      window.location.href = fileUrl;
      toas('Successfully reserved', 'success');
      setRefresh((data: any) => !data);
      setOpenForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-white p-2 rounded w-[95%] md:w-[600px] lg:w-[800px] md:p-6">
      <div
        onClick={() => setOpenForm(false)}
        className="w-100 flex justify-end cursor-pointer"
      >
        <IoCloseOutline className="w-[30px] h-[30px]" />
      </div>

      <p className="text-center my-[10px]">Title of event</p>
      <p className="text-center my-[10px] text-2xl font-semibold text-blue-600">
        {eventTitle}
      </p>

      <p className="text-center font-semibold text-blue-600 text-lg">
        Booth number: {bootData?.boot_name}
      </p>

      <p className="text-center font-semibold text-blue-600 text-lg">
        Booth price: {formatToPeso(bootData?.boot_price)}
      </p>

      <div
        className={`${bootData?.boot_type_color} mb-3 text-blue-gray-900 rounded p-[10px] w-[200px] text-center ml-[50%] translate-x-[-50%] mt-[10px]`}
      >
        {bootData?.boot_type}
      </div>

      {/* COMPANY NAME INPUT */}
      <input
        placeholder="Enter company name"
        type="text"
        className="w-full border rounded p-3 mb-3"
        onChange={(e: any) => setCompanyName(e.target.value)}
      />

      <input
        placeholder="Enter contact number"
        type="text"
        className="w-full border rounded p-3 mb-3"
        onChange={(e: any) => setContact(e.target.value)}
      />

      <div className="w-full">
        <button
          onClick={() => setOpenDropDown((e: any) => !e)}
          className="w-full p-3 border rounded text-left flex items-center justify-between text-blue-gray-500"
        >
          {!learnFrom ? 'How did your learn from us' : learnFrom}

          <IoIosArrowDown />
        </button>
        {openDropDown && (
          <div
            onClick={() => setOpenDropDown((e: any) => !e)}
            className="p-2 bg-blue-gray-50"
          >
            <p
              onClick={() => setLearnFrom('Ztellar')}
              className="p-2 text-blue-gray-500 cursor-pointer"
            >
              Ztellar
            </p>
            <p
              onClick={() => setLearnFrom('APEP')}
              className="p-2 text-blue-gray-500 cursor-pointer"
            >
              APEP
            </p>
            <p
              onClick={() => setLearnFrom('Techno Event')}
              className="p-2 text-blue-gray-500 cursor-pointer"
            >
              Techno Event
            </p>
          </div>
        )}
      </div>

      <p className="text-center font-semibold mt-[20px] mb-[5px]">
        Important Reminder:
      </p>

      <p className="w-[70%] ml-[50%] translate-x-[-50%] indent-10">
        Please download the sponsorship contract by clicking the "Download"
        button below. Fill in the required information, sign the contract, and
        send it back to us within 2 weeks or before the {eventTitle}, scheduled
        for (ENTER DATE). Your prompt response will help us secure your
        participation and ensure a smooth collaboration. Please email the
        completed contract to admin@ztellar.tech. Should you need further
        information, please book an appointment [here] or email us at
        admin@ztellar.tech.
      </p>

      <button
        onClick={() => {
          return submitButtonFunction();
        }}
        className="bg-blue-800 py-[10px] px-[20px] rounded ml-[50%] translate-x-[-50%] text-white cursor-pointer hover:bg-blue-600 mt-[20px]"
      >
        Download
      </button>
    </div>
  );
};

export default SponsorNowReserve;
