import { useState } from "react";
import toas from "../utils/toas";
import axios, { AxiosError } from "axios";
import * as EmailValidator from "email-validator";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const ResetPasswordPopup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const submitButton = async () => {
    setLoading("start");

    if (!email) {
      setLoading("");
      return toas("Please enter your email address", "error");
    }

    if (!EmailValidator.validate(email)) {
      setLoading("");
      return toas("Please enter valid email address.", "error");
    }
    try {
      setLoading("start");
      await axios({
        method: "post",
        url: "/users/password-reset-send-otp",
        data: { email },
      });
      setLoading("success");

      toas("Successful. OTP was sent to your email.", "success");
      navigate("/reset-password", {
        state: { email },
      });
    } catch (err) {
      setLoading("failed");
      console.log(err);
      if (err instanceof AxiosError) {
        const error =
          err?.response?.data?.message || err?.response?.data || err?.message;
        return toas(error, "error");
      }
    }
  };
  return (
    <>
      <div className="w-[50%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[11] rounded shadow border border-gray-300 tablet:w-[80%] mobile:w-[95%]">
        <div className="p-[10px] bg-blue-800 rounded-t text-lg font-semibold text-white">
          Reset Password
        </div>
        <div className="w-100 bg-white p-[10px]">
          <p className="text-center text-gray-800">
            Enter the email address of the account you want to reset the
            password.
          </p>
          <p className="text-sm font-semibold">Enter your email</p>
          {/* INPUT */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email."
            type="text"
            className="w-100 border border-gray-300 shadow p-[10px] rounded"
          />

          {/* SUBMIT BUTTON */}
          <button
            onClick={submitButton}
            className="w-100 p-[10px] bg-blue-800 text-whtie mt-[10px] rounded text-white relative"
          >
            Submit
            {loading === "start" && (
              <div className="absolute top-[50%] translate-y-[-50%] right-[20px]">
                <CgSpinnerTwoAlt className="w-100 h-100 animate-spin" />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPopup;
