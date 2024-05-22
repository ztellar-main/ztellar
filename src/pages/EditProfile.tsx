import { useState } from "react";
import Navbar from "../components/Navbar";
import OnPropImageInput from "../components/Author/OnPropImageInput";
import { PiWarningCircleFill } from "react-icons/pi";
import axios, { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../state/store";
import { v4 as uuidv4 } from "uuid";
import toas from "../utils/toas";
import { loginSuccess } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const EditProfile = () => {
  const preset_key = "zh6pbgqx";
  const [image, setImage] = useState("");
  const user = useAppSelector((state) => state.user.currentUser);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [imageError, setImageError] = useState({
    message: "",
    status: "start",
  });

  const [imageUploadProgress, setImageUploadProgress] = useState("");
  const [uploadImageState, setUploadImageState] = useState("start");
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [uploadDBState, setUploadDBState] = useState("");

  console.log({ imageUploadProgress, uploadImageState, uploadDisplay });

  const submitButtonFunction = async () => {
    setUploadImageState("start");

    const imageA = async () => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset_key);
      formData.append("public_id", `/${user?._id}/profilepic/${uuidv4()}`);
      setUploadDisplay(true);
      try {
        const res = await axios({
          method: "post",
          url: "https://api.cloudinary.com/v1_1/dbagrkam0/image/upload",
          data: formData,
          onUploadProgress: (e: any) => {
            const progress = Math.round((100 * e.loaded) / e.total).toString();
            setImageUploadProgress(progress);
          },
        });
        setUploadImageState("success");
        return res?.data?.public_id;
      } catch (err) {
        setUploadDisplay(false);
        toas(
          "There is something wrong. Please check your internet connection.",
          "error"
        );
        setUploadDisplay(false);
        console.log(err);
      }
    };

    const saveToDb = async () => {
      setUploadDisplay(true);
      const image_url = await imageA();
      try {
        setUploadDBState("start");
        const res = await axios({
          method: "put",
          url: "users/change-profile-pic",
          data: { imageUrl: image_url },
          headers: {
            authorization: `Token ${token}`,
          },
        });
        toas("Successfully updated profile picture", "success");
        dispatch(loginSuccess(res?.data));
        navigate("/");
        setUploadDBState("success");
        console.log(res?.data);
      } catch (err) {
        setUploadDisplay(false);
        console.log(err);
        if (err instanceof AxiosError) {
          const error =
            err?.response?.data?.message || err?.response?.data || err?.message;

          toas(error, "error");
        }
      }
    };
    saveToDb();
  };
  return (
    <div>
      <Navbar />

      <p className="text-center text-blue-800 font-semibold text-2xl my-[20px]">
        Change profile picture
      </p>
      <div className="w-[70%] p-[10px] bg-blue-50 ml-[50%] translate-x-[-50%] rounded shadow border border-gray-300 tablet:w-[90%] mobile:w-[95%]">
        {/* THUMBNAIL START*/}

        {uploadDisplay ? (
          <>
            <p className="text-center text-lg text-blue-800 font-semibold mb-[20px]">
              Upload please wait ...{" "}
            </p>
            <p
              className={`font-semibold text-base mb-[10px]
       ${uploadImageState === "start" && "text-blue-800"}
       ${uploadImageState === "success" && "text-green-600"}
       `}
            >
              Uploading image: {imageUploadProgress}%{" "}
            </p>
            <div
              className={`text-base flex items-center ${
                uploadDBState === "start" && "text-blue-800"
              }
      ${uploadDBState === "success" && "text-green-600"}`}
            >
              Finalizing ...
              {uploadDBState === "start" && (
                <CgSpinnerTwoAlt className="ml-[20px] animate-spin" />
              )}
            </div>
          </>
        ) : (
          <div className=" w-100 mt-[20px]">
            <p className="font-semibold mb-[2px]">Image</p>
            <div className="w-100 p-[10px] bg-white rounded shadow">
              <OnPropImageInput
                setImage={setImage}
                setImageErrorHandler={setImageError}
                imageErrorHandler={imageError}
              />
            </div>
            {/* ERROR HANDLER */}
            {imageError?.status === "failed" && (
              <div className="flex mt-[5px]">
                <PiWarningCircleFill className="text-red-600" />
                <p className="text-sm tablet:text-xs ml-[5px] text-red-600">
                  {imageError?.message}
                </p>
              </div>
            )}

            {imageError?.status === "success" && (
              <div className="flex mt-[5px]">
                <PiWarningCircleFill className="text-green-600" />
                <p className="text-sm tablet:text-xs ml-[5px] text-green-600">
                  {imageError?.message}
                </p>
              </div>
            )}

            <button
              onClick={submitButtonFunction}
              className="w-100 p-[10px] bg-blue-800 text-white rounded mt-[10px] hover:opacity-[80%] active:opacity-[60%] cursor-pointer"
            >
              Change Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
