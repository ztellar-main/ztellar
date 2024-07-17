import { GoStarFill } from "react-icons/go";

const colors = {
  orange: "#FFD600",
  gray: "#a9a9a9",
};

type Props = {
  data: any;
};

const ProductViewReviewCard = ({ data }: Props) => {
  const date = new window.Date(data?.createdAt);
  const stars = Array(5).fill(0);
  return (
    <>
      {/* REVIEW CARD */}
      <div className="class">
        {/* USER DETAILS */}
        <div className="w-100 flex">
          {/* USER ICON */}
          <div className="w-[50px] h-[50px] bg-blue-900 rounded-circle">
            <img
              src={data?.user?.avatar}
              alt=""
              className="w-100 h-100 border-[2px] object-cover border-blue-800 rounded-circle"
            />
          </div>
          {/*  */}
          <div className="text-xs ml-[5px] flex flex-col grow">
            <p className="mt-[5px] mb-[5px]">
              {data?.user?.fname} {data?.user?.lname}
            </p>
            <div className="flex">
              {stars.map((_, index) => {
                return (
                  <GoStarFill
                    key={index}
                    size="15"
                    style={{
                      marginRight: "10",
                      cursor: "pointer",
                    }}
                    color={5 > index ? colors?.orange : colors?.gray}
                  />
                );
              })}
            </div>
          </div>

          {/* REVIEW DATE */}
          <p className="text-xs mt-[5px]">{date.toLocaleDateString("en-US")}</p>
        </div>
        {/* USER DETAILS END */}

        <div className="text-sm ml-[20px] mt-[10px]">{data?.comment}</div>

        <hr className="my-[10px] border-t border-gray-300 w-[80%] ml-[10%]" />
      </div>
      {/* REVIEW CARD END */}
    </>
  );
};

export default ProductViewReviewCard;
