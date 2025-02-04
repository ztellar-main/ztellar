type Props = {
  setShowCertificate: any;
};

const BackgroudCloser = ({ setShowCertificate }: Props) => {
  return (
    <div
      onClick={() => setShowCertificate((e: any) => !e)}
      className="w-full h-[100lvh] bg-black opacity-50 fixed top-0 left-0"
    ></div>
  );
};

export default BackgroudCloser;
