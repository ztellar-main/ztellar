import { useQuery } from '@tanstack/react-query';
import ChoosePrice from '../../components/CourseAcquired/BuyCourse/ChoosePrice';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { useState } from 'react';
import ChoosePaymentMethod from '../../components/CourseAcquired/BuyCourse/ChoosePaymentMethod';
import CompletePayment from '../../components/CourseAcquired/BuyCourse/CompletePayment';

function formatToPeso(number: any) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(number);
}

const BuyCourse = () => {
  const query = new URLSearchParams(location.search);
  const id = query.get('id') || '';
  const { token } = useAppSelector((state: any) => state?.user);

  const [componentsState, setComponentState] = useState('choose-price');
  const [priceData, setPriceData] = useState('0/0');
  const [selectedOption, setSelectedOption] = useState({
    name: 'GCash',
    value: 'gcash',
  });
  const [fee, setFee] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [clientKey, setClientKey] = useState('');

  console.log({ priceData });

  // query but course credentials
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['get-buy-course-credentials'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-buy-course-credentials?courseId=${id}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setFee(res?.data?.transaction?.value);
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  console.log(courseData);

  return (
    <div>
      <div className="h-screen bg-[#f9f9f9]  flex items-center justify-center">
        {/* container */}
        <div className="max-w-[1600px] -100 w-full grid md:grid-cols-2  items-start bg-white border-b-[2px] border-b-[#007bff]">
          {/* left */}
          <div className="p-4 w-full ">
            <h1 className="text-tcolor">Subscribe to this course</h1>
            <hr className="my-2" />

            <div className="w-full flex justify-center bg-gray-100 mb-1">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/course%2Fcover-photo%2Fasd%20asda%20sda%20sd%20as-7dc072d6-e7d2-4a61-abd2-376e4a2bf367.jpeg?alt=media&token=c28d6c71-a3d9-412a-9882-c6ebf9fc9e78"
                alt=""
                className="w-full  max-w-[500px]"
              />
            </div>

            <h1 className="text-[#333333] text-xl font-bold">Sample title</h1>

            <table className="w-full border text-sm tracking-wide">
              <thead>
                <th className="border p-2 text-left tracking-wide">
                  Desciption
                </th>
                <th className="border p-2 text-right tracking-wide">Amount</th>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-left tracking-wide">
                    Registration
                  </td>
                  <td className="border p-2 text-right tracking-wide">
                    {formatToPeso(Number(priceData.split('/')[1]))}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-left tracking-wide">
                    Transaction fee
                  </td>
                  <td className="border p-2 text-right tracking-wide">
                    {/* {formatToPeso(transactionFee)} */}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 text-left tracking-wide">Total</td>
                  <td className="border p-2 text-right tracking-wide">
                    {/* {formatToPeso(Number(amount) + transactionFee)} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* right */}
          <div className="p-4">
            {componentsState === 'choose-price' && (
              <ChoosePrice
                courseData={courseData}
                setPriceData={setPriceData}
                setComponentState={setComponentState}
                priceData={priceData}
              />
            )}

            {componentsState === 'choose-payment-method' && (
              <ChoosePaymentMethod
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                fee={fee}
                setPaymentIntentId={setPaymentIntentId}
                setClientKey={setClientKey}
                setComponentState={setComponentState}
                priceData={priceData}
                courseId={id}
                courseData={courseData}
              />
            )}

            {componentsState === 'complete-payment' && (
              <CompletePayment
                selectedOption={selectedOption}
                paymentIntentId={paymentIntentId}
                clientKey={clientKey}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourse;
