import { useState } from 'react';
import Sidebar from '../../components/CourseAcquired/Sidebar';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { FaStar } from 'react-icons/fa';
import AcquiredVideoPlayer from '../../components/CourseAcquired/AcquiredVideoPlayer';

type OptionCardProps = {
  optionsData: any;
  setQuizChoose: any;
};

const OptionCard = ({ optionsData, setQuizChoose }: OptionCardProps) => {
  return (
    <div className="flex mb-[10px] text-blue-gray-900">
      <input
        name="option"
        value={optionsData?.label}
        // checked={() => setQuizChoose(optionsData?.label)}
        type="radio"
        className="w-[17px] h-[17px] mt-[4px] mr-[10px]"
        onClick={() => setQuizChoose(optionsData?.label)}
      />
      {optionsData?.label}. {optionsData?.description}
    </div>
  );
};

const AcquiredCourse = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  const [openSidebar, setopenSidebar] = useState(true);
  const [quizChoose, setQuizChoose] = useState('');
  const [answerTrigger, setAnswerTrigger] = useState(false);
  const [answerId, setAnswerId] = useState('');

  const [currentVideo, setCurrentVideo] = useState({
    subjectIndex: 0,
    videoIndex: 0,
    type: 'video',
    subjectId: '',
  });

  console.log(currentVideo);

  const stars = Array(5).fill(0);
  const colors = {
    orange: '#ffcc32',
    gray: 'blue-gray-50',
  };

  // GENERATE 10 numbers
  const generateUniqueRandomNumbers = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1); // Creates an array [1, 2, 3, ..., 10]

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
    }

    return numbers;
  };

  const subjectId = currentVideo?.subjectId;

  // take quiz button function
  const takeQuizFunction = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/course/create-subject-answer',
        data: { subjectId, courseId },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setAnswerId(res?.data?._id);
      setAnswerTrigger((e: any) => !e);
      console.log(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // nextQuestionFunction
  const nextQuestionFunction = async () => {
    
  };

  // query acquired course
  const { data: courseData, isLoading } = useQuery({
    queryKey: ['acquired-course'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/acquired-course?id=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  const { data: answerData, isLoading: answerLoading } = useQuery({
    queryKey: ['answer-key', answerTrigger, currentVideo?.subjectId],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-course-subject-answer?courseId=${courseId}&subjectId=${currentVideo?.subjectId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p className="">LOADING</p>;
  }

  if (answerLoading) {
    return <p className="">LOADING</p>;
  }

  // curent question
  const currentQuestionIndex = answerData?.answers?.length;
  const currentQuestions =
    courseData?.course_subjects?.[currentVideo?.subjectIndex]?.questions
      ?.questions[currentQuestionIndex];

  const subjectLength = courseData?.course_subjects.length - 1;
  const videoLength =
    courseData?.course_subjects[currentVideo?.subjectIndex]?.videos.length - 1;

  // PREV BUTTON FUNCTION
  const prevButtonFunction = () => {
    if (currentVideo?.videoIndex === 0) {
      const prevVideoLength =
        courseData?.course_subjects[currentVideo?.subjectIndex - 1]?.videos
          .length - 1;
      return setCurrentVideo({
        videoIndex: prevVideoLength,
        subjectIndex: currentVideo?.subjectIndex - 1,
        type: 'video',
        subjectId: '',
      });
    }

    setCurrentVideo({
      subjectIndex: currentVideo?.subjectIndex,
      videoIndex: currentVideo?.videoIndex - 1,
      type: 'video',
      subjectId: '',
    });
  };

  // NEXT BUTTON FUNCTION
  const nextButtonFunction = () => {
    if (videoLength === currentVideo?.videoIndex) {
      return setCurrentVideo({
        subjectIndex: currentVideo?.subjectIndex + 1,
        videoIndex: 0,
        type: 'video',
        subjectId: '',
      });
    }

    setCurrentVideo({
      subjectIndex: currentVideo?.subjectIndex,
      videoIndex: currentVideo?.videoIndex + 1,
      type: 'video',
      subjectId: '',
    });
  };

  const isLastVideoInSubject =
    subjectLength === currentVideo?.subjectIndex &&
    videoLength === currentVideo?.videoIndex;

  const isFirstVideoInSubject =
    currentVideo?.subjectIndex === 0 && currentVideo?.videoIndex === 0;

  return (
    <>
      <div className="bg-gray-50 flex">
        <Sidebar
          courseData={courseData}
          openSidebar={openSidebar}
          setopenSidebar={setopenSidebar}
          setCurrentVideo={setCurrentVideo}
          currentVideo={currentVideo}
          setAnswerTrigger={setAnswerTrigger}
        />
        <div className="w-100">
          {/* header */}
          <div className=" bg-blue-gray-100 flex items-center ">
            {!openSidebar && (
              <button
                onClick={() => setopenSidebar(true)}
                className="bg-blue-gray-800 p-[10px] text-white flex items-center tablet:hidden"
              >
                Open Outline
                <MdKeyboardArrowRight className="w-[30px] h-[30px]" />
              </button>
            )}

            <button
              onClick={() => setopenSidebar(false)}
              className="bg-blue-gray-800 p-[10px] text-white flex items-center tabletMin:hidden"
            >
              Open Outline
              <MdKeyboardArrowRight className="w-[30px] h-[30px]" />
            </button>

            <div className="p-[10px] bg-blue-gray-100 text-blue-gray-900 font-semibold text-xl mobile:hidden">
              <div className="line-clamp-2">{courseData?.title}</div>
            </div>
          </div>

          {currentVideo?.type === 'video' && (
            <>
              {/* video */}
              <div className="w-100 bg-blue-gray-900">
                <AcquiredVideoPlayer
                  key={
                    courseData?.course_subjects?.[currentVideo?.subjectIndex]
                      ?.videos[currentVideo?.videoIndex]?.data
                      ?.video_url_converted
                  }
                  src={`http://localhost:4000/api/video/${
                    courseData?.course_subjects?.[currentVideo?.subjectIndex]
                      ?.videos[currentVideo?.videoIndex]?.data
                      ?.video_url_converted
                  }`}
                  setVideoState={undefined}
                />
              </div>
            </>
          )}

          {/* QUIZ */}
          {currentVideo?.type === 'quiz' && (
            <div className="bg-blue-gray-50">
              {/* QUESTION */}
              {!answerData ? (
                <div className="w-100 max-w-[1280px] ml-[50%] translate-x-[-50%] p-[10px]">
                  <p className="text-center text-lg mb-[20px]">
                    Quiz Subject 1
                  </p>
                  <p className="mb-[10px]">
                    Make sure to watch the entire course video before beginning
                    the quiz. The quiz is time-sensitive, and once you start,
                    you may not be able return to it. You will only have one
                    additional attempt to pass after completing the quiz, so
                    take your time and answer carefully.
                  </p>
                  <button
                    onClick={takeQuizFunction}
                    className="p-[10px] bg-blue-gray-800 text-white rounded ml-[50%] translate-x-[-50%]"
                  >
                    Take the Quiz
                  </button>
                </div>
              ) : (
                <div className="w-100 p-[10px]">
                  {/* title */}
                  <p className="text-center text-lg">Question Subject 1</p>
                  {/* question body */}
                  <div className="w-100 max-w-[1280px] ml-[50%] translate-x-[-50%] p-[10px] ">
                    {/* question */}
                    <p className="mb-[20px] text-blue-gray-900 text-lg">
                      {currentQuestions?.question}
                    </p>

                    {/* Option Card */}
                    {currentQuestions?.choices?.map(
                      (optionsData: any, i: any) => {
                        return (
                          <OptionCard
                            setQuizChoose={setQuizChoose}
                            key={i}
                            optionsData={optionsData}
                          />
                        );
                      }
                    )}

                    <div className=" flex justify-end">
                      <button
                        onClick={nextQuestionFunction}
                        className="p-[10px] bg-blue-gray-800 text-white rounded"
                      >
                        Next Question
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BODY */}

          <div className="w-100 max-w-[1280px] ml-[50%] translate-x-[-50%] p-[10px]">
            {/* BUTTTONS */}
            <div className="flex items-center justify-between mb-[10px] text-white">
              {/* back button */}

              {!isFirstVideoInSubject ? (
                <button
                  onClick={prevButtonFunction}
                  className="bg-blue-gray-800 p-[10px] px-[20px] rounded hover:bg-blue-gray-700 active:bg-blue-gray-800"
                >
                  Prev
                </button>
              ) : (
                <div />
              )}

              {!isLastVideoInSubject && (
                <button
                  onClick={nextButtonFunction}
                  className="bg-blue-gray-800 p-[10px] px-[20px] rounded hover:bg-blue-gray-700 active:bg-blue-gray-800"
                >
                  Next
                </button>
              )}
            </div>

            {/* CURRENT SUBJECT AND VIDEO TITLE */}
            <div className="bg-blue-gray-50 p-[10px] laptopMin:rounded text-blue-gray-900">
              <div className="font-semibold">Current Video</div>
              <div className="mt-[5px]">
                Subject {currentVideo?.subjectIndex + 1}:{' '}
                {
                  courseData?.course_subjects?.[currentVideo?.subjectIndex]
                    ?.data?.title
                }
              </div>

              <div className="mt-[5px]">
                Video {currentVideo?.videoIndex + 1}:{' '}
                {
                  courseData?.course_subjects?.[currentVideo?.subjectIndex]
                    ?.videos[currentVideo?.videoIndex]?.data?.title
                }
              </div>
            </div>

            {/* hr */}
            <hr className="m-[20px]" />

            {/* title */}
            <p className="my-[10px] text-2xl font-bold text-blue-gray-950">
              {courseData?.title}
            </p>
            {/* description */}
            <p className="text-blue-gray-800 text-base">
              {courseData?.description}
            </p>

            {/* hr */}
            <hr className="m-[20px]" />

            <div className="bg-blue-gray-50 p-[10px] laptopMin:rounded">
              {/* author */}
              <div className="flex mb-[10px]">
                <div className="w-[50px] h-[50px] bg-blue-gray-900 rounded-[50%] mr-[10px]">
                  <img
                    src={courseData?.data?.author_id?.avatar}
                    alt="profile picture"
                    className="w-100 h-[100%] rounded-[50%] object-cover border-[2px] border-blue-800"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-blue-gray-950 mb-[2px]">
                    {courseData?.data?.author_id?.fname}{' '}
                    {courseData?.data?.author_id?.lname}
                  </p>
                  <p className="text-xs">Author</p>
                </div>
              </div>
              {/* rating */}
              <div className="flex items-center mb-[5px]">
                <p className="text-lg mr-[10px] text-blue-gray-800">0.00</p>
                <div className="flex">
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size="15"
                        style={{
                          marginRight: '10',
                          cursor: 'pointer',
                        }}
                        color={1 > index ? colors.orange : colors.gray}
                      />
                    );
                  })}
                </div>
                <p className="text-lg mr-[5px] text-blue-gray-800 tracking-wider">
                  (100 ratings)
                </p>
              </div>{' '}
              {/* enrolees */}
              <p className="text-blue-gray-900 text-lg tracking-wide">
                Enrolees: 100
              </p>
              {/* published */}
              <p className="text-blue-gray-900 text-lg  tracking-wide">
                Published: August 17, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcquiredCourse;
