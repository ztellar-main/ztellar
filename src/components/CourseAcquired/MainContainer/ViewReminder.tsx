import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import toas from '../../../utils/toas';

type Props = {
  reminder: any;
  userStates: any;
  setUserStates: any;
  refetch: any;
};

const ViewReminder = ({
  reminder,
  userStates,
  setUserStates,
  refetch,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const exp = reminder?.exp;
  const date = new Date(exp);

  console.log(date.toISOString().split('T')[0]);

  // handle edit
  const handleEdit = () => {
    setUserStates({ ...userStates, component: 'edit-reminder' });
  };

  // handle delete
  const handleDelete = async () => {
    try {
      const res = await axios({
        method: 'PUT',
        url: '/reminder/delete-reminder',
        data: { reminderId: reminder },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      console.log(res?.data);
      toas('Successfully Deleted', 'success');
      refetch();
    } catch (err) {
      console.log(handleDelete);
    }
  };

  return (
    <div className=" w-full bg-[#FAFBFC] h-[400px] p-4 pt-8 shadow-lg">
      <div className="w-[95%] md:w-1/2   mx-auto shadow-lg rounded-lg p-4">
        <h1 className="text-[#333333] font-semibold text-xl">View Reminder</h1>
        <hr className="border-t-1 border-[#CFD8DC] my-4" />
        <p className="text-[#333333] text-base font-light">
          Time:{' '}
          <span className="font-bold">
            {reminder?.hours}:{reminder?.minutes}
          </span>
        </p>

        <p className="text-[#333333] text-base font-light py-5">
          Days:{' '}
          {reminder?.days?.map((day: any, i: any) => {
            return (
              <span key={i} className="font-bold">
                {day},{' '}
              </span>
            );
          })}
        </p>

        <p className="text-[#333333] text-base font-light">
          This reminder will stop on:{' '}
          <span className="font-bold">{date.toISOString().split('T')[0]}</span>
        </p>

        <hr className="border-t-1 border-[#CFD8DC] my-4" />

        <div className="w-[300px] ml-[50%] translate-x-[-50%] grid grid-cols-2 gap-2 mt-5">
          <button
            onClick={handleEdit}
            className="bg-blue-gray-800 text-white py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className=" text-blue-gray-800 border border-blue-gray-800 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReminder;
