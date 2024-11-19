import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
// import toas from '../utils/toas';
import { useAppSelector } from '../state/store';
import { useNavigate } from 'react-router-dom';
import toas from '../utils/toas';

const SponsorNowEvent = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const productId = query.get('id') || '';
  const navigate = useNavigate();
  const [boothData, setBoothData] = useState([]);
  const [statusState, setStatusState] = useState('All');

  function formatToPeso(number: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(number);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['get-all-event-sponsors-booth', statusState],
    queryFn: async () => {
      const res = await axios({
        method: 'GET',
        url: `/product/get-all-event-booths?status=${statusState}&productId=${productId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setBoothData(res?.data?.booths);
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  const filterStatusFunction = (status: string) => {
    setStatusState(status);
  };

  const status = [
    'All',
    'Available',
    'Pending Reserved',
    'MOA Approved',
    'Pending Down Payment',
    'Pending Payment',
    'Reserved',
    'Acquired',
  ];

  return (
    <>
      <div>
        {/* header */}
        <div className="w-100 bg-blue-800 p-[10px]">
          <p className="text-white text-center">Sponsor this event</p>
        </div>

        {/* title of event */}
        <div className="w-100 p-[10px] bg-gray-50">
          <p className="text-center text-lg font-semibold">{data?.title}</p>
        </div>

        {/* image */}
        <div className="flex justify-center items-center">
          <img
            src={data?.boothImage}
            alt=""
            className="max-h-[500px] w-[auto]"
          />
        </div>

        <h1 className="p-2 text-2xl font-bold">Filter</h1>

        {status?.map((data: any, i: any) => {
          return (
            <button
              key={i}
              onClick={() => filterStatusFunction(data)}
              className={`bg-blue-800 p-3 rounded ml-2 text-white mb-2 ${
                data === statusState && 'opacity-55'
              }`}
            >
              {data}
            </button>
          );
        })}

        {/* list of available boots */}

        <div className="p-3 overflow-x-auto">
          <p className="mb-2">Total: {boothData?.length}</p>
          <table className="border-collapse border border-slate-500 w-full min-w-[670px] ">
            <thead>
              <tr>
                <th className="p-3 text-left border border-slate-600">
                  BOOTH NAME
                </th>
                <th className="p-3 text-left border border-slate-600">
                  BOOTH TYPE
                </th>
                <th className="p-3 text-left border border-slate-600">
                  BOOTH PRICE
                </th>
                <th className="p-3 text-left border border-slate-600">
                  BOOTH STATUS
                </th>
                <th className="p-3 text-left border border-slate-600">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {boothData?.map((data: any, i: any) => {
                return (
                  <tr key={i}>
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
                      <button
                        onClick={() => {
                          if (data?.booth_status === 'Available') {
                            return navigate(
                              `/event/sponsor-this-booth?productId=${productId}&boothId=${data?._id}`
                            );
                          } else {
                            return toas(
                              'This booth is already reserved',
                              'error'
                            );
                          }
                        }}
                        className="p-3 bg-blue-800 rounded text-white"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SponsorNowEvent;
