import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { AxiosError } from 'axios';
import * as EmailValidator from 'email-validator';
import toas from '../utils/toas';
import { useNavigate } from 'react-router-dom';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { PiWarningCircleFill } from 'react-icons/pi';
import TermsOfUse from '../components/TermsOfUse';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Footer from '../components/Footer';

const Signup = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mname, setMname] = useState('');
  const [mobileNumber, setMobileNUmber] = useState('09');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const [termsOfUseOpen, setTermsOfUseOpen] = useState(false);

  // PASSWORD RE_TYPE USEEEFETCT
  useEffect(() => {
    const res = () => {
      if (!rePassword) {
        return setRePasswordError(
          'This field should not be empty. Please re type your password.'
        );
      }

      if (rePassword !== password) {
        setRePasswordError(
          'Password are not the same. Please type the same password.'
        );
      } else {
        setRePasswordError('success');
      }
    };
    res();
  }, [rePassword, password]);

  // SIGNUP BUTTON FUNCTION
  const signupButtonFunction = async () => {
    // ERROR HANDLERS

    const fnameErrorFunction = () => {
      const regexFname = new RegExp(/[${}<>/]/g);
      const m = fname.match(regexFname);
      if (!fname) {
        return setFnameError('Please enter your first name.');
      }

      if (m) {
        return setFnameError(
          'Please avoid using this characters $ , { , } , < , > , /'
        );
      }
      return setFnameError('success');
    };

    fnameErrorFunction();

    const lnameErrorFunction = () => {
      const regexFname = new RegExp(/[${}<>/]/g);
      const m = lname.match(regexFname);

      if (!lname) {
        return setLnameError('Please enter your last name.');
      }

      if (m) {
        return setLnameError(
          'Please avoid using this characters $ , { , } , < , > , /'
        );
      }

      return setLnameError('success');
    };

    lnameErrorFunction();

    if (Number(mobileNumber.length) < 11) {
      setMobileNumberError('Invalid mobile number.');
    } else {
      setMobileNumberError('success');
    }

    const avoidRegex = new RegExp(/[${}<>/]/g);
    const avoid = password.match(avoidRegex);

    const regex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*#?]{8,}$/
    );
    const test = regex.test(password);

    if (!test) {
      setPasswordError(
        'Password must be 8 characters and above. Atleast one uppercase letter and one number.'
      );
    } else {
      setPasswordError('success');
    }

    if (avoid) {
      return setPasswordError(
        'Please avoid using this characters $ , { , } , < , > , /'
      );
    }

    if (rePassword !== password) {
      setRePasswordError(
        'Password are not the same. Please type the same password.'
      );
    } else {
      setRePasswordError('success');
    }

    if (!rePassword) {
      setRePasswordError(
        'This field should not be empty. Please re type your password.'
      );
    }

    if (!EmailValidator.validate(email)) {
      return setEmailError('Invalid email.');
    }

    try {
      const res = await axios({
        method: 'post',
        url: '/users/get-email',
        data: { email },
      });
      console.log(res);
      setEmailError(res?.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setEmailError(err?.response?.data?.message || err?.message);
      }
    }

    if (
      fnameError !== 'success' ||
      lnameError !== 'success' ||
      mobileNumberError !== 'success' ||
      emailError !== 'success' ||
      passwordError !== 'success' ||
      rePasswordError !== 'success'
    ) {
      return toas('There is someting wrong in your information.', 'error');
    }

    if (!agreement) {
      return toas('Please agree to the terms and conditions.', 'error');
    }

    // SUCCESSFUL

    setLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: '/users/send-otp',
        data: { email },
      });
      setLoading(false);
      toas('Successful. Please verify your email.', 'success');
      navigate('/email-verify', {
        state: { fname, lname, mobileNumber, email, password, mname },
      });
      console.log(res?.data);
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError) {
        return toas('OTP did not send. Please signup again.', 'error');
      }
    }
  };

  // FNAME FUNCTION
  const fnameFunction = (e: any) => {
    setFname(e.target.value);
    const fname: string = e.target.value;

    const regex = new RegExp(/[${}<>/]/g);
    const m = fname.match(regex);

    if (m) {
      return setFnameError(
        'Please avoid using this characters $ , { , } , < , > , /'
      );
    }

    if (!fname) {
      setFnameError('Please enter your first name.');
    } else {
      setFnameError('success');
    }
  };

  // LNAME FUNCTION
  const lnameFunction = (e: any) => {
    setLname(e.target.value);
    const lname: string = e.target.value;

    const regex = new RegExp(/[${}<>/]/g);
    const m = lname.match(regex);

    if (m) {
      return setLnameError(
        'Please avoid using this characters $ , { , } , < , > , /'
      );
    }
    if (!lname) {
      setLnameError('Please enter your last name.');
    } else {
      setLnameError('success');
    }
  };

  // MOBILE NUMBER FUNCTION
  const mobileNumberFunction = (e: any) => {
    setMobileNUmber(e.target.value);
    const mobileNumber: string = e.target.value;

    if (Number(mobileNumber.length) < 11) {
      setMobileNumberError('Invalid mobile number.');
    } else {
      setMobileNumberError('success');
    }
  };

  // EMAIL FUNCTION
  const emailFunction = async (e: any) => {
    setEmail(e.target.value);
    const email: string = e.target.value;

    if (!EmailValidator.validate(email)) {
      return setEmailError('Invalid email.');
    }

    try {
      const res = await axios({
        method: 'post',
        url: '/users/get-email',
        data: { email },
      });
      console.log(res);
      setEmailError(res?.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setEmailError(err?.response?.data?.message || err?.message);
      }
    }
  };

  // PASSWORD FUNCTION
  const passwordFunction = (e: any) => {
    setPassword(e.target.value);
    const password: string = e.target.value;

    const avoidRegex = new RegExp(/[${}<>/]/g);
    const avoid = password.match(avoidRegex);

    const regex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*#?]{8,}$/
    );

    const test = regex.test(password);
    if (avoid) {
      return setPasswordError(
        'Please avoid using this characters $ , { , } , < , > , /'
      );
    }

    if (!test) {
      setPasswordError(
        'Password must be 8 characters and above. Atleast one uppercase letter and one number.'
      );
    } else {
      setPasswordError('success');
    }
  };

  // RE ENTER PASSWORD FUNCTION
  const rePasswordFunction = (e: any) => {
    setRePassword(e.target.value);
  };

  // AGREEMENT FUNCTION
  const agreementFunction = (e: any) => {
    setAgreement(e.target.checked);
  };

  return (
    <>
      <div className="bg-gray-50 pb-[100px] desktopMin:h-100vh">
        <Navbar />

        {/* MAIN BODY */}
        <p className="text-center text-xl font-bold text-blue-600 my-[10px]">
          Welcome to Ztellar
        </p>
        {/* CARD CONTAINER */}
        <div className="w-[600px] bg-white shadow ml-[50%] translate-x-[-50%] rounded tablet:w-[90%] mobile:w-[95%] ">
          <div className="bg-blue-600 w-100 p-[5px] text-white rounded-t font-semibold text-base">
            Create member account
          </div>

          {/* BOTTOM CARD CONTAINER */}
          <div className="w-100 p-[10px]">
            <p className="text-sm text-gray-600 mb-[10px] laptop:text-xs mobile:text-center">
              Please enter your real information. If ever you want to change
              something on your account information, please contact our tech
              support team.
            </p>

            <p
              onClick={() => navigate('/company-signup')}
              className="text-sm mb-[10px] ml-[5px] text-blue-600 underline hover:cursor-pointer hover:text-blue-400"
            >
              Create company account
            </p>
            {/* EMAIL */}
            <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
              Email
            </p>
            <div className="flex items-center">
              <input
                type="text"
                onChange={emailFunction}
                placeholder="Please enter your email address."
                className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] outline-blue-600 laptop:text-sm mobile:text-base mb-[2px]"
              />
            </div>
            <div className="flex items-center mb">
              {emailError !== 'success' &&
                (emailError === '' ? (
                  ''
                ) : (
                  <PiWarningCircleFill className="text-red-600" />
                ))}
              {emailError === 'success' && (
                <MdOutlineCheckCircle className="text-green-600" />
              )}
              <p
                className={`text-[12px] ml-[4px] ${
                  emailError === 'success'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 '
                } laptop:text-xs mobile:text-sm `}
              >
                {emailError}
              </p>
            </div>

            {/* NAME CONTAINER */}
            <div className="flex mobile:flex-col">
              {/* FIRST NAME */}
              <div className="w-[50%] mobile:w-100">
                <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
                  First name
                </p>
                <input
                  type="text"
                  onChange={fnameFunction}
                  placeholder="Please enter your first name."
                  className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] mb-[2px] outline-blue-600 laptop:text-sm mobile:text-base"
                />

                <div className="flex items-center mb">
                  {fnameError !== 'success' &&
                    (fnameError === '' ? (
                      ''
                    ) : (
                      <PiWarningCircleFill className="text-red-600" />
                    ))}
                  {fnameError === 'success' && (
                    <MdOutlineCheckCircle className="text-green-600" />
                  )}
                  <p
                    className={`text-[12px] ml-[4px] ${
                      fnameError === 'success'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 '
                    } laptop:text-xs mobile:text-sm `}
                  >
                    {fnameError}
                  </p>
                </div>
              </div>
              <div className="w-[10px] mobile:hidden"></div>
              {/* LASTNAME */}
              <div className="w-[50%] mobile:w-100">
                <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
                  Last name
                </p>
                <input
                  type="text"
                  onChange={lnameFunction}
                  placeholder="Please enter your last name."
                  className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] mb-[2px] outline-blue-600 laptop:text-sm mobile:text-base"
                />

                <div className="flex items-center mb">
                  {lnameError !== 'success' &&
                    (lnameError === '' ? (
                      ''
                    ) : (
                      <PiWarningCircleFill className="text-red-600" />
                    ))}
                  {lnameError === 'success' && (
                    <MdOutlineCheckCircle className="text-green-600" />
                  )}
                  <p
                    className={`text-[12px] ml-[4px] ${
                      lnameError === 'success'
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 '
                    } laptop:text-xs mobile:text-sm `}
                  >
                    {lnameError}
                  </p>
                </div>
              </div>
            </div>

            {/* MIDDLE NAME */}
            <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
              Middle name
            </p>
            <input
              type="text"
              value={mname}
              onChange={(e: any) => setMname(e.target.value)}
              placeholder="Please enter your middle name."
              className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] mb-[2px] outline-blue-600 laptop:text-sm mobile:text-base"
            />

            {/* <div className="flex items-center mb">
              {mobileNumberError !== 'success' &&
                (mobileNumberError === '' ? (
                  ''
                ) : (
                  <PiWarningCircleFill className="text-red-600" />
                ))}
              {mobileNumberError === 'success' && (
                <MdOutlineCheckCircle className="text-green-600" />
              )}
              <p
                className={`text-[12px] ml-[4px] ${
                  mobileNumberError === 'success'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 '
                } laptop:text-xs mobile:text-sm `}
              >
                {mobileNumberError}
              </p>
            </div> */}

            {/* MOBILE NUMBER */}
            <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
              Mobile number
            </p>
            <input
              type="number"
              value={mobileNumber}
              onChange={mobileNumberFunction}
              placeholder="Please enter your mobile number."
              className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] mb-[2px] outline-blue-600 laptop:text-sm mobile:text-base"
            />

            <div className="flex items-center mb">
              {mobileNumberError !== 'success' &&
                (mobileNumberError === '' ? (
                  ''
                ) : (
                  <PiWarningCircleFill className="text-red-600" />
                ))}
              {mobileNumberError === 'success' && (
                <MdOutlineCheckCircle className="text-green-600" />
              )}
              <p
                className={`text-[12px] ml-[4px] ${
                  mobileNumberError === 'success'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 '
                } laptop:text-xs mobile:text-sm `}
              >
                {mobileNumberError}
              </p>
            </div>

            {/* PASSWORD */}
            <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
              Password
            </p>
            <input
              type="text"
              onChange={passwordFunction}
              placeholder="Please enter your password."
              className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] mb-[2px] outline-blue-600 laptop:text-sm mobile:text-base"
            />

            <div className="flex items-center mb">
              {passwordError !== 'success' &&
                (passwordError === '' ? (
                  ''
                ) : (
                  <PiWarningCircleFill className="text-red-600" />
                ))}
              {passwordError === 'success' && (
                <MdOutlineCheckCircle className="text-green-600" />
              )}
              <p
                className={`text-[12px] ml-[4px] ${
                  passwordError === 'success'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 '
                } laptop:text-xs mobile:text-sm `}
              >
                {passwordError}
              </p>
            </div>

            {/* RE ENTER PASSWORD */}
            <p className="text-sm text-gray-600 mb-[2px] ml-[2px] laptop:text-xs mobile:text-sm font-semibold">
              Re-enter password
            </p>
            <input
              type="text"
              onChange={rePasswordFunction}
              placeholder="Please re-enter your password."
              className="w-100 text-base border p-[5px] rounded border-gray-300 pl-[10px] mb-[2px] outline-blue-600 laptop:text-sm mobile:text-base"
            />

            <div className="flex items-center mb">
              {rePasswordError !== 'success' &&
                (rePasswordError === '' ? (
                  ''
                ) : (
                  <PiWarningCircleFill className="text-red-600" />
                ))}
              {rePasswordError === 'success' && (
                <MdOutlineCheckCircle className="text-green-600" />
              )}
              <p
                className={`text-[12px] ml-[4px] ${
                  rePasswordError === 'success'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 '
                } laptop:text-xs mobile:text-sm `}
              >
                {rePasswordError}
              </p>
            </div>

            <hr className="w-100 border-blue-600 mb-[10px] mt-[10px] opacity-[40%]" />
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
            {/* SUBMIT BUTTTON */}
            <div className="relative bg-red-100 mt-[15px]">
              {loading && (
                <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ml-[50px]">
                  <CgSpinnerTwoAlt className="text-white animate-spin" />
                </div>
              )}

              <button
                onClick={signupButtonFunction}
                className="text-base bg-blue-600 text-white w-100 p-[5px] rounded cursor-pointer  hover:bg-blue-500 active:bg-blue-600 laptop:text-sm mobile:text-base"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
      {termsOfUseOpen && <TermsOfUse setTermsOfUseOpen={setTermsOfUseOpen} />}
      {termsOfUseOpen && (
        <PrivacyPolicy setTermsOfUseOpen={setTermsOfUseOpen} />
      )}

      <Footer />
    </>
  );
};

export default Signup;
