import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdOutlineCheckCircle } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import toas from "../utils/toas";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { loginSuccess, token } from "../state/userSlice";
import { useAppDispatch } from "../state/store";
import { useQuery } from "@tanstack/react-query";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const UpdateUserBeforeLoggingIn = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();
  const userId = userData?.id;
  const dispatch = useAppDispatch();

  // DATA VALUES
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [mName, setMname] = useState("");

  const [loading, setLoading] = useState(false);

  // ERROR HANDLERS
  const [fnameError, setFnameError] = useState({
    message: "",
    status: "start",
  });

  const [mnameError, setMnameError] = useState({
    message: "",
    status: "start",
  });

  const [lnameError, setLnameError] = useState({
    message: "",
    status: "start",
  });

  const [mobileNumberError, setMobileNumberError] = useState({
    message: "",
    status: "start",
  });

  useEffect(() => {
    if (!userData?.id) {
      return navigate("/login");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (fname) {
      setFnameError({
        message: "success",
        status: "success",
      });
    }

    if (mName) {
      setMnameError({
        message: "success",
        status: "success",
      });
    }

    if (lname) {
      setLnameError({
        message: "success",
        status: "success",
      });
    }

    if (mobileNumber) {
      setMobileNumberError({
        message: "success",
        status: "success",
      });
    }
  }, [fname, lname, mName, mobileNumber]);

  const { data: userQuery, isLoading } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/users/get-user-for-login?id=${userId}`,
      });
      setFname(res?.data?.fname);
      setLname(res?.data?.lname);
      setMobileNumber(res?.data?.mobile_number);
      setMname(res?.data?.mname);
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[70px] h-[70px] ml-[50%] translate-x-[-50%] mt-[50%] translate-y-[-50%]">
        <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
      </div>
    );
  }

  console.log(userQuery);

  // FNAME FUNCTION
  const fnameFunction = (e: any) => {
    setFname(e.target.value);
    const fname: string = e.target.value;

    const regex = new RegExp(/[${}<>/]/g);
    const m = fname.match(regex);

    if (m) {
      return setFnameError({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }

    if (!fname) {
      setFnameError({
        message: "Please enter your first name.",
        status: "failed",
      });
    } else {
      setFnameError({ message: "success", status: "success" });
    }
  };

  // MIDDLE NAME FUNCTION
  const mNameFunction = (e: any) => {
    setMname(e.target.value);
    const fname: string = e.target.value;

    const regex = new RegExp(/[${}<>/]/g);
    const m = fname.match(regex);

    if (m) {
      return setMnameError({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }

    if (!fname) {
      setMnameError({
        message: "Please enter your last name.",
        status: "failed",
      });
    } else {
      setMnameError({ message: "success", status: "success" });
    }
  };

  // LNAME FUNCTION
  const lnameFunction = (e: any) => {
    setLname(e.target.value);
    const fname: string = e.target.value;

    const regex = new RegExp(/[${}<>/]/g);
    const m = fname.match(regex);

    if (m) {
      return setLnameError({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }

    if (!fname) {
      setLnameError({
        message: "Please enter your last name.",
        status: "failed",
      });
    } else {
      setLnameError({ message: "success", status: "success" });
    }
  };

  // MOBILE NUMBER FUNCTION
  const mobileNumberFunction = (e: any) => {
    setMobileNumber(e.target.value);
    const mobileNumber: string = e.target.value;

    if (Number(mobileNumber.length) < 11) {
      setMobileNumberError({
        message: "Invalid mobile number.",
        status: "failed",
      });
    } else {
      setMobileNumberError({ message: "success", status: "success" });
    }
  };

  //   AGREEMENT FUNCTION
  const agreementFunction = (e: any) => {
    setAgreement(e.target.checked);
  };

  //   SUBMIT BUTTON FUCNTION
  const submitBUttonFunction = async () => {
    // FNAME FUNCTION
    const fnameFunction = () => {
      const regex = new RegExp(/[${}<>/]/g);
      const m = fname.match(regex);

      if (m) {
        return setFnameError({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "failed",
        });
      }

      if (!fname) {
        return setFnameError({
          message: "Please enter your first name.",
          status: "failed",
        });
      } else {
        return setFnameError({ message: "success", status: "success" });
      }
    };

    fnameFunction();

    // MIDDLE NAME FUNCTION
    const mNameFunction = () => {
      const regex = new RegExp(/[${}<>/]/g);
      const m = mName?.match(regex);

      if (m) {
        return setMnameError({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "failed",
        });
      }

      if (!mName) {
        return setMnameError({
          message: "Please enter your last name.",
          status: "failed",
        });
      } else {
        return setMnameError({ message: "success", status: "success" });
      }
    };
    mNameFunction();

    // LNAME FUNCTION
    const lnameFunction = () => {
      const regex = new RegExp(/[${}<>/]/g);
      const m = lname.match(regex);

      if (m) {
        return setLnameError({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "failed",
        });
      }

      if (!lname) {
        return setLnameError({
          message: "Please enter your last name.",
          status: "failed",
        });
      } else {
        return setLnameError({ message: "success", status: "success" });
      }
    };
    lnameFunction();

    // MOBILE NUMBER FUNCTION
    const mobileNumberFunction = () => {
      if (!mobileNumber) {
        return setMobileNumberError({
          message: "Please enter your mobile number.",
          status: "failed",
        });
      }
      if (Number(mobileNumber?.length) < 11) {
        return setMobileNumberError({
          message: "Invalid mobile number.",
          status: "failed",
        });
      } else {
        return setMobileNumberError({ message: "success", status: "success" });
      }
    };
    mobileNumberFunction();

    if (
      fnameError?.status !== "success" ||
      lnameError?.status !== "success" ||
      mobileNumberError?.status !== "success"
    ) {
      return toas("There is something wrong in your information.", "error");
    }

    if (agreement !== true) {
      return toas(
        "Please agree to terms and use and private policy agreement.",
        "error"
      );
    }

    // SAVE
    setLoading(true);

    try {
      const res = await axios({
        method: "put",
        url: "/users/update-user",
        data: { fname, lname, mobileNumber, mName, agreement, userId },
      });
      setLoading(false);
      // window.history.replaceState({}, fname);
      dispatch(loginSuccess(res?.data?.data));
      dispatch(token(res?.data?.token));
      toas("You are successfully logged in.", "success");
      navigate("/");
    } catch (err) {
      setLoading(false);
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

      <div
        className={`w-[50%] bg-blue-50 ml-[50%] translate-x-[-50%] mt-[30px] rounded  shadow border border-gray-300 laptop:w-[70%] tablet:w-[80%] mobile:w-[95%]`}
      >
        <div className="w-100 p-[10px] bg-blue-800 rounded-t text-lg font-semibold text-white">
          Complete your information.
        </div>

        <div className="w-100 p-[10px]">
          {/* MESSAGE */}
          <p className="mb-[20px]">
            Please enter your real information. If ever you want to change
            something on your account information, please contact our tech
            support team.
          </p>

          <p className="mb-[20px]">
            Complete your account information to continue logging in.
          </p>

          <p className="mb-[20px] font-semibold text-blue-800 underlined">
            Email: {userData?.emails}
          </p>

          {/* FIRST NAME */}
          <div className="mb-[10px]">
            <p className="font-semibold">First name</p>
            <input
              value={fname}
              onChange={fnameFunction}
              placeholder="Enter your first name"
              type="text"
              className="w-100 p-[10px] shadow border border-gray-300 rounded"
            />

            {fnameError?.status !== "start" && (
              <div
                className={`flex items-center mt-[5px] ml-[5px] ${
                  fnameError?.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {fnameError?.status === "success" ? (
                  <MdOutlineCheckCircle className="mr-[5px]" />
                ) : (
                  <PiWarningCircleFill className="mr-[5px]" />
                )}

                {fnameError?.message}
              </div>
            )}
          </div>

          {/* MIDDLE NAME */}
          <div className="mb-[10px]">
            <p className="font-semibold">Middle name</p>
            <input
              value={mName}
              onChange={mNameFunction}
              placeholder="Enter your middle name"
              type="text"
              className="w-100 p-[10px] shadow border border-gray-300 rounded"
            />

            {mnameError?.status !== "start" && (
              <div
                className={`flex items-center mt-[5px] ml-[5px] ${
                  mnameError?.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {mnameError?.status === "success" ? (
                  <MdOutlineCheckCircle className="mr-[5px]" />
                ) : (
                  <PiWarningCircleFill className="mr-[5px]" />
                )}

                {mnameError?.message}
              </div>
            )}
          </div>

          {/* LAST NAME */}
          <div className="mb-[10px]">
            <p className="font-semibold">Last name</p>
            <input
              value={lname}
              onChange={lnameFunction}
              placeholder="Enter your last name"
              type="text"
              className="w-100 p-[10px] shadow border border-gray-300 rounded"
            />
            {lnameError?.status !== "start" && (
              <div
                className={`flex items-center mt-[5px] ml-[5px] ${
                  lnameError?.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {lnameError?.status === "success" ? (
                  <MdOutlineCheckCircle className="mr-[5px]" />
                ) : (
                  <PiWarningCircleFill className="mr-[5px]" />
                )}

                {lnameError?.message}
              </div>
            )}
          </div>

          {/* CP NUMBER */}
          <div className="mb-[10px]">
            <p className="font-semibold">Mobile number</p>
            <input
              value={mobileNumber}
              onChange={mobileNumberFunction}
              placeholder="Enter your mobile number"
              type="number"
              className="w-100 p-[10px] shadow border border-gray-300 rounded"
            />
            {mobileNumberError?.status !== "start" && (
              <div
                className={`flex items-center mt-[5px] ml-[5px] ${
                  mobileNumberError?.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {mobileNumberError?.status === "success" ? (
                  <MdOutlineCheckCircle className="mr-[5px]" />
                ) : (
                  <PiWarningCircleFill className="mr-[5px]" />
                )}

                {mobileNumberError?.message}
              </div>
            )}
          </div>

          <div className="flex items-center mt-[20px] mobile:mb-[10px]">
            <input
              type="checkbox"
              onChange={agreementFunction}
              className="ml-[5px] mr-[5px]"
            />
            <p className="text-xs">I agree to the &nbsp;</p>
            <p
              //   onClick={() => setTermsOfUseOpen(true)}
              className="text-xs text-blue-800 font-semibold underline cursor-pointer"
            >
              Terms of use
            </p>
            <p className="text-xs">&nbsp;and&nbsp;</p>
            <p
              //   onClick={() => setTermsOfUseOpen(true)}
              className="text-xs text-blue-800 font-semibold underline cursor-pointer"
            >
              Privacy Policy
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={submitBUttonFunction}
            className="w-100 p-[10px] text-white bg-blue-800 rounded mt-[20px] relative"
          >
            SUBMIT
            {loading && (
              <div className="absolute top-[50%] translate-y-[-50%] right-[10px]">
                <CgSpinnerTwoAlt className="animate-spin" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserBeforeLoggingIn;
