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

type SubjectProps = {
  subjectData: any;
  index: any;
  courseData: any;
};
const SubjectCard = ({ subjectData, index, courseData }: SubjectProps) => {
  const [openVideos, setOpenVideos] = useState(false);
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
          <div className="line-clamp-1"> {subjectData?.title}</div>

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
                  `/admin-dashboard/course/setup/add-video?courseId=${courseData?._id}&subjectId=${subjectData?._id}&title=${subjectData?.title}`
                )
              }
            >
              Add Video
            </Option>
            <Option>Setup Questionnaire</Option>
            <Option>Edit</Option>
            <Option>Delete</Option>
          </Select>
        </div>
      </div>
      {openVideos && <div className="w-100 p-[10px] bg-red-100"></div>}
    </>
  );
};

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
                className="bg-blue-900"
              >
                Add Subject
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
                    subjectData={subjectsDataMap?._id}
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
