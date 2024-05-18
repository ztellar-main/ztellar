import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

type Props = {
  imageUrl: string;
  className: string;
};
const CloudinaryImg = ({ imageUrl, className }: Props) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dbagrkam0" } });

  const myImage = cld.image(`${imageUrl}`);

  myImage.resize(thumbnail().width(1280));
  return (
    <>
      <AdvancedImage cldImg={myImage} className={className} />
    </>
  );
};

export default CloudinaryImg;
