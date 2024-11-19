import { useEffect, useState } from 'react';
import AuthorSidebar from '../../components/Author/AuthorSidebar';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useLocation } from 'react-router-dom';
import toas from '../../utils/toas';

// COMPONENTS

const GoEventCash = () => {
  const [openSidebar, setOpenSide] = useState(true);
  const token = useAppSelector((state) => state.user.token);
  const [uid, setUid] = useState('');
  const [price, setPrice] = useState('');

  const regTypeFinal = price.split('/')[0];
  const priceFinal = price.split('/')[1];

  const [idValid, setIdValid] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get('id') || '';

  const { data: eventData, isLoading } = useQuery({
    queryKey: ['gocash'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-event-qr-scan?id=${eventId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <div className="w-[100px] h-[100px] ml-[50%] translate-x-[-50%] mt-[30px]">
          <CgSpinnerTwoAlt className="w-[auto] h-100 text-indigo-900 animate-spin" />
        </div>
      );
    }
  };

  console.log(eventData);

  const PHP = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

  const checkIfRegisteredFunction = async () => {
    if (!uid) {
      return toas('Please enter user id.', 'error');
    }
    const user = eventData?.registered.find((u: any) => {
      return u?.qr_code === uid;
    });

    try {
      await axios({
        method: 'post',
        url: '/users/user-exist',
        data: { userId: uid },
      });
    } catch (err) {
      return toas('User id is invalid or not yet registered.', 'error');
    }

    if (user) {
      return toas('User id is already registered on this event.', 'error');
    }

    setIdValid(true);
  };

  console.log({
    regTypeFinal,
    priceFinal,
    eventID: eventData?._id,
    eventType: eventData?.type,
    authorId: eventData?.author_id,
    userId: uid,
  });

  const registerFunction = async () => {
    // if (!price) {
    //   return toas('Please choose registration', 'error');
    // }

    try {
      await axios({
        method: 'put',
        url: '/payment/cash-payment',
        data: {
          authorId: eventData?.author_id,
          productId: eventData?._id,
          productType: eventData?.type,
          regType: regTypeFinal,
          buyerId: uid,
          priceFinal,
        },
      });
      toas('Successfully registered.', 'success');
      window.location.reload();
    } catch (err) {
      toas('Something went wrong, please try again.', 'error');
      window.location.reload();
    }
  };
  return (
    <>
      <div className="flex">
        <AuthorSidebar
          page="event/event-cash-payment-list"
          openSidebar={openSidebar}
          setOpenSide={setOpenSide}
        />
        <div className={`grow bg-gray-50 `}>
          <div className="bg-indigo-900 p-[5px] w-100 sticky top-0 left-0">
            <p className="text-white text-center">Author dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px]">
            {openSidebar ? (
              <div className="tablet:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(true)}
                className="transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            {!openSidebar ? (
              <div className="mobileMin:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(false)}
                className="tabletMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            <p className="mr-[10px]">Choose event cash payment.</p>
          </div>

          {/* MAIN BODY */}
          <div className="w-100">
            {/* TITLE */}
            <p className="text-center text-blue-800 font-semibold text-lg">
              {eventData?.title}
            </p>

            <div className="w-[60%] p-[10px] laptop:w-[80%] mobile:w-[95%] ml-[50%] translate-x-[-50%]">
              {idValid ? (
                <p className="text-center">{uid}</p>
              ) : (
                <>
                  <p className="font-semibold">User id</p>
                  <input
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="Enter user id"
                    type="text"
                    className="w-100 p-[10px] rounded shadow border border-gray-300 mb-[10px]"
                  />
                  <button
                    onClick={checkIfRegisteredFunction}
                    className="w-100 p-[10px] bg-blue-800 text-white rounded"
                  >
                    CHECK IF REGISTERED
                  </button>
                </>
              )}

              {idValid && (
                <div className="w-100">
                  <select
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-100 border p-[10px] border-gray-400 rounded"
                    name=""
                    id=""
                  >
                    <option value="">Choose registration</option>

                    {eventData?.prices?.map((priceData: any, i: any) => {
                      return (
                        <option
                          key={i}
                          value={`${priceData?.priceType}/${priceData?.price}`}
                        >
                          {priceData?.priceName} -{' '}
                          {PHP.format(priceData?.price)}
                        </option>
                      );
                    })}
                  </select>
                  {/* regType={regTypeFinal}
                    price={priceFinal}
                    productId={eventData?._id}
                    productType={eventData?.type}
                    title={eventData?.title}
                    authorId={eventData?.author_id}
                    userId={uid} */}
                  <button
                    onClick={registerFunction}
                    className="w-100 p-[10px] bg-indigo-800 text-white rounded mt-[10px]"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            <Loading />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoEventCash;
