// COMPONENTS
import Sidebar from '../../components/AuthorDashboard/Sidebar';

// ICONS
import { CiMenuBurger } from 'react-icons/ci';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../state/store';
import { useNavigate } from 'react-router-dom';

// CARD PROPS COMPONENT
type CardProps = {
  title: string;
  value: number;
};
function formatToPeso(number: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(number);
}
const Card = ({ title, value }: CardProps) => {
  return (
    <div className="bg-blue-gray-50 rounded p-4 text-blue-gray-800">
      {/* TITLE */}
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <h1 className="text-4xl font-bold">{formatToPeso(value)}</h1>
    </div>
  );
};

const AuthorDashboardNew = () => {
  const token = useAppSelector((e: any) => e?.user?.token);
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  // QUERY DATA
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['get-all-author-dashboard-data'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-author-dashboard`,
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

  if (isError) {
    if (error instanceof AxiosError) {
      const err = error?.response?.data?.message || error?.message;
      if (err === 'Not Authorized') {
        return <p className="">PAGE NOT FOUND</p>;
      }
    }
  }

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

            <h1 className="font-bold">Dashboard</h1>
          </section>
          {/* 1ST SECTION END - PAGE NAME */}

          {/* 2ND SECTION START - CARDS */}
          <section className="p-8 w-full grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card title="Current Balance" value={data?.currentBalance} />
          </section>
          {/* 2ND SECTION END - CARDS */}

          {/* 3RD SECTION START - LIST OF ACTIVE EVENTS */}
          <section className="w-full p-4 md:p-8 text-blue-gray-900">
            <h1 className="text-2xl font-semibold mb-4">
              List of Active Events
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] table-auto border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="p-3 text-left border border-slate-600">#</th>
                    <th className="p-3 text-left border border-slate-600">
                      Event Name
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Number of Registered
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Total Sale
                    </th>
                    <th className="p-3 text-left border border-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.events?.map((data: any, i: any) => {
                    const totalAuthorPayment = data?.registered?.reduce(
                      (sum: any, registration: any) =>
                        sum + (registration.author_payment || 0),
                      0
                    );
                    return (
                      <tr key={i}>
                        <td className="p-3 text-left border border-slate-600">
                          {i + 1}
                        </td>
                        <td className="p-3 text-left border border-slate-600">
                          {data?.title}
                        </td>
                        <td className="p-3 text-left border border-slate-600">
                          {data?.registered?.length}
                        </td>
                        <td className="p-3 text-left border border-slate-600">
                          {formatToPeso(totalAuthorPayment)}
                        </td>
                        <td className="p-3 text-left border border-slate-600">
                          <button
                            onClick={() =>
                              navigate(`/author-new/view-event?id=${data?._id}`)
                            }
                            className=""
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
          </section>
          {/* 3RD SECTION END - LIST OF ACTIVE EVENTS */}
        </div>
      </div>
    </>
  );
};

export default AuthorDashboardNew;
