import { PiVideoLight } from "react-icons/pi";

type Props = {
  data: any;
  index: any;
};

const EventViewVideoCard = ({ data, index }: Props) => {
  return (
    <div className="w-100 bg-blue-800 text-white p-[10px] flex items-center border border-gray-400 cursor-pointer pl-[30px]">
      <PiVideoLight className="w-[25px] h-[auto] mr-[10px] min-w-[25px]" />
      {index + 1}.) {data?._id?.title}
    </div>
  );
};

export default EventViewVideoCard;
