import { useState } from 'react';
import { useAppSelector } from '../../../state/store';
import axios from 'axios';

type Props = {
  selectedOption: any;
  paymentIntentId: any;
  clientKey: any;
};

const CompletePayment = ({
  selectedOption,
  paymentIntentId,
  clientKey,
}: Props) => {
  const { currentUser, token } = useAppSelector((state: any) => state?.user);
  const fullname = `${currentUser?.fname} ${currentUser?.lname}`;
  const [name, setName] = useState(fullname);
  const [contact, setContact] = useState(currentUser?.mobile_number);
  const [email, setEmail] = useState(currentUser?.email);

  const [loading, setLoading] = useState(currentUser?.name);

  const completeButtonFunction = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: '/paymongo/create-payment-method-for-course',
        data: { name, email, contact, paymentMethod: selectedOption?.value },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      const paymentMethodId = res?.data?.data?.id;
      const res2 = await axios({
        method: 'post',
        url: '/paymongo/attach-payment-intent-for-course',
        data: {
          paymentMethodId,
          paymentIntentId: paymentIntentId,
          clientKey: clientKey,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      const url = res2?.data;

      window.location.href = url;
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="">
      <p className="mb-1 text-tcolor">Payment method - Gcash</p>
      <hr className="my-2" />
      <p className="text-tcolor text-lg font-semibold">Costumer Information</p>
      {/* name */}
      <div>
        <p className="mt-[10px] text-xs font-semibold text-blue-gray-700">
          Name
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-100 p-[10px] border border-blue-gray-300 rounded outline-none"
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        />
      </div>
      {/* email */}
      <div>
        <p className="mt-[10px] text-xs font-semibold text-blue-gray-700">
          Email
        </p>
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-100 p-[10px] border border-blue-gray-300 rounded outline-none"
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      {/* contact */}
      <div className="mb-4">
        <p className="mt-[10px] text-xs font-semibold text-blue-gray-700 ">
          Contact
        </p>
        <input
          type="text"
          placeholder="Enter your contact number"
          className="w-100 p-[10px] border border-blue-gray-300 rounded outline-none"
          onChange={(e: any) => setContact(e.target.value)}
          value={contact}
        />
      </div>
      {/* actions */}
      <div className="w-full grid grid-cols-2 gap-2">
        <button className="bg-[#e9e9e9] border border-gray-400 px-4 py-2 cursor-pointer">
          Back
        </button>
        <button
          onClick={completeButtonFunction}
          className="bg-[#007bff] text-white cursor-pointer"
        >
          {loading ? 'loading' : 'Complete Payment'}
        </button>
      </div>
    </div>
  );
};

export default CompletePayment;
