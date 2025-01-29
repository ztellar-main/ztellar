import { useState } from 'react';
import Header from '../../components/CourseAcquired/MainContainer/Header';
import VideoContainer from '../../components/CourseAcquired/MainContainer/VideoContainer';
import QuizContainer from '../../components/CourseAcquired/MainContainer/quiz/QuizContainer';
import Sidebar from '../../components/CourseAcquired/Sidebar/Sidebar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';

// Main component
const AcquiredCourse = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  const id = query.get('id') || '';
  const { token } = useAppSelector((state: any) => state?.user);

  // course states
  const [userStates, setUserStates] = useState({
    component: '',
    subject: {
      subjectId: '',
      subjectTitle: '',
    },
    quizId: '',
    video: {
      videoTitle: '',
      videoUrl: '',
      videoId: '',
    },
  });

  const {
    data: courseData,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['get-owned-course-data'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-owned-course?id=${id}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      {isFetched && (
        <div className="h-screen bg-red-100 flex">
          {/* BODY */}
          {showSidebar && (
            <Sidebar
              setShowSidebar={setShowSidebar}
              courseSubject={courseData?.course_subjects}
              userStates={userStates}
              setUserStates={setUserStates}
            />
          )}

          <div className="w-full h-full bg-green-100">
            <Header setShowSidebar={setShowSidebar} />
            {/* video and quiz container */}
            <div className=" w-full bg-white">
              {userStates?.component === 'video' && (
                <VideoContainer userStates={userStates} />
              )}

              {userStates?.component === 'quiz' && (
                <QuizContainer userStates={userStates} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AcquiredCourse;
