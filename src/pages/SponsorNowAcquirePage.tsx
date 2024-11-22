import { useState } from 'react';
import toas from '../utils/toas';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../state/store';

// ICONS
import { IoIosArrowDown } from 'react-icons/io';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const SponsorNowAcquirePage = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [buttonLoading, setBUttonLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAppSelector((e: any) => e?.user?.token);
  const query = new URLSearchParams(location.search);
  const productId = query.get('productId') || '';
  const boothId = query.get('boothId') || '';
  function formatToPeso(number: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(number);
  }

  //   VALUES
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyTinNumber, setCompanyTinNumber] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyContactPerson, setCompanyContactPerson] = useState('');
  const [mainLineOfBusiness, setMainLineOfBusiness] = useState('');
  const [learnUs, setLearnUs] = useState('');

  //   GET SINGLE BOOTH
  const { data, isLoading } = useQuery({
    queryKey: ['get-single-event-booth'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-single-event-booths?productId=${productId}&boothId=${boothId}`,
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

  //   RESERVE BUTTON FUNCTION
  const reserveButtonFunction = async () => {
    const bootName = data?.booth?.booth_name;
    const bootType = data?.booth?.booth_type;
    const bootPrice = data?.booth?.booth_price;
    if (
      !companyName ||
      !companyAddress ||
      !companyTinNumber ||
      !companyContact ||
      !companyContactPerson ||
      !mainLineOfBusiness ||
      !learnUs
    ) {
      return toas('Please fill up all the fields', 'error');
    }
    setBUttonLoading(true);
    try {
      await axios({
        method: 'put',
        url: '/product/reserve-booth',
        data: {
          companyName,
          boothId,
          productId,
          companyAddress,
          companyTinNumber,
          companyContact,
          companyContactPerson,
          mainLineOfBusiness,
          learnUs,
          bootName,
          bootType,
          bootPrice,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toas('Success', 'success');
      setBUttonLoading(false);
      navigate(`/event/sponsor-now?id=${productId}`);
    } catch (err) {
      setBUttonLoading(false);
      console.log(err);
    }
  };
  return (
    <div>
      {/* header */}
      <div className="w-100 bg-blue-800 p-[10px]">
        <p className="text-white text-center">Sponsor this booth</p>
      </div>

      {/* title of event */}
      <div className="w-100 p-[10px] bg-gray-50">
        <p className="text-center text-lg font-semibold">{data?.eventTitle}</p>
      </div>

      <section className="text-blue-gray-800 w-full ml-[50%] translate-x-[-50%] p-3 md:w-[600px]">
        <p className="text-center text-lg font-semibold mb-1">
          Booth name: {data?.booth?.booth_name}
        </p>
        <p className="text-center text-lg font-semibold mb-1">
          Booth type: {data?.booth?.booth_type}
        </p>
        <p className="text-center text-lg font-semibold mb-3">
          Booth price: {formatToPeso(data?.booth?.booth_price)}
        </p>
        {/* COMPANY NAME */}
        <input
          onChange={(e: any) => setCompanyName(e.target.value)}
          placeholder="Company name"
          type="text"
          className="w-full border rounded p-3 mb-3"
        />
        {/* COMPANY ADDRESS */}
        <input
          onChange={(e: any) => setCompanyAddress(e.target.value)}
          placeholder="Company address"
          type="text"
          className="w-full border rounded p-3 mb-3"
        />
        {/* TIN NUMBER */}
        <input
          onChange={(e: any) => setCompanyTinNumber(e.target.value)}
          placeholder="Company TIN number"
          type="text"
          className="w-full border rounded p-3 mb-3"
        />
        {/* CONTACT NUMBER */}
        <input
          onChange={(e: any) => setCompanyContact(e.target.value)}
          placeholder="Company contact number"
          type="text"
          className="w-full border rounded p-3 mb-3"
        />
        {/* CONTACT PERSON */}
        <input
          onChange={(e: any) => setCompanyContactPerson(e.target.value)}
          placeholder="Company contact person"
          type="text"
          className="w-full border rounded p-3 mb-3"
        />
        {/* MAINLINE BUSINESS */}
        <input
          onChange={(e: any) => setMainLineOfBusiness(e.target.value)}
          placeholder="Main line of business"
          type="text"
          className="w-full border rounded p-3 mb-3"
        />
        {/* LEARNED FROM US */}
        <div className="w-full rounded">
          <button
            onClick={() => setOpenDropdown((e: any) => !e)}
            className="text-blue-gray-600 border w-full p-3 rounded text-left flex items-center justify-between"
          >
            {!learnUs ? 'How did you learn from us' : learnUs}
            <IoIosArrowDown />
          </button>
          {openDropdown && (
            <div
              onClick={() => setOpenDropdown((e: any) => !e)}
              className="w-full text-blue-gray-600 bg-blue-gray-50"
            >
              <button
                onClick={() => setLearnUs('Ztellar')}
                className="w-full p-3 text-left"
              >
                Ztellar
              </button>
              <button
                onClick={() => setLearnUs('APEP')}
                className="w-full p-3 text-left"
              >
                APEP
              </button>
              <button
                onClick={() => setLearnUs('Techno')}
                className="w-full p-3 text-left"
              >
                Techno
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-lg my-2 font-semibold">
          Important Reminder:
        </p>

        <p className="indent-6 text-blue-gray-800">
          Please download the sponsorship contract by clicking the "Reserve"
          button below. Fill in the required information, sign the contract, and
          send it back to us within 2 weeks or before the APEP NATIONAL
          CONVENTION AND INDUSTRIAL WATER CONFERENCE, scheduled for (ENTER
          DATE). Your prompt response will help us secure your participation and
          ensure a smooth collaboration. Please email the completed contract to
          admin@ztellar.tech. Should you need further information, please book
          an appointment [here] or email us at admin@ztellar.tech.
        </p>

        {/* SUBMIT BUTTON */}

        <button
          onClick={reserveButtonFunction}
          className={`w-[50%] ml-[25%] p-3 bg-blue-800 rounded text-white my-3 relative ${
            buttonLoading && 'opacity-55'
          } `}
        >
          Reserve
          {buttonLoading && (
            <div className="absolute top-[50%] translate-y-[-50%] right-4">
              <CgSpinnerTwoAlt className=" animate-spin" />
            </div>
          )}
        </button>
      </section>
    </div>
  );
};

export default SponsorNowAcquirePage;
