type Props = {
  videoData: any;
  index: any;
};

const EventVideoCard = ({ videoData, index }: Props) => {

    console.log(videoData)
  return (
    <>
      <div className="w-100 bg-gray-200 p-[10px] flex items-center">
        {/* INDEX */}
        <div className="w-[50px] min-w-[50px]">{index + 1}.)</div>
        <div className="grow">{videoData?._id?.title}</div>
      </div>
    </>
  );
};

export default EventVideoCard;
