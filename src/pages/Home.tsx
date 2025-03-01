import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  SubscriptionPlanType,
  subscriptionPlans,
} from '../data/subscriptionData';

// ICONS AND IMAGES IMPORTS
const LearnImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ficons%2Flearn-image.png?alt=media&token=e40e773d-c641-49f6-a160-82dd24c35e0f';
const LecturerImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ficons%2Flecturer-image.png?alt=media&token=ef964feb-e2e8-4500-9406-407e9e365aa0';
const HostImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ficons%2Fhost-image.png?alt=media&token=23d3ddfc-81f7-43af-a1dc-8761364f952c';
const SponsorImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ficons%2Fsponsor-image.png?alt=media&token=2cc328de-d1f0-43a2-abc8-cc05bb3d6991';
const PayPerViewImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Ficons%2Fppv-image.png?alt=media&token=09c225bb-27af-47f2-87ef-95c1cd498b13';

// REACT ICONS IMPORT
import { FiMail } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiChat1Line } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import Footer from '../components/Home/Footer';
import { useNavigate } from 'react-router-dom';
import SubscriptionModal from '../components/Home/SubscriptionModal';
import SubscriptionPlan from '../components/Home/SubscriptionPlan';

// VIDEOS IMPORTS
// import HostAds from '../videos/host-ads.mp4';
// import ZtellarAds from '../videos/ztellar-ads.mp4';
// import ZAds from '../videos/z-ads.mp4';
// import SignupVid from '../videos/signupvideo.mp4';
// import LoginVid from '../videos/loginvideo.mp4';
// import RegistrationVid from '../videos/howtoregister.mp4';
// import CertificateVid from '../videos/certificatevideo.mp4';

// DATA IMPORTS
// import eventData from "../data/eventData";
// import coursesData from "../data/coursesData";
// import entertainmentData from "../data/entertainmentData";

// COMPONENT IMPORTS
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const HostAds =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Fhost-ads.mp4?alt=media&token=173b3245-8d24-432b-8e5a-a29535166d55';
const ZtellarAds =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Fztellar-ads.mp4?alt=media&token=3e5b45fd-647d-45cb-9353-357c0d0a081f';
const ZAds =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Fz-ads.mp4?alt=media&token=7492595a-1080-40ed-8f7b-1cd09ae67caf';
const SignupVid =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Fsignupvideo.mp4?alt=media&token=5877cf82-3c45-4200-95bf-4a3ba3a17cea';
const LoginVid =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Floginvideo.mp4?alt=media&token=6c55e00b-e8be-4ea5-8951-c64e82701349';
const RegistrationVid =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Fhowtoregister.mp4?alt=media&token=9a608b1f-9786-4bf6-a03e-c696efd2b800';
const CertificateVid =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fvideos%2Fcertificatevideo.mp4?alt=media&token=cfa7f432-e814-42bb-98e5-659fbc48ae2a';

const Home: React.FC = () => {
  // FUNCTION FOR SUBSCRIPTION PLAN MODAL
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType | null>(
    null
  );
  const Adsvideos = [ZtellarAds, HostAds, ZAds];
  const InstructionalVideos = [
    SignupVid,
    LoginVid,
    RegistrationVid,
    CertificateVid,
  ];
  const [currentVideo, setCurrentVideo] = useState(0);
  const navigate = useNavigate();

  // NEXT BUTTON FUNCTION
  const handleNext = () => {
    setCurrentVideo((prev) => (prev + 1) % Adsvideos.length);
    setCurrentVideo((prev) => (prev + 1) % InstructionalVideos.length);
  };

  // PREVIOUS BUTTON FUNCTION
  const handlePrev = () => {
    setCurrentVideo((prev) => (prev - 1 + Adsvideos.length) % Adsvideos.length);
    setCurrentVideo(
      (prev) =>
        (prev - 1 + InstructionalVideos.length) % InstructionalVideos.length
    );
  };

  // AUTO NEXT FUNCTION
  const handleVideoEnd = () => {
    handleNext();
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <Navbar />

      {/* MAIN BODY */}
      <div className="max-w-[1280px] mx-auto mt-[50px]">
        {/* BANNER SECTION */}

        {/* BANNER BODY */}
        <div className="w-full grid lg:grid-cols-2 gap-8">
          {/* IMAGE */}
          <div className=" flex items-center justify-center">
            <img
              className=""
              src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar-homepage%2Fbanner-image.png?alt=media&token=070ff9f1-e789-494d-97c9-cb1899af3b93"
              alt=""
            />
          </div>
          {/* right */}
          <div className="p-2">
            <h1 className="lg:text-6xl md:text-4xl text-2xl lg:text-left text-center font-black text-[#212121]">
              Connecting <span className="text-[#0D47A1]">minds</span>{' '}
              Redefining <span className="text-[#0D47A1]">Learning</span> and{' '}
              <span className="text-[#0D47A1]">Collaboration</span>
            </h1>

            <p className="text-[#37474F] lg:text-2xl text-xl mt-[16px] lg:p-0 md:px-[80px] px-[20px] lg:text-left text-center mb-4">
              Learn at your pace, earn your CPD points, and advance your career
              - all in one place!
            </p>

            <div className="grid gap-4 p-2 lg:p-0 md:grid-cols-2">
              <button
                onClick={() => navigate('/search?query=')}
                className="bg-[#0D47A1] text-white rounded px-4 py-2"
              >
                Explore
              </button>

              <a
                href="https://appt.link/meet-with-jeferson-binay-IoPHlS4K/web-conference"
                className="w-full"
              >
                <button className="border border-[#0D47A1] text-[#0D47A1] w-full rounded px-4 py-2">
                  Set an Appointment
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-[32px]">
          <p className="text-[#1A1F71] text-[18px]">Powered by:</p>
          <p className="text-[#7E57C2] text-[18px]">Vizcom Corporation</p>
        </div>

        {/* SUBSCRIPTION PLAN SECTION */}
        <div className="bg-[#0D47A1] px-3 py-8 flex flex-col justify-center items-center">
          {/* SECTION TITLE */}
          <p className="font-black md:text-4xl text-2xl text-white text-center mb-10">
            Subscription Plan
          </p>

          {/* SUBSCRIPTION PLAN CONTAINER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {subscriptionPlans.map((plan, index) => (
              <SubscriptionPlan
                key={index}
                plan={plan}
                onMoreDetails={() => setSelectedPlan(plan)}
              />
            ))}
          </div>

          {/* BOOK AN APPOINTMENT BUTTON */}
          <button className="bg-white w-52 py-3 rounded-sm mt-9 font-medium text-[#333333] hover:bg-gray-100 duration-300">
            Book an Appointment
          </button>

          {/* POP UP */}
          {selectedPlan && (
            <SubscriptionModal
              plan={selectedPlan}
              onClose={() => setSelectedPlan(null)}
            />
          )}
        </div>

        <hr className="border-t-1 border-[#00D4D4] my-[75px]" />

        {/* ADS SECTION */}
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="relative bg-black w-full h-auto">
            {/* VIDEO CONTAINER */}
            <video
              src={Adsvideos[currentVideo]}
              autoPlay
              muted
              loop={false}
              controls
              className="w-full h-full"
              onEnded={handleVideoEnd}
            />

            {/* PREVIOUS BUTTON */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#1A1F71] text-[24px] text-white rounded-full w-[50px] h-[50px]"
            >
              &larr;
            </button>

            {/* NEXT BUTTON */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#1A1F71] text-white rounded-full w-[50px] h-[50px]"
            >
              &rarr;
            </button>
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" />

        {/* YOU CAN BE SECTION */}
        <div className="bg-[#1A1F71] px-4 py-8">
          <p className="font-black md:text-4xl text-[24px] text-[#f4f4f4] text-center mb-[56px]">
            The possibilities are endless — you can be...
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 ">
            {[
              {
                imageSrc: LearnImage,
                title: 'Learn',
                description:
                  'Learn at your own pace with affordable, high-quality courses. Unlock your potential and achieve your goals today!',
              },
              {
                imageSrc: LecturerImage,
                title: 'Lecture (SME)',
                description:
                  'Share your expertise as a Subject Matter Expert. Build your brand, earn income, and help learners succeed globally.',
              },
              {
                imageSrc: HostImage,
                title: 'Host Event',
                description:
                  'Engage your audience, ensure seamless program flow, and create a lasting impact on your attendees.',
              },
              {
                imageSrc: SponsorImage,
                title: 'Sponsor',
                description:
                  'Elevate your brand by sponsoring events. Reach a diverse audience and make a lasting impact on potential clients.',
              },
              {
                imageSrc: PayPerViewImage,
                title: 'Pay Per View',
                description:
                  'Watch exclusive content with Pay-Per-View—no subscriptions, just pay for what you want to see. Get instant access.',
              },
            ].map((item, index) => (
              <div key={index} className="flex justify-center">
                <div className="flex flex-col items-center text-center max-w-[320px]">
                  <img src={item.imageSrc} className="mb-[8px]" />
                  <p className="text-2xl text-[#FFD700] font-black pt-[16px] pb-[12px]">
                    {item.title}
                  </p>
                  <p className="text-base text-white font-normal">
                    {item.description}
                  </p>

                  {/* <button className="bg-[#F4F4F4] px-[32px] py-[10px] rounded-[4px] mt-[36px] font-medium text-[#2F2F2F]">
                    Book an appointment
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center p-8 ">
            <button className="bg-[#F4F4F4] px-[32px] py-[10px] rounded-[4px] mt-[36px] font-medium text-[#2F2F2F]">
              Book an appointment
            </button>
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" />

        {/* EVENT CARDS SECTION */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-[32px] font-bold text-[#1A1F71]">Events</p>
            <button className="text-[16px] text-[#2D3648]">See more</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-[8px]">
            {/* {eventData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#F4F4F4] mt-[32px] rounded-[8px] pb-[12px]"
              >
                <img
                  src={item.imageSrc}
                  className="mb-[8px] rounded-tl-[8px] rounded-tr-[8px]"
                />
                <div className="px-[8px]">
                  <p className="text-[#2D3648] text-[20px] font-bold">
                    {item.title}
                  </p>
                  <div className="flex items-center my-[12px]">
                    <img className="h-[30px]" src={item.authorPic} />
                    <p className="text-[#2D3648] text-[16px] ml-[8px]">
                      {item.authorName}
                    </p>
                  </div>
                  <p className="text-[#2D3648] text-[16px] font-light">
                    Created on:{" "}
                    <span className="font-semibold"> {item.date}</span>
                  </p>
                </div>
                <button className="mt-[36px] bg-[#243B55] text-white py-[10px] px-[56px] mx-auto rounded-[4px]">
                  View Event
                </button>
              </div>
            ))} */}
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" />

        {/* COURSE CARDS SECTION */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-[32px] font-bold text-[#1A1F71]">Courses</p>
            <button className="text-[16px] text-[#2D3648]">See more</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-[8px]">
            {/* {coursesData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#F4F4F4] mt-[32px] rounded-[8px] pb-[12px]"
              >
                <img
                  src={item.imageSrc}
                  className="mb-[8px] rounded-tl-[8px] rounded-tr-[8px]"
                />
                <div className="px-[8px]">
                  <p className="text-[#2D3648] text-[20px] font-bold">
                    {item.title}
                  </p>
                  <div className="flex items-center my-[12px]">
                    <img className="h-[30px]" src={item.authorPic} />
                    <p className="text-[#2D3648] text-[16px] ml-[8px]">
                      {item.authorName}
                    </p>
                  </div>
                  <p className="text-[#2D3648] text-[16px] font-light">
                    Created on:{" "}
                    <span className="font-semibold"> {item.date}</span>
                  </p>
                </div>
                <button className="mt-[36px] bg-[#243B55] text-white py-[10px] px-[56px] mx-auto rounded-[4px]">
                  View Course
                </button>
              </div>
            ))} */}
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" />

        {/* ENTERTAIMENT CARDS SECTION */}
        {/* <div>
          <div className="flex justify-between items-center">
            <p className="text-[32px] font-bold text-[#1A1F71]">
              Entertainment
            </p>
            <button className="text-[16px] text-[#2D3648]">See more</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-[8px]">
            {entertainmentData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#F4F4F4] mt-[32px] rounded-[8px] pb-[12px]"
              >
                <img
                  src={item.imageSrc}
                  className="mb-[8px] rounded-tl-[8px] rounded-tr-[8px]"
                />
                <div className="px-[8px]">
                  <p className="text-[#2D3648] text-[20px] font-bold">
                    {item.title}
                  </p>
                  <div className="flex items-center my-[12px]">
                    <img className="h-[30px]" src={item.authorPic} />
                    <p className="text-[#2D3648] text-[16px] ml-[8px]">
                      {item.authorName}
                    </p>
                  </div>
                  <p className="text-[#2D3648] text-[16px] font-light">
                    Created on:{" "}
                    <span className="font-semibold"> {item.date}</span>
                  </p>
                </div>
                <button className="mt-[36px] bg-[#243B55] text-white py-[10px] px-[56px] mx-auto rounded-[4px]">
                  View Course
                </button>
              </div>
            ))}
          </div>
        </div> */}
        {/* <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" /> */}

        {/* INSTRUCTIONAL VIDEO SECTION */}
        <div className="flex flex-col justify-center items-center h-full w-full">
          <div className="relative bg-black w-full h-auto">
            {/* VIDEO CONTAINER */}
            <video
              src={InstructionalVideos[currentVideo]}
              autoPlay
              muted
              loop={false}
              controls
              className="w-full h-full"
              onEnded={handleVideoEnd}
            />

            {/* PREVIOUS BUTTON */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#1A1F71] text-[24px] text-white rounded-full w-[50px] h-[50px]"
            >
              &larr;
            </button>
            {/* NEXT BUTTON */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#1A1F71] text-white rounded-full w-[50px] h-[50px]"
            >
              &rarr;
            </button>
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" />

        {/* CONTACT US SECTION */}
        <div className="px-4 py-8">
          <div className="mb-[56px]">
            <p className="font-black md:text-4xl text-[24px] text-[#1A1F71] text-center">
              Reach out to our helpful support team
            </p>
            <p className="text-center mt-[20px] text-[18px] font-light">
              Let us know how we can help! We're here to assist with any
              questions or concerns for a smooth experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              {
                icon: <FiMail size={24} color="#2D3648" />,
                title: 'Get in touch via emial',
                description: 'We’re here to help - Drop us a message',
                click: 'Email us',
              },
              {
                icon: <RiChat1Line size={24} color="#2D3648" />,
                title: 'Message us on messenger',
                description: 'Instant Support – Chat with Us on Messenger!',
                click: 'Message us',
              },
              {
                icon: <MdLocationOn size={24} color="#2D3648" />,
                title: 'Visit us in person',
                description:
                  'Stop by and meet our team for personalized assistance!',
                click: 'View in Google Map',
              },
              {
                icon: <FaPhoneAlt size={24} color="#2D3648" />,
                title: 'Call us',
                description: 'Reach out by phone for immediate assistance',
                click: '+1(8888)-000-0000',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center border border-[#D2D3D3] rounded-[8px] p-[20px]"
              >
                <div className="mb-4 flex w-full items-center">
                  <div className="border border-[#D2D3D3] p-[8px] mr-[12px] rounded-[8px]">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-[#2D3648]">{item.title}</p>
                </div>

                <p className="text-base  font-normal">{item.description}</p>

                <button className="bg-[#1A1F71] py-[10px] w-full rounded-[4px] mt-[36px] text-white font-extralight">
                  {item.click}
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full border-t-1 border-[#00D4D4] my-[75px]" />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
