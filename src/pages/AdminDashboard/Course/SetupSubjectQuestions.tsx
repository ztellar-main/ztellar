import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import QuestionContainer from '../../../components/AdminDashboard/Course/SubjectQuestion/QuestionContainer';

const SetupSubjectQuestions = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const [questions, setQuestion] = useState([
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
  ]);
  const [priceId, setPriceId] = useState(2);

  const [questionErrorHandler, setQuestionErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  // ADD PRICE ROW
  const addQuestion = () => {
    setPriceId(priceId + 1);
    const _questions = [...questions];

    const questionIndex = questions.length - 1;

    const questionExist = questions[questionIndex].question;
    const answerExist = questions[questionIndex].answer;

    // const choicesIndex = questions[questionIndex].choices.length - 1;

    // const lastLabel = questions[questionIndex].choices[choicesIndex].label;
    // const lastDesc = questions[questionIndex].choices[choicesIndex].description;

    if (!questionExist || !answerExist) {
      return setQuestionErrorHandler({
        message:
          'Please fill out all the last question first before adding new one',
        status: 'error',
      });
    }

    // if (!lastLabel || !lastDesc) {
    //   return setQuestionErrorHandler({
    //     message:
    //       'Please fill out all the last question first before adding new one',
    //     status: 'error',
    //   });
    // }

    _questions.push({
      id: priceId,
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupSubjectQuestions;
