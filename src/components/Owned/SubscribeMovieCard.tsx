import { useNavigate } from 'react-router-dom';
import LeaveRating from './LeaveRating';
import { useState } from 'react';
import { useAppSelector } from '../../state/store';
import ViewRating from './ViewRating';

type Props = {
  data: any;
  setRefresher: any;
};

const SubscribeMovieCard = ({ data, setRefresher }: Props) => {
  const navigate = useNavigate();
  const [openLeaveRatingOpen, setLeaveRatingOpen] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);
  const [openViewRating, setOpenViewRating] = useState(false);

  const feedbackExist = data?._id?.feedback?.find((e: any) => {
    return e.user === user._id;
  });

  // const expiry = new Date(data?.expiry);
  // const dateNow = new Date(Date.now());

  console.log(data);

  return (
    <>
      {openLeaveRatingOpen && (
        <>
          <div
            onClick={() => setLeaveRatingOpen(false)}
            className="fixed w-100 h-[100dvh] bg-gray-900 left-0 top-0 opacity-[30%] z-[9]"
          />
          <LeaveRating
            productId={data?._id?._id}
            setRefresher={setRefresher}
            setLeaveRatingOpen={setLeaveRatingOpen}
          />
        </>
      )}

      {openViewRating && (
        <>
          <div
            onClick={() => setOpenViewRating(false)}
            className="fixed w-100 h-[100dvh] bg-gray-900 left-0 top-0 opacity-[30%] z-[9]"
          />
          <ViewRating
            feedbackExist={feedbackExist}
            setOpenViewRating={setOpenViewRating}
          />
        </>
      )}

      <div className="p-[10px] bg-blue-50 shadow border rounded hover:opacity-[90%] border-gray-300">
        <div
          onClick={() =>
            navigate(`/view/movie/subscribed?id=${data?._id}`)
          }
          className="w-100"
        ></div>

        <div className="w-100 h-[130px] bg-gray-50 rounded">
          <img src={data?.product_id?.image_url} alt="" />
        </div>

        {/* TITLE */}
        <div className="w-100 line-clamp-2 mt-[5px] font-semibold">
          {data?.product_id?.title}
        </div>

        <button
          onClick={() =>
            navigate(`/view/movie/subscribed?id=${data?._id}`)
          }
          className="w-100 bg-blue-800 text-white mt-[10px] p-[5px] rounded hover:bg-blue-600 active:bg-blue-900"
        >
          Watch
        </button>

        {feedbackExist ? (
          <button
            onClick={() => setOpenViewRating(true)}
            className="w-100 bg-indigo-800 text-white mt-[10px] p-[5px] rounded hover:bg-indigo-600 active:bg-indigo-900"
          >
            VIEW RATING
          </button>
        ) : (
          <button
            onClick={() => setLeaveRatingOpen(true)}
            className="w-100 bg-indigo-800 text-white mt-[10px] p-[5px] rounded hover:bg-indigo-600 active:bg-indigo-900"
          >
            LEAVE RATING
          </button>
        )}
      </div>
    </>
  );
};

export default SubscribeMovieCard;
