import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import VideoCard from './VideoCard';
import { useState } from 'react';
import Quizcard from './Quizcard';

type Props = {
  subjectData: any;
  userStates: any;
  setUserStates: any;
};

const SubjectCard = ({ subjectData, userStates, setUserStates }: Props) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowVideo((e: any) => !e)}
        className="h-[72px] w-full  flex justify-between items-center px-2 cursor-pointer bg-gray-50"
      >
        <div className="line-clamp-2  font-semibold text-blue-gray-900">
          Subject 1: {subjectData?.data?.title}
        </div>

        <MdOutlineKeyboardArrowDown
          className={`w-[20px] h-[20px] items-start ${
            showVideo && 'rotate-180'
          } transition-all`}
        />
      </div>
      {/* video card */}

      <div className="border-b border-b-blue-gray-100">
        {showVideo && (
          <>
            {subjectData?.videos?.map((videoData: any, i: any) => {
              return (
                <VideoCard
                  key={i}
                  videoData={videoData}
                  subjectId={subjectData?._id}
                  userStates={userStates}
                  setUserStates={setUserStates}
                  subjectTitle={subjectData?.data?.title}
                />
              );
            })}
            <Quizcard
              questionId={subjectData?.questions}
              subjectId={subjectData?._id}
              setUserStates={setUserStates}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SubjectCard;
