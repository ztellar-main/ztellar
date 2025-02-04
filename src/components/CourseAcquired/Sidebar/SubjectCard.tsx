import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import VideoCard from './VideoCard';
import { useEffect, useState } from 'react';
import Quizcard from './Quizcard';

type Props = {
  subjectData: any;
  userStates: any;
  setUserStates: any;
  index: any;
  courseId: any;
  width: any;
  setShowSidebar: any;
};

const SubjectCard = ({
  subjectData,
  userStates,
  setUserStates,
  index,
  courseId,
  width,
  setShowSidebar,
}: Props) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (subjectData?._id === userStates?.subject?.subjectId) {
      setShowVideo(true);
    }
  }, [userStates]);

  return (
    <>
      <div
        onClick={() => setShowVideo((e: any) => !e)}
        className="h-[72px] w-full  flex justify-between items-center px-2 cursor-pointer bg-gray-50"
      >
        <div className="line-clamp-2  font-semibold text-blue-gray-900">
          Subject {index + 1}: {subjectData?.data?.title}
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
                  courseId={courseId}
                  width={width}
                  setShowSidebar={setShowSidebar}
                />
              );
            })}
            {subjectData?.questions && (
              <Quizcard
                questionId={subjectData?.questions}
                subjectId={subjectData?._id}
                setUserStates={setUserStates}
                subjectMainId={subjectData?.data?._id}
                userStates={userStates}
                courseId={courseId}
                width={width}
                setShowSidebar={setShowSidebar}
                subjectTitle={subjectData?.data?.title}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SubjectCard;
