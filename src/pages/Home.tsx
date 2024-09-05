import React from 'react';

// COMPONENT IMPORT
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FAQ } from '../components/HomeFaq';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* HEADER / NAVBAR */}
      <Navbar />

      {/* HOMEPAGE BODY */}
      <div className=" flex flex-col w-full">
        {/* BANNER */}
        <video
          autoPlay
          loop
          muted
          className="mb-[20px] mt-[50px] mobile:hidden"
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/videos%2F1920x500.mp4?alt=media&token=bd92cf93-195c-4b25-9668-cb685fc782e5" />
        </video>

        <video
          autoPlay
          loop
          muted
          className="mb-[20px] mt-[20px] mobileMin:hidden"
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/videos%2F400%20x%20500%20new.mp4?alt=media&token=e972cc51-b887-4799-a6d1-56d2a58de85f" />
        </video>

        <div className="w-full bg-white p-1 flex justify-center items-center flex-col">
          <button
            onClick={() => navigate('/search?')}
            className="w-[200px] mobile:w-[150px] mobile:py-[8px] bg-[#1A66CC] text-white py-[10px] rounded-[10px] mb-[20px] hover:bg-[#1e40af] duration-300 "
          >
            Get Started
          </button>

          <p className="font-medium">Start your experience today.</p>
          <p className="text-[#6B7280]">Powered by:</p>

          {/* VIZCOM LOGO CONTAINER */}
          <div className="flex">
            {/* <img src={VizcomLogo} alt="" className="size-[20px]" /> */}
            <p className="text-[#4B5563] italic">Vizcom Corporation</p>
          </div>
        </div>

        {/* HR LINE */}
        <div className="w-100 max-w-[1200px] border-top my-[50px] px-[10px] ml-[50%] translate-x-[-50%]">
          <hr className=" w-100 border-top border-blue-600" />
        </div>

        {/* WHAT'S IN IT CONTAINER */}
        <div className="bg-[#1A66CC] p-[30px]">
          <p className="text-center mb-[10px] text-[20px] text-white font-black">
            What's in it for you?
          </p>
          <p className="text-center text-[18px] laptopMin:px-[200px] mobile:px-[10px] text-white">
            Welcome to Ztellar, where we believe in the power of connecting
            minds to revolutionize learnings and collaboration. Our platform is
            designed to streamline the process, making it easier and more
            efficient for individuals and teams to come together, share
            knowledge, and work towards common goals.
          </p>
        </div>

        {/* HR LINE */}
        <div className="w-100 max-w-[1200px] border-top my-[50px] px-[10px] ml-[50%] translate-x-[-50%] ">
          <hr className=" w-100 border-top border-blue-600" />
        </div>

        {/* BLUE TITLE CONTAINER UPCOMING EVENT */}
        <>
          <div className="bg-[#1A66CC] py-[15px] mb-[10px]">
            <p className="text-center text-[20px] text-white font-black">
              Upcoming Event
            </p>
          </div>

          {/* CARD GRID CONTAINER */}
          <div className="grid grid-cols-4 laptop:grid-cols-2 tablet:grid-cols-1 gap-3 max-w-[1280px] mx-auto">
            {/* <EventCard />
            <EventCard />
            <EventCard />
            <EventCard /> */}
          </div>
        </>

        {/* HR LINE */}
        <div className="w-100 max-w-[1200px] border-top my-[50px] px-[10px] ml-[50%] translate-x-[-50%] ">
          <hr className=" w-100 border-top border-blue-600" />
        </div>

        {/* BLUE TITLE CONTAINER LATEST EVENT */}
        <>
          <div className="bg-[#1A66CC] py-[15px] mb-[10px]">
            <p className="text-center text-[20px] text-white font-black">
              Latest Events
            </p>
          </div>

          {/* CARD GRID CONTAINER */}
          <div className="grid grid-cols-4 laptop:grid-cols-2 tablet:grid-cols-1 gap-3 max-w-[1280px] mx-auto">
            {/* <EventCard />
            <EventCard />
            <EventCard />
            <EventCard /> */}
          </div>
        </>

        {/* HR LINE */}
        <div className="w-100 max-w-[1200px] border-top my-[50px] px-[10px] ml-[50%] translate-x-[-50%] ">
          <hr className=" w-100 border-top border-blue-600" />
        </div>

        {/* BLUE TITLE CONTAINER FREQUENTLY ASKED QUESTIONS */}
        <>
          <div className="bg-[#1A66CC] py-[15px] mb-[10px]">
            <p className="text-center text-[20px] text-white font-black">
              Frequently Asked Questions
            </p>
          </div>

          {/* FAQ ACCORDION EFFECT IMPORT */}
          <FAQ />
        </>

        {/* HR LINE */}
        <div className="w-100 max-w-[1200px] border-top my-[50px] px-[10px] ml-[50%] translate-x-[-50%] ">
          <hr className=" w-100 border-top border-blue-600" />
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Homepage;
