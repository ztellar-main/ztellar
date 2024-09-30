// import { useState } from 'react';
import QuestionOptionCard from './QuestionOptionCard';

type Props = {
  qData: any;
  setQuestion: any;
  questions: any;
};

const QuestionContainer = ({ qData, setQuestion, questions }: Props) => {
  // ERROR HANDLER
  // const [choiceErrorHandler, setChoiceErrorHandler] = useState({
  //   message: '',
  //   status: 'start',
  // });

  console.log(questions);

  // HANDLE PRICE ONCHANGE
  const handlePriceChange = (id: any, e: any) => {
    const index = questions.findIndex((p: any) => p.id === id);
    const _questions = [...questions] as any;
    _questions[index][e.target.name] = e.target.value;

    setQuestion(_questions);
  };

  //   add choice
  // const addChoiceFunction = (id: any, i: any) => {
  //   const index = questions.findIndex((p: any) => p.id === id);
  //   const _questions = [...questions] as any;

  //   const choiceIndex = i - 1;

  //   const choicesLength = questions[index].choices.length - 1;

  //   const label = questions[index].choices[choicesLength].label;
  //   const desc = questions[index].choices[choicesLength].description;

  //   if (!label || !desc) {
  //     return setChoiceErrorHandler({
  //       message: 'Fill up all the fields of the last Choice input first',
  //       status: 'error',
  //     });
  //   }

  //   const choices = [..._questions[index].choices];

  //   choices.push({
  //     choiceId: i,
  //     label: '',
  //     description: '',
  //   });

  //   _questions[index] = { ..._questions[index], choices };

  //   setQuestion(_questions);
  // };

  return (
    <div>
      <div>
        {/* question container start */}
        <div className="">
          <p className="text-sm font-semibold text-blue-gray-900">
            Question {qData?.id}
          </p>
          <input
            type="text"
            placeholder="Enter question"
            value={qData?.question}
            name="question"
            className="w-100 border border-blue-gray-400 p-[10px] rounded"
            onChange={(e) => handlePriceChange(qData?.id, e)}
          />
          {/* choices container */}
          <div className="mt-[10px]">
            {questions?.choices?.map((choicesMap: any, i: any) => {
              return (
                <QuestionOptionCard
                  key={i}
                  choicesMap={choicesMap}
                  setQuestion={setQuestion}
                  questions={questions}
                  qData={qData}
                />
              );
            })}
          </div>

          {/* ANSWER */}
          <div className="w-[70px] mb-[10px] mt-[10px]">
            <p className="text-sm font-semibold text-blue-gray-900">Answer</p>
            <input
              type="text"
              className="w-100 border border-blue-gray-400 p-[10px] rounded"
              name="answer"
              value={qData?.answer}
              onChange={(e) => handlePriceChange(qData?.id, e)}
            />
          </div>

          <hr className="border-t border-blue-gray-200 w-[90%] ml-[50%] translate-x-[-50%] my-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
