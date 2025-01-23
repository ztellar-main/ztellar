import { GoVideo } from 'react-icons/go';

const VideoCard = () => {
  return (
    <div className="h-[72px] w-full bg-red-100 flex items-center px-2 py-2">
      <div className="mr-2 bg-green-50 h-full">
        <GoVideo />
      </div>
      <div className="text-sm line-clamp-2">
        1. ndustry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it
      </div>
    </div>
  );
};

export default VideoCard;
