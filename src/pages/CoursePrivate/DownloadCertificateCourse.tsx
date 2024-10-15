import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import toas from '../../utils/toas';
import { useNavigate } from 'react-router-dom';

const DownloadCertificateCourse = () => {
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';
  const token = useAppSelector((e: any) => e?.user?.token);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['download-certificate-course'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/if-user-passed-all-subjects?courseId=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  const downloadCertFunction = () => {
    if (data?.numberOfSubjects?.length !== data?.pass.length) {
      return toas(
        "You need to pass all the subject's quizes first before you can download your certificate.",
        'error'
      );
    }
    toas(
      'Congratulation on passing this course, your certificate is now downloading',
      'success'
    );
  };

  const subjectData = data?.numberOfSubjects;
  const answerData = data?.pass;

  const notInArray2 = subjectData?.filter(
    (item1: any) =>
      !answerData.some((item2: any) => item2.subject_id === item1?.data?._id)
  );

  return (
    <div>
      {/* HEADER */}
      <div className="bg-blue-gray-50 p-[10px] flex justify-end text-blue-gray-800">
        Download Certificate Page
      </div>

      <div className="p-[5px] w-100 flex justify-end">
        <button
          onClick={() => navigate(`/acquired/course?id=${courseId}`)}
          className="p-[10px] bg-blue-gray-800 text-white rounded px-[20px]"
        >
          Back
        </button>
      </div>

      {/* TITLE */}
      <p className="text-center my-[10px] text-2xl font-semibold text-blue-gray-800">
        This is a sample title
      </p>

      {/* MESSAGE */}
      <p className="text-center mb-[10px]">List of all quizes you passed.</p>

      {/* CARDS CONTAINER*/}
      {answerData?.length === 0 ? (
        <p className="my-[10px] text-center ">No quizes passed yet.</p>
      ) : (
        <div className="mb-[20px]">
          {answerData?.map((subjectMap: any, i: any) => {
            return (
              <div
                key={i}
                className=" p-[10px] w-[60%] max-w-[80%] ml-[50%] translate-x-[-50%] flex justify-between bg-blue-gray-50 border-b border-blue-gray-100"
              >
                <p className="">{subjectMap?.subject_title}</p>
                <p className="text-green-600">Passed</p>
              </div>
            );
          })}
        </div>
      )}

      <hr className="" />

      {/*  */}
      {notInArray2?.length === 0 ? (
        <p className="my-[10px] text-center ">
          Congratulations, you've pass all your subject's quizes
        </p>
      ) : (
        <p className="my-[10px] text-center ">
          Pass all this subject's quizes first before you can download your
          certificate.
        </p>
      )}

      {notInArray2?.map((subjectMap: any, i: any) => {
        return (
          <div
            key={i}
            className=" p-[10px] w-[60%] max-w-[80%] ml-[50%] translate-x-[-50%] flex justify-between bg-blue-gray-50 border-b border-blue-gray-100"
          >
            <p className="">{subjectMap?.data?.title}</p>
            <p className="">Not yet passed</p>
          </div>
        );
      })}

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadCertFunction}
        className="my-[20px] bg-blue-gray-800 text-white ml-[50%] translate-x-[-50%] p-[10px] rounded"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default DownloadCertificateCourse;
