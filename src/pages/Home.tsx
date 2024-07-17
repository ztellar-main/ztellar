import React from "react";

// COMPONENT IMPORT
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FAQ } from "../components/HomeFaq";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* HEADER / NAVBAR */}
      <Navbar />

      {/* HOMEPAGE BODY */}
      <div className="mt-[65px] flex flex-col w-full  tablet:mt-[30px]">
        {/* BANNER */}
        <div className="text-2xl font-bold text-center tabletMin:hidden">
          <p className="">
            <span className="text-[#1A66CC]">Connecting </span>
            minds
          </p>
          <p className="class">
            <span className="text-[#1A66CC]">Redefining </span>
            Learning and
          </p>
          <p className="text-[#1A66CC]">Collaboration</p>
        </div>
        <div className="mx-auto relative ">
          <div className="max-w-[1280px] mb-[10px]  h-[300px] bg-gray-50 tablet:h-[200px]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar%2Fimgpsh_fullsize_anim.png?alt=media&token=e460fc58-7dc1-4c39-a3be-edb043b293b6"
              className="w-100 h-[100%] object-cover"
            />
          </div>
          <div className="absolute left-0 top-0 text-6xl font-bold tablet:hidden"> 
            <p className="">
              <span className="text-[#1A66CC]">Connecting </span>
              minds
            </p>
            <p className="class">
              <span className="text-[#1A66CC]">Redefining </span>
              Learning and
            </p>
            <p className="text-[#1A66CC]">Collaboration</p>
          </div>
        </div>

        <div className="w-full bg-white p-1 flex justify-center items-center flex-col">
          <button
            onClick={() => navigate("/search?")}
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
        <div className="w-[1280px] my-[50px] mx-auto ">
          <hr className="border border-blue-200 max-w-[1270px] mx-auto" />
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
        <div className="w-[1280px] my-[50px] mx-auto ">
          <hr className="border border-blue-200 max-w-[1270px] mx-auto" />
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
        <div className="w-[1280px] my-[50px] mx-auto ">
          <hr className="border border-blue-200 max-w-[1270px] mx-auto" />
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
        <div className="w-[1280px] my-[50px] mx-auto ">
          <hr className="border border-blue-200 max-w-[1270px] mx-auto" />
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
        <div className="w-[1280px] my-[50px] mx-auto ">
          <hr className="border border-blue-200 max-w-[1270px] mx-auto" />
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Homepage;
