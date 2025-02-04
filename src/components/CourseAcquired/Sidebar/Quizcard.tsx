import axios from 'axios';
import { PiExamFill } from 'react-icons/pi';
import { useAppSelector } from '../../../state/store';
type Props = {
  questionId: any;
  subjectId: any;
  setUserStates: any;
  subjectMainId: any;
  userStates: any;
  courseId: any;
  width: any;
  setShowSidebar: any;
  subjectTitle: any;
};

const Quizcard = ({
  questionId,
  subjectId,
  setUserStates,
  subjectMainId,
  userStates,
  courseId,
  width,
  setShowSidebar,
  subjectTitle,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const quizCardOnclickFunction = async () => {
    setUserStates({
      quizId: questionId,
      component: 'quiz',
      subject: {
        subjectId,
        subjectMainId: subjectMainId,
        subjectTitle: subjectTitle,
      },
    });

    const recentClicked = {
      quizId: questionId || '',
      component: 'quiz' || '',
      subject: {
        subjectId: subjectId || '',
        subjectMainId: subjectMainId || '',
        subjectTitle: subjectTitle || '',
      },
    };

    try {
      await axios({
        method: 'put',
        url: '/course/update-recent-clicked',
        data: { userStates: recentClicked, courseId: courseId },
        headers: {
          authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      console.log('erro');
    }

    if (width < 768) {
      setShowSidebar(false);
    }
  };
  return (
    <div
      onClick={quizCardOnclickFunction}
      className={`h-[60px] w-full  flex items-center px-2 py-2 cursor-pointer hover:bg-blue-gray-50 ${
        questionId === userStates?.quizId && 'bg-blue-gray-100'
      }`}
    >
      <PiExamFill className="mr-2 w-[18px] h-[18px] min-w-[18px] min-h-[18px]" />

      <div className="text-sm line-clamp-1 text-blue-gray-900">1. Quiz</div>
    </div>
  );
};

export default Quizcard;
