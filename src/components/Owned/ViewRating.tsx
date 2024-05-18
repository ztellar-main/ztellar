
import { FaStar } from "react-icons/fa";

type Props = {
  feedbackExist: any;
  setOpenViewRating: any;
};

const ViewRating = ({ feedbackExist, setOpenViewRating }: Props) => {
  const stars = Array(5).fill(0);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  return (
    <>
      <div className="w-[50%] laptop:w-[70%] tablet:w-[90%] mobile:w-[95%] bg-indigo-900 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded z-[10] p-[20px] flex flex-col items-center">
        <p className="text-white text-lg font-semibold mb-[5px]">Review</p>
        <p className="text-white text-sm font-semibold mb-[20px]">
          {" "}
          Thank you for rating.
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
                  feedbackExist?.rating > index ? colors?.orange : colors?.grey
                }
              />
            );
          })}
        </div>
        {/* START CONTAINER END */}
        <div className="bg-white w-100 p-[10px] mt-[10px]">
          <p className="text-center">{feedbackExist?.comment}</p>
        </div>

        <button
          onClick={() => setOpenViewRating(false)}
          className="bg-blue-800 w-100 p-[10px] mt-[20px] text-white rounded font-semibold hover:opacity-[80%] active:opacity-[60%]"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ViewRating;
