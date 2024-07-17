import axios from "axios";
import  { useEffect, useState } from "react";

type Props = {
  videoId: string;
};

const VideoPrivate = ({ videoId }: Props) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios.post("/private-video/private-video", { videoId }).then((res) => {
      setVideoData(res?.data);
    });
  }, []);
  return (
    <div className="bg-black w-100 h-[100%] flex justify-center">
      {videoData?.otp && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=ezOKtoOPlhooJfn8`}
          style={{ border: 0, height: "100%", width: "100%" }}
          allow="encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoPrivate;
