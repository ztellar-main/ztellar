import { PiExamFill } from 'react-icons/pi';
type Props = {
  questionId: any;
  subjectId: any;
  setUserStates: any;
};

const Quizcard = ({ questionId, subjectId, setUserStates }: Props) => {
  const quizCardOnclickFunction = () => {
    setUserStates({
      quizId: questionId,
      component: 'quiz',
      subjectId,
    });
  };
  return (
    <div
      onClick={quizCardOnclickFunction}
      className="h-[60px] w-full  flex items-center px-2 py-2 cursor-pointer hover:bg-blue-gray-50"
    >
      <PiExamFill className="mr-2 w-[18px] h-[18px] min-w-[18px] min-h-[18px]" />

      <div className="text-sm line-clamp-1 text-blue-gray-900">
        1. asdasdasdasda asd asd asd asdasd
      </div>
    </div>
  );
};

export default Quizcard;
