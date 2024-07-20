import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
};

const VideoPrivate = ({ videoUrl }: Props) => {
  return (
    <div className="bg-black w-100 h-[100%] flex justify-center">
      {/* <video className="w-100" controls>
        <source src={videoUrl} />
      </video> */}
      <ReactPlayer
        controls
        width="100%"
        height="100%"
        url={videoUrl}
        config={{
          file:{
      
          }
        }}
      />
    </div>
  );
};

export default VideoPrivate;
