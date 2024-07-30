import { useState } from "react";
import OwnedSEventSidebar from "../../components/Owned/OwnedSEventSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import { Navigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const OwnedEventQuiz = () => {
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("id") || "";
  const [answer, setAnswer] = useState("");
  const [openSidebar, setOpenSide] = useState(true);
  const [state, setState] = useState(false);

  const {
    data: eventdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["credentials", state],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/product/get-event-questions?id=${productId}`,
        headers: {
          Authorization: `Token ${token}`,
        },
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
    return <Navigate to="/owned" />;
  }

  console.log(eventdata.data);

  const handleSubmit = async () => {
    const questionIndex = eventdata?.index;

    try {
      await axios({
        method: "PUT",
        url: "/product/save-answer-on-event",
        data: {
          questionIndex,
          answer,
          productId,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setState((data) => !data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex">
        <OwnedSEventSidebar
          setOpenSide={setOpenSide}
          openSidebar={openSidebar}
          page="quiz"
          productId={productId}
        />

        <div className={`grow bg-gray-100 `}>
          <div className="bg-indigo-900 h-[30px] w-100 sticky top-0 left-0 z-[10] flex items-center justify-center">
            <p className="text-white text-center">Aquired Event Dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px] sticky top-[30px] left-0 z-[10]">
            {openSidebar ? (
              <div className="tablet:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(true)}
                className="transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            {!openSidebar ? (
              <div className="mobileMin:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(false)}
                className="tabletMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            <p className={`first-line:mr-[10px] text-gray-700 mr-[5px]`}>
              aquired event / credentials
            </p>
          </div>

          {/* MAIN BODY */}

          <div className="p-[10px]">
            {/* GENERAL */}
            <div className="w-100 p-[10px] bg-indigo-800 text-center text-2xl font-semibold text-white mt-[20px]">
              Quiz
            </div>

            {!eventdata.finished && (
              <>
                <div className="class">
                  {/* QUESTION */}
                  <p className="class">
                    {eventdata?.index + 1}.) {eventdata?.question?.question}
                  </p>
                  {eventdata?.question?.choices.map(
                    (choicesData: any, i: any) => {
                      return (
                        <div key={i} className="flex">
                          {/* LABEL */}
                          <input
                            type="radio"
                            name="choices"
                            className="ml-[10px]"
                            value={choicesData?.label}
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {/* DESCRIPTION */}
                          <p className="ml-[10px]">
                            {" "}
                            {choicesData?.description}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="mt-[20px]">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-800 w-100 p-[10px] text-white rounded active:bg-blue-500 hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {eventdata.finished && (
              <>
                <div className="class">
                  <p className="class">Score</p>
                  <p className="class">
                    {eventdata?.data?.score}/{eventdata?.data?.answers.length}
                  </p>
                </div>

                <div className="class">
                  <p className="class">ANSWERS</p>
                </div>
                {eventdata?.data?.answers.map((answerData: any, i: any) => {
                  return (
                    <div key={i} className="class">
                      <p className="class">
                        {i + 1}.) {answerData?.answer} -{" "}
                        {answerData?.correct === true ? "Correct" : "Wrong"}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedEventQuiz;
