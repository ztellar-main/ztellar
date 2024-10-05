import { useState } from 'react';
import OwnedSEventSidebar from '../../components/Owned/OwnedSEventSidebar';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { Navigate } from 'react-router-dom';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import QRCode from 'react-qr-code';
import { PiCertificateLight } from 'react-icons/pi';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EventPdfCertificate from '../../components/Owned/EventPdfCertificate';

const OwnedEventCredentials = () => {
  const token = useAppSelector((state) => state.user.token);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get('id') || '';

  const [openSidebar, setOpenSide] = useState(true);

  const formButtonFunction = (url: any) => {
    console.log('sample');
    window.open(`${url}`, '_blank');
    // window.location.href =
    //   'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/event-downloadable-forms%2FAction-Sheet-Editable.pdf?alt=media&token=217313ef-50bb-4b1b-95d1-ecb62c00fee6';
  };

  const {
    data: eventdata,
    isLoading,
    isError,
    error,
    isFetched,
  } = useQuery({
    queryKey: ['credentials'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `users/get-user-owned-event?id=${productId}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[70px] h-[70px] fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return <Navigate to="/owned" />;
  }

  console.log(eventdata?.eventData?._id);

  return (
    <div>
      <div className="flex">
        <OwnedSEventSidebar
          setOpenSide={setOpenSide}
          openSidebar={openSidebar}
          page="credentials"
          productId={productId}
        />

        {isFetched && (
          <div className={`grow bg-gray-100 `}>
            <div className="bg-indigo-900 h-[30px] w-100 sticky top-0 left-0 z-[10] flex items-center justify-center">
              <p className="text-white text-center">Aquired Event Dashboard</p>
            </div>
            <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px] sticky top-[30px] left-0 z-[10]">
              {openSidebar ? (
                <div className="tablet:hidden" />
              ) : (
                <button
                  onClick={() => setOpenSide(true)}
                  className="transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
                >
                  <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
                </button>
              )}

              {!openSidebar ? (
                <div className="mobileMin:hidden" />
              ) : (
                <button
                  onClick={() => setOpenSide(false)}
                  className="tabletMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
                >
                  <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
                </button>
              )}

              <p className={`first-line:mr-[10px] text-gray-700 mr-[5px]`}>
                aquired event / credentials
              </p>
            </div>

            {/* MAIN BODY */}

            <div className="p-[10px]">
              <div className="w-[40%] mobile:w-[100%] laptop:w-[80%] bg-indigo-800 shadow border border-gray-300 ml-[50%] translate-x-[-50%] p-[30px] flex flex-col items-center rounded">
                <p className="text-white text-xl mb-[10px]">
                  {eventdata?.eventData?._id?.title}
                </p>

                {eventdata?.eventData?.reg_type === 'face_to_face' && (
                  <>
                    <p className="text-gray-400">
                      This QR code serves as your Access ID
                    </p>
                    <div className="w-[70%] p-[20px] bg-white rounded mb-[5px]">
                      <QRCode
                        size={256}
                        style={{
                          height: 'auto',
                          maxWidth: '100%',
                          width: '100%',
                        }}
                        value={eventdata?.eventData?.qr_code}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <p className="text-gray-500">
                      {eventdata?.eventData?.qr_code}
                    </p>
                  </>
                )}

                <p className="mt-[20px] text-2xl font-semibold text-white">
                  {eventdata?.userData?.fname} {eventdata?.userData?.lname}
                </p>

                <p className="text-white">
                  Registration type:
                  {eventdata?.eventData?.reg_type}
                </p>
              </div>

              <p className="text-center mt-[10px] mb-[20px]">
                Official certificate with QR Code will be available after the
                conference. This download button is for certificate preview
                only.
              </p>

              {eventdata?.eventData?._id?.certificate?.map(
                (certData: any, i: any) => {
                  return (
                    <div key={i} className="mb-[15px]">
                      <p className="text-center font-semibold text-lg">
                        {certData?.certificate_name}
                      </p>
                      <PDFDownloadLink
                        document={
                          <EventPdfCertificate
                            fname={eventdata?.userData?.fname}
                            lname={eventdata?.userData?.lname}
                            mname={eventdata?.userData?.mname}
                            imageSrc={certData?.image_src}
                            alignItems={certData?.align_items}
                            top={certData?.top}
                            width={certData?.width}
                            orientations={certData?.orientation}
                            size={certData?.size}
                            marginLeft={certData?.margin_left}
                          />
                        }
                        fileName={`${certData?.certificate_name}-${eventdata?.eventData?._id?.title}.pdf`}
                      >
                        <button className="ml-[50%] translate-x-[-50%] bg-blue-900 p-[10px] rounded text-white hover:opacity-[80%] active:opacity-[100%] flex items-center justify-center mobile:w-[80%]">
                          <PiCertificateLight className="w-[25px] h-[25px] mr-[5px]" />
                          Download Certificate
                        </button>
                      </PDFDownloadLink>
                    </div>
                  );
                }
              )}

              <div className="w-100 p-[10px] bg-indigo-800 text-center text-2xl font-semibold text-white mt-[20px]">
                Forms
              </div>
              <div className="">
                {eventdata?.eventData?._id?.download_forms?.map(
                  (downloadableForms: any, i: any) => {
                    return (
                      <div key={i}>
                        <p className="text-center font-semibold text-lg mb-[5px]">
                          {downloadableForms?.title}
                        </p>
                        <button
                          onClick={() =>
                            formButtonFunction(downloadableForms?.url)
                          }
                          className="ml-[50%] translate-x-[-50%] bg-blue-900 p-[10px] rounded text-white hover:opacity-[80%] active:opacity-[100%] flex items-center justify-center mobile:w-[80%]"
                        >
                          Download Form
                        </button>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="w-100 p-[10px] bg-indigo-800 text-center text-2xl font-semibold text-white mt-[20px]">
                Attendance
              </div>

              {eventdata?.eventData?._id?.attendance?.map(
                (attendanceData: any, i: any) => {
                  return (
                    <div
                      key={i}
                      className="w-100 p-[10px] flex flex-col items-center mt-[10px]"
                    >
                      <p className="text-center font-semibold">
                        {attendanceData?.title}
                      </p>
                      <a href={attendanceData?.link} target="_blank">
                        <button className="bg-indigo-900 text-white p-[10px] rounded px-[20px]">
                          Day {i + 1}
                        </button>
                      </a>
                    </div>
                  );
                }
              )}

              <div className="w-100 p-[10px] bg-indigo-800 text-center text-2xl font-semibold text-white mt-[20px]">
                Quiz
              </div>

              {/* QUIZ */}

              {eventdata?.eventData?._id?.quiz?.map((quizData: any, i: any) => {
                return (
                  <div
                    key={i}
                    className="w-100 p-[10px] flex flex-col items-center mt-[10px] border-b border-gray-300"
                  >
                    <p className="text-center font-semibold text-xl">
                      {quizData?.title}
                    </p>

                    {quizData?.subtitle && (
                      <p className="text-center font-semibold">
                        TITLE: {quizData?.subtitle}
                      </p>
                    )}

                    {quizData?.speaker && (
                      <p className="text-center font-semibold">
                        SPEAKER: {quizData?.speaker}
                      </p>
                    )}

                    <a href={quizData?.link} target="_blank">
                      <button className="bg-indigo-900 text-white p-[10px] rounded px-[20px]">
                        Quiz {i + 1}
                      </button>
                    </a>
                  </div>
                );
              })}

              {/* GENERAL */}
              <div className="w-100 p-[10px] bg-indigo-800 text-center text-2xl font-semibold text-white mt-[20px]">
                General
              </div>

              {/* <div className="w-100 p-[10px] flex flex-col items-center mt-[10px]">
              <p className="text-center font-semibold">
                Evaluation form for all speakers
              </p>
              <a href="" target="_blank">
                <button className="bg-indigo-900 text-white p-[10px] rounded px-[20px]">
                  Go to link
                </button>
              </a>
            </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnedEventCredentials;
