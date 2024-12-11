import { useQuery } from '@tanstack/react-query';
import Navbar from '../../components/Navbar';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useState } from 'react';
import { useAppSelector } from '../../state/store';
import { useNavigate } from 'react-router-dom';

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

const BuyCourse = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [clientKey, setClientKey] = useState('');
  const [costumerInfo, setCostumerInfo] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: 'GCash',
    value: 'gcash',
  });
  const user = useAppSelector((e: any) => e.user.currentUser);
  const id = query.get('id') || '';

  const fullName = `${user?.fname} ${user?.lname}`;

  // costumer information value
  const [name, setName] = useState(fullName);
  const [email, setEmail] = useState(user?.email);
  const [contact, setContact] = useState(user?.mobile_number);

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ['fetch-public-course-data'],
    queryFn: async () => {
      const res: any = await axios({
        method: 'get',
        url: `/course/get-single-course-public?id=${id}&uid=${user?._id}`,
      });

      if (res?.data?.registered === true) {
        navigate(`/view/course?id=${id}`);
        return res?.data;
      }
      return res?.data;
    },
  });

  const Loading = () => {
    if (courseLoading) {
      return (
        <p className="ml-[50%] translate-x-[-50%] mt-[50px] w-[50px] h-[50px]">
          <CgSpinnerTwoAlt className="text-blue-800 animate-spin w-100 h-[100%]" />
        </p>
      );
    }
  };
  const stars = Array(5).fill(0);
  const colors = {
    orange: '#ffcc32',
    gray: 'blue-gray-50',
  };

  // NEXT BUTTON FUNCTION
  const nextButtonFunction = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/paymongo/create-payment-intent',
        data: {
          amount: courseData?.data?.course_price,
          title: courseData?.data?.title,
          id,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setPaymentIntentId(res?.data?.data?.id);
      setClientKey(res?.data?.data?.attributes?.client_key);
      setCostumerInfo(true);
    } catch (err) {
      console.log(err);
    }
  };

  // COMPLETE PAYMENT BUTTON FUNCTION
  const completePaymentButtonFunction = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/paymongo/create-payment-method',
        data: { name, email, contact, paymentMethod: selectedOption?.value },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      const paymentMethodId = res?.data?.data?.id;

      const res2 = await axios({
        method: 'post',
        url: '/paymongo/attach-payment-intent',
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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />
      <Loading />

      <div className={`${courseLoading && 'hidden'}`}>
        {/* MAIN BODY */}
        <div className="w-100 p-[5px] bg-blue-gray-50 text-blue-gray-800 flex justify-end tracking-wider">
          /course/acquire
        </div>

        {/* CONTAINER */}
        <div className=" max-w-[1280px] ml-[50%] translate-x-[-50%] mt-[20px] border border-blue-gray-50 rounded tablet:w-[95%] flex tablet:flex-col">
          {/* LEFT CONTAINER */}
          <div className="w-[50%] tablet:w-100">
            {/* IMAGE */}
            <img
              src="https://th.bing.com/th/id/OIP.mvywMfbQDwB3xo_w52M8uAAAAA?rs=1&pid=ImgDetMain"
              alt=""
              className="w-100"
            />

            <div className="w-100 p-[10px]">
              {/* TITLE */}
              <p className="my-[10px] text-2xl font-bold text-blue-gray-950">
                {courseData?.data?.title}
              </p>
              {/* description */}
              <p className="text-blue-gray-800 text-base">
                {courseData?.data?.description}
              </p>

              <div className="bg-blue-gray-50 p-[10px] laptopMin:rounded mt-[10px] mobile:hidden">
                {/* author */}
                <div className="flex mb-[10px]">
                  <div className="w-[50px] h-[50px] bg-blue-gray-900 rounded-[50%] mr-[10px]">
                    <img
                      src={courseData?.data?.author_id?.avatar}
                      alt="profile picture"
                      className="w-100 h-[100%] rounded-[50%] object-cover border-[2px] border-blue-800"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-blue-gray-950 mb-[2px]">
                      {courseData?.data?.author_id?.fname}{' '}
                      {courseData?.data?.author_id?.lname}
                    </p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>
                {/* rating */}
                <div className="flex items-center mb-[10px]">
                  <p className="text-lg mr-[5px] text-blue-gray-800">
                    {courseData?.data?.average_rating}
                  </p>
                  <div className="flex">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          size="15"
                          style={{
                            marginRight: '10',
                            cursor: 'pointer',
                          }}
                          color={1 > index ? colors.orange : colors.gray}
                        />
                      );
                    })}
                  </div>
                  <p className="text-lg mr-[5px] text-blue-gray-800 tracking-wider">
                    (100 ratings)
                  </p>
                </div>
              </div>

              {/* HR */}
              <hr className="m-[20px]" />

              {/* PRICE */}
              <p className="my-[10px] text-2xl font-bold text-blue-800">
                Total Payment: P{courseData?.data?.course_price}
              </p>
            </div>
          </div>
          {/* LEFT CONTAINER END */}

          {/* RIGHT CONTAINER START */}
          <div
            className={`w-[50%] p-[10px] tablet:w-100 ${
              costumerInfo && 'hidden'
            }`}
          >
            <p className="mb-[10px] ">Choose your payment method</p>
            {/* CARD */}
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

            {/* button container */}
            <div className="w-100 flex items-center justify-between">
              <button className="w-[48%] p-[10px] bg-blue-gray-50 rounded">
                Cancel
              </button>
              <button
                onClick={nextButtonFunction}
                className="w-[48%] p-[10px] bg-blue-800 rounded text-white"
              >
                Next
              </button>
            </div>
          </div>

          {/* costumer information */}
          <div
            className={`w-[50%] p-[10px] tablet:w-100 ${
              !costumerInfo && 'hidden'
            }`}
          >
            <p className="mb-[10px] text-blue-gray-900">
              Payment Method - {selectedOption?.name}
            </p>

            {/* HR */}
            <hr className="m-[20px]" />

            <p className="text-lg tracking-wider text-blue-gray-900 font-semibold">
              Costumer Information
            </p>

            {/* NAME INPUT */}
            <div>
              <p className="mt-[10px] text-xs font-semibold text-blue-gray-700">
                Name
              </p>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-100 p-[10px] border border-blue-gray-300 rounded"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* EMAIL INPUT */}
            <div>
              <p className="mt-[10px] text-xs font-semibold text-blue-gray-700">
                Email
              </p>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-100 p-[10px] border border-blue-gray-300 rounded"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* CONTACT INPUT */}
            <div>
              <p className="mt-[10px] text-xs font-semibold text-blue-gray-700">
                Contact #
              </p>
              <input
                type="text"
                placeholder="Enter your contact number"
                className="w-100 p-[10px] border border-blue-gray-300 rounded"
                onChange={(e: any) => setContact(e.target.value)}
                value={contact}
              />
            </div>

            {/* button container */}
            <div className="w-100 flex items-center justify-between mt-[15px] mb-[20px]">
              <button className="w-[48%] p-[10px] bg-blue-gray-50 rounded">
                Back
              </button>
              <button
                onClick={completePaymentButtonFunction}
                className="w-[48%] p-[10px] bg-blue-800 rounded text-white"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourse;
