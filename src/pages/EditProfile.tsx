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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const EditProfile = () => {
  const [image, setImage] = useState<File | null>(null);
  const user = useAppSelector((state) => state.user.currentUser);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [imageError, setImageError] = useState({
    message: "",
    status: "start",
  });

  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [uploadImageState, setUploadImageState] = useState("start");
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [uploadDBState, setUploadDBState] = useState("");

  console.log({ imageUploadProgress, uploadImageState, uploadDisplay });

  const submitButtonFunction = async () => {
    const imageFunction = async () => {
      return new Promise((resolve, reject) => {
        let profileName = "";
        if (user?.role === "company") {
          profileName = `profile_pics/${user?.company_name}/${uuidv4()}${
            image?.name
          }`;
        }
        if (user?.role === "member" || user?.role === "superAuthorUser") {
          profileName = `profile_pics/${user?.fname} ${
            user?.lname
          }/${uuidv4()}${image?.name}`;
        }

        console.log(profileName);

        const fileRef = ref(storage, profileName);

        if (!image) {
          return;
        }

        const uploadTask = uploadBytesResumable(fileRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress);
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (imageUlr: any) => {
                resolve(imageUlr);
              }
            );
          }
        );
      });
    };

    if (!image) {
      return toas("Please select image", "error");
    }

    const image_url = await imageFunction();

    if (image_url === undefined || image_url === "undefined") {
      return toas("Please select image", "error");
    }

    try {
      setUploadDisplay(true);
      setUploadImageState("start");
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
