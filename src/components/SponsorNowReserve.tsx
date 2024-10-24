import { IoCloseOutline } from 'react-icons/io5';
import toas from '../utils/toas';
import axios from 'axios';
import { useAppSelector } from '../state/store';

type Props = {
  eventTitle: String;
  fileUrl: string;
  setOpenForm: any;
  productId: string;
  setRefresh: any;
  bootData: any;
  mainBootId: any;
};

const SponsorNowReserve = ({
  eventTitle,
  fileUrl,
  setOpenForm,
  productId,
  setRefresh,
  bootData,
  mainBootId,
}: Props) => {
  const user = useAppSelector((e) => e.user.currentUser);
  const senderEmail = user?.email;

  console.log(bootData);

  const submitButtonFunction = async () => {
    try {
      await axios({
        method: 'put',
        url: 'users/sponsor-reserve',
        data: {
          productId,
          senderEmail,
          eventTitle,
          bootData,
          mainBootId,
        },
      });
      window.location.href = fileUrl;
      toas('Successfully reserved', 'success');
      setRefresh((data: any) => !data);
      setOpenForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-white border border-gray-200 shadow-lg rounded p-[20px]">
      <div
        onClick={() => setOpenForm(false)}
        className="w-100 flex justify-end cursor-pointer"
      >
        <IoCloseOutline className="w-[30px] h-[30px]" />
      </div>

      <p className="text-center my-[10px]">Title of event</p>
      <p className="text-center my-[10px] text-2xl font-semibold text-blue-600">
        {eventTitle}
      </p>

      <p className="text-center font-semibold text-blue-600 text-lg">
        Boot number: {bootData?.boot_name}
      </p>

      <div
        className={`${bootData?.boot_type_color} text-blue-gray-900 rounded p-[10px] w-[200px] text-center ml-[50%] translate-x-[-50%] mt-[10px]`}
      >
        {' '}
        {bootData?.boot_type}
      </div>

      <p className="text-center font-semibold mt-[20px] mb-[5px]">
        Important Reminder:
      </p>

      <p className="w-[70%] ml-[50%] translate-x-[-50%] indent-10">
        Please download the sponsorship contract by clicking the "Download"
        button below. Fill in the required information, sign the contract, and
        send it back to us within 2 weeks or before the {eventTitle}, scheduled
        for (ENTER DATE). Your prompt response will help us secure your
        participation and ensure a smooth collaboration. Please email the
        completed contract to admin@ztellar.tech. Should you need further
        information, please book an appointment [here] or email us at
        admin@ztellar.tech.
      </p>

      <button
        onClick={() => {
          return submitButtonFunction();
        }}
        className="bg-blue-800 py-[10px] px-[20px] rounded ml-[50%] translate-x-[-50%] text-white cursor-pointer hover:bg-blue-600 mt-[20px]"
      >
        Download
      </button>
    </div>
  );
};

export default SponsorNowReserve;
