import CloudinaryImg from "./CloudinaryImg";
import CloudinaryVideoNormal from "./CloudinaryVideoNormal";

type Props = {
  data: any;
};

const SponsorPostCard = ({ data }: Props) => {
  return (
    <>
      {/* SPONSOR POST */}
      <div className="w-100 bg-blue-50 p-[10px] mt-[10px] rounded shadow border border-gray-300">
        {/* TOP CONTAINER */}
        <div className="w-100 flex items-center p-[10px]">
          {data?.logo_url && (
            <div className="w-[auto] h-[50px] ">
              <CloudinaryImg
                imageUrl={data?.logo_url}
                className="w-100 h-100"
              />
            </div>
          )}

          <p className="ml-[10px] font-semibold text-blue-800">{data?.name}</p>
        </div>
        <div className="w-100 h-[400px]">
          <CloudinaryVideoNormal videoUrl={data?.video_url} />
        </div>
      </div>
    </>
  );
};

export default SponsorPostCard;
