// COMPONENTS
import Navbar from "../components/Navbar";
import { GoStarFill } from "react-icons/go";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import EventViewSubjectCard from "../components/EventViewSubjectCard";
import ProductViewReviewCard from "../components/ProductViewReviewCard";
import EventFeedbackPopup from "../components/EventFeedbackPopup";
import { useAppSelector } from "../state/store";
import toas from "../utils/toas";
import Footer from "../components/Footer";
import { useState } from "react";

import Carousels from "../components/Carousel";

const ViewProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("id") || "";
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.currentUser);
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFD600",
    gray: "#a9a9a9",
  };

  const [reviewPopupOpen, setReviewPopupOpen] = useState(false);

  const {
    data: eventData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["view product"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
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

  return (
    <div className="w-100 ">
      <Navbar />
      <div className="w-100 bg-blue-900 text-white text-lg p-[10px] font-semibold tracking-wider">
        {eventData?.title}
      </div>
      {/* MAIN BODY */}
      <div className="w-100 bg-white flex flex-col">
        {/* LEFT */}
        <div className="grow">
          {/* VIDEO CONTAINER */}
          <div
            key={eventData?.video_url}
            className="w-100 h-[400px] bg-black flex justify-center "
          >
            <video className="h-[400px] w-100" autoPlay controls>
              <source src={eventData?.video_url} />
            </video>
          </div>
          {/* REG BUTTON TOP */}
          <div className="w-100 p-[10px] pb-0">
            {registered !== undefined ? (
              <button
                onClick={() => {
                  if (!token) {
                    return navigate("/login");
                  }
                  navigate(`/owned/event/credentials?id=${productId}`);
                }}
                className="w-100 p-[10px] bg-blue-700 text-white rounded font-semibold mb-[10px]"
              >
                View
              </button>
            ) : (
              <button
                onClick={() => {
                  if (new Date(eventData?.date_end) < new Date(Date.now())) {
                    return toas(
                      "Event ended. Please check SDL equivalent in your dashboard",
                      "error"
                    );
                  }
                  if (!token) {
                    return navigate("/login");
                  }
                  navigate(`/buy/product?id=${productId}`);
                }}
                className="w-100 p-[10px] bg-blue-700 text-white rounded font-semibold mb-[10px]"
              >
                {new Date(eventData?.date_end) < new Date(Date.now())
                  ? "Event ended"
                  : " Register now"}
              </button>
            )}

            <button
              onClick={() => navigate(`/event/sponsor-now?id=${productId}`)}
              className="w-100 p-[10px] bg-blue-700 text-white rounded font-semibold"
            >
              Sponsor now
            </button>
          </div>

          {/* DETAILS CONTAINER */}
          <div className="px-[10px]">
            {/* OUTLINE */}
            <div className="w-100 bg-blue-50 mt-[10px] rounded shadow border border-gray-300 p-[10px] mb-[10px]">
              {/* outline title */}
              <p className="text-blue-800 font-semibold text-lg">
                Event SDL outline
              </p>

              {/* SUBJECT CARD */}

              {eventData?.subjects?.map((subjectData: any, i: any) => {
                return (
                  <EventViewSubjectCard key={i} data={subjectData} index={i} />
                );
              })}
            </div>

            {/* SPONSORS LOGO */}
            <div className="w-100 p-[10px] rounded bg-blue-50 mb-[10px] shadow border border-gray-300">
              <p className="text-blue-800 font-semibold text-lg">Partners</p>
              {/* <div className="grid grid-cols-[repeat(auto-fill,250px)] p-[10px] pl-[0] gap-[10px] justify-around ">
                {eventData?.sponsors_logo?.map((sponsor: any, i: any) => {
                  return (
                    <div key={i} className="flex items-center justify-center">
                      <img
                        src={sponsor?.url}
                        alt="Partner's Logo"
                        className="rounded w-[200px] h-[auto] mobile:mb-[20px]"
                      />
                    </div>
                  );
                })}
              </div> */}

              <div className="w-100 my-[20px]">
                <Carousels data={eventData?.sponsors_logo} />
              </div>
            </div>

            {/* CAROUSEL */}

            {/* SPONSORS VIDEO */}
            {eventData?.sponsors_videos?.map((sponsorsData: any, i: any) => {
              return (
                <div
                  key={i}
                  className="w-100 p-[10px] rounded bg-blue-50 mb-[10px] shadow border border-gray-300"
                >
                  <div className="w-100 bg-blue-50 rounded">
                    <div className="class">
                      <div className="flex items-center justify-center mobile:flex-col">
                        <img
                          src={sponsorsData?.logo}
                          alt=""
                          className="h-[50px] w-[auto] mr-[10px] mobile:mr-[0]"
                        />
                        <p className="text-center font-semibold text-2xl text-blue-800">
                          {sponsorsData?.name}
                        </p>
                      </div>

                      <div className="w-100 flex justify-center items-center flex-col">
                        {sponsorsData?.post_data?.map(
                          (postData: any, i: any) => {
                            return (
                              <>
                                {postData?.file_type === "video" && (
                                  <video
                                    key={i}
                                    className="h-[auto] w-[90%] max-h-[400px] rounded mt-[10px] mobile:w-100"
                                    controls
                                  >
                                    <source src={postData?.url} />
                                  </video>
                                )}

                                {postData?.file_type === "image" && (
                                  <img
                                    key={i}
                                    className="h-[auto] w-[60%] rounded mt-[10px] bg-red-100 mobile:w-100"
                                    src={postData?.url}
                                    alt=""
                                  />
                                )}
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* SPONSORS POSTERS */}
            {eventData?.sponsors_post?.map((sponsorsData: any, i: any) => {
              return (
                <div
                  key={i}
                  className="w-100 p-[10px] rounded bg-blue-50 mb-[10px] shadow border border-gray-300"
                >
                  <div className="w-100 bg-blue-50 rounded">
                    <div className="class">
                      <div className="flex items-center justify-center mobile:flex-col">
                        <img
                          src={sponsorsData?.logo}
                          alt=""
                          className="h-[50px] w-[auto] mr-[10px] mobile:mr-[0]"
                        />
                        <p className="text-center font-semibold text-2xl text-blue-800">
                          {sponsorsData?.name}
                        </p>
                      </div>

                      <div className="w-100 flex justify-center items-center flex-col">
                        {sponsorsData?.post_data?.map(
                          (postData: any, i: any) => {
                            return (
                              <>
                                {postData?.file_type === "video" && (
                                  <video
                                    key={i}
                                    className="h-[auto] w-[90%] max-h-[400px] rounded mt-[10px] mobile:w-100"
                                    controls
                                  >
                                    <source src={postData?.url} />
                                  </video>
                                )}

                                {postData?.file_type === "image" && (
                                  <img
                                    key={i}
                                    className="h-[auto] w-[60%] rounded mt-[10px] bg-red-100 mobile:w-100"
                                    src={postData?.url}
                                    alt=""
                                  />
                                )}
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT START */}
        <div className="w-[100%]  min-w-[350px] p-[10px] tablet:w-100">
          {/* TOTAL RATINGS */}
          <div className="p-[10px] bg-blue-50 shadow rounded items-center border border-gray-300 tablet:mb-[10px] mb-[10px]">
            {/* STARS CONTAINER */}
            <div className="w-100 flex ">
              <p className="mr-[5px]  font-semibold">
                {parseFloat(eventData?.average_rating).toFixed(2)}
              </p>
              <div className="flex items-center">
                {stars.map((_, index) => {
                  return (
                    <GoStarFill
                      key={index}
                      size="17"
                      style={{
                        marginRight: "10",
                        cursor: "pointer",
                      }}
                      color={
                        eventData?.average_rating > index
                          ? colors.orange
                          : colors.gray
                      }
                    />
                  );
                })}
              </div>
              <p className="text-gray-600">
                ({eventData?.feedback_count} feedbacks)
              </p>
            </div>
            {/* STARS CONTAINER END */}

            {/* NUMBER OF ENROLEES */}
            <div className="mt-[5px] flex items-center">
              <p className="text-gray-600">Number of enrolees: </p>
              <p className="font-semibold">
                &nbsp; {eventData?.registered?.length}
              </p>
            </div>

            {/* DATE PUBLISHED */}
            <div className="mt-[5px] flex items-center">
              <p className="text-gray-600">Date published: </p>
              <p className="font-semibold">
                &nbsp; {date.toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
          {/* TOTAL RATINGS DETAILS END */}

          {/* {registered !== undefined ? (
            <button
              onClick={() => {
                if (!token) {
                  return navigate("/login");
                }
                navigate(`/owned/event/credentials?id=${productId}`);
              }}
              className="w-100 p-[10px] bg-blue-700 text-white mt-[10px] rounded font-semibold mb-[10px] tablet:hidden"
            >
              View
            </button>
          ) : (
            <button
              onClick={() => {
                if (new Date(eventData?.date_end) < new Date(Date.now())) {
                  return toas(
                    "Event ended. Please check SDL equivalent in your dashboard",
                    "error"
                  );
                }

                if (!token) {
                  return navigate("/login");
                }
                navigate(`/buy/product?id=${productId}`);
              }}
              className="w-100 p-[10px] bg-blue-700 text-white mt-[10px] rounded font-semibold mb-[10px] tablet:hidden"
            >
              {new Date(eventData?.date_end) < new Date(Date.now())
                ? "Event ended"
                : " Register now"}
            </button>
          )} */}

          {/* AUTHOR CONTAINER */}
          <div className="w-100 p-[20px] rounded bg-blue-50 flex flex-col items-center shadow border border-gray-300 mb-[10px]">
            <div className="w-[120px] h-[120px] bg-blue-800 rounded-circle mb-[5px]">
              <img
                src={eventData?.author_id?.avatar}
                alt=""
                className="h-100 w-100 border-[4px] border-blue-800 rounded-circle "
              />
            </div>
            <p className="text-blue-800 font-semibold text-lg">JSB</p>
            <p className="text-xs text-gray-700">Author</p>
          </div>
          {/* AUTHOR CONTAINER END */}

          {/* FEEDBACK CONTAINER */}
          <div className="w-100 p-[10px] bg-blue-50 rounded shadow border border-gray-300">
            <p className="text-center text-blue-900 font-semibold text-lg">
              Feedback
            </p>

            {/* REVIEW CARD */}

            {eventData?.feedback?.length === 0 && (
              <p className="text-center my-[10px]">No feedback yet.</p>
            )}

            {eventData?.feedback[0] && (
              <ProductViewReviewCard data={eventData?.feedback[0]} />
            )}

            {eventData?.feedback[1] && (
              <ProductViewReviewCard data={eventData?.feedback[1]} />
            )}

            {eventData?.feedback[2] && (
              <ProductViewReviewCard data={eventData?.feedback[2]} />
            )}

            {/* FEEDBACK POPUP */}
            {reviewPopupOpen && (
              <>
                <div
                  onClick={() => setReviewPopupOpen(false)}
                  className="fixed w-100 h-[100dvh] bg-gray-900 left-0 top-0 opacity-[30%] z-[9]"
                />
                <EventFeedbackPopup
                  setReviewPopupOpen={setReviewPopupOpen}
                  data={eventData?.feedback}
                />
              </>
            )}
            <button
              onClick={() => setReviewPopupOpen(true)}
              className="bg-blue-800 text-sm p-[10px] rounded-[20px] px-[20px] text-white ml-[50%] translate-x-[-50%] hover:opacity-[80%] active:opacity-[60%]"
            >
              Show all
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProduct;
