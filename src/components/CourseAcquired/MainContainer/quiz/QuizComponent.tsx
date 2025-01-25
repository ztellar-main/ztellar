import { useState } from 'react';
import QuestionAnswering from './QuestionAnswering';

type Props = {
  quizData: any;
  userStates: any;
  quizNumber: any;
  setStartQuizRefresher: any;
};

const QuizComponent = ({
  quizData,
  userStates,
  quizNumber,
  setStartQuizRefresher,
}: Props) => {
  const [answer, setAnswer] = useState('');

  return (
    <div className="ml-[50%] translate-x-[-50%] w-[95%] lg:w-[70%] py-4">
      <QuestionAnswering
        quizData={quizData}
        setAnswer={setAnswer}
        answer={answer}
        userStates={userStates}
        quizNumber={quizNumber}
        setStartQuizRefresher={setStartQuizRefresher}
      />

      {/* <div className="flex items-center justify-end">
        <button className="bg-blue-gray-600 text-white px-4 py-2 rounded">
          Proceed Next Question
        </button>
      </div> */}
    </div>
  );
};

export default QuizComponent;
