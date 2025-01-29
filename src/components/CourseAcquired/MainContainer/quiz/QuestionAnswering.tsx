import axios from 'axios';
import { useAppSelector } from '../../../../state/store';
import toas from '../../../../utils/toas';
import { useState } from 'react';

type Props = {
  quizData: any;
  setAnswer: any;
  answer: any;
  userStates: any;
  quizNumber: any;
  questionExpiry: any;
  timeLeft: any;
  setTimeLeft: any;
  refetch: any;
};

const QuestionAnswering = ({
  quizData,
  setAnswer,
  answer,
  userStates,
  quizNumber,
  timeLeft,
  refetch,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const [loading, setLoading] = useState(false);

  // Format the time into mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const nextQuestionSubmitButton = async () => {
    if (!answer) {
      return toas(
        'Please choose an answer before proceeding to the next question',
        'error'
      );
    }
    try {
      setLoading(true);
      await axios({
        method: 'post',
        url: '/course/submit-answer',
        data: { questionId: userStates?.quizId, quizNumber, answer, quizData },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      await refetch();
      setLoading(false);
      setAnswer('');
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="w-full text-center font-semibold text-lg tracking-wider">
        {formatTime(timeLeft)}
      </div>
      <hr className="my-4" />
      {/* question */}
      <p className=" text-blue-gray-900 text-sm">
        {quizNumber + 1}. {quizData?.question}
      </p>

      <hr className="my-4" />

      {/* option */}
      {quizData?.choices?.map((choiceData: any, i: any) => {
        return (
          <div key={i} className="flex mb-2">
            <div className="">
              <input
                type="radio"
                value={choiceData?.label}
                name="options"
                className="mr-4 mt-1"
                onClick={(e: any) => setAnswer(e.target.value)}
                checked={answer === choiceData?.label}
              />
            </div>
            <p className="text-blue-gray-900 text-sm">
              <span className="font-bold">{choiceData?.label}.</span>{' '}
              {choiceData?.description}
            </p>
          </div>
        );
      })}

      <div className="flex items-center justify-end">
        <button
          onClick={() => {
            if (loading) {
              return;
            }
            nextQuestionSubmitButton();
          }}
          className="bg-blue-gray-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswering;
