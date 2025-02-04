import axios from 'axios';
import { useAppSelector } from '../../../../state/store';
import QuizAnswerRow from './QuizAnswerRow';

type Props = {
  setStartQuizRefresher: any;
  questionId: any;
  answersList: any;
  courseId: any;
  userStates: any;
};

const StartQuizComponent = ({
  setStartQuizRefresher,
  questionId,
  answersList,
  courseId,
  userStates,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const startQuizSubmitFunction = async () => {
    try {
      await axios({
        method: 'post',
        url: '/course/take-quiz',
        data: {
          questionId,
          courseId,
          subjectId: userStates?.subject?.subjectMainId,
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

  const passed = answersList?.find((data: any) => {
    return data?.passed === true;
  });

  return (
    <div className="ml-[50%] translate-x-[-50%] w-[95%] lg:w-[70%] py-4">
      <div className="">
        <h1 className="text-blue-gray-900 font-bold text-center">Important!</h1>
        <p className="text-blue-gray-900 text-sm">
          Make sure to watch the entire course video before beginning the quiz.
          The quiz is time-sensitive, and once you start, you may not be able
          return to it, so take your time and answer carefully.
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
              return (
                <QuizAnswerRow key={i} answerData={answerData} index={i} />
              );
            })}
          </tbody>
        </table>

        <hr className="border-b border-b-blue-gray-50 my-4" />

        {passed && (
          <div className="flex items-center gap-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar%2Ffirework.png?alt=media&token=1c1770fe-057c-4e5f-a9f9-96cab016f10f"
              alt=""
              className="w-8"
            />

            <p className="text-green-600">
              Congratulations! You have passed this subject's quiz.
            </p>
          </div>
        )}

        {!passed && (
          <button
            onClick={startQuizSubmitFunction}
            className="bg-blue-gray-600 px-4 py-2 rounded text-white ml-[50%] translate-x-[-50%] mb-2"
          >
            Take the quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default StartQuizComponent;
