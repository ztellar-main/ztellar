import { MdKeyboardArrowDown } from "react-icons/md";
import FaqAnserCard from "./FaqAnserCard";
import { useState } from "react";
type Props = {
  data: any;
  index: any;
};

const FaqQuestion = ({ data, index }: Props) => {
  const [answerContainerOpen, setAnswerContainerOpen] = useState(false);
  return (
    <>
      <div
        onClick={() =>
          answerContainerOpen
            ? setAnswerContainerOpen(false)
            : setAnswerContainerOpen(true)
        }
        className="w-100 bg-gray-800 p-[20px] text-lg text-white flex items-center justify-between tablet:text-base mobile:text-sm cursor-pointer hover:opacity-[80%] border-b border-white"
      >
        {index + 1}.) {data?.question}
        <MdKeyboardArrowDown className="w-[30px] h-[30px mobile:w-[20px] mobile:h-[20px]" />
      </div>

      {answerContainerOpen && (
        <div className="w-100">
          {data?.answers?.map((answerData: any, i: any) => {
            return <FaqAnserCard key={i} data={answerData} />;
          })}
        </div>
      )}
    </>
  );
};

export default FaqQuestion;
