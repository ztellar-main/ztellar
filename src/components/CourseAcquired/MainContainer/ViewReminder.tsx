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
    <div className=" w-full h-[400px] p-4 pt-8 shadow-lg">
      <p className="text-center mb-4">
        Time: {reminder?.hours}:{reminder?.minutes}
      </p>

      <div className="mb-4">
        <p className="text-center mb-2 font-semibold">DAYS</p>
        {reminder?.days?.map((day: any, i: any) => {
          return (
            <p key={i} className="text-center text-sm mb-1">
              {day}
            </p>
          );
        })}
      </div>

      <p className="text-center mb-4 text-sm">
        This reminder will stop on {date.toISOString().split('T')[0]}
      </p>

      <div className="w-[300px] ml-[50%] translate-x-[-50%] grid grid-cols-2 gap-2">
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
  );
};

export default ViewReminder;
