import { useEffect, useState } from 'react';
import AuthorSidebar from '../../components/Author/AuthorSidebar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { useLocation } from 'react-router-dom';
import ScanId from '../../components/Author/Cash-lane/ScanId';
import ChooseRegType from '../../components/Author/Cash-lane/ChooseRegType';

// COMPONENTS

const GoEventCash = () => {
  const [openSidebar, setOpenSide] = useState(true);
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get('id') || '';

  const [componentState, setComponentState] = useState('scan-id');
  const [qr, setQr] = useState('');
  const [cashValue, setCashValue] = useState('');

  console.log(cashValue);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();
  }, []);

  // query event data
  const { data: eventData, isLoading } = useQuery({
    queryKey: ['query-event-data-for-cash-lane'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-event-data-for-cash-lane?id=${eventId}`,
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

  console.log(eventData?.cash_payment_details);

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

          <div className="p-4">
            <p className="text-center mb-2">{eventData?.title}</p>

            {componentState === 'scan-id' && (
              <ScanId setQr={setQr} setComponentState={setComponentState} />
            )}
            {componentState === 'choose-reg-type' && (
              <ChooseRegType
                qr={qr}
                setComponentState={setComponentState}
                cashDetails={eventData?.cash_payment_details}
                setCashValue={setCashValue}
                eventId={eventId}
                cashValue={cashValue}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoEventCash;
