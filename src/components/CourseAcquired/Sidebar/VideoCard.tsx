import { GoVideo } from 'react-icons/go';

type Props = {
  videoData: any;
  userStates: any;
  setUserStates: any;
  subjectId: any;
  subjectTitle: any;
};

const VideoCard = ({
  videoData,
  subjectId,
  // userStates,
  setUserStates,
  subjectTitle,
}: Props) => {
  const videoCardOnclickFunction = () => {
    setUserStates({
      component: 'video',
      subject: {
        subjectTitle,
        subjectId,
      },
      video: {
        videoTitle: videoData?.data?.title,
        videoUrl: videoData?.data?.video_public_url,
        videoId: videoData?._id,
      },
    });
  };
  return (
    <div
      onClick={videoCardOnclickFunction}
      className="h-[60px] w-full  flex items-center px-2 py-2 cursor-pointer hover:bg-blue-gray-50"
    >
      <GoVideo className="mr-2 w-[17px] h-[17px] min-w-[17px] min-h-[17px]" />

      <div className="text-sm line-clamp-1 text-blue-gray-900">
        1. {videoData?.data?.title}
      </div>
    </div>
  );
};

export default VideoCard;
