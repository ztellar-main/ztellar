import { useState } from 'react';

// IMAGES IMPORT
// import Logo1 from "../icons/logo1.png";
// import Logo2 from "../icons/logo2.png";
// import Logo3 from "../icons/logo3.png";
// import Logo4 from "../icons/logo4.png";
// import Logo5 from "../icons/logo5.png";
// import Logo6 from "../icons/logo6.png";
// import Logo7 from "../icons/logo7.png";
// import ProfileAuthor from "../icons/AuthorProf.png";
// import Prog1 from "../icons/Day1.png";
// import Prog2 from "../icons/Day2.png";

// REACT ICONS IMPORT

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../state/store';
import SubjectCard from '../components/ViewEventComponents/SubjectCard';
import Navbar from '../components/Navbar';
import FullscreenModal from '../components/ViewEventComponents/FullscreenModal';
import { GoStarFill } from 'react-icons/go';
import Footer from '../components/Home/Footer';
import FeedbackModal from '../components/ViewEventComponents/FeedbackModal';
import toas from '../utils/toas';

const ViewProduct = () => {
  // const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7];
  const [selectedImage, setSelectedImage] = useState('');
  const [openProgram, setOpenProgram] = useState(false);
  console.log(openProgram);

  // START
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get('id') || '';
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.currentUser);
  const stars = Array(5).fill(0);
  const colors = {
    orange: '#FFD600',
    gray: '#a9a9a9',
  };

  // const [reviewPopupOpen, setReviewPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowAllFeedbacks = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: eventData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['view product'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/product/get-view-event-product?id=${productId}`,
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[70px] h-[70px] fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/" />;
  }

  const date = new window.Date(eventData?.createdAt);

  const registered = eventData?.registered?.find((data: any) => {
    return data?._id === user?._id;
  });

  // END

  // FUNCTION FOR THE SPONSOR IMAGE
  // const sliderRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   let animationFrameId: number;
  //   let position = 0;

  //   // FUNCTION FOR ANIMATION
  //   const animate = () => {
  //     if (sliderRef.current) {
  //       position -= 1;
  //       sliderRef.current.style.transform = `translateX(${position}px)`;

  //       if (Math.abs(position) >= sliderRef.current.scrollWidth / 2) {
  //         position = 0;
  //       }

  //       animationFrameId = requestAnimationFrame(animate);
  //     }
  //   };

  //   animationFrameId = requestAnimationFrame(animate);

  //   return () => cancelAnimationFrame(animationFrameId);
  // }, []);

  console.log(eventData?.subjects);

  return (
    <div>
      {/* NAVBAR SECTION */}
      <Navbar />

      {/* MAIN BODY */}
      <div className="max-w-7xl mx-auto bg-[#FAFBFC]">
        {/* PREVIEW VIDEO CONTAINER */}
        <div className="w-full  bg-black">
          <div
            key={eventData?.video_url}
            className="w-100 h-[100%] md:h-[400px] bg-black flex justify-center "
          >
            <video className="h-[100%] w-100" autoPlay controls>
              <source src={eventData?.video_url} />
            </video>
          </div>
        </div>

        {/* COURSE TITLE */}
        <p className="py-3 text-xl font-semibold text-[#333333] tracking-[1px] pl-3">
          {eventData?.title}
        </p>

        {/* COURSE DESCRIPTION */}
        <div className="px-6 py-3">
          <h1 className="text-[#333333] font-semibold text-lg tracking-[1px]">
            Description
          </h1>
          <p className="text-[#333333] font-light tracking-[1px]">
            {eventData?.description}
          </p>
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />

        {/* OBJECTIVES SECTION */}
        <div className="px-6 py-3">
          <h1 className="text-[#333333] font-semibold text-lg tracking-[1px]">
            Objectives
          </h1>
          {eventData?.objectives?.map((obData: any, i: any) => (
            <div key={i} className="flex items-center p-2">
              <div className="h-2 w-2 max-w-2 max-h-2 rounded-full bg-[#333333] mr-3" />
              <p className="text-[#333333] font-light tracking-[1px]">
                {obData?.title}
              </p>
            </div>
          ))}
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />

        {/* COURSE OUTLINE SECTION */}
        <div className="w-full mx-auto p-2">
          <h2 className="text-[#333333] font-semibold text-lg tracking-[1px] mb-2">
            Course Outline
          </h2>
          <table className="w-full border-collapse border border-[#CFD8DC] text-left text-[#333333]">
            <thead>
              <tr className="border border-[#CFD8DC] px-2 py-3">
                <td className="p-2 font-medium text-white bg-[#2F2F2F] tracking-[1px]">
                  Subject Title
                </td>
                <td
                  className="p-2 font-medium text-white bg-[#2F2F2F] tracking-[1px]"
                  colSpan={3}
                >
                  No. of Videos
                </td>
              </tr>
            </thead>

            <tbody>
              {eventData?.subjects?.map((subjectData: any, i: any) => {
                return <SubjectCard key={i} subjectData={subjectData} />;
              })}
            </tbody>
          </table>
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />

        {/* EVENT PROGRAM SECTION */}
        <div className="w-full mx-auto p-2">
          <h2 className="text-[#333333] font-semibold text-lg tracking-[1px] mb-2">
            Event Program
          </h2>
          <div className="flex justify-evenly sm:flex-row flex-col">
            {eventData?.event_programs?.map((program: any, i: any) => (
              <img
                key={i}
                className="my-1 cursor-pointer"
                src={program?.url}
                alt="program image"
                onClick={() => {
                  setOpenProgram((e: any) => !e);
                  setSelectedImage(program?.url);
                }}
              />
            ))}
          </div>

          {/* THIS IS THE FULLSCREEN POP UP FUNCT */}
          {openProgram && (
            <FullscreenModal
              imageSrc={selectedImage}
              setOpenProgram={setOpenProgram}
              // altText={selectedImage.alt}
              // onClose={handleClose}
            />
          )}
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />

        {/* SPONSOR SLIDING LOGOS SECTION */}
        <div className="w-full h-80 overflow-hidden relative">
          {/* <div
            ref={sliderRef}
            className="flex h-[auto] max-w-[300px] items-center"
          > */}
          {/* {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-full w-auto mx-14"
              />
            ))} */}
          {/* FOR SLIDING LOOPING */}
          {/* {logos.map((logo, index) => (
              <img
                key={`duplicate-${index}`}
                src={logo}
                alt={`Logo duplicate ${index + 1}`}
                className="h-full w-auto mx-4"
              />
            ))} */}
          {/* </div> */}
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />

        {/* AUTHOR AND RATINGS SECTION */}
        <div className="w-full">
          <div className="grid sm:grid-cols-2 grid-cols-1 px-8 ">
            <div className="flex justify-start py-2">
              <img
                className="mr-4 max-w-[40px] max-h-[40px] rounded-full"
                src={eventData?.author_id?.avatar}
                alt=""
              />

              <div className="flex flex-col justify-between">
                <p className="text-xl font-semibold text-[#333333]">
                  {eventData?.author_id?.fname} {eventData?.author_id?.lname}
                </p>
                <p className="text-sm font-light text-[#333333]">Author</p>
                <p className="text-[#333333] font-light text-sm underline">
                  See Author Profile
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between pl-2">
              <div className="flex items-center py-2">
                <p className="text-base text-[#333333] font-normal">
                  {eventData?.average_rating}
                </p>
                <div className="flex items-center mx-5">
                  <span className="text-yellow-500 flex">
                    {stars.map((_, index) => {
                      return (
                        <GoStarFill
                          key={index}
                          size="17"
                          style={{
                            marginRight: '10',
                            cursor: 'pointer',
                          }}
                          color={
                            eventData?.average_rating > index
                              ? colors.orange
                              : colors.gray
                          }
                        />
                      );
                    })}
                  </span>
                </div>
                <p className="text-base text-[#333333] font-normal">
                  ({eventData?.feedback_count} ratings)
                </p>
              </div>
              <div className="flex items-center py-2">
                <p className="text-base font-light text-[#333333]">
                  Number of Registrants:{' '}
                  <span className="font-bold">
                    {eventData?.registered?.length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />

        {/* FEEDBACKS SECTION */}
        <div className="relative w-full rounded-lg overflow-hidden p-3">
          <h1 className="text-[#333333] text-3xl font-bold text-center py-4">
            FEEDBACKS
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventData?.feedback?.map((feedback: any, index: any) => {
              console.log(feedback);
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md  shadow-[#F2F2F2]"
                >
                  <p className="mb-4 text-[#333333] font-normal">
                    {feedback?.comment}
                  </p>
                  <div className="flex mb-4 items-center">
                    <img
                      src={feedback?.user?.avatar}
                      className="h-12 w-12 rounded-full mr-4"
                      alt={`${feedback.name} profile`}
                    />
                    <div>
                      <p className="text-lg text-[#333333] font-semibold mb-2">
                        {feedback?.user?.fname} {feedback?.user?.fname}
                      </p>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-2xl flex">
                          {stars.map((_, index) => {
                            return (
                              <GoStarFill
                                key={index}
                                size="14"
                                style={{
                                  marginRight: '5',
                                  cursor: 'pointer',
                                }}
                                color={
                                  eventData?.average_rating > index
                                    ? colors.orange
                                    : colors.gray
                                }
                              />
                            );
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-light text-[#333333]">
                    {date.toLocaleDateString('en-US')}
                  </p>
                </div>
              );
            })}
          </div>
          <div className=" py-5 flex justify-center items-center">
            <button
              className="text-[#FAFBFC] bg-[#2F2F2F] w-64 py-3 rounded hover:opacity-90 duration-300"
              onClick={handleShowAllFeedbacks}
            >
              Show all Feedbacks
            </button>
          </div>

          {/* ALL FEEDBACK SECTION POP UP */}
          {isModalOpen && (
            <FeedbackModal
              feedbackData={eventData?.feedback}
              onClose={handleCloseModal}
            />
          )}
        </div>
        <hr className="w-full border-t-1 border-[#CFD8DC] my-4" />
      </div>

      {/* FLOATING ACQUIRE COURSE BUTTON */}
      <div className="w-full max-w-7xl bg-[#2F2F2F] p-4 lg:p-3 sm:flex-row flex-col sm:p-4 ml-[50%] translate-x-[-50%] fixed bottom-0 md:rounded-t-3xl font-semibold text-white flex items-center justify-center">
        <p className="text-white">Come join us</p>
        <div className="flex sm:mt-0 mt-4">
          {/* <button className="bg-[#0D47A1] p-3 rounded ml-3 px-3 text-white hover:opacity-80 duration-300">
            Acquire now
          </button> */}
          {registered !== undefined ? (
            <button
              onClick={() => {
                if (!token) {
                  return navigate('/login');
                }
                navigate(`/owned/event/credentials?id=${productId}`);
              }}
              className="bg-[#0D47A1] p-3 rounded ml-3 px-3 text-white hover:opacity-80 duration-300"
            >
              View
            </button>
          ) : (
            <button
              onClick={() => {
                if (new Date(eventData?.date_end) < new Date(Date.now())) {
                  return toas(
                    'Event ended. Please check SDL equivalent in your dashboard',
                    'error'
                  );
                }
                if (!token) {
                  return navigate('/login');
                }
                navigate(`/buy/product?id=${productId}`);
              }}
              className="bg-[#0D47A1] p-3 rounded ml-3 px-3 text-white hover:opacity-80 duration-300"
            >
              {new Date(eventData?.date_end) < new Date(Date.now())
                ? 'Event ended'
                : ' Register now'}
            </button>
          )}

          {/* <button className="border border-[#0D47A1] p-3 rounded ml-3 px-3 text-[#0D47A1] bg-white hover:bg-gray-100 duration">
            Sponsor Now
          </button> */}
          <button
            onClick={() => navigate(`/event/sponsor-now?id=${productId}`)}
            className="border border-[#0D47A1] p-3 rounded ml-3 px-3 text-[#0D47A1] bg-white hover:bg-gray-100 duration"
          >
            Sponsor now
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ViewProduct;
