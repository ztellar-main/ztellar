import { useQuery } from '@tanstack/react-query';
import QuizComponent from './QuizComponent';
import StartQuizComponent from './StartQuizComponent';
import axios from 'axios';
import { useAppSelector } from '../../../../state/store';
import { useState } from 'react';

type Props = {
  userStates: any;
  courseId: any;
};

const QuizContainer = ({ userStates, courseId }: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const [startQuizRefresher, setStartQuizRefresher] = useState(false);

  const {
    data: quizData,
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ['course-quiz-data', startQuizRefresher, userStates],
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
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  const questionExpiry =
    new Date(quizData?.answerExpiryTime)?.getTime() - new Date().getTime();

  return (
    <>
      {isFetched && (
        <div className="w-full h-[500px] overflow-scroll overflow-x-hidden shadow-lg">
          {quizData?.message === 'no-answer' && (
            <StartQuizComponent
              setStartQuizRefresher={setStartQuizRefresher}
              questionId={userStates?.quizId}
              answersList={quizData?.answersList}
              courseId={courseId}
              userStates={userStates}
            />
          )}

          {quizData?.message === 'answer' && (
            <QuizComponent
              quizData={quizData?.data}
              quizNumber={quizData?.qNumber}
              userStates={userStates}
              questionExpiry={questionExpiry}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </>
  );
};

export default QuizContainer;
