import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import { useAppSelector } from '../../../state/store';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import InputComponent from '../../../components/AdminDashboard/InputComponent';
import axios from 'axios';
import { axiosError } from '../../../utils/axiosError';
import toas from '../../../utils/toas';
import { useNavigate } from 'react-router-dom';

const EditCourseSubjectTitle = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  const subjectId = query.get('subjectId') || '';
  const subjectTitle = query.get('subjectTitle') || '';
  const courseId = query.get('courseId') || '';
  const token = useAppSelector((e: any) => e.user.token);
  const navigate = useNavigate();

  //   values
  const [title, setTitle] = useState(subjectTitle);

  //   error handlers
  const [titleErrorHandlerState, setTitleErrorHandlerState] = useState({
    message: '',
    status: 'start',
  });

  //   uploading state
  const [uploading, setUploading] = useState(false);

  //   upload button function
  const uploadButtonFunction = async () => {
    const titleErrorHandlerFunction = async (data: any, errorSetter: any) => {
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
      setUploading(true);
      try {
        await axios({
          method: 'POST',
          url: '/course/check-if-subject-title-already-exist',
          data: { title, courseId },
          headers: {
            authorization: `Token ${token}`,
          },
        });
        setTitleErrorHandlerState({
          message: 'success',
          status: 'success',
        });
        return 'success';
      } catch (err) {
        setUploading(false);
        axiosError(
          err,
          setTitleErrorHandlerState,
          'This subject title already exist in this course'
        );
        return 'error';
      }
    };

    const titleHandler = await titleErrorHandlerFunction(
      title,
      setTitleErrorHandlerState
    );

    if (titleHandler === 'error') {
      return toas('There is something wrong in your information', 'error');
    }

    try {
      await axios({
        method: 'put',
        url: '/course/update-course-subject-title',
        data: { subjectId, title },
        headers: {
          authorization: `Token ${token}`,
        },
      });

      setTitleErrorHandlerState({
        message: 'success',
        status: 'success',
      });
      toas('Subject Title Successfully Updated', 'success');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    } catch (err) {
      const error = axiosError(err, setTitleErrorHandlerState, '');
      toas(error, 'error');
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
            page="/course/setup.edit-subject-title"
          />

          {/* MAIN BODY */}
          <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
            Edit Subject
          </div>

          <p className="text-center my-[10px] tracking-wider font-semibold text-blue-800">
            {subjectTitle}
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

export default EditCourseSubjectTitle;
