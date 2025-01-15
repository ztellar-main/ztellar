import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../state/store';
import toas from '../utils/toas';


function formatToPeso(number: any) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(number);
}

// complete payment
type CompletePaymentComponentProps = {
  name: any;
  setName: any;
  email: any;
  setEmail: any;
  contact: any;
  setContact: any;
  selectedOption: any;
  token: any;
  paymentIntentId: any;
  clientKey: any;
};
const CompletePaymentComponent = ({
  name,
  setName,
  email,
  setEmail,
  contact,
  setContact,
  selectedOption,
  token,
  paymentIntentId,
  clientKey,
}: CompletePaymentComponentProps) => {
  const [loading, setLoading] = useState(false);
  const completeButtonFunction = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: '/paymongo/create-payment-method-for-event',
        data: { name, email, contact, paymentMethod: selectedOption?.value },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      const paymentMethodId = res?.data?.data?.id;
      const res2 = await axios({
        method: 'post',
        url: '/paymongo/attach-payment-intent-for-event',
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

type ChoosePaymentMethodComponentsProps = {
  selectedOption: any;
  setSelectedOption: any;
  title: any;
  authorId: any;
  id: any;
  amount: any;
  registrationType: any;
  token: any;
  setPaymentIntentId: any;
  setClientKey: any;
  setComponentState: any;
  paymentMethod: any;
};

const ChoosePaymentMethodComponents = ({
  selectedOption,
  setSelectedOption,
  title,
  authorId,
  id,
  amount,
  registrationType,
  token,
  setPaymentIntentId,
  setClientKey,
  setComponentState,
  paymentMethod,
}: ChoosePaymentMethodComponentsProps) => {
  const [loading, setLoading] = useState(false);
  const nextFunction = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: '/paymongo/create-payment-intent-for-event',
        data: {
          amount,
          title,
          id,
          authorId,
          registrationType,
          paymentMethod,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      console.log(res);
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

// choose price component

type ChoosePriceComponentProps = {
  prices: any;
  setPriceType: any;
  setAmount: any;
  setComponentState: any;
  priceType: any;
  amount: any;
};
const ChoosePriceComponent = ({
  prices,
  setPriceType,
  setAmount,
  setComponentState,
  priceType,
  amount,
}: ChoosePriceComponentProps) => {
  const nextFunction = () => {
    if (!amount || !priceType) {
      toas('Please choose your registration type first', 'error');
      return;
    }

    setComponentState('choose-payment-method');
  };
  return (
    <div className="">
      <p className="mb-1 text-tcolor">Choose your registration type</p>
      <select
        name=""
        id=""
        className="border border-[#333333] w-[100%] px-4 py-2 mb-4"
        onChange={(e: any) => {
          const priceData = e.target.value;
          const amount = priceData.split('/')[1];
          const priceType = priceData.split('/')[0];
          setPriceType(priceType);
          setAmount(amount);
        }}
      >
        <option className="" value="">
          Choose
        </option>

        {prices?.map((price: any, i: any) => {
          return (
            <option key={i} value={`${price?.priceType}/${price?.price}`}>
              {price?.priceType} - {price?.price}
            </option>
          );
        })}
      </select>

      {/* actions */}
      <div className="w-full grid grid-cols-2 gap-2">
        <button className="bg-[#e9e9e9] border border-gray-400 px-4 py-2 cursor-pointer">
          Cancel
        </button>
        <button
          onClick={nextFunction}
          className="bg-[#007bff] text-white cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const BuyProduct = () => {
  const [price, setPrice] = useState('');
  const token = useAppSelector((e: any) => e.user.token);
  const [selectedOption, setSelectedOption] = useState({
    name: 'GCash',
    value: 'gcash',
  });
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [clientKey, setClientKey] = useState('');
  const query = new URLSearchParams(location.search);
  const id = query.get('id') || '';
  const user = useAppSelector((e: any) => e.user.currentUser);
  const [priceType, setPriceType] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState(`${user?.fname} ${user?.lname}`);
  const [email, setEmail] = useState(`${user?.email}`);
  const [contact, setContact] = useState(`${user?.mobile_number}`);
  const [fee, setFee] = useState('');
  const [transactionFee, setTransactionFee] = useState('');

  // component state
  const [componentState, setComponentState] = useState('regType');

  // transaction function
  useEffect(() => {
    let finalAmount: any;
    let transactionFee: any;
    const numberAmount = Number(amount);

    const ztellarFee = numberAmount * Number(fee);

    console.log(fee);

    if (componentState !== 'complete-payment') return;

    if (selectedOption?.value === 'gcash') {
      const rate = 0.022;
      const f = 1 - rate;
      const subAmount = numberAmount / f;
      finalAmount = Math.ceil(subAmount) + ztellarFee;
      transactionFee = finalAmount - numberAmount;
      setTransactionFee(transactionFee);
      return setPrice(finalAmount);
    }

    if (selectedOption?.value === 'paymaya') {
      const rate = 0.019;
      const f = 1 - rate;
      const subAmount = numberAmount / f;
      finalAmount = Math.ceil(subAmount) + ztellarFee;
      transactionFee = finalAmount - numberAmount;
      setTransactionFee(transactionFee);
      return setPrice(finalAmount);
    }
  }, [amount, selectedOption, componentState, fee]);

  // query event data
  const { data, isLoading } = useQuery({
    queryKey: ['query-event-data-to-buy'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-data-buying-event?id=${id}`,
      });
      setFee(res?.data?.transaction?.value);

      return res?.data;
    },
  });

  if (isLoading) {
    return <div className="">Loading</div>;
  }

  return (
    <div className="h-screen bg-[#f9f9f9]  flex items-center justify-center py-[19px]">
      {/* container */}
      <div className="max-w-[1600px] -100 w-full grid md:grid-cols-2  items-start bg-white border-b-[2px] border-b-[#007bff]">
        {/* left */}
        <div className="p-4 w-full ">
          <h1 className="text-tcolor">Acquire this event</h1>
          <hr className="my-2" />

          <div className="w-full flex justify-center bg-gray-100 mb-1">
            <img
              src={data?.image_url}
              alt=""
              className="w-full  max-w-[500px]"
            />
          </div>

          <h1 className="text-[#333333] text-xl font-bold">{data?.title}</h1>

          <table className="w-full border text-sm tracking-wide">
            <thead>
              <th className="border p-2 text-left tracking-wide">Desciption</th>
              <th className="border p-2 text-right tracking-wide">Amount</th>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-left tracking-wide">
                  Registration
                </td>
                <td className="border p-2 text-right tracking-wide">
                  {formatToPeso(amount)}
                </td>
              </tr>
              <tr>
                <td className="border p-2 text-left tracking-wide">
                  Transaction fee
                </td>
                <td className="border p-2 text-right tracking-wide">
                  {formatToPeso(transactionFee)}
                </td>
              </tr>
              <tr>
                <td className="border p-2 text-left tracking-wide">Total</td>
                <td className="border p-2 text-right tracking-wide">
                  {formatToPeso(price)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* right */}
        <div className="p-4">
          {componentState === 'regType' && (
            <ChoosePriceComponent
              prices={data?.prices}
              setPriceType={setPriceType}
              setAmount={setAmount}
              setComponentState={setComponentState}
              priceType={priceType}
              amount={amount}
            />
          )}
          {componentState === 'choose-payment-method' && (
            <ChoosePaymentMethodComponents
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              title={data?.title}
              authorId={data?.author_id}
              id={id}
              amount={amount}
              registrationType={priceType}
              token={token}
              setPaymentIntentId={setPaymentIntentId}
              setClientKey={setClientKey}
              setComponentState={setComponentState}
              paymentMethod={selectedOption?.value}
            />
          )}

          {componentState === 'complete-payment' && (
            <CompletePaymentComponent
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              contact={contact}
              setContact={setContact}
              selectedOption={selectedOption}
              token={token}
              paymentIntentId={paymentIntentId}
              clientKey={clientKey}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
