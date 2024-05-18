import { useEffect, useRef } from "react";

type Props = {
  videoUrl:any
}

function CloudinaryVideoNormal({videoUrl}: Props) {
  const cloudinaryRef: any = useRef();
  const videoRef: any = useRef();

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "dbagrkam0",
      sourceTypes: ["hls", "dash", "webm/vp9", "mp4/h265", "mp4"],
      controls: true,
    });
  }, []);
  return (
    <video
      className="w-100 h-100"
      ref={videoRef}
      controls
      data-cld-public-id={videoUrl}
    />
  );
}

export default CloudinaryVideoNormal;
