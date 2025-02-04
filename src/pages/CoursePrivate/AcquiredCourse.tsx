import { useEffect, useState } from 'react';
import Header from '../../components/CourseAcquired/MainContainer/Header';
import VideoContainer from '../../components/CourseAcquired/MainContainer/VideoContainer';
import QuizContainer from '../../components/CourseAcquired/MainContainer/quiz/QuizContainer';
import Sidebar from '../../components/CourseAcquired/Sidebar/Sidebar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import DownloadCertificate from '../../components/CourseAcquired/MainContainer/DownloadCertificate';
import { Navigate } from 'react-router-dom';

// Main component
const AcquiredCourse = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  const id = query.get('id') || '';
  const { token } = useAppSelector((state: any) => state?.user);

  // get width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  // course states
  const [userStates, setUserStates] = useState({
    component: '',
    subject: {
      subjectId: '',
      subjectTitle: '',
      subjectMainId: '',
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
    isError,
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
      setUserStates(res?.data?.recentClicked);
      return res?.data;
    },
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isFetched && (
        <div className="h-screen flex">
          {/* BODY */}
          {showSidebar && (
            <Sidebar
              setShowSidebar={setShowSidebar}
              courseSubject={courseData?.course?.course_subjects}
              userStates={userStates}
              setUserStates={setUserStates}
              courseId={id}
              width={width}
            />
          )}

          <div className="w-full h-full">
            <Header
              setShowSidebar={setShowSidebar}
              courseData={courseData?.course}
            />
            {/* video and quiz container */}
            <div className=" w-full bg-white">
              {userStates?.component === 'video' && (
                <>
                  <VideoContainer userStates={userStates} />
                  <div className="p-2">
                    <h1 className="text-lg text-blue-gray-800">
                      {userStates?.subject?.subjectTitle} :{' '}
                      {userStates?.video?.videoTitle}
                    </h1>
                  </div>
                </>
              )}

              {userStates?.component === 'quiz' && (
                <>
                  <QuizContainer userStates={userStates} courseId={id} />
                  <div className="p-2">
                    <h1 className="text-lg text-blue-gray-800">
                      {userStates?.subject?.subjectTitle} : Quiz
                    </h1>
                  </div>
                </>
              )}

              {userStates?.component === 'quiz-result' && (
                <DownloadCertificate courseId={id} cert={courseData?.cert} />
              )}

              {!userStates?.component && (
                <div className=" h-[calc(100lvh-50px)] flex items-center justify-center">
                  <div className=" flex flex-col ">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/vizcom-6a8e0.appspot.com/o/ztellar%2Fztellar%20logo.svg?alt=media&token=3b281f17-56ad-4128-9b0c-bf4f7ca237bd"
                      className="h-[70px] mb-2"
                      alt=""
                    />
                    <h1 className="text-lg text-blue-gray-800">
                      Welcome to Ztellar Course
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AcquiredCourse;
