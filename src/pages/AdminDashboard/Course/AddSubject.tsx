import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import InputComponent from '../../../components/AdminDashboard/InputComponent';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import toas from '../../../utils/toas';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  const navigate = useNavigate();

  //   VALUES
  const [title, setTitle] = useState('');

  //   ERROR HANDLER STATES
  const [titleErrorHandler, setTitleErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  //   OTHER STATE
  const [uploading, setUploading] = useState(false);

  //   SUBMIT BUTTON FUNCTION
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

      try {
        setUploading(true);
        await axios({
          method: 'PUT',
          url: '/course/add-subject-on-course',
          data: { title, courseId },
        });
        setTitleErrorHandler({
          message: 'success',
          status: 'success',
        });
        toas('Subject successfully uploaded', 'success');
        navigate(`/admin-dashboard/course/setup?id=${courseId}`);
      } catch (err) {
        if (err instanceof AxiosError) {
          setUploading(false);
          const error = err?.response?.data?.message || err?.message;
          if (error === 'This subject title is already exists on this course') {
            setTitleErrorHandler({
              message: error,
              status: 'error',
            });
          }
          return 'error';
        }
      }
    };

    const titleHandler = await titleErrorHandlerFunction(
      title,
      setTitleErrorHandler
    );

    if (titleHandler === 'error') {
      return toas('Something is wrong in your information', 'error');
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
            page="/course/setup/add-subject"
          />

          {/* MAIN BODY */}
          <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
            Add Subject
          </div>

          <div className="w-[80%] ml-[50%] translate-x-[-50%] mobile:w-[90%]">
            <InputComponent
              name="Subject Title"
              placeholder="Enter subject title"
              type="text"
              setter={setTitle}
              error={titleErrorHandler}
              value={title}
            />

            {/* SUBMIT BUTTON */}
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
    </>
  );
};

export default AddSubject;
