import { useState } from "react";
import Navbar from "../components/Navbar";
import TermsOfUse from "../components/TermsOfUse";
import PrivacyPolicy from "../components/PrivacyPolicy";
import * as EmailValidator from "email-validator";
import axios, { AxiosError } from "axios";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdOutlineCheckCircle } from "react-icons/md";
import toas from "../utils/toas";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const CompanySignup = () => {
  const navigate = useNavigate();
  const [termsOfUseOpen, setTermsOfUseOpen] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  //   error handler component
  type Props = {
    errorHandler: any;
  };
  const ErrorHandlerComponent = ({ errorHandler }: Props) => {
    return (
      <>
        {errorHandler?.status !== "start" && (
          <div
            className={`flex items-center text-sm
                  ${errorHandler?.status === "error" && "text-red-600"}
                  ${errorHandler?.status === "success" && "text-green-600"}
                  `}
          >
            {errorHandler?.status === "error" && (
              <PiWarningCircleFill className="mx-[5px]" />
            )}
            {errorHandler?.status === "success" && (
              <MdOutlineCheckCircle className="mx-[5px]" />
            )}

            {errorHandler?.message}
          </div>
        )}
      </>
    );
  };

  // values
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyContactNumber, setCompanyContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  //   error handlers
  const [emailErrorHandler, setEmailErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [companyNameErrorHandler, setCompanyNameErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [
    companyContactNumberErrorHandler,
    setCompanyContactNumberErrorHandler,
  ] = useState({
    message: "",
    status: "start",
  });
  const [passwordErrorHandler, setPasswordErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [repasswordErrorHandler, setRepasswordErrorHandler] = useState({
    message: "",
    status: "start",
  });

  // AGREEMENT FUNCTION
  const agreementFunction = (e: any) => {
    setAgreement(e.target.checked);
  };

  //   SIGNUP FUNCTION
  const signupFunction = async () => {
    // email validation
    const emailFunction = async () => {
      if (!email) {
        setEmailErrorHandler((data: any) => {
          data = {
            message: "Please enter email address",
            status: "error",
          };
          return data;
        });
        return false;
      }

      if (!EmailValidator.validate(email)) {
        setEmailErrorHandler((data) => {
          data = {
            message: "Please enter valid email address",
            status: "error",
          };
          return data;
        });
        return false;
      }

      try {
        await axios({
          method: "post",
          url: "/users/get-email",
          data: { email },
        });

        setEmailErrorHandler({
          message: "success",
          status: "success",
        });
        return true;
      } catch (err) {
        if (err instanceof AxiosError) {
          setEmailErrorHandler({
            message: err?.response?.data?.message || err?.message,
            status: "error",
          });
        }
        return false;
      }
    };

    // company name validation
    const companyNameFunction = async () => {
      if (!companyName) {
        setCompanyNameErrorHandler({
          message: "Please enter your company name",
          status: "error",
        });
        return false;
      }

      setCompanyNameErrorHandler({
        message: "success",
        status: "success",
      });
      return true;
    };

    // company contact number validtion
    const companyContactNUmberFunction = async () => {
      if (!companyContactNumber) {
        setCompanyContactNumberErrorHandler({
          message: "Please enter your contact number",
          status: "error",
        });
        return false;
      }

      setCompanyContactNumberErrorHandler({
        message: "success",
        status: "success",
      });
      return true;
    };

    // password function
    const passwordFunction = async () => {
      const avoidRegex = new RegExp(/[${}<>/]/g);
      const avoid = password.match(avoidRegex);

      const regex = new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*#?]{8,}$/
      );

      if (!password) {
        setPasswordErrorHandler({
          message: "Please enter your password",
          status: "error",
        });
        return false;
      }

      const test = regex.test(password);
      if (avoid) {
        setPasswordErrorHandler({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "error",
        });
        return false;
      }

      if (!test) {
        setPasswordErrorHandler({
          message:
            "Password must be 8 characters and above. Atleast one uppercase letter and one number.",
          status: "error",
        });
        return false;
      } else {
        setPasswordErrorHandler({
          message: "success",
          status: "success",
        });
        return true;
      }
    };

    // re enter password validation
    const reEnterPasswordFunction = async () => {
      if (!repassword) {
        setRepasswordErrorHandler({
          message: "Please re enter your password",
          status: "error",
        });
        return false;
      }

      if (password !== repassword) {
        setRepasswordErrorHandler({
          message: "Password does not match",
          status: "error",
        });
        return false;
      }

      setRepasswordErrorHandler({
        message: "success",
        status: "success",
      });
      return true;
    };

    await emailFunction(),
      await companyNameFunction(),
      await companyContactNUmberFunction(),
      await passwordFunction(),
      await reEnterPasswordFunction();

    if (
      !(await emailFunction()) ||
      !(await companyNameFunction()) ||
      !(await companyContactNUmberFunction()) ||
      !(await passwordFunction()) ||
      !(await reEnterPasswordFunction())
    ) {
      return toas("Something is wrong in your information", "error");
    }

    if (!agreement) {
      return toas("Please agree to the terms and conditions", "error");
    }

    try {
      setButtonLoading(true);
      await axios({
        method: "post",
        url: "/users/send-otp",
        data: { email },
      });
      setButtonLoading(false);
      toas("Successful. Please verify your email.", "success");
      navigate("/company-email-verify", {
        state: { email, companyName, companyContactNumber, password },
      });
    } catch (err) {
      setButtonLoading(false);
      if (err instanceof AxiosError) {
        return toas("OTP did not send. Please signup again.", "error");
      }
    }
  };
  return (
    <>
      <div>
        <Navbar />
        {/* HEAD */}
        <p className="text-blue-600 text-xl font-bold text-center my-[10px]">
          Welcome to Ztellar
        </p>

        {/* CONTAINER */}
        <div className="w-[700px] tablet:w-[98%] ml-[50%] translate-x-[-50%] rounded shadow-lg border border-gray-200">
          {/* container header */}
          <div className="w-100 p-[10px] bg-blue-600 rounded-t text-white font-semibold text-lg">
            Create Company Account
          </div>
          {/* bottom container */}
          <div className="p-[10px]">
            {/* message */}
            <p className="text-gray-800 mb-[10px]">
              Please enter your real information. If ever you want to change
              something on your account information, please contact our tech
              support team.
            </p>

            <p
              onClick={() => navigate("/signup")}
              className="text-sm mb-[10px] ml-[5px] text-blue-600 underline hover:cursor-pointer hover:text-blue-400"
            >
              Create member account
            </p>
            {/* email */}
            <div className="mb-[10px]">
              {/* label */}
              <p className="text-gray-800 font-bold text-sm">Email</p>
              <input
                type="text"
                placeholder="Please enter company email"
                className="w-100 border p-[10px] rounded bg-gray-50"
                onChange={(e) =>
                  setEmail((data) => {
                    data = e.target.value;
                    return data;
                  })
                }
              />
              <ErrorHandlerComponent errorHandler={emailErrorHandler} />
            </div>

            {/* company name */}
            <div className="mb-[10px]">
              {/* label */}
              <p className="text-gray-800 font-bold text-sm">Company name</p>
              <input
                type="text"
                placeholder="Please enter company name"
                className="w-100 border p-[10px] rounded bg-gray-50"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <ErrorHandlerComponent errorHandler={companyNameErrorHandler} />
            </div>

            {/* company contact number */}
            <div className="mb-[10px]">
              {/* label */}
              <p className="text-gray-800 font-bold text-sm">
                Company contact number
              </p>
              <input
                type="number"
                placeholder="Please enter company contact number"
                className="w-100 border p-[10px] rounded bg-gray-50"
                onChange={(e) => setCompanyContactNumber(e.target.value)}
              />
              <ErrorHandlerComponent
                errorHandler={companyContactNumberErrorHandler}
              />
            </div>

            {/* password */}
            <div className="mb-[10px]">
              {/* label */}
              <p className="text-gray-800 font-bold text-sm">Password</p>
              <input
                type="text"
                placeholder="Please enter password"
                className="w-100 border p-[10px] rounded bg-gray-50"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ErrorHandlerComponent errorHandler={passwordErrorHandler} />
            </div>

            {/* re-enter password */}
            <div className="mb-[10px]">
              <input
                type="text"
                placeholder="Please re-enter password"
                className="w-100 border p-[10px] rounded bg-gray-50"
                onChange={(e) => setRepassword(e.target.value)}
              />
              <ErrorHandlerComponent errorHandler={repasswordErrorHandler} />
            </div>

            {/* agreement */}
            <div className="flex items-center mt-[10px] mobile:mb-[10px]">
              <input
                type="checkbox"
                onChange={agreementFunction}
                className="ml-[5px] mr-[5px]"
              />
              <p className="text-xs">I agree to the &nbsp;</p>
              <p
                onClick={() => setTermsOfUseOpen(true)}
                className="text-xs text-blue-800 font-semibold underline cursor-pointer"
              >
                Terms of use
              </p>
              <p className="text-xs">&nbsp;and&nbsp;</p>
              <p
                onClick={() => setTermsOfUseOpen(true)}
                className="text-xs text-blue-800 font-semibold underline cursor-pointer"
              >
                Privacy Policy
              </p>
            </div>

            {/* submit button */}
            <div className="relative mt-[10px]">
              <button
                onClick={() => {
                  if (buttonLoading) {
                    return;
                  }
                  signupFunction();
                }}
                className="bg-blue-600 p-[10px] w-100 rounded text-white"
              >
                Signup
              </button>
              {buttonLoading && (
                <div className="w-[23px] h-[23px] absolute top-[50%] left-[50%] translate-y-[-50%] ml-[40px]">
                  <CgSpinnerTwoAlt className="text-white animate-spin w-100 h-[100%]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {termsOfUseOpen && <TermsOfUse setTermsOfUseOpen={setTermsOfUseOpen} />}
      {termsOfUseOpen && (
        <PrivacyPolicy setTermsOfUseOpen={setTermsOfUseOpen} />
      )}
    </>
  );
};

export default CompanySignup;
