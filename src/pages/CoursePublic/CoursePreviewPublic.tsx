import Navbar from '../../components/Navbar';
import { FaStar } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { GoVideo } from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../state/store';

type VideoProps = {
  videoData: any;
};

const VideoCardComponent = ({ videoData }: VideoProps) => {
  return (
    <>
      {videoData?.map((videoDataMap: any, i: any) => {
        return (
          <div
            key={i}
            className="w-100 text-blue-gray-900 border border-blue-gray-100 flex flex-col items-left justify-between border-t-0 bg-gray-50"
          >
            {/* video card */}
            <div className=" text-blue-gray-800 flex items-center p-[10px]">
              <GoVideo className="mr-[10px] w-[18px] h-[18px]" />
              <div className="w-100 line-clamp-1">
                {' '}
                {videoDataMap?.data?.title}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

type SubjectProps = {
  subjectData: any;
  index: any;
};

const SubjectCardComponent = ({ subjectData, index }: SubjectProps) => {
  const [openVideo, setOpenVideo] = useState(false);
  const border = `${index > 0 && 'border-t-0'}`;
  return (
    <>
      <div>
        {/* subject card */}
        <div
          onClick={() => setOpenVideo((e) => !e)}
          className={`w-100 p-[15px] text-blue-gray-900 border border-blue-gray-100 flex items-center justify-between ${border} cursor-pointer`}
        >
          <div className="flex ">
            <div className="text-blue-gray-900 grow line-clamp-1">
              {' '}
              {subjectData?.data?.title} -{' '}
            </div>

            <p className="text-blue-gray-700 font-semibold w-[80px]">
              {' '}
              &nbsp;{subjectData?.videos.length} videos
            </p>
          </div>

          <MdOutlineKeyboardArrowDown className="w-[20px] h-[20px]" />
        </div>
        {/* video card container */}
        {openVideo && <VideoCardComponent videoData={subjectData?.videos} />}
      </div>
    </>
  );
};

const CoursePreviewPublic = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const id = query.get('id') || '';
  const user = useAppSelector((e: any) => e.user.currentUser);
  const userId = user?._id;

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['fetch-public-course-data'],
    queryFn: async () => {
      const res: any = await axios({
        method: 'get',
        url: `/course/get-single-course-public?id=${id}&uid=${userId}`,
      });

      return res?.data;
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <p className="ml-[50%] translate-x-[-50%] mt-[50px] w-[50px] h-[50px]">
          <CgSpinnerTwoAlt className="text-blue-800 animate-spin w-100 h-[100%]" />
        </p>
      );
    }
  };

  const stars = Array(5).fill(0);
  const colors = {
    orange: '#ffcc32',
    gray: 'blue-gray-50',
  };

  const acquireButtonFunction = async () => {
    if (courseData?.registered === true) {
      return navigate(`/acquired/course?id=${courseData?.data?._id}`);
    }
    return navigate(`/acquire/course?id=${courseData?.data?._id}`);
  };
  return (
    <div>
      <Navbar />
      <Loading />

      <div className={`${isLoading && 'hidden'}`}>
        {/* MAIN BODY */}
        <div className="w-100 p-[5px] bg-blue-gray-50 text-blue-gray-800 flex justify-end tracking-wider">
          /course/view
        </div>
        {/* VIDEO */}
        <div className="w-100 h-[400px] bg-black"></div>
        {/* DETAILS */}
        <div className="w-100 max-w-[1280px] ml-[50%] translate-x-[-50%] laptop:p-[10px]">
          {/* title */}
          <p className="my-[10px] text-2xl font-bold text-blue-gray-950">
            {courseData?.data?.title}
          </p>
          {/* description */}
          <p className="text-blue-gray-800 text-base">
            {courseData?.data?.description}
          </p>

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
            <div className="flex items-center mb-[10px]">
              <p className="text-lg mr-[5px] text-blue-gray-800">
                {courseData?.data?.average_rating}
              </p>
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
                      color={
                        courseData?.data?.average_rating > index
                          ? colors.orange
                          : colors.gray
                      }
                    />
                  );
                })}
              </div>
              <p className="text-lg mr-[5px] text-blue-gray-800 tracking-wider">
                (100 ratings)
              </p>
            </div>
            {/* enrolees */}
            <p className="text-blue-gray-900 text-lg tracking-wide">
              Enrolees: 100
            </p>
            {/* published */}
            <p className="text-blue-gray-900 text-lg  tracking-wide">
              Published: August 17, 2024
            </p>
          </div>

          {/* HR */}
          <hr className="m-[20px]" />

          {/* outline */}
          <p className="text-xl font-semibold text-blue-gray-900">Outline</p>
          <p className="text-blue-gray-800 tracking-wide mb-[10px]">
            5 subjects, with a total of 20 videos
          </p>

          {courseData?.data?.course_subjects?.map(
            (subjectDataMap: any, i: any) => {
              return (
                <SubjectCardComponent
                  key={i}
                  subjectData={subjectDataMap}
                  index={i}
                />
              );
            }
          )}

          {/* HR */}
          <hr className="m-[20px]" />

          {/* feedback */}
          <p className="text-xl font-semibold text-blue-gray-900">Feedback</p>
          <p className="text-blue-gray-800 tracking-wide mb-[10px]">
            Total of 20 feedbacks
          </p>
          {/* feedback card */}
          <div className="border-b">
            <div className="w-100 p-[15px] flex items-center justify-between">
              {/* 1 */}
              <div className="flex">
                <div className="w-[50px] h-[50px] bg-blue-gray-800 rounded-[50%] mr-[10px]"></div>
                <div className="class">
                  <p className="mb-[3px] font-semibold">Juan Dela Cruz</p>
                  <div className="flex">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          size="14"
                          style={{
                            marginRight: '5',
                            cursor: 'pointer',
                          }}
                          color={1 > index ? colors.orange : colors.gray}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* time */}
              <p className="text-sm text-blue-gray-800">
                Aug 17, 2024 10:00 am
              </p>
            </div>
            <div className="w-100 p-[10px] px-[30px] text-blue-gray-900">
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to mak
            </div>
          </div>

          {/* 22 */}
          <div className="class">
            <div className="w-100 p-[15px] flex items-center justify-between">
              {/* 1 */}
              <div className="flex">
                <div className="w-[50px] h-[50px] bg-blue-gray-800 rounded-[50%] mr-[10px]"></div>
                <div className="class">
                  <p className="mb-[3px] font-semibold">Juan Dela Cruz</p>
                  <div className="flex">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          size="14"
                          style={{
                            marginRight: '5',
                            cursor: 'pointer',
                          }}
                          color={1 > index ? colors.orange : colors.gray}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* time */}
              <p className="text-sm text-blue-gray-800">
                Aug 17, 2024 10:00 am
              </p>
            </div>
            <div className="w-100 p-[10px] px-[30px] text-blue-gray-900">
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to mak
            </div>
          </div>

          <p className="my-[10px] text-blue-gray-800 text-center font-semibold underline tracking-wide cursor-pointer hover:text-blue-gray-500">
            Show more feedback
          </p>

          {/* HR */}
          <hr className="m-[20px]" />
        </div>

        <div className="h-[100px] "></div>

        {/* acquire section */}
        <div className="w-100 max-w-[1280px] bg-blue-gray-900 p-[15px] laptop:p-[10px] mobile:p-[15px] ml-[50%] translate-x-[-50%] fixed bottom-0 laptopMin:rounded-t-[20px] font-semibold text-white flex items-center justify-center">
          {courseData?.registered
            ? 'You already acquired this course'
            : `Get this course for only P${courseData?.data?.course_price}`}
          <button
            onClick={acquireButtonFunction}
            className="bg-blue-800 p-[10px] rounded ml-[10px] px-[20px]"
          >
            {courseData?.registered ? 'Go to course' : 'Acquire now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPublic;
