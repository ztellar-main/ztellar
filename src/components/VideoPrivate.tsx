import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
};

const VideoPrivate = ({ videoUrl }: Props) => {
  return (
    <div className="bg-black w-100 h-[100%] flex justify-center">
      <ReactPlayer
        controls
        width="100%"
        height="100%"
        url={[
          {
            src: videoUrl,
            type: "video/mp4",
          },
        ]}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // Disable download in some browsers
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPrivate;
