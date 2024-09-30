import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import InputComponent from '../../../components/AdminDashboard/InputComponent';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { axiosError } from '../../../utils/axiosError';
import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import toas from '../../../utils/toas';
import { useNavigate } from 'react-router-dom';

const EditCourseVideoTitle = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  const videoId = query.get('videoId') || '';
  const videoTitle = query.get('videoTitle') || '';
  const subjectId = query.get('subjectId') || '';
  const courseId = query.get('courseId') || '';
  const navigate = useNavigate();

  const token = useAppSelector((e: any) => e.user.token);

  //   values
  const [title, setTitle] = useState(videoTitle);

  //   error handlers
  const [titleErrorHandlerState, setTitleErrorHandlerState] = useState({
    message: '',
    status: 'start',
  });

  //   uploading state
  const [uploading, setUploading] = useState(false);

  //   submit function
  const uploadButtonFunction = async () => {
    const titleErrorHandler = async (data: any, errorSetter: any) => {
      const regex = new RegExp(/[\\/]/g);
      const regexed = data.match(regex);
      if (!data) {
        errorSetter({
          message: 'Please enter your subject title',
          status: 'error',
        });
        return 'error';
      }
      if (regexed) {
        errorSetter({
          message: "This characters are not allowed ('/ , { , \\ ,  }')",
          status: 'error',
        });
        return 'error';
      }

      if (data.length < 10) {
        errorSetter({
          message: 'Please enter atleast 10 characters and above',
          status: 'error',
        });
        return 'error';
      }

      try {
        await axios({
          method: 'post',
          url: '/course/check-if-subject-video-title-already-exists',
          data: { title: data, subjectId },
          headers: {
            authorization: `Token ${token}`,
          },
        });
        errorSetter({
          message: 'success',
          status: 'success',
        });
        return 'success';
      } catch (err) {
        axiosError(
          err,
          errorSetter,
          'This video title already exist in this subject'
        );
        return 'error';
      }
    };

    const titleHandler = await titleErrorHandler(
      title,
      setTitleErrorHandlerState
    );

    if (titleHandler === 'error') {
      return toas('There is something wrong in your information', 'error');
    }

    setUploading(true);
    try {
      await axios({
        method: 'put',
        url: '/course/edit-subject-video-title',
        data: { videoId, title },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toas('Video Title Successfully Editted', 'success');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    } catch (err) {
      setUploading(false);
      toas('Something went wrong please try again', 'error');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    }
  };
  return (
    <>
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
            page="/course/setup/update-video-title"
          />

          {/* MAIN BODY */}
          <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
            Edit Subject
          </div>

          <p className="text-center my-[10px] tracking-wider font-semibold text-blue-800">
            {videoTitle}
          </p>

          <div className="w-[80%] ml-[50%] translate-x-[-50%] mobile:w-[90%]">
            {/* inputs */}
            <InputComponent
              setter={setTitle}
              placeholder="Enter video title"
              name="Title"
              error={titleErrorHandlerState}
              value={title}
              type="text"
            />

            {/* submit button */}
            <button
              onClick={() => {
                if (uploading) {
                  return;
                }
                uploadButtonFunction();
              }}
              className={`bg-blue-600 relative text-white text-base w-100 p-[10px] rounded cursor-pointer hover:bg-blue-900 ${
                uploading && 'bg-blue-900'
              }`}
            >
              {uploading ? 'Uploading' : 'Edit'}
              {uploading && (
                <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ml-[50px]">
                  <CgSpinnerTwoAlt className="text-white animate-spin" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourseVideoTitle;
