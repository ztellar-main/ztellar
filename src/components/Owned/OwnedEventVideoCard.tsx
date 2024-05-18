import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  videoData: any;
  index: any;
  setVideoDataPresent: any;
  subjectIndex: any;
  setOpenSDLSidebar:any
  link:any
};

const OwnedEventVideoCard = ({
  videoData,
  index,
  setVideoDataPresent,
  subjectIndex,
  setOpenSDLSidebar,link
}: Props) => {
  const videoCardOnClickFunction = async () => {
    setVideoDataPresent({
      title: videoData?._id?.title,
      video_url: videoData?._id?.video_url,
      subject_index: subjectIndex,
      video_index: index,
      subject_link:link
    });
    setOpenSDLSidebar(false);
  };

  return (
    <>
      <div
        onClick={videoCardOnClickFunction}
        className="w-100 p-[10px] text-white flex items-center cursor-pointer bg-indigo-400"
      >
        <MdOutlineOndemandVideo className="mr-[10px] w-[20px] h-[20px] min-w-[20px] min-h-[20px]" />

        <div className="line-clamp-2">
          Part {index + 1}: {videoData?._id?.title}
        </div>
      </div>
    </>
  );
};

export default OwnedEventVideoCard;
