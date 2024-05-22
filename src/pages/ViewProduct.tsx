// COMPONENTS
import Navbar from "../components/Navbar";
import CloudinaryVideoNormal from "../components/CloudinaryVideoNormal";
import { GoStarFill } from "react-icons/go";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import CloudinaryImg from "../components/CloudinaryImg";
import EventViewSubjectCard from "../components/EventViewSubjectCard";
import ProductViewReviewCard from "../components/ProductViewReviewCard";
import EventFeedbackPopup from "../components/EventFeedbackPopup";
import { useState } from "react";
import { useAppSelector } from "../state/store";

const ViewProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.currentUser);
  const productId = query.get("id") || "";
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

  // console.log(eventData?.registered);

  const date = new window.Date(eventData?.createdAt);

  const registered = eventData?.registered?.find((data: any) => {
    return data?._id === user?._id;
  });

  console.log(registered);

  return (
    <div className="w-100 ">
      <Navbar />
      <div className="w-100 bg-blue-900 text-white text-lg p-[10px] font-semibold tracking-wider">
        {eventData?.title}
      </div>
      {/* MAIN BODY */}
      <div className="w-100 bg-white flex tablet:flex-col">
        {/* LEFT */}
        <div className="grow ">
          {/* VIDEO CONTAINER */}
          <div className="w-100 h-[400px] ">
            <CloudinaryVideoNormal videoUrl={eventData?.video_url} />
          </div>
          {/* REG BUTTON TOP */}
          <div className="w-100 p-[10px] pb-0 tabletMin:hidden">
            {registered !== undefined ? (
              <button
                onClick={() => {
                  if (!token) {
                    return navigate("/login");
                  }
                  navigate(`/owned/event/credentials?id=${productId}`);
                }}
                className="w-100 p-[10px] bg-blue-700 text-white rounded font-semibold"
              >
                View
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!token) {
                    return navigate("/login");
                  }
                  navigate(`/buy/product?id=${productId}`);
                }}
                className="w-100 p-[10px] bg-blue-700 text-white rounded font-semibold"
              >
                Register now
              </button>
            )}
          </div>

          {/* DETAILS CONTAINER */}
          <div className="pl-[10px] tablet:pr-[10px]">
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
            {/* OUTLINE END */}

            {/* SPONSORS LOGO START */}
            <div className="w-100 p-[10px] bg-blue-50 rounded shadow border border-gray-300">
              <div className="text-blue-800 text-xl font-semibold mb-[10px] mobile:text-center">
                Partners
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,150px)] mobile:grid-cols-[repeat(auto-fill,100px)] p-[20px] gap-[20px] justify-around items-center">
                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/b0hha96nzppytqolrmc0"
                    className="w-100 h-[auto]"
                  />
                </div>
                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/cyyu0glhampjuvbiueci"
                    className="w-100 h-[auto]"
                  />
                </div>
                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/fkybpesfj1hvibsiqphv"
                    className="w-100 h-[auto]"
                  />
                </div>
                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/gilvtb4rqz60gwfmfxyx"
                    className="w-100 h-[auto]"
                  />
                </div>
                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/vvzvrftdx1ydqnfnjwba"
                    className="w-100 h-[auto]"
                  />
                </div>
                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/ualfh1v40jhv1wlrf5hi"
                    className="w-100 h-[auto]"
                  />
                </div>

                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/gbp5t11adhenoqczpzw4"
                    className="w-100 h-[auto]"
                  />
                </div>

                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/w2mr85nyjahi5mx8pxxc"
                    className="w-100 h-[auto]"
                  />
                </div>

                <div className="">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/leki2i9awhp7wxjgew5t"
                    className="w-100 h-[auto]"
                  />
                </div>
              </div>
            </div>
            {/* SPONSORS LOGO END */}

            {/* SPONSOR POST */}
            <div className="w-100 bg-blue-50 p-[10px] mt-[10px] rounded shadow border border-gray-300">
              {/* TOP CONTAINER */}
              <div className="w-100 bg-red-100 flex items-center">
                <div className="w-[50px] h-[50px] ">
                  <CloudinaryImg
                    imageUrl="ztellar/LRC 2024 sponsrs/w2mr85nyjahi5mx8pxxc"
                    className="w-100 h-100"
                  />
                </div>
                <p className="bg-red-100 ml-[10px]">Company name</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[350px]  min-w-[350px] p-[10px] tablet:w-100">
          {/* TOTAL RATINGS */}
          <div className="p-[10px] bg-blue-50 shadow rounded items-center border border-gray-300 tablet:mb-[10px]">
            {/* STARS CONTAINER */}
            <div className="w-100 flex  ">
              <p className="mr-[5px]  font-semibold">
                {eventData?.average_rating} (stars)
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
              <p className="text-gray-600">({eventData?.feedback_count})</p>
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

          {registered !== undefined ? (
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
                if (!token) {
                  return navigate("/login");
                }
                navigate(`/buy/product?id=${productId}`);
              }}
              className="w-100 p-[10px] bg-blue-700 text-white mt-[10px] rounded font-semibold mb-[10px] tablet:hidden"
            >
              Register now
            </button>
          )}

          {/* AUTHOR CONTAINER */}
          <div className="w-100 p-[20px] rounded bg-blue-50 flex flex-col items-center shadow border border-gray-300 mb-[10px]">
            <div className="w-[120px] h-[120px] bg-blue-800 rounded-circle mb-[5px]">
              <CloudinaryImg
                imageUrl="ztellar/ztellar/pzoz9wj3y3onkg62dcdx"
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
            {/* {eventData?.feedback?.map((reviewData:any,i:any) => {
              return <ProductViewReviewCard key={i} data={reviewData}  />
            })} */}

            <p className="text-center my-[10px]">No feedback yet.</p>

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
      <div className="w-100 h-[300px] bg-indigo-900 mt-[30px]"></div>
    </div>
  );
};

export default ViewProduct;
