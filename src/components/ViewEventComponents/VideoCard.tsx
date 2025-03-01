import { PiVideoThin } from 'react-icons/pi';

type Props = {
  videos: any;
};

const VideoCard = ({ videos }: Props) => {
  console.log(videos);
  return (
    <tr className="">
      <td className="" colSpan={3}>
        <div className="">
          {videos.map((video: any, videoIndex: any) => (
            <div className="px-2 py-3 flex items-center pl-6" key={videoIndex}>
              <PiVideoThin size={20} className="text-[#333333] mr-3" />
              <p className="tracking-[1px] text-sm">{video?._id?.title}</p>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default VideoCard;
