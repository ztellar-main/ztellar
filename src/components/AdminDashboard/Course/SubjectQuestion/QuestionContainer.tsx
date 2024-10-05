// import { useState } from 'react';
import QuestionOptionCard from './QuestionOptionCard';

type Props = {
  qData: any;
  setQuestion: any;
  questions: any;
  qNumber: any;
};

const QuestionContainer = ({
  qData,
  setQuestion,
  questions,
  qNumber,
}: Props) => {
  // HANDLE PRICE ONCHANGE
  const handlePriceChange = (id: any, e: any) => {
    const index = questions.findIndex((p: any) => p.id === id);
    const _questions = [...questions] as any;
    _questions[index][e.target.name] = e.target.value;

    setQuestion(_questions);
  };

  const deleteQuestionFunction = (qid: any) => {
    let _questions = [...questions];
    _questions = _questions.filter((q) => q.id !== qid);
    setQuestion(_questions);
  };

  return (
    <div>
      <div>
        {/* question container start */}
        <div className="">
          <p className="text-sm font-semibold text-blue-gray-900">
            Question {qNumber}
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
            {qData?.choices?.map((choicesMap: any, i: any) => {
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

          <div className="flex items-center justify-between">
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

            {questions.length !== 1 && (
              <button
                onClick={() => deleteQuestionFunction(qData?.id)}
                className="bg-red-600 text-white p-[10px] rounded"
              >
                Delete
              </button>
            )}
          </div>

          <hr className="border-t border-blue-gray-200 w-[90%] ml-[50%] translate-x-[-50%] my-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
