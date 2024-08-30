import { useState } from 'react';
import Header from '../../components/AuthorDashboard/Header';
import Sidebar from '../../components/AuthorDashboard/Sidebar';
import SubHeader from '../../components/AuthorDashboard/SubHeader';
import ImageInput from '../../components/AuthorDashboard/ImageInput';
import { MdErrorOutline } from 'react-icons/md';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import toas from '../../utils/toas';
import VideoInput from '../../components/AuthorDashboard/VideoInput';
import { v4 as uuidv4 } from 'uuid';
import { firebaseUpload } from '../../utils/firebaseUpload';
import { inputTitleErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/inputTitleErrorHandlerFunction';
import { descriptionErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/descriptionErrorHandlerFunction';
import { priceErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/priceErrorHandlerFunction';
import { liveIdErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/liveIdErrorHandlerFunction';
import { fileErrorHandlerFunction } from '../../utils/formsErrorHandlerFunctions/fileErrorHandlerFunction';

type TextAreaProps = {
  setter: any;
  error: any;
};

const TextArea = ({ setter, error }: TextAreaProps) => {
  return (
    <div className="w-100 mb-[10px]">
      {/* label */}
      <p className="text-sm font-bold text-gray-900 ml-[5px] mb-[5px]">
        Description
      </p>
      {/* input */}
      <textarea
        placeholder="Enter your course decription"
        className="w-100 border border-gray-600 rounded h-[70px] p-[10px]"
        onChange={(e: any) => setter(e.target.value)}
      ></textarea>
      {/* error handler output */}
      {error?.status !== 'start' && (
        <div
          className={`flex items-center pl-[5px] text-sm mt-[5px]
            ${error?.status === 'error' && 'text-red-600'}
            ${error?.status === 'success' && 'text-green-600'}
          `}
        >
          <MdErrorOutline className="mr-[5px]" />
          {error?.message}
        </div>
      )}
    </div>
  );
};

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  setter: any;
  error: any;
};

const InputComponent = ({
  name,
  type,
  placeholder,
  setter,
  error,
}: InputProps) => {
  return (
    <>
      <div className="w-100 mb-[10px]">
        {/* label */}
        <p className="text-sm font-bold text-gray-900 ml-[5px] mb-[5px]">
          {name}
        </p>
        {/* input */}
        <input
          type={type}
          placeholder={placeholder}
          className="w-100 p-[10px]  rounded border border-gray-600"
          onChange={(e: any) => setter(e.target.value)}
        />
        {/* error handler output */}
        {error?.status !== 'start' && (
          <div
            className={`flex items-center pl-[5px] text-sm mt-[5px]
            ${error?.status === 'error' && 'text-red-600'}
            ${error?.status === 'success' && 'text-green-600'}
          `}
          >
            <MdErrorOutline className="mr-[5px]" />
            {error?.message}
          </div>
        )}
      </div>
    </>
  );
};

const CreateCourse = () => {
  const token = useAppSelector((e: any) => e.user.token);

  const [openSidebar, setopenSidebar] = useState(true);

  // VALUES
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [liveId, setLiveId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

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
  const [videoErrorHandler, setVideoErrorHandler] = useState({
    message: '',
    status: 'start',
  });

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
    const videoHandler = await fileErrorHandlerFunction(
      video,
      setVideoErrorHandler
    );

    if (
      titleHandler === 'error' ||
      descriptionHandler === 'error' ||
      priceHandler === 'error' ||
      liveIdHandler === 'error' ||
      imageHandler === 'error' ||
      videoHandler === 'error'
    ) {
      return toas('There is something wrong in your information', 'error');
    }

    // START UPLOADING

    // upload video function
    try {
      const videoUrl = await firebaseUpload(
        video,
        `course/videos/not-converted/intro/${title}-${uuidv4()}.${
          video?.type.split('/')[1]
        }`
      );

      const imageUrl = await firebaseUpload(
        image,
        `course/cover-photo/${title}-${uuidv4()}.${video?.type.split('/')[1]}`
      );
      // upload course
      const res = await axios({
        method: 'POST',
        url: '/course/create-course',
        data: {
          title,
          description,
          price,
          liveId,
          videoUrl,
          imageUrl,
          socketId: uuidv4(),
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const newCourse = res?.data;
      const filePath = `course/converted/${newCourse?._id}/video_intro/${
        newCourse?.title
      }-${uuidv4()}`;
      const fileName = `${newCourse?.title}-${uuidv4()}`;
      await axios({
        method: 'POST',
        url: '/video/video-convert',
        data: { videoUrl: newCourse?.video_url, filePath, fileName },
      });

      const updatedCourse = await axios({
        method: 'PUT',
        url: '/course/update-course-intro-video-after-convertion',
        data: { videoPath: filePath, courseId: newCourse?._id },
        headers: {
          authorization: `Token ${token}`,
        },
      });

      console.log(updatedCourse?.data);
    } catch (err) {
      console.log(err);
    }

    return toas('success', 'success');
  };

  return (
    <>
      <div className="bg-gray-100 flex">
        <Sidebar
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="Create Course"
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
            />
            {/* DESCRIPTION */}
            <TextArea setter={setDescription} error={descriptionErrorHandler} />
            {/* PRICE */}
            <InputComponent
              placeholder="Enter your course price"
              name="Price"
              type="number"
              setter={setPrice}
              error={priceErrorHandler}
            />
            {/* LIVE ID */}
            <InputComponent
              placeholder="Enter any id number for your live sessions"
              name="Live id"
              type="number"
              setter={setLiveId}
              error={liveIdErrorHandler}
            />

            {/* COVER PHOTO */}
            <ImageInput
              valueSetter={setImage}
              errorSetter={setImageErrorHandler}
              error={imageErrorHandler}
              label="Cover Photo"
            />

            {/* INTRODUCTION VIDEO */}
            <VideoInput
              valueSetter={setVideo}
              errorSetter={setVideoErrorHandler}
              error={videoErrorHandler}
              label="Introduction Video"
            />

            {/* SUBMIT BUTTON */}
            <button
              onClick={uploadButtonFunction}
              className="bg-blue-600 text-white text-base w-100 p-[10px] rounded cursor-pointer hover:bg-blue-400"
            >
              Upload
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
