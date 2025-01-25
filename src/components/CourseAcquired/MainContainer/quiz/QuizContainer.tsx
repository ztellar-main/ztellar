import { useQuery } from '@tanstack/react-query';
import QuizComponent from './QuizComponent';
import StartQuizComponent from './StartQuizComponent';
import axios from 'axios';
import { useAppSelector } from '../../../../state/store';
import { useState } from 'react';

type Props = {
  userStates: any;
};

const QuizContainer = ({ userStates }: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const [startQuizRefresher, setStartQuizRefresher] = useState(false);

  const { data: quizData, isLoading } = useQuery({
    queryKey: ['course-quiz-data', startQuizRefresher],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-course-quiz-answer?questionId=${userStates?.quizId}`,
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

  return (
    <div className="w-full h-[500px] overflow-scroll overflow-x-hidden">
      {quizData?.message === 'no-answer' && (
        <StartQuizComponent
          setStartQuizRefresher={setStartQuizRefresher}
          questionId={userStates?.quizId}
          answersList={quizData?.answersList}
        />
      )}

      {quizData?.message === 'answer' && (
        <QuizComponent
          quizData={quizData?.data}
          quizNumber={quizData?.qNumber}
          userStates={userStates}
          setStartQuizRefresher={setStartQuizRefresher}
        />
      )}
    </div>
  );
};

export default QuizContainer;
