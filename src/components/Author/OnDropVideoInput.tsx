import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

type Props = {
  setVideoIntro: any;
  setVideoErrorHandler: any;
  videoErrorHandler: any;
};

const OnDropVideoInput = ({
  setVideoIntro,
  setVideoErrorHandler,
  videoErrorHandler,
}: Props) => {
  const [videoPreview, setVideoPreview] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (!acceptedFiles[0]) return;

      const fileType = acceptedFiles[0].type.split("/")[0];
      const fileSize = acceptedFiles[0].size / 1048576;

      if (fileType !== "video") {
        return setVideoErrorHandler({
          message: "Please choose video file only.",
          status: "failed",
        });
      }

      if (fileSize > 1900) {
        return setVideoErrorHandler({
          message: "File size should be atleast 500mb and below.",
          status: "failed",
        });
      }

      setVideoIntro(acceptedFiles[0]);
      setVideoErrorHandler({ message: "success", status: "success" });

      const url = URL.createObjectURL(acceptedFiles[0]);
      setVideoPreview(url);
    },
    [setVideoIntro, setVideoErrorHandler]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`bg-gray-100 p-[10px] rounded  border-dotted border-[3px] border-gray-600 `}
    >
      <input {...getInputProps()} accept="video/*" />

      {isDragActive ? (
        <>
          <div className="flex flex-col items-center opacity-[60%]">
            {videoErrorHandler?.status === "success" && (
              <div className="w-100 mb-[10px]">
                <video src={videoPreview} className="w-100 h-[auto] rounded" />
              </div>
            )}

            <FiUploadCloud className="w-[auto] h-[50px] text-blue-600 mobile:hidden" />
            <p className="mobile:hidden text-gray-600 text-sm">
              Drag and drop youre event thumbnail here
            </p>
            <p className="mobile:hidden text-gray-600 text-sm">or</p>

            <button className="bg-blue-600 p-[10px] px-[20px] rounded text-white cursor-pointer">
              Browse file
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            {videoErrorHandler?.status === "success" && (
              <div className="mb-[10px] w-100">
                <video
                  src={videoPreview}
                  controls
                  className="w-100 h-[auto] rounded"
                />
              </div>
            )}

            {videoErrorHandler?.status === "failed" && ""}

            <FiUploadCloud className="w-[auto] h-[50px] text-blue-600 mobile:hidden" />
            <p className="mobile:hidden text-gray-600 text-sm">
              Drag and drop youre event video here{" "}
            </p>
            <p className="mobile:hidden text-gray-600 text-sm">or</p>

            <button className="bg-blue-600 p-[10px] px-[20px] rounded text-white cursor-pointer">
              Browse file
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OnDropVideoInput;
