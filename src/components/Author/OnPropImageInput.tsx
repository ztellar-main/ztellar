import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

type Props = {
  setImage: any;
  setImageErrorHandler: any;
  imageErrorHandler: any;
};

const OnPropImageInput = ({
  setImage,
  setImageErrorHandler,
  imageErrorHandler,
}: Props) => {
  const [imagePreview, setImagePreview] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (!acceptedFiles[0]) return;

      const fileType = acceptedFiles[0].type.split("/")[0];

      if (fileType !== "image")
        return setImageErrorHandler({
          message: "Please choose image file only.",
          status: "failed",
        });

      setImageErrorHandler({ message: "success", status: "success" });
      setImage(acceptedFiles[0]);

      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        const result: any = reader?.result;
        setImagePreview(result);
      };
    },
    [setImage, setImagePreview, setImageErrorHandler]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`bg-gray-100 p-[10px] rounded  border-dotted border-[3px] border-gray-600 `}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <>
          <div className="flex flex-col items-center opacity-[60%]">
            {imageErrorHandler?.status === "success" && (
              <div className="w-100">
                <img src={imagePreview} alt="" className="w-100 h-[auto]" />
              </div>
            )}

            <FiUploadCloud className="w-[auto] h-[50px] text-blue-600 mobile:hidden" />
            <p className="mobile:hidden text-gray-600 text-sm">
              Drag and drop youre event thumbnail here{" "}
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
            {imageErrorHandler?.status === "success" && (
              <div className="mb-[10px] w-100">
                <img
                  src={imagePreview}
                  alt=""
                  className="w-100 h-[auto] rounded"
                />
              </div>
            )}

            <FiUploadCloud className="w-[auto] h-[50px] text-blue-600 mobile:hidden" />
            <p className="mobile:hidden text-gray-600 text-sm">
              Drag and drop youre event thumbnail here{" "}
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
  // THUMBNAIL ONDROP INPUT START
};

export default OnPropImageInput;
