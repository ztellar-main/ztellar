import { useQuery } from '@tanstack/react-query';
import Navbar from '../../components/Navbar';
import OwnedCard from '../../components/Owned/OwnedCard';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { Navigate } from 'react-router-dom';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useState } from 'react';
import SubscribeMovieCard from '../../components/Owned/SubscribeMovieCard';

const Owned = () => {
  const token = useAppSelector((e) => e.user.token);
  const [referesher, setRefresher] = useState(false);

  const {
    data: ownedData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['owned-products', referesher],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: '/product/get-owned-products',
        headers: {
          authorization: `Token ${token}`,
        },
      });

      return res?.data;
    },
  });

  if (isError) {
    return <Navigate to="/" />;
  }

  const Loading = () => {
    if (isLoading) {
      return (
        <div className="w-[70px] h-[70px] fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
          <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
        </div>
      );
    }
  };

  return (
    <>
      <div>
        <Navbar />
        {/* MAIN BODY */}
        <p className="w-100 p-[10px] bg-blue-800 text-white text-lg font-semibold shadow mb-2">
          Acquired courses and events
        </p>

        <h1 className="ml-[20px] text-xl text-blue-gray-900">
          Subscribed/Acquired Events and Course
        </h1>
        <div className="grid grid-cols-[repeat(auto-fill,270px)] p-[20px] bg-gray-50 gap-[10px] justify-around">
          {ownedData?.products?.product_owned?.map((data: any, i: any) => {
            return (
              <OwnedCard setRefresher={setRefresher} key={i} data={data} />
            );
          })}
        </div>

        <h1 className="ml-[20px] text-xl text-blue-gray-900">
          Subscribed Movies
        </h1>

        <div className="grid grid-cols-[repeat(auto-fill,270px)] p-[20px] bg-gray-50 gap-[10px] justify-around">
          {ownedData?.movies?.map((data: any, i: any) => {
            return (
              <SubscribeMovieCard
                key={i}
                setRefresher={setRefresher}
                data={data}
              />
            );
          })}
        </div>

        <Loading />
      </div>
    </>
  );
};

export default Owned;
