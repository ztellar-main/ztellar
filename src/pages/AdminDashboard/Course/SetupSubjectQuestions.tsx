import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import QuestionContainer from '../../../components/AdminDashboard/Course/SubjectQuestion/QuestionContainer';
import toas from '../../../utils/toas';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../state/store';

const SetupSubjectQuestions = () => {
  const query = new URLSearchParams(location.search);
  const courseId = query.get('courseId') || '';
  const subjectId = query.get('subjectId') || '';
  const title = query.get('title') || '';
  const navigate = useNavigate();
  const token = useAppSelector((e: any) => e.user.token);

  const initialQuestion = [
    {
      id: 1,
      question: '',
      choices: [
        {
          choiceId: 0,
          label: '',
          description: '',
        },
        {
          choiceId: 1,
          label: '',
          description: '',
        },
        {
          choiceId: 2,
          label: '',
          description: '',
        },
        {
          choiceId: 3,
          label: '',
          description: '',
        },
      ],
      answer: '',
    },
  ];

  const [questions, setQuestion] = useState(initialQuestion);
  console.log(questions);
  const [openSidebar, setopenSidebar] = useState(true);

  // console.log(questions);

  const [questionErrorHandler, setQuestionErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  // ADD PRICE ROW
  const addQuestion = () => {
    const _questions = [...questions];

    const questionIndex = questions.length - 1;

    const questionExist = questions[questionIndex].question;
    const answerExist = questions[questionIndex].answer;

    const firstChoiceLabel = questions[questionIndex].choices[0].label;
    const secondChoiceLabel = questions[questionIndex].choices[1].label;
    const thirdChoiceLabel = questions[questionIndex].choices[2].label;
    const fourthChoiceLabel = questions[questionIndex].choices[3].label;

    const firstChoiceDesc = questions[questionIndex].choices[0].description;
    const secondChoiceDesc = questions[questionIndex].choices[1].description;
    const thirdChoiceDesc = questions[questionIndex].choices[2].description;
    const fourthChoiceDesc = questions[questionIndex].choices[3].description;

    if (
      !questionExist ||
      !answerExist ||
      !firstChoiceLabel ||
      !secondChoiceLabel ||
      !thirdChoiceLabel ||
      !fourthChoiceLabel ||
      !firstChoiceDesc ||
      !secondChoiceDesc ||
      !thirdChoiceDesc ||
      !fourthChoiceDesc
    ) {
      return setQuestionErrorHandler({
        message:
          'Please fill out all the last question first before adding new one',
        status: 'error',
      });
    }

    _questions.push({
      id: questions.length + 1,
      question: '',
      choices: [
        {
          choiceId: 0,
          label: '',
          description: '',
        },
        {
          choiceId: 1,
          label: '',
          description: '',
        },
        {
          choiceId: 2,
          label: '',
          description: '',
        },
        {
          choiceId: 3,
          label: '',
          description: '',
        },
      ],
      answer: '',
    });

    setQuestion(_questions);
  };

  // UPDATE SUBJECT QUESTION FUNCTION
  const saveQuestionFunction = async () => {
    const questionIndex = questions.length - 1;

    const questionExist = questions[questionIndex].question;
    const answerExist = questions[questionIndex].answer;

    const firstChoiceLabel = questions[questionIndex].choices[0].label;
    const secondChoiceLabel = questions[questionIndex].choices[1].label;
    const thirdChoiceLabel = questions[questionIndex].choices[2].label;
    const fourthChoiceLabel = questions[questionIndex].choices[3].label;

    const firstChoiceDesc = questions[questionIndex].choices[0].description;
    const secondChoiceDesc = questions[questionIndex].choices[1].description;
    const thirdChoiceDesc = questions[questionIndex].choices[2].description;
    const fourthChoiceDesc = questions[questionIndex].choices[3].description;

    if (
      !questionExist ||
      !answerExist ||
      !firstChoiceLabel ||
      !secondChoiceLabel ||
      !thirdChoiceLabel ||
      !fourthChoiceLabel ||
      !firstChoiceDesc ||
      !secondChoiceDesc ||
      !thirdChoiceDesc ||
      !fourthChoiceDesc
    ) {
      toas(
        'Please fill up all the fields on the last section of question',
        'error'
      );
      return setQuestionErrorHandler({
        message:
          'Please fill out all the last question first before adding new one',
        status: 'error',
      });
    }

    setQuestionErrorHandler({ message: 'success', status: 'success' });

    try {
      await axios({
        method: 'put',
        url: '/course/save-subject-questionnaire',
        data: { courseId, subjectId, questions },
      });
      toas('Question successfully updated', 'success');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    data: questionData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['question-query-asd-asd'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-subject-questions?courseId=${courseId}&subjectId=${subjectId}`,
      });
      setQuestion((data: any) => {
        return !res?.data ? data : res?.data?.questions;
      });

      console.log(res?.data);

      return res?.data;
    },
  });

  if (isLoading === true) {
    return <p>LOADING</p>;
  }

  if (isError) {
    return <Navigate to={`/admin-dashboard/course/setup?id=${courseId}`} />;
  }

  const updateQuestionFunction = async () => {
    const questionId = questionData?._id;

    try {
      const res = await axios({
        method: 'put',
        url: '/course/update-subject-questions',
        data: { id: questionId, questions },
        headers: {
          authorioztion: `Token ${token}`,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray-50 flex">
        <Sidebar
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="Dashboard"
        />
        <div className="w-100">
          <Header />
          <SubHeader
            setopenSidebar={setopenSidebar}
            openSidebar={openSidebar}
            page="/setup/subject-question"
          />

          {/* MAIN BODY */}
          {/* TITLE */}
          <p className=" text-center font-semibold text-xl py-[10px] ">
            Setup Subject Question
          </p>

          {/* BODY CONTAINER */}
          <div className="w-[80%] ml-[50%] translate-x-[-50%]">
            {questions?.map((qData: any, i: any) => {
              return (
                <QuestionContainer
                  key={i}
                  qData={qData}
                  setQuestion={setQuestion}
                  questions={questions}
                  qNumber={i + 1}
                />
              );
            })}

            {/* ADD QUESTION BUTTON */}
            <p className="mb-[10px]">{questionErrorHandler?.message}</p>
            <button
              onClick={addQuestion}
              className="text-sm font-semibold bg-blue-800 text-white p-[10px] rounded"
            >
              Add Question
            </button>

            <hr className="border-t border-blue-gray-200 w-[90%] ml-[50%] translate-x-[-50%] my-[20px]" />
            {/* SAVE BUTTON */}

            {!questionData?._id ? (
              <button
                onClick={saveQuestionFunction}
                className="text-sm font-semibold bg-blue-800 text-white p-[10px] rounded mb-[20px]"
              >
                Save Questions
              </button>
            ) : (
              <button
                onClick={updateQuestionFunction}
                className="text-sm font-semibold bg-blue-800 text-white p-[10px] rounded mb-[20px]"
              >
                Update Questions
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupSubjectQuestions;
