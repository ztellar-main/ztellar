import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toas from "../utils/toas";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const ResetPassword = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [errorHandler, setErrorHandler] = useState({
    message: "",
    status: "start",
  });

  const [loading, setLoading] = useState("");

  const submitButtonFunction = async () => {
    const avoidRegex = new RegExp(/[${}<>/]/g);
    const avoid = password.match(avoidRegex);
    setLoading("loading");

    if (!otp || !password || !rePassword) {
      setLoading("");
      setErrorHandler({
        message: "Please fill up all fields.",
        status: "failed",
      });
      return toas("Please fill up all fields.", "error");
    }

    if (avoid) {
      setLoading("");
      setErrorHandler({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
      return toas(
        "Please avoid using this characters $ , { , } , < , > , /",
        "error"
      );
    }

    const regex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*#?]{8,}$/
    );

    const test = regex.test(password);

    if (!test) {
      setLoading("");
      return toas(
        "Password must be 8 characters and above. Atleast one uppercase letter and one number.",
        "error"
      );
    }

    if (password !== rePassword) {
      setLoading("");
      setErrorHandler({
        message: "Passwords are not the same.",
        status: "failed",
      });
      return toas("Passwords are not the same.", "error");
    }

    try {
      const res = await axios({
        method: "put",
        url: "/users/reset-password",
        data: { email: userData?.email, otp, password },
      });

      console.log(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        const error =
          err?.response?.data?.message || err?.response?.data || err?.message;
        setErrorHandler({
          message: error,
          status: "failed",
        });
        setLoading("");
        toas(error, "error");
      }
    }
  };

  const resendOtpFunction = async () => {
    try {
      setErrorHandler({
        message: "Resending otp.",
        status: "sending",
      });
      setLoading("loading");
      await axios({
        method: "post",
        url: "/users/password-reset-send-otp",
        data: { email: userData?.email },
      });
      setErrorHandler({
        message: "",
        status: "start",
      });
      setLoading("success");

      toas("Successful. OTP was re sent to your email.", "success");
      navigate("/login");
    } catch (err) {
      setLoading("failed");
      console.log(err);
      if (err instanceof AxiosError) {
        const error =
          err?.response?.data?.message || err?.response?.data || err?.message;
        setErrorHandler({
          message: "",
          status: "start",
        });
        return toas(error, "error");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-[50%]  ml-[50%] translate-x-[-50%] mt-[30px] rounded shadow border border-gray-300 tablet:w-[80%] mobile:w-[95%]">
        <div className="p-[10px] bg-blue-800 rounded-t text-lg text-white">
          Reset password
        </div>

        <div className="w-100 p-[10px]">
          <p className="text-center mb-[10px]">Otp was sent to your email</p>
          <p className="text-center text-blue-800 underline font-semibold">
            {userData?.email}
          </p>

          {/* OTP INPUT */}
          <div className="w-100 mb-[10px]">
            <p className="text-sm font-semibold ml-[5px] text-gray-800 mb-[2px]">
              Enter otp
            </p>
            <input
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Please enter your otp."
              type="text"
              className="border w-100 p-[10px] border-gray-400 shadow rounded"
            />
          </div>

          {/* ENTER NEW PASSWORD */}
          <div className="w-100 mb-[10px]">
            <p className="text-sm font-semibold ml-[5px] text-gray-800 mb-[2px]">
              enter new password
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please enter your otp."
              type="text"
              className="border w-100 p-[10px] border-gray-400 shadow rounded"
            />
          </div>

          {/*RE ENTER NEW PASSWORD */}
          <div className="w-100 mb-[10px]">
            <p className="text-sm font-semibold ml-[5px] text-gray-800 mb-[2px]">
              Re enter new password
            </p>
            <input
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="Please enter your otp."
              type="text"
              className="border w-100 p-[10px] border-gray-400 shadow rounded"
            />
          </div>

          <div className="flex items-center justify-between mb-[10px]">
            <div
              className={`flex items-center  ${
                errorHandler?.status === "failed" && "text-red-600"
              }`}
            >
              {errorHandler?.status !== "start" && errorHandler?.message}

              {loading === "loading" && (
                <CgSpinnerTwoAlt className="w-[15px] h-[15px] animate-spin" />
              )}
            </div>

            <p
              onClick={resendOtpFunction}
              className="underline text-blue-800 font-semibold"
            >
              Resend otp
            </p>
          </div>

          <button
            onClick={submitButtonFunction}
            className="w-100 p-[10px] bg-blue-800 text-white rounded"
          >
            Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
