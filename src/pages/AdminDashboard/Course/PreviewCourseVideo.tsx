import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import ShakaPlayerWithUI from '../../../components/VideoPlayers/ShakaPlayer';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const PreviewCourseVideo = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const token = useAppSelector((e: any) => e.user.token);
  const query = new URLSearchParams(location.search);
  const id = query.get('id') || '';
  const index = query.get('index') || '';
  const [videoState, setVideoState] = useState({
    message: '',
    status: 'start',
  });

  const {
    data: videoData,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ['get-preview-video'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/video/get-preview-video?id=${id}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });

      return res?.data;
    },
  });

  // console.log(videoUrl);

  if (isLoading) {
    return <p className="class">Loading</p>;
  }

  const videoUrl = videoData?.video_url_converted;

  return (
    <>
      <div className="bg-gray-50 flex">
        <Sidebar
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="Course"
        />
        <div className="w-100">
          <Header />
          <SubHeader
            setopenSidebar={setopenSidebar}
            openSidebar={openSidebar}
            page="/course/setup/preview-video"
          />

          {/* MAIN BODY */}
          <div className="w-100 bg-black flex items-center justify-center">
            {isFetched && (
              <ShakaPlayerWithUI
                key={videoUrl}
                // src={`http://localhost:4000/api/video/${videoUrl}`}
                src={`https://ztellar-api-backend.onrender.com/api/video/${videoUrl}`}
                setVideoState={setVideoState}
              />
            )}
          </div>
          {/* video sub body */}
          <div className="p-[10px]">
            <p className="text-blue-gray-800 font-bold text-2xl laptop:text-xl mobile:text-lg">
              {index} {videoData?.title}
            </p>
            {videoState?.status === 'start' && (
              <p className="">
                <CgSpinnerTwoAlt className="text-blue-800 animate-spin w-[30px] h-[30px]" />
              </p>
            )}
            {videoState?.status !== 'start' && (
              <p
                className={`${
                  videoState?.status === 'success'
                    ? 'text-green-600'
                    : 'text-red-600'
                }
            `}
              >
                {videoState?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewCourseVideo;
