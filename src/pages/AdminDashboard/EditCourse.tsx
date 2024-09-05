import { useState } from 'react';
import Header from '../../components/AdminDashboard/Header';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import SubHeader from '../../components/AdminDashboard/SubHeader';
import { useAppSelector } from '../../state/store';
import { Navigate, useNavigate } from 'react-router-dom';
import InputComponent from '../../components/AdminDashboard/InputComponent';
import TextArea from '../../components/AdminDashboard/TextArea';
import toas from '../../utils/toas';
import axios, { AxiosError } from 'axios';
import { descriptionErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/descriptionErrorHandlerFunction';
import { priceErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/priceErrorHandlerFunction';
import { liveIdErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/liveIdErrorHandlerFunction';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useQuery } from '@tanstack/react-query';

const EditCourse = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const token = useAppSelector((e: any) => e.user.token);
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  // VALUES
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [liveId, setLiveId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [courseIdState, setCourseIdState] = useState('');

  // ERROR HANDLER STATES
  const [titleErrorHandler, setTitleErrorHandler] = useState({
    message: '',
    status: 'start',
  });
  const [descriptionErrorHandler, setDescriptionErrorHandler] = useState({
    message: '',
    status: 'start',
  });
  const [priceErrorHandler, setPriceErrorHandler] = useState({
    message: '',
    status: 'start',
  });
  const [liveIdErrorHandler, setLiveIdErrorHandler] = useState({
    message: '',
    status: 'start',
  });
  const [authorIdErrorHandler, setAuthorIdErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  // OTHER STATES
  const [uploading, setUploading] = useState(false);

  //   query course
  const { isError, isLoading } = useQuery({
    queryKey: ['course_data_admin'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-single-courses-admin?id=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      const result = res?.data;
      setTitle(result?.title);
      setDescription(result?.description);
      setPrice(result?.course_price);
      setAuthorId(result?.author_id);
      setLiveId(result?.liveId);
      setCourseIdState(result?._id);
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

  // UPLOAD BUTTON FUNCTION
  const uploadButtonFunction = async () => {
    // ERROR HANDLER CHEKING
    const titleErrorHandler = (data: any, errorSetter: any, length: any) => {
      const regex = new RegExp(/[\\/]/g);
      const regexed = data.match(regex);

      if (!data) {
        errorSetter({
          message: 'Please enter your course title',
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

      if (data.length > length) {
        errorSetter({
          message: 'Only 50 characters or fewer are allowed',
          status: 'error',
        });
        return 'error';
      }

      if (Number(data.length) < 10) {
        errorSetter({
          message: 'Please enter atleast 10 characters and above',
          status: 'error',
        });
        return 'error';
      }
      errorSetter({
        message: 'success',
        status: 'success',
      });
      return 'success';
    };
    const titleHandler = titleErrorHandler(title, setTitleErrorHandler, 50);
    const descriptionHandler = await descriptionErrorHandlerFunction(
      description,
      setDescriptionErrorHandler,
      100
    );
    const priceHandler = await priceErrorHandlerFunction(
      price,
      setPriceErrorHandler
    );
    const liveIdHandler = await liveIdErrorHandlerFunction(
      liveId,
      setLiveIdErrorHandler
    );

    const authorErrorHandler = (data: any) => {
      if (!data) {
        setAuthorIdErrorHandler({
          message: 'Please enter author id',
          status: 'error',
        });
        return 'error';
      }
      setAuthorIdErrorHandler({
        message: 'success',
        status: 'success',
      });
      return 'success';
    };

    const authorHandler = authorErrorHandler(authorId);

    if (
      titleHandler === 'error' ||
      descriptionHandler === 'error' ||
      priceHandler === 'error' ||
      liveIdHandler === 'error' ||
      authorHandler === 'error'
    ) {
      return toas('There is something wrong in your information', 'error');
    }

    // START UPLOADING
    setUploading(true);

    // upload video function
    try {
      // upload course
      await axios({
        method: 'PUT',
        url: '/course/update-course-admin',
        data: {
          title,
          description,
          price,
          liveId,
          authorId,
          courseID: courseIdState,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setUploading(true);
      toas('Course successfully edited', 'success');
      navigate('/admin-dashboard/course');
    } catch (err) {
      setUploading(false);
      if (err instanceof AxiosError) {
        const error = err?.response?.data?.message || err?.message;
        console.log(error);
        if (`${error}` === 'Invalid author id') {
          setAuthorIdErrorHandler({ message: error, status: 'error' });
        }
        toas(`${error}`, 'error');
        return 'error';
      }
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
            page="/course/edit"
          />
          {/* MAIN BODY */}
          <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
            Edit Course
          </div>
          {/* INPUTS */}

          <Loading />

          <div
            className={`w-[80%] ml-[50%] translate-x-[-50%] mobile:w-[90%] ${
              isLoading && 'hidden'
            }`}
          >
            {/* TITLE */}
            <InputComponent
              placeholder="Enter your course title"
              name="Title"
              type="text"
              setter={setTitle}
              error={titleErrorHandler}
              value={title}
            />
            {/* DESCRIPTION */}
            <TextArea
              setter={setDescription}
              error={descriptionErrorHandler}
              value={description}
            />
            {/* Author */}
            <InputComponent
              placeholder="Enter author id"
              name="Author id"
              type="text"
              setter={setAuthorId}
              error={authorIdErrorHandler}
              value={authorId}
            />
            {/* PRICE */}
            <InputComponent
              placeholder="Enter your course price"
              name="Price"
              type="number"
              setter={setPrice}
              error={priceErrorHandler}
              value={price}
            />
            {/* LIVE ID */}
            <InputComponent
              placeholder="Enter any id number for your live sessions"
              name="Live id"
              type="number"
              setter={setLiveId}
              error={liveIdErrorHandler}
              value={liveId}
            />

            {/* INTRODUCTION VIDEO */}

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

export default EditCourse;
