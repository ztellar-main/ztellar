import axios from 'axios';
import { useAppSelector } from '../../../../state/store';

type Props = {
  setStartQuizRefresher: any;
  questionId: any;
  answersList: any;

};

const StartQuizComponent = ({
  setStartQuizRefresher,
  questionId,
  answersList,

}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const startQuizSubmitFunction = async () => {
    try {
      await axios({
        method: 'post',
        url: '/course/take-quiz',
        data: {
          questionId,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setStartQuizRefresher((e: any) => !e);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ml-[50%] translate-x-[-50%] w-[95%] lg:w-[70%] py-4">
      <div className="">
        <h1 className="text-blue-gray-900 font-bold text-center">Important!</h1>
        <p className="text-blue-gray-900 text-sm">
          Make sure to watch the entire course video before beginning the quiz.
          The quiz is time-sensitive, and once you start, you may not be able
          return to it. You will only have one additional attempt to pass after
          completing the quiz, so take your time and answer carefully.
        </p>

        <hr className="border-b border-b-blue-gray-50 my-4" />

        <table className="w-full shadow">
          <thead>
            <tr className="bg-blue-gray-600 text-white text-left">
              <th className="text-xs p-2 tracking-wider">#</th>
              <th className="text-xs p-2 tracking-wider">Score</th>
              <th className="text-xs p-2 tracking-wider">Status</th>
              <th className="text-xs p-2 tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody>
            {answersList?.map((answerData: any, i: any) => {
              console.log(answerData);
              return (
                <tr key={i} className="border">
                  <td className="text-xs p-2 tracking-wider border">{i + 1}</td>
                  <td className="text-xs p-2 tracking-wider border">
                    {answerData?.score}/{answerData?.quiz_length}
                  </td>
                  <td className="text-xs p-2 tracking-wider border text-red-600">
                    {answerData?.passed ? 'passed' : 'failed'}
                  </td>
                  <td className="cursor-pointer text-xs p-2 tracking-wider border">
                    Show Details
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <hr className="border-b border-b-blue-gray-50 my-4" />

        <button
          onClick={startQuizSubmitFunction}
          className="bg-blue-gray-600 px-4 py-2 rounded text-white ml-[50%] translate-x-[-50%] mb-2"
        >
          Take the quiz
        </button>
      </div>
    </div>
  );
};

export default StartQuizComponent;
