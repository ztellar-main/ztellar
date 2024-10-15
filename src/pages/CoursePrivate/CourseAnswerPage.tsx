import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { useNavigate } from 'react-router-dom';

const CourseAnswerPage = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const answerId = query.get('id') || '';
  const navigate = useNavigate();

  const { data: answerData, isLoading } = useQuery({
    queryKey: ['finished-answer-data'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-single-finished-answer?id=${answerId}`,
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

  const courseTitle = answerData?.course_id?.title;
  const subjectTitle = answerData?.subject_id?.title;
  const courseId = answerData?.course_id?._id;


  return (
    <div>
      {/* HEADER */}
      <div className="bg-blue-gray-50 p-[10px] flex justify-end text-blue-gray-800">
        Answer Page
      </div>

      <div className="p-[5px] w-100 flex justify-end">
        <button
          onClick={() => navigate(`/acquired/course?id=${courseId}`)}
          className="p-[10px] bg-blue-gray-800 text-white rounded px-[20px]"
        >
          Back
        </button>
      </div>

      {/* Course title */}
      <p className="text-center text-xl my-[10px] font-semibold text-blue-gray-900">
        {courseTitle}
      </p>
      {/* SUBJECT TITLE */}
      <p className="text-center text-base my-[10px] font-semibold text-blue-gray-900">
        {subjectTitle}
      </p>

      {/* QUESTION CARD */}
      {answerData?.answers?.map((answerMap: any, i: any) => {
        return (
          <div
            key={i}
            className="w-[80%] ml-[50%] translate-x-[-50%] text-blue-gray-800 mb-[40px]"
          >
            {/* CORRECT true/false */}
            <p
              className={`${
                answerMap?.correct ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {answerMap?.correct ? 'Correct' : 'Wrong'}
            </p>
            <div className="mb-[10px]">
              {i + 1}. {answerMap?.question}
            </div>
            {/* OPTIONS CARD */}
            {answerMap?.choices?.map((choicesMap: any, i: any) => {
              return (
                <div
                  key={i}
                  className={`w-[90%] ml-[50%] translate-x-[-50%] mb-[10px] ${
                    answerMap?.correct_answer === choicesMap?.label &&
                    'text-green-800'
                  }`}
                >
                  {choicesMap?.label}. {choicesMap?.description}
                </div>
              );
            })}
            <p className="font-semibold">Your Answer: {answerMap?.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CourseAnswerPage;
