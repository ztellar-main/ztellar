import { useState } from 'react';
import Header from '../../components/AdminDashboard/Header';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import SubHeader from '../../components/AdminDashboard/SubHeader';
import { Button, Tooltip } from '@material-tailwind/react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../state/store';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { Select, Option } from '@material-tailwind/react';
import { FaAngleDown } from 'react-icons/fa6';
import toas from '../../utils/toas';
import { IoIosClose } from 'react-icons/io';

type VideoPathProps = {
  url: any;
  setPopupOpen: any;
  title: any;
};

const VideoPathComponent = ({ url, setPopupOpen, title }: VideoPathProps) => {
  return (
    <>
      <div className="w-100 h-[100vh] bg-black opacity-[60%] fixed top-0 left-0 z-[10]" />
      <div className="  fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[11] rounded ">
        {/* HEADER */}
        <div className="w-100 p-[10px] bg-blue-800 text-white rounded-t flex items-center justify-between">
          Video Path
          <IoIosClose
            onClick={() => setPopupOpen(false)}
            className="w-[25px] h-[25px] cursor-pointer hover:bg-blue-600 rounded-[50%] "
          />
        </div>
        <div className="w-100 p-[10px] bg-white rounded-b text-gray-800">
          <p className="text-blue-gray-900">Title : {title}</p>
          <p className="text-blue-gray-900">Path : {url}</p>
        </div>
      </div>
    </>
  );
};

type VideoCardProps = {
  data: any;
  subjectIndex: any;
  videoIndex: any;
};

const VideoCard = ({ data, subjectIndex, videoIndex }: VideoCardProps) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const token = useAppSelector((e: any) => e.user.token);

  const videoId = data?.data?._id;
  const videoState = data?.data?.status;

  const [videoStatusState, setVideoStatusState] = useState(videoState);

  const index = `${subjectIndex + 1}.${videoIndex + 1}`;

  const activateVideoFunction = async (videoId: any, videoState: any) => {
    try {
      await axios({
        method: 'put',
        url: '/course/activate-or-deactivate-video',
        data: { videoId, videoState },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setVideoStatusState((e: any) => !e);
    } catch (err) {
      toas('Something went wrong please try again', 'error');
    }
  };
  return (
    <>
      <div className="w-100 bg-blue-gray-50 border-b border-gray-300 flex text-gray-800">
        <div className="min-w-[70px] p-[10px] flex items-center  mobile:hidden">
          {subjectIndex + 1}.{videoIndex + 1}
        </div>
        <div
          // onClick={() => setOpenVideos((i) => !i)}
          className=" p-[10px]  grow flex items-center justify-between min-w-[100px] cursor-pointer"
        >
          <div className="line-clamp-1"> {data?.data?.title}</div>
          {/* <FaAngleDown className="mr-[10px]" /> */}
          <div
            className={`w-[10px] h-[10px] rounded-[50%] mr-[10px] ${
              videoStatusState === false ? 'bg-red-600' : 'bg-green-600'
            }`}
          />
        </div>
        <div className="w-[220px] min-w-[220px] p-[10px] ">
          <Select
            label="Select Action"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option
              onClick={() =>
                navigate(
                  `/admin-dashboard/course/setup/edit-video-title?videoId=${data?.data?._id}&videoTitle=${data?.data?.title}&subjectId=${data?.data?.subject_id}&courseId=${data?.data?.product_id}`
                )
              }
            >
              Edit Title
            </Option>
            <Option onClick={() => activateVideoFunction(videoId, videoState)}>
              {videoStatusState === false ? 'Activate' : 'Deactivate'}
            </Option>
            <Option onClick={() => setPopupOpen(true)}>Video Path</Option>
            <Option
              onClick={() =>
                navigate(
                  `/admin-dashboard/course/setup/preview-course-video?id=${data?.data?._id}&index=${index}`
                )
              }
            >
              Preview Video
            </Option>
            <Option>Delete</Option>
          </Select>
        </div>
      </div>
      {popupOpen && (
        <VideoPathComponent
          url={data?.data?.video_url_converted}
          title={data?.data?.title}
          setPopupOpen={setPopupOpen}
        />
      )}
    </>
  );
};

// SUBJECT CARD START
type SubjectProps = {
  subjectData: any;
  index: any;
  courseData: any;
};

const SubjectCard = ({ subjectData, index, courseData }: SubjectProps) => {
  const [openVideos, setOpenVideos] = useState(false);

  console.log(openVideos);

  const navigate = useNavigate();

  return (
    <>
      <div className={`flex border-b text-gray-800`}>
        <div className="min-w-[70px] p-[10px] flex items-center  mobile:hidden">
          {index + 1}
        </div>
        <div
          onClick={() => setOpenVideos((i) => !i)}
          className=" p-[10px]  grow flex items-center justify-between min-w-[100px] cursor-pointer"
        >
          <div className="line-clamp-1"> {subjectData?.data?.title}</div>

          <FaAngleDown className="mr-[10px]" />
        </div>
        <div className="w-[220px] min-w-[220px] p-[10px] ">
          <Select
            label="Select Action"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Option
              onClick={() =>
                navigate(
                  `/admin-dashboard/course/setup/add-video?courseId=${courseData?._id}&subjectId=${subjectData?.data?._id}&title=${subjectData?.data?.title}`
                )
              }
            >
              Add Video
            </Option>
            <Option>Setup Questionnaire</Option>
            <Option
              onClick={() =>
                navigate(
                  `/admin-dashboard/course/setup/edit-subject-title?subjectId=${subjectData?.data?._id}&subjectTitle=${subjectData?.data?.title}&courseId=${courseData?._id}`
                )
              }
            >
              Edit Title
            </Option>
            <Option
              onClick={() =>
                navigate(
                  `/admin-dashboard/course/setup/edit-video-order?subjectId=${subjectData?._id}&courseId=${courseData?._id}`
                )
              }
            >
              Edit Video Order
            </Option>
            <Option>Delete</Option>
          </Select>
        </div>
      </div>
      {subjectData?.videos?.map((videoData: any, i: any) => {
        return (
          <VideoCard
            key={i}
            data={videoData}
            subjectIndex={index}
            videoIndex={i}
          />
        );
      })}
    </>
  );
};
// SUBJECT CARD END

const SetupCourse = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  const token = useAppSelector((e: any) => e.user.token);

  //   query course
  const {
    data: courseData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['setup-course_data_admin'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-single-courses-admin?id=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      const result = res?.data;
      return result;
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

  if (isError) {
    return <Navigate to="/admin-dashboard/course" />;
  }

  const courseSubjects = courseData?.course_subjects;

  return (
    <>
      {' '}
      <div className="bg-gray-50 flex">
        <Sidebar
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="Course"
        />
        <div className="w-100">
          <Header />
          <SubHeader
            setopenSidebar={setopenSidebar}
            openSidebar={openSidebar}
            page="/course/setup"
          />

          {/* MAIN BODY */}
          {/* add subject button */}
          <div className="w-100 p-[10px]">
            {/* create course button */}
            <Tooltip content="Click to add new subject">
              <Button
                onClick={() =>
                  navigate(
                    `/admin-dashboard/course/setup/add-subject?id=${courseId}`
                  )
                }
                placeholder={undefined}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="bg-blue-900 mr-[10px]"
              >
                Add Subject
              </Button>
            </Tooltip>
            {/* edit subject order */}
            <Tooltip content="Click to organize subject order">
              <Button
                onClick={() =>
                  navigate(
                    `/admin-dashboard/course/setup/edit-subject-order?id=${courseId}`
                  )
                }
                placeholder={undefined}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="bg-blue-900"
              >
                Edit Subject Order
              </Button>
            </Tooltip>
          </div>

          <div className="w-100 h-[40px] bg-blue-gray-50 flex items-center justify-center text-gray-700 font-semibold tracking-wider">
            List of Subjects
          </div>

          <div className="w-100 p-[10px]">
            <div className="w-full min-w-[350px]">
              {/* table header */}
              <div className=" flex rounded-t bg-blue-800 text-white">
                <div className="min-w-[70px] p-[10px]  mobile:hidden rounded-tl-lg">
                  #
                </div>
                <div className="min-w-[40px] p-[10px]  grow">Title</div>
                <div className="w-[220px] min-w-[220px] p-[10px]  rounded-tr-lg">
                  Action
                </div>
              </div>

              <Loading />

              {/* table body */}
              {courseSubjects?.map((subjectsDataMap: any, i: any) => {
                return (
                  <SubjectCard
                    key={i}
                    subjectData={subjectsDataMap}
                    index={i}
                    courseData={courseData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupCourse;
