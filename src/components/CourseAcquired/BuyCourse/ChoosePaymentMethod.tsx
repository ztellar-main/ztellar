import axios from 'axios';
import { useState } from 'react';
import { useAppSelector } from '../../../state/store';

// choose payment method
type PaymentMethodCardProps = {
  selectedOption: any;
  setSelectedOption: any;
  option: string;
  name: string;
  logo: string;
  value: string;
};

const PaymentMethodCard = ({
  selectedOption,
  setSelectedOption,
  name,
  logo,
  value,
}: PaymentMethodCardProps) => {
  const handleClick = (option: any) => {
    setSelectedOption(option);
  };
  return (
    <div
      onClick={() => handleClick({ name: name, value: value })}
      className={`flex items-center justify-between border p-[10px] rounded border-blue-gray-100 mb-[10px] cursor-pointer ${
        selectedOption?.name === name ? 'bg-blue-100' : 'hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center">
        {/* Gcash */}
        <input
          name="option"
          value={name}
          checked={selectedOption?.name === name}
          type="radio"
          className="w-[17px] h-[17px]"
        />
        <p className="ml-[10px]">{name}</p>
      </div>

      <div className="w-[50px] h-[50px] object-cover  rounded bg-blue-gray-50">
        <img src={logo} alt="logo" className="w-100 h-[100%] rounded" />
      </div>
    </div>
  );
};

type Props = {
  selectedOption: any;
  setSelectedOption: any;
  fee: any;
  setPaymentIntentId: any;
  setClientKey: any;
  setComponentState: any;
  priceData: any;
  courseId: any;
  courseData: any;
};

const ChoosePaymentMethod = ({
  selectedOption,
  setSelectedOption,
  fee,
  setPaymentIntentId,
  setClientKey,
  setComponentState,
  priceData,
  courseId,
  courseData,
}: Props) => {
  const token = useAppSelector((e: any) => e.user.token);
  const [loading, setLoading] = useState(false);
  const priceAmountNumber = Number(priceData.split('/')[1]);
  const transactionFee = priceAmountNumber * Number(fee);

 

  const nextFunction = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/paymongo/create-payment-intent-for-course',
        data: {
          amount: transactionFee + priceAmountNumber,
          courseId: courseId,
          authorId: courseData?.author_id,
          months: priceData.split('/')[0],
          paymentMethod: selectedOption?.value,
          baseAmount: Number(priceData.split('/')[1]),
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setPaymentIntentId(res?.data?.data?.id);
      setClientKey(res?.data?.data?.attributes?.client_key);
      setComponentState('complete-payment');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="">
      <p className="mb-1 text-tcolor">Choose your payment method</p>
      <PaymentMethodCard
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        option="option 1"
        name="GCash"
        logo="https://logos-download.com/wp-content/uploads/2020/06/GCash_Logo.png"
        value="gcash"
      />

      <PaymentMethodCard
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        option="option 2"
        name="Paymaya"
        value="paymaya"
        logo="https://th.bing.com/th/id/R.0eac97a3fdf5430e026c6f15fdc697f8?rik=3ts%2bAZdTwV6CxQ&riu=http%3a%2f%2fstore.maya.ph%2fcdn%2fshop%2ffiles%2fApp_Store_1x_69c45567-9594-44f0-bc15-3949b9a8596d_1200x1200.png%3fv%3d1651156405&ehk=VrxlBU%2bwnlbtiCAcOIO3XO6lu3QXhJ7VZWnXc%2bLwTUk%3d&risl=&pid=ImgRaw&r=0"
      />
      {/* actions */}
      <div className="w-full grid grid-cols-2 gap-2">
        <button className="bg-[#e9e9e9] border border-gray-400 px-4 py-2 cursor-pointer">
          Back
        </button>
        <button
          onClick={() => {
            if (loading) return;
            nextFunction();
          }}
          className="bg-[#007bff] text-white cursor-pointer"
        >
          {loading ? 'Loading' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ChoosePaymentMethod;
