import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
  data: any;
};

const ProductSearchCards = ({ data }: Props) => {
  const navigate = useNavigate();
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#facc15",
    gray: "#f9fafb",
  };

  const date = new window.Date(data?.createdAt);

  const dateStart = new window.Date(data?.date_start);

  const dateEnd = new window.Date(data?.date_end);



  const cardOnClickFunction = async () => {
    if (data?.type === "event") {
      navigate(`/view/event?id=${data?._id}`);
    }
  };

  return (
    <div
      onClick={cardOnClickFunction}
      className="border border-gray-400 rounded-[5px] cursor-pointer hover:bg-blue-50 duration-300 shadow-sm shadow-gray-400"
    >
      <div className="w-full h-[180px] border border-gray-300 rounded bg-gray-100">
        <img
          src={data?.image_url}
          alt={data?.type}
          className="w-100 h-[100%] object-cover rounded-t"
        />
      </div>
      <div className="z-10 mt-[-20px] flex justify-center items-center mb-[10px]">
        <div className="bg-[#1A66CC] w-[150px] flex justify-center py-[10px] text-white rounded-[5px]">
          {data?.type.toUpperCase()}
        </div>
      </div>
      <div className="p-[5px]">
        <p className="font-bold text-[18px] text-gray-900 leading-6 mb-[10px]">
          {data?.title}
        </p>
        <p className="text-[14px] text-gray-800 font-medium mb-[10px]">
          {data?.author_id?.fname} {data?.author_id?.lname}
        </p>

        <div className="relative h-[90px] flex items-center my-[10px]">
          <div className="bg-gray-500 py-[10px] flex justify-center pl-[80px] w-100 rounded-[5px]">
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size="20"
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
          <div className="text-[90px] absolute top-0 left-[9px]">
            <FaStar className="text-yellow-400 z-10" />
          </div>
          <div className="absolute left-[30px] text-sm flex flex-col justify-center items-center leading-tight">
            <p className="text-gray-900 font-bold">
              {parseFloat(data?.average_rating).toFixed(2)}
            </p>
            <p className="text-gray-800 font-bold">Rating</p>
          </div>
        </div>

        <div>
          <p className="text-[#64748B]">
            Place:
            <span className="text-black ml-[5px]">{data?.place}</span>
          </p>
        </div>

        <div>
          <p className="text-[#64748B]">
            Event date:
            <span className="text-black ml-[5px]">{dateStart.toLocaleDateString("en-US")} - {dateEnd.toLocaleDateString("en-US")}</span>
          </p>
        </div>

        <div>
          <p className="text-[#64748B]">
            Feedbacks:
            <span className="text-black ml-[5px]">{data?.feedback_count}</span>
          </p>
        </div>

        <div>
          <p className="text-[#64748B]">
            Created on:
            <span className="text-black ml-[5px]">
              {date.toLocaleDateString("en-US")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchCards;
