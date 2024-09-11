import { useState } from 'react';
import Header from '../../components/AdminDashboard/Header';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import SubHeader from '../../components/AdminDashboard/SubHeader';
import InputComponent from '../../components/AdminDashboard/InputComponent';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import toas from '../../utils/toas';
import { axiosError } from '../../utils/axiosError';
import { useNavigate } from 'react-router-dom';

const AddVideo = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const courseId = query.get('courseId') || '';
  const subjectId = query.get('subjectId') || '';
  const subjectTitle = query.get('title') || '';

  // values
  const [title, setTitle] = useState('');

  // error handler states
  const [titleErrorHandlerState, setTitleErrorHandlerState] = useState({
    message: '',
    status: 'start',
  });

  // other states
  const [uploading, setUploading] = useState(false);

  // submit function
  const uploadButtonFunction = async () => {
    const titleErrorHandlerFunction = async (data: any) => {
      if (!data) {
        setTitleErrorHandlerState({
          message: 'Video title cannot be empty',
          status: 'error',
        });
        return 'error';
      }

      try {
        await axios({
          method: 'POST',
          url: '/course/check-if-video-title-already-exists',
          data: { title, courseId, subjectId },
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
        axiosError(
          err,
          setTitleErrorHandlerState,
          'This video title is already exists on this subject'
        );

        return 'error';
      }
    };

    const titleHandler = await titleErrorHandlerFunction(title);

    if (titleHandler === 'error') {
      return toas('There is something wrong in your information', 'error');
    }

    // start upload
    setUploading(true);
    try {
      await axios({
        method: 'PUT',
        url: '/course/add-video-to-subject-course-admin',
        data: { title, courseId, subjectId },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setUploading(true);
      toas('Video successfully uploaded', 'success');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    } catch (err) {
      setUploading(false);
      const error = axiosError(err, setTitleErrorHandlerState, '');
      toas(error, 'error');
    }
  };

  return (
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
          page="/course/setup/add-video"
        />

        {/* MAIN BODY */}
        <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
          Add Video
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
            {uploading ? 'Uploading' : 'Upload'}
            {uploading && (
              <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ml-[50px]">
                <CgSpinnerTwoAlt className="text-white animate-spin" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
