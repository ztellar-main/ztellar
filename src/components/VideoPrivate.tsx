type Props = {
  videoUrl: string;
};

const VideoPrivate = ({ videoUrl }: Props) => {
  return (
    <div className="bg-black w-100 h-[100%] flex justify-center">
      <video className="w-100" controls>
        <source src={videoUrl} />
      </video>
    </div>
  );
};

export default VideoPrivate;
