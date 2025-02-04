import { useState } from 'react';
import BackgroudCloser from './BackgroudCloser';
import PopupCertificate from './PopupCertificate';

type Props = {
  certData: any;
};

const EventCertificate = ({ certData }: Props) => {
  const [showCertificate, setShowCertificate] = useState(false);
  return (
    <div className="">
      {showCertificate && (
        <>
          <PopupCertificate
            certData={certData}
            setShowCertificate={setShowCertificate}
          />
          <BackgroudCloser setShowCertificate={setShowCertificate} />
        </>
      )}

      <p className="text-center text-sm mb-2">Description: {certData?.title}</p>

      <button
        onClick={() => setShowCertificate((e: any) => !e)}
        className="bg-blue-900 text-white px-4 py-2 rounded ml-[50%] translate-x-[-50%] text-xs"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default EventCertificate;
