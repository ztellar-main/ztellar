type Props = {
  choicesMap: any;
  setQuestion: any;
  questions: any;
  qData: any;
};

const QuestionOptionCard = ({
  choicesMap,
  setQuestion,
  questions,
  qData,
}: Props) => {
  //   choice handle change
  const choiceHandleChange = (qid: any, cid: any, e: any) => {
    const index = questions.findIndex((p: any) => p.id === qid);
    const _questions = [...questions] as any;

    const choices = [..._questions[index].choices];

    const choice = { ...choices[cid] };

    choice[e.target.name] = e.target.value;

    choices[cid] = choice;

    _questions[index] = { ..._questions[index], choices };

    setQuestion(_questions);
  };
  return (
    <div className="">
      <div>
        {/* choice card */}
        <div className="mb-[10px] flex">
          {/* label */}
          <div className="w-[70px] mr-[10px]">
            <p className="text-sm font-semibold text-blue-gray-900">Label</p>
            <input
              type="text"
              className="w-100 border border-blue-gray-400 p-[10px] rounded"
              onChange={(e: any) =>
                choiceHandleChange(qData?.id, choicesMap?.choiceId, e)
              }
              value={choicesMap?.label}
              name="label"
            />
          </div>
          {/* choice description */}
          <div className="w-[70px] grow">
            <p className="text-sm font-semibold text-blue-gray-900">
              Description
            </p>
            <input
              type="text"
              className="w-100 border border-blue-gray-400 p-[10px] rounded"
              onChange={(e: any) =>
                choiceHandleChange(qData?.id, choicesMap?.choiceId, e)
              }
              value={choicesMap?.description}
              name="description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionOptionCard;
