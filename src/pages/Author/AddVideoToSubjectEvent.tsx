import { useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import axios, { AxiosError } from "axios";
import { useAppSelector } from "../../state/store";
import { PiWarningCircleFill } from "react-icons/pi";

// COMPONENTS
import OnDropSubjectVideoInput from "../../components/Author/OnDropSubjectVideoInput";
import toas from "../../utils/toas";

const AddVideoToSubjectEvent = () => {
  const token = useAppSelector((e) => e.user.token);
  const navigate = useNavigate();
  const [openSidebar, setOpenSide] = useState(true);

  //   INPUT VALUES
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File>();
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState(Number);
  const [uploadDisplay, setUploadDisplay] = useState(false);

  const [videoUploadState, setVideoUploadState] = useState("");

  //   ERROR HANDLER
  const [videoFileErrorHandler, setVideoFileErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [titleErrorHandler, setTitleErrorHandler] = useState({
    message: "",
    status: "start",
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("productId") || "";
  const subjectId = query.get("subjectId") || "";
  const subjectTitle = query.get("subjectTitle") || "";

  const titleOnChangeFunction = async (e: any) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
  };

  //   UPLOAD BUTTON FUNCTION
  const uploadButtonFunction = async () => {
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

    if (!title) {
      toas("There is something wrong in your information.", "error");
      return setTitleErrorHandler({
        message: "The title cannot be empty",
        status: "failed",
      });
    }

    // CHECK TITLE IF EXIST ON SUBJECT
    try {
      await axios({
        method: "post",
        url: "/product/check-video-title-exist-on-subject",
        data: {
          title: title,
          productId,
          subjectId,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });

      setTitleErrorHandler({ message: "success", status: "success" });
    } catch (err) {
      toas("There is something wrong in your information.", "error");
      if (err instanceof AxiosError) {
        const error =
          err?.response?.data?.message || err?.response?.data || err?.message;

        return setTitleErrorHandler({
          message: error,
          status: "failed",
        });
      }
    }

    if (!videoFile) {
      toas("There is something wrong in your information.", "error");
      return setVideoFileErrorHandler({
        message: "The video input file cannot be empty",
        status: "failed",
      });
    }

    // UPLOAD START
    setVideoUploadState("start");
    setUploadDisplay(true);
    try {
      const a = await axios({
        method: "post",
        url: "/private-video/private-video-get-cred",
      });

      const formData = new FormData();
      formData.append("key", a?.data?.clientPayload?.key);
      formData.append("policy", a?.data?.clientPayload?.policy);
      formData.append(
        "x-amz-signature",
        a?.data?.clientPayload?.["x-amz-signature"]
      );
      formData.append(
        "x-amz-algorithm",
        a?.data?.clientPayload?.["x-amz-algorithm"]
      );
      formData.append(
        "x-amz-credential",
        a?.data?.clientPayload?.["x-amz-credential"]
      );
      formData.append("x-amz-date", a?.data?.clientPayload?.["x-amz-date"]);
      formData.append("success_action_status", "201");
      formData.append("success_action_redirect", "http://localhost:3000");

      formData.append("file", videoFile);

      await axios.post(a?.data?.clientPayload?.uploadLink, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: any) => {
          console.log(e);
          const { loaded, total } = e;

          let percent = Math.floor((loaded * 100) / total);

          if (percent < 100) {
            setVideoUploadProgress(percent);
          }
        },
      });
      setVideoUploadState("success");
      setVideoUploadProgress(100);

      try {
        await axios({
          method: "put",
          url: "/product/add-video-to-event-subject",
          data: {
            title,
            productId,
            subjectId,
            duration: videoDuration,
            videoUrl: a?.data?.videoId,
          },
          headers: {
            authorization: `Token ${token}`,
          },
        });
        toas("The video is successfully uploaded", "success");
        navigate(`/author/event/setup?id=${productId}`);
      } catch (err) {
        navigate(`/author/event/setup?id=${productId}`);
        console.log(err);
      }
    } catch (err) {
      navigate(`/author/event/setup?id=${productId}`);
      console.log(err);
    }
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
            {/* UPLOADING START */}
            <div
              className={`w-[80%] tablet:w-100 ml-[50%] translate-x-[-50%]
                    ${!uploadDisplay && "hidden"}
              `}
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
                Uploading video : {videoUploadProgress} %
              </div>

              <div
                className={`flex items-center text-lg

              `}
              >
                Finalizing ...{" "}
                <CgSpinnerTwoAlt className="ml-[10px] animate-spin" />
              </div>
            </div>
            {/* UPLOAD END */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVideoToSubjectEvent;
