import { useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
// import { useAppSelector } from "../../state/store";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import axios, { AxiosError } from "axios";
import { useAppSelector } from "../../state/store";
import { PiWarningCircleFill } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

// COMPONENTS
import OnDropSubjectVideoInput from "../../components/Author/OnDropSubjectVideoInput";
import toas from "../../utils/toas";

const AddVideoToSubjectEvent = () => {
  const user = useAppSelector((e) => e.user.currentUser);
  const token = useAppSelector((e) => e.user.token);
  const preset_key = "zh6pbgqx";
  const CLOUD_NAME = "dbagrkam0";
  const navigate = useNavigate();
  const [openSidebar, setOpenSide] = useState(true);
  const [uploadDisplay, setUploadDisplay] = useState(false);

  //   UPLOAD PROGRESS
  const [videoUploadProgress, setVideoUploadProgress] = useState("");

  // CHUNK START
  const [videoChunkCount, setVideoChunkCount] = useState(0);
  const [videoChunk, setVideoChunk] = useState(0);

  //   UPLOAD START
  const [videoUploadState, setVideoUploadState] = useState("");
  const [uploadDbState, setUploadDbState] = useState("");

  //   INPUT VALUES
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File>();
  const [videoDuration, setVideoDuration] = useState(null);

  //   ERROR HANDLER
  const [videoFileErrorHandler, setVideoFileErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [titleErrorHandler, setTitleErrorHandler] = useState({
    message: "",
    status: "start",
  });

  //   const token = useAppSelector((e) => e.user.token);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("productId") || "";
  const subjectId = query.get("subjectId") || "";
  const subjectTitle = query.get("subjectTitle") || "";

  const titleOnChangeFunction = async (e: any) => {
    const titleValue = e.target.value;
    setTitle(titleValue);

    if (!titleValue) {
      return setTitleErrorHandler({
        message: "Please enter your video title.",
        status: "failed",
      });
    }

    try {
      await axios({
        method: "post",
        url: "/product/check-event-subject",
        data: {
          productId,
          subjectId,
          subjectTitle,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });

      setTitleErrorHandler({ message: "success", status: "success" });
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err?.response?.data?.message || err?.message;

        if (error === "Something went wrong please try again.") {
          toas(error, "error");
          return navigate("/author/add-event");
        }
        setTitleErrorHandler({ message: error, status: "failed" });
      }
    }

    // CHECK TITLE IF EXIST ON SUBJECT
    try {
      await axios({
        method: "post",
        url: "/product/check-video-title-exist-on-subject",
        data: {
          title:titleValue,
          productId,
          subjectId,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return setTitleErrorHandler({ message: "success", status: "success" });
    } catch (err) {
      if (err instanceof AxiosError) {
        const error =
          err?.response?.data?.message || err?.response?.data || err?.message;

        return setTitleErrorHandler({
          message: error,
          status: "failed",
        });
      }
    }
  };

  //   UPLOAD BUTTON FUNCTION
  const uploadButtonFunction = async () => {
    // TITLE FUNCTION START

    if (!title) {
      toas("There is something wrong in your video information.", "error");
      return setTitleErrorHandler({
        message: "Please enter your video title.",
        status: "failed",
      });
    }

    if (!videoFile) {
      toas("There is something wrong in your video information.", "error");
      return setVideoFileErrorHandler({
        message: "Please choose your video file.",
        status: "failed",
      });
    }

    if (
      videoFileErrorHandler?.status !== "success" ||
      titleErrorHandler?.status !== "success"
    ) {
      return toas(
        "There is something wrong in your video information.",
        "error"
      );
    }

    setUploadDisplay(true);

    // UPLOAD VIDEO FUNCTION
    const generateUniqueUploadId = () => {
      return `uqid-${Date.now()}`;
    };
    const uploadVideoFunction = async () => {
      setVideoUploadState("start");

      const uniqueUploadId = generateUniqueUploadId();
      const chunkSize = 5 * 1024 * 1024;
      const totalChunks = Math.ceil(videoFile.size / chunkSize);
      let currentChunk = 0;
      let a = 0;
      setVideoChunkCount(Math.round(videoFile.size / chunkSize));

      const uploadChunk = async (start: any, end: any) => {
        const formData = new FormData();
        formData.append("file", videoFile.slice(start, end));
        // formData.append("cloud_name", CLOUD_NAME);
        formData.append("upload_preset", preset_key);
        formData.append("public_id", `/${user?._id}/${title}/${uuidv4()}`);
        const contentRange = `bytes ${start}-${end - 1}/${videoFile.size}`;

        setVideoChunk(a);

        try {
          const response: any = await axios(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            {
              method: "POST",
              data: formData,

              headers: {
                "X-Unique-Upload-Id": uniqueUploadId,
                "Content-Range": contentRange,
              },
              onUploadProgress: (e: any) => {
                const progress = Math.round(
                  (100 * e.loaded) / e.total
                ).toString();
                setVideoUploadProgress(progress);
              },
            }
          );

          currentChunk++;
          a++;

          if (currentChunk < totalChunks) {
            const nextStart = currentChunk * chunkSize;
            const nextEnd = Math.min(nextStart + chunkSize, videoFile.size);
            uploadChunk(nextStart, nextEnd);
          } else {
            const q = await response;
            const videoUrl = q?.data?.public_id;

            setVideoUploadState("success");

            if (titleErrorHandler?.status === "success") {
              try {
                setUploadDbState("state");
                await axios({
                  method: "put",
                  url: "/product/add-video-to-event-subject",
                  data: {
                    title,
                    productId,
                    subjectId,
                    duration: videoDuration,
                    videoUrl,
                  },
                  headers: {
                    authorization: `Token ${token}`,
                  },
                });
                setUploadDbState("success");
                toas("Video successfully uploaded.", "success");
                navigate(`/author/event/setup?id=${productId}`);
              } catch (err) {
                if (err instanceof AxiosError) {
                  const error =
                    err?.response?.data?.message ||
                    err?.response?.data ||
                    err?.message;
                  if (error === "Something went wrong please try again.") {
                    return navigate("/author/add-event");
                  }

                  if (error === "Video title already exist.") {
                    return toas(
                      "This video title already exist on this subject.",
                      "error"
                    );
                  } else {
                    toas(
                      "There is something wrong. Please check your internet connection.",
                      "error"
                    );
                    navigate("/author/add-event");
                  }
                }
              }
            }
          }
        } catch (err) {
          if (err instanceof AxiosError) {
            const error =
              err?.response?.data?.message ||
              err?.response?.data ||
              err?.message;

            toas(error, "error");
          }
        }
      };

      const start = 0;
      const end = Math.min(chunkSize, videoFile.size);
      uploadChunk(start, end);
    };
    uploadVideoFunction();
  };

  return (
    <>
      <div className="flex">
        <AuthorSidebar
          page="add-event"
          openSidebar={openSidebar}
          setOpenSide={setOpenSide}
        />
        <div className={`grow bg-gray-50 `}>
          <div className="bg-indigo-900 p-[5px] w-100 sticky h-[40px] top-0 left-0 z-[10]">
            <p className="text-white text-center">Author dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px] sticky top-[40px] left-0 z-[10]">
            {openSidebar ? (
              <div className="tablet:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(true)}
                className="transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            {!openSidebar ? (
              <div className="mobileMin:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(false)}
                className="tabletMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            <p className="mr-[10px]">Add-video-to-subject-event</p>
          </div>

          {/* MAIN BODY */}

          <div className="grow p-[10px] bg-gray-100">
            {/* UPLOAD START */}
            <div
              className={`w-[80%] tablet:w-100 ml-[50%] translate-x-[-50%] ${
                uploadDisplay && "hidden"
              }`}
            >
              <div className="w-100 bg-white rounded shadow p-[10px]">
                <p className="text-center font-semibold text-2xl text-indigo-900">
                  Add video to
                </p>
                <p className="text-gray-800 text-center mb-[20px]">
                  Subject title: {subjectTitle}
                </p>

                {/* TITLE START */}
                <p className="font-semibold ml-[2px]">Title</p>
                <input
                  type="text"
                  onChange={titleOnChangeFunction}
                  placeholder="Enter video title."
                  className="border w-100 p-[10px] rounded"
                />
                {/* ERROR HANDLER */}
                {titleErrorHandler?.status !== "start" && (
                  <div
                    className={`mt-[5px] ml-[10px] flex items-center ${
                      titleErrorHandler?.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <PiWarningCircleFill className="mr-[5px]" />
                    {titleErrorHandler?.message}
                  </div>
                )}

                {/* TITLE END */}

                <OnDropSubjectVideoInput
                  setVideoFile={setVideoFile}
                  videoFileErrorHandler={videoFileErrorHandler}
                  setVideoFileErrorHandler={setVideoFileErrorHandler}
                  setVideoDuration={setVideoDuration}
                />
                {videoFileErrorHandler?.status !== "start" && (
                  <div
                    className={` mt-[5px] ml-[10px] flex items-center ${
                      videoFileErrorHandler?.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <PiWarningCircleFill className="mr-[5px]" />
                    {videoFileErrorHandler?.message}
                  </div>
                )}

                <button
                  onClick={uploadButtonFunction}
                  className="mt-[20px] bg-indigo-800 text-white p-[10px] w-100 rounded hover:bg-indigo-600 active:bg-indigo-800"
                >
                  Upload video
                </button>
              </div>
            </div>
            {/* UPLOAD END */}

            {/* UPLOADING START */}
            <div
              className={`w-[80%] tablet:w-100 ml-[50%] translate-x-[-50%] ${
                !uploadDisplay && "hidden"
              }`}
            >
              <p className="text-center font-semibold text-2xl text-indigo-900">
                Uploading video to
              </p>
              <p className="text-gray-800 text-center mb-[20px]">
                Subject title: {subjectTitle}
              </p>

              <div
                className={`flex items-center text-lg mb-[10px]
                ${videoUploadState === "" && "text-gray-600"}
                ${videoUploadState === "start" && "text-indigo-800"}
                ${videoUploadState === "success" && "text-green-600"}
                `}
              >
                Uploading video : ({videoChunk} / {videoChunkCount}){" "}
                {videoUploadProgress}%{" "}
                {videoUploadState === "start" && (
                  <CgSpinnerTwoAlt className="ml-[10px] animate-spin" />
                )}
              </div>

              <div
                className={`flex items-center text-lg
                ${uploadDbState === "" && "text-gray-600"}
                ${uploadDbState === "start" && "text-indigo-800"}
                ${uploadDbState === "success" && "text-green-600"}
              `}
              >
                Finalizing ...{" "}
                {uploadDbState === "start" && (
                  <CgSpinnerTwoAlt className="ml-[10px] animate-spin" />
                )}
              </div>
            </div>
            {/* UPLOADING END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVideoToSubjectEvent;
