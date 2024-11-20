import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../../state/store';

// COMPONENTS
import Sidebar from '../../../components/AuthorDashboard/Sidebar';

// ICONS
import { CiMenuBurger } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

// IMPORT CHART PACKAGE
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { exportToExcel } from '../../../utils/excelDownloader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function formatToPeso(number: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(number);
}

// LIST OF SPONSORS POPUP
type ListOfSponsorsPopupProps = {
  data: any;
  setOpenPopup: any;
  eventId: string;
  setRefresher: any;
};
const ListOfSponsorsPopup = ({
  data,
  setOpenPopup,
  eventId,
  setRefresher,
}: ListOfSponsorsPopupProps) => {
  const token = useAppSelector((e: any) => e?.user?.token);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boothStatus, setBootStatus] = useState(data?.booth_status);

  // UPDATE BOOTH STATUS BUTTON FUNCTION
  const updateBoothButtonFunction = async () => {
    try {
      await axios({
        method: 'put',
        url: '/product/author-update-booth-status-and-logs',
        data: { boothStatus, eventId, boothId: data?._id },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setRefresher((e: any) => !e);
    } catch (err) {
      console.log('SOMETHING WENT WRONG');
    }
  };

  return (
    <>
      {/* POPUP */}
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-3 w-[95%] rounded text-blue-gray-900 z-50 md:w-[700px] md:p-8 overflow-y-auto max-h-[calc(100vh-100px)] bg-white">
        <div className="flex items-center justify-between mb-3 text-xl font-bold">
          <h1 className=" ">Sponsor's Booth Details</h1>
          <IoCloseSharp onClick={() => setOpenPopup((e: any) => !e)} />
        </div>

        {/* BOOTH DTAILS */}
        <p className="text-base mb-2">
          <span className="font-semibold">Booth Name :</span> {data?.booth_name}
        </p>
        <p className="text-base mb-2">
          <span className="font-semibold">Booth Type :</span> {data?.booth_type}
        </p>
        <p className="text-base mb-2">
          <span className="font-semibold">Booth Price :</span>{' '}
          {data?.booth_price}
        </p>
        <p className="text-base">
          <span className="font-semibold">Booth Status :</span>{' '}
          {data?.booth_status}
        </p>

        <hr className="border-0 border-t border-blue-gray-100 my-3" />

        {/* RESERVED BY */}
        <h1 className="text-xl font-bold mb-3">Reserved By:</h1>
        <p className="text-base mb-3">
          <span className="font-semibold">Company Name :</span>{' '}
          {data?.reserved_company_name}
        </p>
        <p className="text-base mb-3">
          <span className="font-semibold">Company Address :</span>{' '}
          {data?.reserve_company_address}
        </p>
        <p className="text-base mb-3">
          <span className="font-semibold">Company TIN Number :</span>{' '}
          {data?.reserve_tin_number}
        </p>
        <p className="text-base mb-3">
          <span className="font-semibold">Company Contact :</span>{' '}
          {data?.reserve_company_contact}
        </p>
        <p className="text-base mb-3">
          <span className="font-semibold">Company Main Line of Business :</span>{' '}
          {data?.reserve_mainline_business}
        </p>
        <p className="text-base mb-3">
          <span className="font-semibold">Company Contact Person :</span>{' '}
          {data?.reserve_contact_person}
        </p>
        <p className="text-base mb-3">
          <span className="font-semibold">Where did you learn from us? :</span>{' '}
          {data?.reserve_solicitor}
        </p>

        <hr className="border-0 border-t border-blue-gray-100 my-3" />

        {/* BOOTH STATUS UPDATE LOGS */}
        <h1 className="text-xl font-bold mb-3">Booth Status Update Logs:</h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="p-3 text-left border border-slate-600">Email</th>
                <th className="p-3 text-left border border-slate-600">Date</th>
                <th className="p-3 text-left border border-slate-600">
                  Booth Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.booth_status_update_logs?.map((data: any, i: any) => {
                const date = new Date(data?.date);
                return (
                  <tr key={i}>
                    <td className="p-3 text-left border border-slate-600">
                      {data?.email}
                    </td>
                    <td className="p-3 text-left border border-slate-600">
                      {date?.toLocaleDateString()} {date?.toLocaleTimeString()}
                    </td>
                    <td className="p-3 text-left border border-slate-600">
                      {data?.booth_status_value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <hr className="border-0 border-t border-blue-gray-100 my-3" />

        {/* BOOTH STATUS UPDATE */}
        <h1 className="text-xl font-bold mb-3">Update Booth Status:</h1>
        <div className="mb-3">
          <button
            onClick={() => setOpenDropdown((e: any) => !e)}
            className="p-3 border w-full flex items-center justify-between text-base"
          >
            {boothStatus}
            <MdOutlineKeyboardArrowDown />
          </button>
          {openDropdown && (
            <div
              onClick={() => setOpenDropdown((e: any) => !e)}
              className="w-full border p-3 border-t-0 text-base text-blue-gray-900"
            >
              <p
                onClick={() => setBootStatus('Reserved (Pending)')}
                className="text-blue-gray-900 mb-3 cursor-pointer"
              >
                Reserved (Pending)
              </p>
              <p
                onClick={() => setBootStatus('Moa Approved')}
                className="text-blue-gray-900 mb-3 cursor-pointer"
              >
                Moa Approved
              </p>
              <p
                onClick={() => setBootStatus('Downpayment (20%)')}
                className="text-blue-gray-900 mb-3 cursor-pointer"
              >
                Downpayment (20%)
              </p>
              <p
                onClick={() => setBootStatus('Pending Payment')}
                className="text-blue-gray-900 mb-3 cursor-pointer"
              >
                Pending Payment
              </p>
              <p
                onClick={() => setBootStatus('Acquired')}
                className="text-blue-gray-900 cursor-pointer"
              >
                Acquired
              </p>
            </div>
          )}
        </div>
        <button
          onClick={updateBoothButtonFunction}
          className="w-full p-3 rounded bg-blue-gray-800 text-white"
        >
          Update Booth Status
        </button>
      </div>
      {/* BACKGROUND CLOSER */}
      <div
        onClick={() => setOpenPopup((e: any) => !e)}
        className="w-full h-lvh bg-black fixed top-0 left-0 opacity-40 z-20"
      />
    </>
  );
};

// LIST OF SPONSORS TABLE ROW COMPONENTS
type ListOfSponsorsTableRowComponentProps = {
  data: any;
  eventId: string;
  setRefresher: any;
};
const ListOfSponsorsTableRowComponent = ({
  data,
  eventId,
  setRefresher,
}: ListOfSponsorsTableRowComponentProps) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <tr>
      <td className="p-3 text-left border border-slate-600">
        {data?.booth_name}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {data?.booth_type}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {formatToPeso(data?.booth_price)}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {data?.booth_status}
      </td>
      <td className="p-3 text-left border border-slate-600">
        <button onClick={() => setOpenPopup((e: any) => !e)} className="">
          More Details
        </button>
        {openPopup && (
          <ListOfSponsorsPopup
            data={data}
            setOpenPopup={setOpenPopup}
            eventId={eventId}
            setRefresher={setRefresher}
          />
        )}
      </td>
    </tr>
  );
};

// LIST OF REGISTERED TABLE ROW COMPONENT
type ListOfRegisteredTableRowComponents = {
  data: any;
  index: any;
};
const ListOfRegisteredTableRowComponents = ({
  data,
  index,
}: ListOfRegisteredTableRowComponents) => {
  const date = new Date(data?.date);

  const [openPopup, setOpenPopup] = useState(false);
  return (
    <tr>
      <td className="p-3 text-left border border-slate-600">{index + 1}</td>
      <td className="p-3 text-left border border-slate-600">
        {data?._id?.email}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {data?._id?.fname} {data?._id?.mname} {data?._id?.lname}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {data?.reg_type}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {data?.payment_mode}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {formatToPeso(data?.author_payment)}
      </td>
      <td className="p-3 text-left border border-slate-600">
        <button onClick={() => setOpenPopup((e: any) => !e)} className="">
          View User
        </button>
        {openPopup && (
          <>
            {/* POPUP */}
            <div className="fixed top-[50%] left-[50%] w-[95%] rounded bg-white p-6 md:p-8 translate-x-[-50%] translate-y-[-50%] text-blue-gray-900 md:w-[600px] z-30">
              <div className="flex items-center justify-between text-xl mb-4">
                <h1 className="font-bold">User Details</h1>
                <IoCloseSharp
                  onClick={() => setOpenPopup((e: any) => !e)}
                  className="w-[22px] h-[22px] cursor-pointer"
                />
              </div>
              <p className="tracking-wider text-base mb-2 text-blue-gray-900">
                <span className="font-bold">Email :</span> {data?._id?.email}
              </p>
              <p className="tracking-wider text-base mb-2 text-blue-gray-900">
                <span className="font-bold">Name :</span> {data?._id?.fname}{' '}
                {data?._id?.mname} {data?._id?.lname}
              </p>
              <p className="tracking-wider text-base text-blue-gray-900">
                <span className="font-bold">Mobile # :</span>{' '}
                {data?._id?.mobile_number}
              </p>
            </div>
            {/* BACKGROUND CLOSER */}
            <div
              onClick={() => setOpenPopup((e: any) => !e)}
              className="w-full h-lvh bg-black fixed top-0 left-0 opacity-40 z-20"
            />
          </>
        )}
      </td>
    </tr>
  );
};

// CARD COMPONENT
type CardComponentProps = {
  title: string;
  value: any;
  type: string;
};
const CardComponent = ({ title, value, type }: CardComponentProps) => {
  return (
    <div className="text-blue-gray-900 bg-blue-gray-50 p-8 rounded">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <h1 className="text-4xl font-bold">
        {type === 'currency' && formatToPeso(value)}
        {type !== 'currency' && value}
      </h1>
    </div>
  );
};

const ViewEvent = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const query = new URLSearchParams(location.search);
  const eventId = query.get('id') || '';
  const token = useAppSelector((e: any) => e?.user?.token);
  const [refresher, setRefresher] = useState(false);
  // const [graphState, setGraphState] = useState([]);
  // const [graphFilter, setGraphFilter] = useState('week');

  // COMPONENT REFERENCE
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);

  // STATE VALUES
  const [sponsorsBoothData, setSponsorsBoothData] = useState([]);
  const lineChartData = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
      },
    ],
  };
  const [graphData, setGraphData] = useState(lineChartData);
  console.log(graphData);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  //   QUERY DATA
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-event-details-author-dashboard', refresher],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-event-details-author-dashboard?eventId=${eventId}`,
        headers: { authorization: `Token ${token}` },
      });

      // GRAPH INITIAL STATE
      const lineChartData = {
        labels: res?.data?.chartWeek?.chartWeekLabels,
        datasets: [
          {
            label: 'Weekly Registration',
            data: res?.data?.chartWeek?.chartWeekDataset,
            borderColor: 'blue',
          },
        ],
      };
      setGraphData(lineChartData);
      setSponsorsBoothData(res?.data?.sponsorsBooths);
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    if (error instanceof AxiosError) {
      const err = error?.response?.data?.message || error?.message;
      if (err === 'Not Authorized') {
        return <p className="">PAGE NOT FOUND</p>;
      }
    }
  }

  // console.log(data);

  // DOWNLOAD EXCEL FILE
  const handleExportExcel = (data: any, fileName: string) => {
    exportToExcel(data, fileName);
  };

  // SCROLL HANDLER
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div className="w-full">
        {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} />}
        <div className="w-full">
          {/* 1ST SECTION START - PAGE NAME */}
          <section className="w-full text-2xl flex items-center bg-blue-gray-800 h-[57px] px-4 text-white">
            {!openSidebar && (
              <CiMenuBurger
                onClick={() => setOpenSidebar((e: any) => !e)}
                className="mr-6 cursor-pointer"
              />
            )}

            <h1 className="font-bold line-clamp-1">Event Details</h1>
          </section>
          {/* 1ST SECTION END - PAGE NAME */}
          {/* 2ND SECTION START */}
          <section className="w-full p-2 bg-gray-100 text-blue-gray-900">
            <p className="line-clamp-2 font-semibold">
              Title :<span className="underline">{data?.eventTitle}</span>
            </p>
          </section>
          {/* 2ND SECTION END */}

          {/* 3RD SECTION START */}
          <section className="p-2 text-blue-gray-900 md:p-8 grid gap-2 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            <CardComponent title="TOTAL" value={data?.total} type="currency" />
            <CardComponent
              title="TOTAL NUMBER OF REGISTERED"
              value={data?.numberOfRegistered}
              type="asd"
            />
            <CardComponent
              title="REGISTERED - FACE TO FACE"
              value={data?.numberOfRegisteredFaceToFace}
              type="asd"
            />
            <CardComponent
              title="REGISTERED - VIRTUAL"
              value={data?.numberOfRegisteredVirtual}
              type="asd"
            />
            <div className="p-8 bg-blue-gray-50">
              <h1 className="text-xl font-bold mb-2">SHORTCUTS</h1>
              <ul className="list-disc list-inside space-y-2 cursor-pointer">
                <li
                  onClick={() => scrollToSection(section5Ref)}
                  className="mb-2"
                >
                  List of Registered
                </li>
                <li
                  onClick={() => scrollToSection(section6Ref)}
                  className="mb-2"
                >
                  List of Sponsors
                </li>
              </ul>
            </div>
          </section>
          {/* 3RD SECTION END */}

          {/* 4TH SECTION START */}
          <section className="w-[95%] ml-[50%] translate-x-[-50%] mb-8 md:w-[70%]">
            <h1 className="text-2xl font-bold text-blue-gray-900 text-center mb-2">
              Registration Trend
            </h1>
            <Line className="w-full" data={graphData} options={options} />
          </section>
          {/* 4TH SECTION END */}

          {/* 5TH SECTION START - REGISTERED LIST */}
          <section ref={section5Ref} className="w-full  p-2 md:p-8">
            <div className="mb-2 md:flex md:items-center md:justify-between ">
              <h1 className="text-2xl font-bold mb-2 md:mb-0">
                List of Registered Users
              </h1>
              <button
                onClick={() =>
                  handleExportExcel(data?.excel, 'Registered Users')
                }
                className="p-3 bg-blue-gray-800 text-white rounded"
              >
                DOWNLOAD EXCEL FILE
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] table-auto border-collapse border border-gray-200">
                <thead className="bg-blue-gray-800 text-white">
                  <tr>
                    <th className="p-3 text-left border border-slate-600 ">
                      #
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Email
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Name
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Reg Type
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Date
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Mode of Payment
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Amount
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.listOfRegistered?.map((data: any, i: any) => {
                    return (
                      <ListOfRegisteredTableRowComponents
                        key={i}
                        data={data}
                        index={i}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          {/* 5TH SECTION END - REGISTERED LIST */}

          {/* 6TH SECTION START - SPONSORS LIST */}
          <section ref={section6Ref} className="w-full  p-2 md:p-8">
            <h1 className="text-2xl font-bold mb-2">List of Sponsors</h1>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] table-auto border-collapse border border-gray-200">
                <thead className="bg-blue-gray-800 text-white">
                  <tr>
                    <th className="p-3 text-left border border-slate-600">
                      Booth Name
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Booth Type
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Booth Price
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Booth Status
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorsBoothData?.map((data: any, i: any) => {
                    return (
                      <ListOfSponsorsTableRowComponent
                        key={i}
                        data={data}
                        eventId={eventId}
                        setRefresher={setRefresher}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          {/* 6TH SECTION END - SPONSORS LIST */}
        </div>
      </div>
    </>
  );
};

export default ViewEvent;
