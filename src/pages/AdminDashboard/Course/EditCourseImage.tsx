import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../../state/store';
import { Navigate, useNavigate } from 'react-router-dom';
import ImageInput from '../../../components/AdminDashboard/ImageInput';
import { fileErrorHandlerFunction } from '../../../utils/formsErrorHandlerFunctions/fileErrorHandlerFunction';
import toas from '../../../utils/toas';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { firebaseUpload } from '../../../utils/firebaseUpload';

const EditCourseImage = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  const token = useAppSelector((e: any) => e.user.token);
  const navigate = useNavigate();

  // VALUES
  const [image, setImage] = useState<File | null>(null);

  // ERROR HANDLER STATE
  const [imageErrorHandler, setImageErrorHandler] = useState({
    message: '',
    status: 'start',
  });

  // OTHER STATES
  const [uploading, setUploading] = useState(false);

  //   query course
  const {
    data: courseData,
    isError,
    isLoading,
  } = useQuery({
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

  const uploadButtonFunction = async () => {
    const imageHandler = await fileErrorHandlerFunction(
      image,
      setImageErrorHandler
    );

    if (imageHandler === 'error') {
      return toas('There is something wrong in your information', 'error');
    }

    const deleteFile = (filePath: any) => {
      const storage = getStorage();
      const fileRef = ref(storage, filePath);

      deleteObject(fileRef)
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });
    };

    // START UPLOADING
    setUploading(true);

    // upload video function
    const imagePath = `course/cover-photo/${courseData?.title}-${uuidv4()}.${
      image?.type.split('/')[1]
    }`;
    try {
      const imageUrl = await firebaseUpload(image, imagePath);

      if (courseData?.image_path) {
        deleteFile(courseData?.image_path);
      }

      await axios({
        method: 'PUT',
        url: '/course/update-course-image-admin',
        data: {
          courseId: courseData?._id,
          imageUrl: imageUrl,
          imagePath: imagePath,
        },
      });
      toas('Course successfully uploaded', 'success');
      navigate('/admin-dashboard/course');
    } catch (err) {
      setUploading(false);
      if (err instanceof AxiosError) {
        const error = err?.response?.data?.message || err?.message;
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
            page="/course/edit-cover-photo"
          />

          {/* MAIN BODY */}
          <div className="w-100 flex items-center justify-center text-gray-700 font-semibold tracking-wider mt-[10px] text-xl">
            Edit Course Cover Photo
          </div>

          {/* LOADING */}
          <Loading />

          <div
            className={`w-[80%] ml-[50%] translate-x-[-50%] mobile:w-[90%] ${
              isLoading && 'hidden'
            }`}
          >
            <div className="w-100 flex justify-center items-center my-[10px]">
              <img
                src={courseData?.image_url}
                alt="Course image"
                className="w-[500px] h-[auto] rounded shadow"
              />
            </div>

            {/* COVER PHOTO */}
            <ImageInput
              valueSetter={setImage}
              errorSetter={setImageErrorHandler}
              error={imageErrorHandler}
              label="Cover Photo"
            />

            {/* SUBMIT BUTTON */}
            <button
              onClick={() => {
                if (uploading) {
                  return;
                }
                uploadButtonFunction();
              }}
              className={`bg-blue-600 relative text-white text-base w-100 p-[10px] rounded cursor-pointer hover:bg-blue-900 mb-[20px] ${
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

export default EditCourseImage;
