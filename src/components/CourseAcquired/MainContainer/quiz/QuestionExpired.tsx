import axios from 'axios';
import { useAppSelector } from '../../../../state/store';
import { useState } from 'react';

type Props = {
  quizNumber: any;
  setAnswer: any;
  userStates: any;
  quizData: any;
  refetch: any;
};

const QuestionExpired = ({
  quizNumber,
  setAnswer,
  userStates,
  quizData,
  refetch,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const [loading, setLoading] = useState(false);
  const nextQuestionSubmitButton = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: 'post',
        url: '/course/submit-answer',
        data: {
          questionId: userStates?.quizId,
          quizNumber,
          answer: 'x',
          quizData,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });

      await refetch();
      setLoading(false);
      setAnswer('');

      console.log(res?.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className="mt-5">
      <p className="">
        Question number {quizNumber + 1} has already expired without an answer.
        Please proceed to the next question.
      </p>
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
          {loading ? 'Loading' : 'Proceed Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuestionExpired;
