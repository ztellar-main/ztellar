import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import InputComponent from '../../../components/AdminDashboard/InputComponent';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import toas from '../../../utils/toas';
import { axiosError } from '../../../utils/axiosError';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import OnDropSubjectVideoInput from '../../../components/Author/OnDropSubjectVideoInput';
import { PiWarningCircleFill } from 'react-icons/pi';

const AddVideo = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const courseId = query.get('courseId') || '';
  const subjectId = query.get('subjectId') || '';
  const subjectTitle = query.get('title') || '';

  // video states
  const [videoFile, setVideoFile] = useState<File>();

  //   ERROR HANDLER
  const [videoFileErrorHandler, setVideoFileErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  // values
  const [title, setTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState(null);
  console.log(videoDuration);

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

    const uploadVideoToFirebase = new Promise((resolve: any, reject: any) => {
      if (!videoFile) {
        return setVideoFileErrorHandler({
          message: 'Please enter video file.',
          status: 'error',
        });
      }

      try {
        // UPLOAD VIDEO INTRO
        const fileRef = ref(
          storage,
          `videos/course/${courseId}/${subjectId}/${title}${uuidv4()}`
        );
        const uploadTask = uploadBytesResumable(fileRef, videoFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setVideoUploadProgress(progress);
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref).then(
              async (video) => {
                resolve(video);
              }
            );
          }
        );
      } catch (err) {
        // navigate(`/author/event/setup?id=${productId}`);
        console.log(err);
      }
    });

    // start upload
    setUploading(true);
    try {
      const videoUrl = await uploadVideoToFirebase;
      console.log(videoUrl);
      await axios({
        method: 'PUT',
        url: '/course/add-video-to-subject-course-admin',
        data: { title, courseId, subjectId, videoUrl },
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
          {/* video input */}
          <OnDropSubjectVideoInput
            setVideoFile={setVideoFile}
            videoFileErrorHandler={videoFileErrorHandler}
            setVideoFileErrorHandler={setVideoFileErrorHandler}
            setVideoDuration={setVideoDuration}
          />
          {videoFileErrorHandler?.status !== 'start' && (
            <div
              className={` mt-[5px] ml-[10px] flex items-center ${
                videoFileErrorHandler?.status === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              <PiWarningCircleFill className="mr-[5px]" />
              {videoFileErrorHandler?.message}
            </div>
          )}
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
