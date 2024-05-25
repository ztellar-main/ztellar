import { useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import axios, { AxiosError } from "axios";
import toas from "../utils/toas";
import { useAppDispatch } from "../state/store";
import { loginSuccess, token } from "../state/userSlice";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import ResetPasswordPopup from "../components/ResetPasswordPopup";

const Login = () => {
  const [passwordSeen, setPasswordSeen] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const navigate = useNavigate();

  const loginButtonFunction = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "/users/login",
        data: { email, password },
      });

      const id = res?.data?.data?._id;
      const fname = res?.data?.data?.fname;
      const mname = res?.data?.data?.mname;
      const lname = res?.data?.data?.lname;
      const mobileNumber = res?.data?.data?.mobile_number;

      const emails = res?.data?.data?.email;

      if (
        fname === "New User" ||
        !fname ||
        !mname ||
        !lname ||
        !mobileNumber
      ) {
        return navigate("/complete-info", {
          state: { id, emails },
        });
      }

      dispatch(loginSuccess(res?.data?.data));
      dispatch(token(res?.data?.token));
      toas("You are successfully logged in.", "success");
    } catch (err) {
      if (err instanceof AxiosError) {
        toas(err?.response?.data?.message, "error");
      }
    }
  };

  // GOOGLE LOGIN
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      setGoogleLoading(true);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        setGoogleLoading(true);
        try {
          const loginRes = await axios({
            method: "post",
            url: "/users/google-login",
            data: { email: res?.data?.email },
          });

          const id = loginRes?.data?.data?._id;
          const fname = loginRes?.data?.data?.fname;
          const mname = loginRes?.data?.data?.mname;
          const lname = loginRes?.data?.data?.lname;
          const mobileNumber = loginRes?.data?.data?.mobile_number;

          const emails = loginRes?.data?.data?.email;

          if (
            fname === "New User" ||
            !fname ||
            !mname ||
            !lname ||
            !mobileNumber
          ) {
            return navigate("/complete-info", {
              state: { id, emails },
            });
          }

          dispatch(loginSuccess(loginRes?.data?.data));
          dispatch(token(loginRes?.data?.token));
          setGoogleLoading(false);
          toas("You are successfully logged in.", "success");
        } catch (err) {
          setGoogleLoading(false);
          if (err instanceof AxiosError) {
            toas(err?.response?.data?.message, "error");
          }
        }
      } catch (err) {
        setGoogleLoading(false);
        toas(
          "Please use your default browser to login using google login button",
          "error"
        );
      }
    },
  });

  return (
    <>
      {resetOpen && (
        <>
          <ResetPasswordPopup />
          <div
            onClick={() => setResetOpen(false)}
            className="w-100 h-[100vh] bg-gray-900 fixed top-0 left-0 z-[10] opacity-[50%]"
          />
        </>
      )}

      <div className="bg-gray-50 h-100vh">
        <Navbar />

        {/* MAIN BODY */}
        <div className="ml-[50%] translate-x-[-50%] flex flex-col items-center tablet:w-[80%] mobile:w-[95%] ">
          <p className="text-center text-xl font-bold text-blue-600 my-[10px] ">
            Welcome to Ztellar
          </p>

          <div className="w-100  bg-white border border-gray-300 rounded">
            {/* CARD HEADER */}
            <div className="bg-blue-600 w-100 p-[5px] text-white rounded-t font-semibold text-base">
              Login
            </div>

            {/* BOTTOM BODY */}
            <div className="p-[10px]">
              {/* EMAIL */}
              <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
                Email
              </p>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter your email address."
                className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] outline-blue-600 laptop:text-sm mobile:text-base mb-[10px]"
              />

              {/* PASSWORD */}
              <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
                Password
              </p>
              <div className="relative mb-[15px]">
                <input
                  type={passwordSeen}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your password."
                  className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] outline-blue-600 laptop:text-sm mobile:text-base "
                />
                {passwordSeen === "text" && (
                  <AiOutlineEye
                    onClick={() => setPasswordSeen("password")}
                    className="absolute right-[10px] top-[50%] w-[20px] h-[20px] text-blue-600 translate-y-[-50%] cursor-pointer"
                  />
                )}
                {passwordSeen === "password" && (
                  <AiOutlineEyeInvisible
                    onClick={() => setPasswordSeen("text")}
                    className="absolute right-[10px] top-[50%] w-[20px] h-[20px] text-gray-600 translate-y-[-50%] cursor-pointer"
                  />
                )}
              </div>

              {/* LOGIN BUTTON */}
              <button
                onClick={loginButtonFunction}
                className="text-base bg-blue-600 text-white w-100 p-[5px] rounded cursor-pointer  hover:bg-blue-500 active:bg-blue-600 laptop:text-sm mobile:text-base"
              >
                Login
              </button>

              <p
                onClick={() => setResetOpen(true)}
                className="text-right mr-[5px] mt-[10px] text-blue-800 underline cursor-pointer"
              >
                Forgot password
              </p>
            </div>
          </div>

          {/* BOTTOM CONTAINER */}

          <div className="flex items-center w-100 mt-[30px]">
            <hr className="grow border-t border-gray-400" />
            <p className="mx-[20px] text-gray-700 font-semibold">
              or login with
            </p>
            <hr className="grow border-t border-gray-400" />
          </div>

          <p className="text-gray-600 text-xs">
            Please use your default browser to use the google login button.
          </p>
          <div className="flex relative bg-red-100 mt-[10px]">
            <button
              onClick={() => googleLogin()}
              className="bg-blue-600 flex items-center p-[5px] rounded shadow hover:opacity-[80%] active:opacity-[100%] "
            >
              <div className="w-[40px] h-[40px] bg-white rounded flex items-center justify-center">
                <FcGoogle className="w-[25px] h-[auto]" />
              </div>
              <p className="text-white mx-[10px]">Login with Google</p>
            </button>

            {googleLoading && (
              <div className="absolute right-[-40px] top-[50%] translate-y-[-50%]">
                <CgSpinnerTwoAlt className="animate-spin w-[30px] h-[30px] text-indigo-900 " />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
