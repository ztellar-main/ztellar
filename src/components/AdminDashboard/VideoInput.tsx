import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdErrorOutline } from 'react-icons/md';

import { IoCloudUploadOutline } from 'react-icons/io5';

type Props = {
  valueSetter: any;
  errorSetter: any;
  error: any;
  label: string;
};

const VideoInput = ({ valueSetter, errorSetter, error, label }: Props) => {
  // const [videoPreview, setVideoPreview] = useState('');

  const onDrop = useCallback((acceptedFiles: any) => {
    if (!acceptedFiles[0]) return;

    const fileType = acceptedFiles[0].type.split('/')[0];

    if (fileType !== 'video') {
      errorSetter({
        message: 'Please select an video file',
        status: 'error',
      });
      return;
    }

    valueSetter(acceptedFiles);
    errorSetter({
      message: 'success',
      status: 'success',
    });

    // const reader = new FileReader();
    // reader.readAsDataURL(acceptedFiles[0]);
    // reader.onload = () => {
    //   const result: any = reader?.result;
    //   setVideoPreview(result);
    // };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <>
      <div className="w-100 mb-[10px]">
        <p className="text-sm font-bold text-gray-900 ml-[5px] mb-[5px]">
          {label}
        </p>
        <div
          {...getRootProps()}
          className={`cursor-pointer border rounded ${
            isDragActive
              ? 'opacity-60 border-gray-600'
              : 'bg-white  border-gray-600 '
          }`}
        >
          <input {...getInputProps()} className="w-100 bg-green-100" />

          <div className={`w-100   p-[10px] rounded`}>
            {/* DOTTED CONTAINER */}
            <div className="border-[3px] border-dotted border-gray-500 p-[10px] rounded">
              {/* {videoPreview && (
                <div className="w-100 mb-[10px]">
                  <video
                    src={videoPreview}
                    controls
                    className="w-100 h-[auto] rounded"
                  />
                </div>
              )} */}
              <IoCloudUploadOutline className="w-[70px] h-[auto] ml-[50%] translate-x-[-50%] text-blue-600 mobile:hidden" />
              <p className="text-center text-sm mobile:hidden">
                Drag and drop your video here
              </p>
              <p className="text-center text-sm mobile:hidden">or</p>
              <button className="ml-[50%] translate-x-[-50%] p-[10px] bg-blue-600 px-[20px] rounded cursor-pointer text-white hover:bg-blue-400 ">
                Browse File
              </button>
            </div>
            {/* IMAGE PREVIEW */}
          </div>
        </div>
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

export default VideoInput;
