import { useNavigate } from "react-router-dom";
import CloudinaryImg from "./CloudinaryImg";
import { GoStarFill } from "react-icons/go";

type Props = {
  data: any;
};

const ProductSearchCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFD600",
    gray: "#a9a9a9",
  };

  const date = new window.Date(data?.createdAt);

  const cardOnClickFunction = async () => {
    if (data?.type === "event") {
      navigate(`/view/event?id=${data?._id}`);
    }
  };

  console.log(data?.average_rating);

  return (
    <>
      <div
        onClick={cardOnClickFunction}
        className="shadow rounded p-[10px] border cursor-pointer hover:opacity-[80%] bg-blue-50 border-gray-300"
      >
        {/* IMAGE */}
        <div className="w-100 h-[150px]">
          <img
            src={data?.image_url}
            alt=""
            className="w-100 h-[100%] object-cover rounded"
          />
        </div>

        {/* TITLE */}
        <div className="w-100 line-clamp-2 mt-[5px] font-semibold">
          {data?.title}
        </div>

        {/* RATING CONTAINER */}
        <div className="flex items-center mt-[5px]">
          <p className="mr-[5px] text-gray-600">
            {parseFloat(data?.average_rating).toFixed(2)}
          </p>
          {/* STAR CONTAINER */}
          <div className="flex ">
            {stars.map((_, index) => {
              return (
                <GoStarFill
                  key={index}
                  size="15"
                  style={{
                    marginRight: "10",
                    cursor: "pointer",
                  }}
                  color={
                    data?.average_rating > index ? colors.orange : colors.gray
                  }
                />
              );
            })}
          </div>
        </div>
        <p className="text-gray-600">({data?.feedback_count} feedbacks)</p>

        {/* CREATED AT */}
        <div className="text-gray-600 mt-[5px] text-sm">
          Created at: {date.toLocaleDateString("en-US")}
        </div>

        {/* TYPE BUTTON */}
        <button className="w-100 bg-blue-800 text-white mt-[10px] p-[5px] rounded hover:bg-blue-600 active:bg-blue-900">
          {data?.type.toUpperCase()}
        </button>
      </div>
    </>
  );
};

export default ProductSearchCard;
