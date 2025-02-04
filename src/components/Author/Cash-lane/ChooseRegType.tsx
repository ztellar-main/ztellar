import axios, { AxiosError } from 'axios';
import toas from '../../../utils/toas';
import { useAppSelector } from '../../../state/store';

type Props = {
  qr: any;
  setComponentState: any;
  cashDetails: any;
  setCashValue: any;
  eventId: any;
  cashValue: any;
};

const ChooseRegType = ({
  setComponentState,
  cashDetails,
  qr,
  setCashValue,
  eventId,
  cashValue,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  // register function
  const registerFunction = async () => {
    if (!cashValue) return;
    try {
      await axios({
        method: 'put',
        url: '/product/create-event-cash',
        data: { userId: qr, eventId, cashValue },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toas('Successfully registered', 'success');
      setComponentState('scan-id');
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err?.response?.data?.message || err?.message;
        toas(error, 'error');
      }
      setComponentState('scan-id');
    }
  };
  return (
    <div>
      <h1 className="text-center mb-4">Select Registration Type</h1>
      <select
        className="ml-[50%] translate-x-[-50%] px-4 py-2 border w-[500px] mb-4"
        onChange={(e: any) => setCashValue(e.target.value)}
      >
        <option value="">Select Registration Type</option>
        {cashDetails?.map((cash: any, i: any) => {
          return (
            <option key={i} value={`${cash?.cash_type}/${cash?.price}`}>
              {cash?.cash_type} - {cash?.price}
            </option>
          );
        })}
      </select>
      <div className="ml-[50%] translate-x-[-50%] flex gap justify-center items-center gap-4">
        <button
          onClick={() => setComponentState('scan-id')}
          className="bg-blue-gray-400 px-4 py-2 rounded text-white"
        >
          Back
        </button>
        <button
          onClick={registerFunction}
          className="bg-blue-900 px-4 py-2 rounded text-white"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default ChooseRegType;
