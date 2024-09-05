import { useState } from 'react';
import Header from '../../components/AdminDashboard/Header';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import SubHeader from '../../components/AdminDashboard/SubHeader';
import ImageInput from '../../components/AdminDashboard/ImageInput';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import toas from '../../utils/toas';
import { v4 as uuidv4 } from 'uuid';
import { firebaseUpload } from '../../utils/firebaseUpload';
import { inputTitleErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/inputTitleErrorHandlerFunction';
import { descriptionErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/descriptionErrorHandlerFunction';
import { priceErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/priceErrorHandlerFunction';
import { liveIdErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/liveIdErrorHandlerFunction';
import { fileErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/fileErrorHandlerFunction';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import TextArea from '../../components/AdminDashboard/TextArea';
import InputComponent from '../../components/AdminDashboard/InputComponent';

const CreateCourse = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const navigate = useNavigate();

  const [openSidebar, setopenSidebar] = useState(true);

  // VALUES
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [liveId, setLiveId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [authorId, setAuthorId] = useState('');

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
  const [imageErrorHandler, setImageErrorHandler] = useState({
    message: '',
    status: 'start',
  });
  const [authorIdErrorHandler, setAuthorIdErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  // OTHER STATES
  const [uploading, setUploading] = useState(false);

  // UPLOAD BUTTON FUNCTION
  const uploadButtonFunction = async () => {
    // ERROR HANDLER CHEKING
    const titleHandler = await inputTitleErrorHandlerFunction(
      title,
      setTitleErrorHandler,
      token,
      '/course/if-title-exist',
      50
    );
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
    const imageHandler = await fileErrorHandlerFunction(
      image,
      setImageErrorHandler
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
      imageHandler === 'error' ||
      authorHandler === 'error'
    ) {
      return toas('There is something wrong in your information', 'error');
    }

    // START UPLOADING
    setUploading(true);

    // upload video function
    const imagePath = `course/cover-photo/${title}-${uuidv4()}.${
      image?.type.split('/')[1]
    }`;
    try {
      const imageUrl = await firebaseUpload(image, imagePath);
      // upload course
      const res = await axios({
        method: 'POST',
        url: '/course/create-course',
        data: {
          title,
          description,
          price,
          liveId,
          imageUrl,
          authorId,
          imagePath,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const newCourse = res?.data;
      const filePath = `course/${newCourse?._id}/intro_video/adaptive.m3u8`;

      await axios({
        method: 'PUT',
        url: '/course/update-course-intro-video-after-convertion',
        data: { videoPath: filePath, courseId: newCourse?._id },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setUploading(true);
      toas('Course successfully uploaded', 'success');
      navigate('/admin-dashboard/course');
      // navigate("/")
    } catch (err) {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex">
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
            page="/create-course/add"
          />

          {/* MAIN BODY */}

          {/* TITLE */}
          <p className=" text-center font-semibold text-xl py-[10px] ">
            Create Course
          </p>

          {/* INPUTS */}
          <div className="w-[80%] ml-[50%] translate-x-[-50%] mobile:w-[90%]">
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

            {/* COVER PHOTO */}
            <ImageInput
              valueSetter={setImage}
              errorSetter={setImageErrorHandler}
              error={imageErrorHandler}
              label="Cover Photo"
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

          <div className="w-100 p-[10px]"></div>

          <div className="class"></div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
