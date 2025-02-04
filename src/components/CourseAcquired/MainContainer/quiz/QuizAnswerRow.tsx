import { useState } from 'react';
import QuizAnswerDetails from './QuizAnswerDetails';

type Props = {
  answerData: any;
  index: any;
};

const QuizAnswerRow = ({ answerData, index }: Props) => {
  const [showAnswerDetails, setShowAnswerDetails] = useState(false);
  return (
    <tr className="border">
      <td className="text-xs p-2 tracking-wider border">{index + 1}</td>
      <td className="text-xs p-2 tracking-wider border">
        {answerData?.score}/{answerData?.quiz_length}
      </td>
      <td className="text-xs p-2 tracking-wider border ">
        {answerData?.passed ? 'passed' : 'failed'}
      </td>
      <td className="cursor-pointer text-xs p-2 tracking-wider border">
        <button onClick={() => setShowAnswerDetails((e: any) => !e)}>
          Show Details
        </button>
        {showAnswerDetails && <QuizAnswerDetails answerId={answerData?._id} setShowAnswerDetails={setShowAnswerDetails} />}
      </td>
    </tr>
  );
};

export default QuizAnswerRow;
