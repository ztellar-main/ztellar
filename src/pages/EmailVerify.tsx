import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import toas from '../utils/toas';
import { PiWarningCircleFill } from 'react-icons/pi';
import { useQuery } from '@tanstack/react-query';
import { getRemainingTime } from '../utils/getRemainingTime';
import { useAppDispatch } from '../state/store';
import { loginSuccess, token } from '../state/userSlice';

const EmailVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState('');

  type CountDownProps = {
    seconds: any;
    minutes: any;
    hours: any;
    days: any;
  };

  // COUNT DOWN TIMER
  const defaultRemainingTime: CountDownProps = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  };
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  const [resendCodeError, setResendCodeError] = useState({
    message: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);

  // DATA
  const email = userData?.email;
  const fname = userData?.fname;
  const lname = userData?.lname;
  const mobileNumber = userData?.mobileNumber;
  const password = userData?.password;
  const mname = userData?.mname;

  // GET EXPIRED AT TIME
  const { data: time, isLoading } = useQuery({
    queryKey: [remainingTime],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/users/get-otp-expiry?email=${email}`,
      });
      return new Date(res?.data).getTime();
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <div className="w-[50px] h-[50px] absolute left-[50%] translate-x-[-50%] mt-[50px]">
          <CgSpinnerTwoAlt className="animate-spin w-100 h-100 text-blue-600" />
        </div>
      );
    }
  };

  // EXPIRY TIMER
  useEffect(() => {
    const intervalId = setInterval(() => {
      UpdateRemainingTime(time || 0 + 2000);
    }, 1000);

    if (remainingTime?.minutes < 0) {
      return () => clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [time, remainingTime]);

  const UpdateRemainingTime = (countDown: any) => {
    setRemainingTime(getRemainingTime(countDown));
  };

  // SUBMIT BUTTON FUNCTION
  const submitButtonFunction = async () => {
    setResendCodeError({ message: 'Please wait.', status: 'loading' });
    setLoading(true);
    if (!otp) {
      setLoading(false);
      return setResendCodeError({
        message: 'Please enter your otp.',
        status: 'error',
      });
    }

    try {
      const res = await axios({
        method: 'post',
        url: '/users/verify-email-and-signup',
        data: { otp, email, fname, lname, mobileNumber, password, mname },
      });
      setLoading(false);
      setResendCodeError({ message: 'successful', status: 'success' });

      dispatch(loginSuccess(res?.data?.data));
      dispatch(token(res?.data?.token));

      toas('You are successfully signed up.', 'success');
      window.history.replaceState({}, email);
      window.history.replaceState({}, fname);
      window.history.replaceState({}, lname);
      window.history.replaceState({}, mobileNumber);
      window.history.replaceState({}, password);
      navigate('/');
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setResendCodeError({
          message:
            `${err?.response?.data?.message}` ||
            'Something went wrong. Please signup again.',
          status: 'error',
        });
      }
    }
  };

  //  RESEND CODE FUNCTION
  const resendCodeFunction = async () => {
    try {
      setLoading(true);
      setResendCodeError({ message: 'Resending otp.', status: 'loading' });
      const res = await axios({
        method: 'post',
        url: '/users/send-otp',
        data: { email },
      });
      setLoading(false);
      setResendCodeError({ message: 'Otp has been sent.', status: 'success' });
      console.log(res);
    } catch (err) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setResendCodeError(err?.response?.data);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 w-100 h-100vh mobile:h-[calc(100dvh-50px)]">
        <Loading />
        <div className="w-[500px] bg-white absolute left-[50%] translate-x-[-50%] top-[100px] shadow rounded mobile:w-[90%]">
          {/* TITLE */}
          <div className="w-100 bg-blue-600 rounded-t p-[10px]">
            <p className="text-white font-semibold">
              Verify your email account
            </p>
          </div>

          <div className="p-[10px]">
            <p className="text-gray-800 text-center mt-[5px]">
              Enter your verification code.
            </p>

            <p className="text-center text-sm mt-[10px]">
              Your verification code was sent to your email
            </p>
            <p className="text-center text-sm text-blue-600">{email}</p>

            {remainingTime?.minutes <= 0 ? (
              <p className="text-3xl font-bold text-center mt-[20px] mb-[5px]">
                Your otp already expired
              </p>
            ) : (
              <p className="text-3xl font-bold text-center mt-[20px] mb-[5px]">
                {remainingTime?.minutes}:{remainingTime?.seconds}
              </p>
            )}

            <div className="w-[90%] ml-[5%] mb-[20px]">
              <input
                type="number"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter code here."
                className="border p-[10px] w-100"
              />
              <div className="flex justify-between mt-[5px]">
                <div className="flex items-center">
                  {loading && (
                    <CgSpinnerTwoAlt className="animate-spin text-blue-600" />
                  )}
                  {resendCodeError?.status === 'error' && (
                    <PiWarningCircleFill className="text-red-600" />
                  )}

                  <p
                    className={`ml-[2px] text-sm 
                    ${resendCodeError?.status === 'error' && 'text-red-600'}
                    ${resendCodeError?.status === 'success' && 'text-green-600'}
                    ${resendCodeError?.status === 'loading' && 'text-blue-600'}
                    `}
                  >
                    {resendCodeError.message}
                  </p>
                </div>

                <p
                  onClick={resendCodeFunction}
                  className="mr-[5px] font-semibold underline text-sm cursor-pointer hover:text-blue-600 active:text-blue-300"
                >
                  Resend Code
                </p>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={submitButtonFunction}
              className="w-[50%] bg-blue-600 ml-[25%] text-white p-[5px] rounded mb-[10px] hover:bg-blue-500 active:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
