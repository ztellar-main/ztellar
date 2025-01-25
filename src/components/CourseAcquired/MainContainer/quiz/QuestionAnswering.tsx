import axios from 'axios';
import { useAppSelector } from '../../../../state/store';

type Props = {
  quizData: any;
  setAnswer: any;
  answer: any;
  userStates: any;
  quizNumber: any;
  setStartQuizRefresher: any;
};

const QuestionAnswering = ({
  quizData,
  setAnswer,
  answer,
  userStates,
  quizNumber,
  setStartQuizRefresher,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);

  const nextQuestionSubmitButton = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/course/submit-answer',
        data: { questionId: userStates?.quizId, quizNumber, answer, quizData },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setStartQuizRefresher((e: any) => !e);
      setAnswer('');

      console.log(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="w-full text-center font-semibold text-lg tracking-wider">
        11:11
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
          onClick={nextQuestionSubmitButton}
          className="bg-blue-gray-600 text-white px-4 py-2 rounded"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswering;
