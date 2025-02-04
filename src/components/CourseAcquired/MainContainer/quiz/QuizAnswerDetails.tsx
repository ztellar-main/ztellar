import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../../state/store';

type Props = {
  answerId: any;
  setShowAnswerDetails: any;
};

const QuizAnswerDetails = ({ answerId, setShowAnswerDetails }: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);

  const { data, isLoading } = useQuery({
    queryKey: ['get-answer-details', answerId],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-answer-data?id=${answerId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  console.log(data);
  return (
    <div className="fixed w-full min-h-[500px] z-20 bg-white left-0 top-0 p-2 text-sm text-blue-gray-800">
      {/* close */}
      <div className="flex justify-end items-center mb-4">
        <IoCloseOutline
          onClick={() => setShowAnswerDetails((e: any) => !e)}
          className="w-8 h-8"
        />
      </div>

      <h1 className="text-lg mb-2 font-semibold">Subject Title</h1>

      <h1 className="text-lg mb-2">
        Score:{' '}
        <span className="font-semibold">
          {data?.score}/{data?.quiz_length}
        </span>
      </h1>
      <h1 className={`text-lg `}>
        Status:{' '}
        <span
          className={`${
            data?.passed ? 'text-blue-600' : 'text-red-600'
          } font-semibold`}
        >
          {data?.passed ? 'Passed' : 'Failed'}
        </span>
      </h1>

      <hr className="my-4 border-b border-b-blue-gray-200" />

      {data?.answers?.map((data: any, i: any) => {
        return (
          <div key={i} className="p-4">
            <p className="text-sm">1. {data?.question}</p>
            <div className="p-4">
              {data?.choices?.map((choice: any, i: any) => {
                return (
                  <p key={i} className={`text-sm mb-2`}>
                    {choice?.label}. {choice?.description}
                  </p>
                );
              })}

              {/* Correct answer */}
              <p className="mb-2">
                Correct answer:{' '}
                <span className="font-semibold"> {data?.correct_answer}</span>
              </p>
              <p className="mb-2">
                Your answer:{' '}
                <span className="font-semibold">
                  {data?.answer === 'x' ? 'question-expired' : data?.answer}
                </span>
              </p>
              <p>
                Check:{' '}
                <span
                  className={`${
                    data?.correct ? 'text-green-600' : 'text-red-600'
                  } font-semibold`}
                >
                  {data?.correct ? 'Correct' : 'Wrong'}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizAnswerDetails;
