import axios from 'axios';
import { GoVideo } from 'react-icons/go';
import { useAppSelector } from '../../../state/store';

type Props = {
  videoData: any;
  userStates: any;
  setUserStates: any;
  subjectId: any;
  subjectTitle: any;
  courseId: any;
  width: any;
  setShowSidebar: any;
};

const VideoCard = ({
  videoData,
  subjectId,
  userStates,
  setUserStates,
  subjectTitle,
  courseId,
  width,
  setShowSidebar,
}: Props) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const videoCardOnclickFunction = async () => {
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
    const recentClicked = {
      component: 'video' || '',
      subject: {
        subjectTitle: subjectTitle || '',
        subjectId: subjectId || '',
      },
      video: {
        videoTitle: videoData?.data?.title || '',
        videoUrl: videoData?.data?.video_public_url || '',
        videoId: videoData?._id || '',
      },
    };

    try {
      await axios({
        method: 'put',
        url: '/course/update-recent-clicked',
        data: { userStates: recentClicked, courseId: courseId },
        headers: {
          authorization: `Token ${token}`,
        },
      });
    } catch (err) {
      console.log('erro');
    }

    if (width < 768) {
      setShowSidebar(false);
    }
  };
  return (
    <div
      onClick={videoCardOnclickFunction}
      className={`h-[60px] w-full  flex items-center px-2 py-2 cursor-pointer hover:bg-blue-gray-50 ${
        videoData?._id === userStates?.video?.videoId && 'bg-blue-gray-100'
      }`}
    >
      <GoVideo className="mr-2 w-[17px] h-[17px] min-w-[17px] min-h-[17px]" />

      <div className="text-sm line-clamp-1 text-blue-gray-900">
        1. {videoData?.data?.title}
      </div>
    </div>
  );
};

export default VideoCard;
