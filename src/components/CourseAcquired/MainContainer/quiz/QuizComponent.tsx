import { useEffect, useState } from 'react';
import QuestionAnswering from './QuestionAnswering';
import QuestionExpired from './QuestionExpired';

type Props = {
  quizData: any;
  userStates: any;
  quizNumber: any;
  questionExpiry: any;
  refetch: any;
};

const QuizComponent = ({
  quizData,
  userStates,
  quizNumber,
  questionExpiry,
  refetch,
}: Props) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(questionExpiry);

  useEffect(() => {
    const targetTime = Date.now() + questionExpiry;

    const interval = setInterval(() => {
      const remainingTime = targetTime - Date.now();
      if (remainingTime <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [questionExpiry]);

  return (
    <div className="ml-[50%] translate-x-[-50%] w-[95%] lg:w-[70%] py-4">
      {timeLeft > 0 && (
        <QuestionAnswering
          quizData={quizData}
          setAnswer={setAnswer}
          answer={answer}
          userStates={userStates}
          quizNumber={quizNumber}
          questionExpiry={questionExpiry}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          refetch={refetch}
        />
      )}

      {/* QUESTION EXPIRED */}
      {timeLeft <= 0 && (
        <QuestionExpired
          quizNumber={quizNumber}
          setAnswer={setAnswer}
          userStates={userStates}
          quizData={quizData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default QuizComponent;
