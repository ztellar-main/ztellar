import { useEffect, useState } from 'react';
import Sidebar from '../../components/CourseAcquired/Sidebar';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { FaStar } from 'react-icons/fa';
import AcquiredVideoPlayer from '../../components/CourseAcquired/AcquiredVideoPlayer';
import toas from '../../utils/toas';
import { useNavigate } from 'react-router-dom';
import { getRemainingTime } from '../../utils/getRemainingTime';

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
        type="radio"
        className="w-[17px] h-[17px] mt-[4px] mr-[10px]"
        onClick={() => setQuizChoose(optionsData?.label)}
      />
      {optionsData?.label}. {optionsData?.description}
    </div>
  );
};
// Main component
const AcquiredCourse = () => {
  const token = useAppSelector((e: any) => e?.user?.token);
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  const [openSidebar, setopenSidebar] = useState(true);
  const [quizChoose, setQuizChoose] = useState('');
  const [answerTrigger, setAnswerTrigger] = useState(false);
  const navigate = useNavigate();

  // current video
  const [currentVideo, setCurrentVideo] = useState({
    subjectIndex: 0,
    videoIndex: 0,
    type: 'video',
    subjectId: '',
  });

  // COUNT DOWN TIMER
  type CountDownProps = {
    seconds: any;
    minutes: any;
    hours: any;
    days: any;
  };
  const defaultRemainingTime: CountDownProps = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  };
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  const stars = Array(5).fill(0);
  const colors = {
    orange: '#ffcc32',
    gray: 'blue-gray-50',
  };

  // GENERATE 10 numbers
  // const generateUniqueRandomNumbers = () => {
  //   const numbers = Array.from({ length: 10 }, (_, i) => i + 1); // Creates an array [1, 2, 3, ..., 10]

  //   for (let i = numbers.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
  //   }

  //   return numbers;
  // };

  const UpdateRemainingTime = (countDown: any) => {
    setRemainingTime(getRemainingTime(countDown));
  };

  const [timeExpiredAt, setTimeExpiredAt] = useState('');
  const timeExpired = new Date(timeExpiredAt).getTime();

  const [timeExpiredState, setTimeExpiredState] = useState(true);

  console.log();
  // EXPIRY TIMER
  useEffect(() => {
    const intervalId = setInterval(() => {
      const asd: any = Date.now();
      const timeRemaining: any = timeExpired - asd || 0;
      setTimeExpiredState(true);

      if (currentVideo?.type !== 'quiz') {
        setTimeExpiredState(false);
        clearInterval(intervalId);
      }

      if (Number(timeRemaining) <= 0) {
        // console.log(Number(timeRemaining));
        setTimeExpiredState(false);
        clearInterval(intervalId);
      } else {
        UpdateRemainingTime(timeExpired || 0 + 2000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeExpired, currentVideo?.subjectIndex, timeExpiredAt]);

  // save recent clicked current video or quiz
  // useEffect(() => {
  //   const res = async () => {
  //     try {
  //       const result = await axios({
  //         method: 'put',
  //         url: '/course/save-recent-sidebar',
  //         data: { currentVideo, courseId },
  //         headers: {
  //           authorization: `Token ${token}`,
  //         },
  //       });

  //       console.log(result?.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   res();
  // }, [currentVideo]);

  // query recent state
  const { isLoading: recentStateLoaing } = useQuery({
    queryKey: ['query-recent-state'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-recent-state?courseId=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setCurrentVideo({
        subjectIndex: res?.data?.recent?.subjectIndex || 0,
        videoIndex: res?.data?.recent?.videoIndex || 0,
        type: res?.data?.recent?.stateType || 'video',
        subjectId: res?.data?.recent?.subjectId,
      });
      return res?.data;
    },
  });

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

  // answer data
  const { data: answerData, isLoading: answerLoading } = useQuery({
    queryKey: ['answer-key', answerTrigger, currentVideo],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-course-subject-answer?courseId=${courseId}&subjectId=${currentVideo?.subjectId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setTimeExpiredAt(res?.data?.time_expired);
      return res?.data;
    },
  });

  const { data: finishedAnswerData, isLoading: finishedAnswerDataLoading } =
    useQuery({
      queryKey: ['finished-answer-data', currentVideo],
      queryFn: async () => {
        const res = await axios({
          method: 'get',
          url: `/course/get-finished-answer?productId=${courseId}&subjectId=${currentVideo?.subjectId}`,
          headers: {
            authorization: `Token ${token}`,
          },
        });
        return res?.data;
      },
    });

  // console.log(finishedAnswerData);

  if (isLoading) {
    return <p className="">LOADING</p>;
  }

  if (answerLoading) {
    return <p className="">LOADING</p>;
  }

  if (finishedAnswerDataLoading) {
    return <p className="">LOADING</p>;
  }

  if (recentStateLoaing) {
    return <p className="">LOADING</p>;
  }

  // check if already passed the quiz
  const quizPassedFunction = () => {
    if (!finishedAnswerData || finishedAnswerData === 'no-subejct') {
      return;
    }
    const quizPassed = finishedAnswerData?.filter((data: any) => {
      return data?.passed === true;
    });
    return quizPassed;
  };

  // curent question
  const currentQuestionIndex = answerData?.answers?.length;

  const currentQuestions =
    courseData?.course_subjects?.[currentVideo?.subjectIndex]?.questions
      ?.questions[currentQuestionIndex];

  // question time limit
  const questionTimeLimitInMunites =
    courseData?.course_subjects?.[currentVideo?.subjectIndex]?.questions
      ?.time_per_question_in_minutes;

  // question length
  const questionLength =
    courseData?.course_subjects?.[currentVideo?.subjectIndex]?.questions
      ?.questions.length;

  // answer length
  const answerLength = answerData?.answers?.length;

  // subject id
  // const subjectIdDb =
  //   courseData?.course_subjects[currentVideo?.subjectIndex]?._id;

  const subjectIdDb =
    courseData?.course_subjects[currentVideo?.subjectIndex]?.data?._id;

  // question id
  const questionId =
    courseData?.course_subjects?.[currentVideo?.subjectIndex]?.questions?._id;

  // subject length
  const subjectLength = courseData?.course_subjects.length - 1;
  const videoLength =
    courseData?.course_subjects[currentVideo?.subjectIndex]?.videos.length - 1;

  // PREV BUTTON FUNCTION
  const prevButtonFunction = () => {
    if (currentVideo?.videoIndex === 0) {
      return setCurrentVideo({
        videoIndex: videoLength - 1,
        subjectIndex: currentVideo?.subjectIndex - 1,
        type: 'video',
        subjectId: subjectIdDb,
      });
    }

    if (currentVideo?.type === 'quiz') {
      return setCurrentVideo({
        subjectIndex: currentVideo?.subjectIndex,
        videoIndex: videoLength,
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

  // take quiz button function
  const takeQuizFunction = async () => {
    const questionTimeInMunites = questionTimeLimitInMunites;
    const asd =
      courseData?.course_subjects[currentVideo?.subjectIndex]?.data?._id;
    try {
      const res = await axios({
        method: 'post',
        url: '/course/create-subject-answer',
        data: {
          subjectId: asd,
          courseId,
          questionTimeInMunites,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      console.log(res);

      setAnswerTrigger((e: any) => !e);
    } catch (err) {
      console.log(err);
    }
  };

  // nextQuestionFunction
  const nextQuestionFunction = async () => {
    const questionTimeInMunites = questionTimeLimitInMunites;
    let finalAnswer = quizChoose;

    if (timeExpiredState === false) {
      finalAnswer = 'Question timer expired. No Answer';
    }

    if (!finalAnswer || finalAnswer === '') {
      return toas('Please choose your answer first', 'error');
    }

    try {
      const res = await axios({
        method: 'post',
        url: '/course/save-answer',
        data: {
          answerId: answerData?._id,
          answer: finalAnswer,
          questionId,
          questionTimeInMunites,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });

      console.log(res?.data);
      setAnswerTrigger((e: any) => !e);

      if (res?.data?.status === true) {
        navigate(`/acquired/course/answer?id=${answerData?._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // NEXT BUTTON FUNCTION
  const nextButtonFunction = () => {
    if (videoLength === currentVideo?.videoIndex) {
      console.log('asd');
      return setCurrentVideo((e: any) => {
        return {
          subjectIndex: e?.subjectIndex,
          videoIndex: videoLength + 1,
          type: 'quiz',
          subjectId: subjectIdDb,
        };
      });
    }

    if (currentVideo?.type === 'quiz') {
      return setCurrentVideo((e: any) => {
        return {
          subjectIndex: e?.subjectIndex + 1,
          videoIndex: 0,
          type: 'video',
          subjectId: subjectIdDb,
        };
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
    videoLength + 1 === currentVideo?.videoIndex &&
    currentVideo?.type === 'quiz';

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
          courseId={courseId}
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

            {/* sub body header */}
            <div className="p-[10px] bg-blue-gray-100 flex justify-end w-100">
              {/* <div className="line-clamp-2">{courseData?.title}</div> */}
              <button
                onClick={() =>
                  navigate(
                    `/acquired/course/download-certificate-page?id=${courseId}`
                  )
                }
                className="bg-blue-gray-800 text-white p-[10px] rounded  "
              >
                Progress / Download Certificate
              </button>
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
                  src={`https://ztellar-api-backend.onrender.com/api/video/${
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
                  {/* Quiz attemp container */}
                  <div className="mb-[20px]">
                    {/* Quiz attemp card */}
                    {finishedAnswerData?.map(
                      (finishedAnswerMap: any, i: any) => {
                        function getOrdinalSuffix(n: any) {
                          const s = ['th', 'st', 'nd', 'rd'],
                            v = n % 100;
                          return n + (s[(v - 20) % 10] || s[v] || s[0]);
                        }
                        const attempNumber = i + 1;
                        return (
                          <div
                            key={i}
                            className="p-[10px] w-100 border border-gray-500 flex justify-between items-center"
                          >
                            <p className="">
                              {getOrdinalSuffix(attempNumber)} attempt -{' '}
                              {finishedAnswerMap?.score}/
                              {finishedAnswerMap?.answers?.length}
                            </p>
                            <div className="flex items-center">
                              <p
                                className={`class pr-[10px] ${
                                  finishedAnswerMap?.passed
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {finishedAnswerMap?.passed
                                  ? 'Passed'
                                  : 'Failed'}
                              </p>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/acquired/course/answer?id=${finishedAnswerMap?._id}`
                                  )
                                }
                                className="p-[10px] bg-blue-gray-800 text-white rounded"
                              >
                                View answer
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <p className="mb-[10px]">
                    Make sure to watch the entire course video before beginning
                    the quiz. The quiz is time-sensitive, and once you start,
                    you may not be able return to it. You will only have one
                    additional attempt to pass after completing the quiz, so
                    take your time and answer carefully.
                  </p>

                  {finishedAnswerData?.length === 2 ? (
                    <div className="ml-[50%] translate-x-[-50%] text-center font-semibold text-blue-gray-900">
                      You've finished your 2 attempts.&nbsp;
                      <p
                        className={`${
                          quizPassedFunction()?.length > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {quizPassedFunction()?.length > 0
                          ? "Congratulations! You've passed this subject."
                          : "Unfortunately, you've failed to pass this subject's quiz."}
                      </p>
                    </div>
                  ) : (
                    <div>
                      {quizPassedFunction()?.length > 0 ? (
                        <div className="ml-[50%] translate-x-[-50%] text-center font-semibold text-green-800">
                          Congratulations! You've passed this subject.
                        </div>
                      ) : (
                        <>
                          {!timeExpiredState && (
                            <button
                              onClick={takeQuizFunction}
                              className="p-[10px] bg-blue-gray-800 text-white rounded ml-[50%] translate-x-[-50%]"
                            >
                              {finishedAnswerData?.length > 0
                                ? 'Take the quiz again'
                                : 'Take the Quiz'}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {!timeExpiredState ? (
                    <div className="p-[10px]">
                      {/* title */}
                      <p className="text-center text-lg">Question Subject 1</p>
                      <p className="my-[10px] text-center">
                        Your quiz time limit expired during question{' '}
                        {answerLength + 1}. Click the 'Next Question' button to
                        proceed
                      </p>
                      {/* next button time expired */}
                      <div className=" flex justify-end">
                        <button
                          onClick={nextQuestionFunction}
                          className="p-[10px] bg-blue-gray-800 text-white rounded"
                        >
                          {questionLength === Number(answerLength + 1)
                            ? 'Finish Quiz'
                            : 'Next Question'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-100 p-[10px]">
                      <p className="text-center font-semibold text-lg">
                        {remainingTime?.minutes}:{remainingTime?.seconds}
                      </p>
                      {/* title */}
                      <p className="text-center text-lg">Question Subject 1</p>
                      {/* question body */}
                      <div className="w-100 max-w-[1280px] ml-[50%] translate-x-[-50%] p-[10px] ">
                        {/* question */}
                        <p className="mb-[20px] text-blue-gray-900 text-lg">
                          {answerLength + 1}. {currentQuestions?.question}
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
            </div>
          )}

          {/* ANSWER */}
          {currentVideo?.type === 'answer' && <div>ANSWER PAGE VIEW</div>}

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
                <div className="flex">
                  {currentVideo?.type} &nbsp;
                  {currentVideo?.type === 'video' && (
                    <div>
                      {currentVideo?.videoIndex + 1}: &nbsp;
                      {
                        courseData?.course_subjects?.[
                          currentVideo?.subjectIndex
                        ]?.videos[currentVideo?.videoIndex]?.data?.title
                      }
                    </div>
                  )}
                </div>
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
