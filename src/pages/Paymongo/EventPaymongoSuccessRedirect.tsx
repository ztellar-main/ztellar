import axios from 'axios';
import { useEffect } from 'react';
import { useAppSelector } from '../../state/store';
import toas from '../../utils/toas';
import { useNavigate } from 'react-router-dom';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const EventPaymongoSuccessRedirect = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const cid = query.get('cid') || '';
  const pid = query.get('pid') || '';

  console.log(cid, pid);

  useEffect(() => {
    const func = async () => {
      try {
        await axios({
          method: 'put',
          url: '/paymongo/retrieve-payment-intent-for-event',
          data: { cid, pid },
          headers: {
            authorization: `Token ${token}`,
          },
        });
        toas('Transaction completed successfully', 'success');
        navigate('/owned');
      } catch (err) {
        toas('The transaction was not completed', 'error');
        navigate('/');
      }
    };

    func();
  }, []);
  return (
    <div>
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
        <p className="text-center text-2xl font-bold text-blue-800">
          Please wait,
        </p>
        <p className="text-center text-2xl font-bold text-blue-800">
          your transaction is being processed
        </p>

        <div className=" w-[70px] h-[70px] ml-[50%] translate-x-[-50%] mt-[20px]">
          <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-blue-800" />
        </div>
      </div>
    </div>
  );
};

export default EventPaymongoSuccessRedirect;
