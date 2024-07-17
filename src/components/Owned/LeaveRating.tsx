import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toas from "../../utils/toas";
import { useAppSelector } from "../../state/store";

type Props = {
  productId: any;
  setLeaveRatingOpen: any;
  setRefresher:any;
};

const LeaveRating = ({ productId, setLeaveRatingOpen, setRefresher }: Props) => {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(Number);
  const [comment, setComment] = useState("");
  const token = useAppSelector((state) => state.user.token);

  console.log(comment);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const handleClick = (value: any) => {
    setCurrentValue(value);
  };

  const handleMOuseHover = (value: any) => {
    setHoverValue(value);
  };

  const handleMouseLeave = (value: any) => {
    setHoverValue(value);
  };

  console.log(productId)

  const submitFeedbackButtonFunction = async () => {
    try {
      await axios({
        method: "post",
        url: "/feedback/create-event-feedback",
        data: { rating: currentValue, productId: productId, comment: comment },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setLeaveRatingOpen(false);
      setRefresher(true);
      toas("Review successfully save.", "success");
    } catch (err) {
      if (err instanceof AxiosError) {
        const error =
          err?.response?.data?.message || err?.response?.data || err?.message;
        toas(error, "error");
      }
    }
  };
  return (
    <>
      <div className="w-[50%] laptop:w-[70%] tablet:w-[90%] mobile:w-[95%] bg-indigo-900 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded z-[10] p-[20px] flex flex-col items-center">
        <p className="text-white text-lg font-semibold mb-[5px]">
          Leave your review
        </p>
        <p className="text-white text-sm font-semibold mb-[20px]">
          {" "}
          How would you rate your experience?
        </p>
        <p className="text-white text-lg font-semibold"> Rating</p>

        {/* START CONTAINER */}
        <div className="flex mt-[10px]">
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size="30"
                style={{
                  marginRight: "10",
                  cursor: "pointer",
                }}
                color={
                  (currentValue || hoverValue) > index
                    ? colors?.orange
                    : colors?.grey
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMOuseHover(index + 1)}
                onMouseLeave={() => handleMouseLeave(0)}
              />
            );
          })}
        </div>
        {/* START CONTAINER END */}
        <input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Type your comment here"
          className="w-100 p-[10px] mt-[20px] rounded shadow"
        />

        <button
          onClick={submitFeedbackButtonFunction}
          className="bg-blue-800 w-100 p-[10px] mt-[10px] text-white rounded font-semibold hover:opacity-[80%] active:opacity-[60%]"
        >
          Submit review
        </button>
      </div>
    </>
  );
};

export default LeaveRating;
