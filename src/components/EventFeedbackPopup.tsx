import ProductViewReviewCard from "./ProductViewReviewCard";

type Props = {
  data: any;
  setReviewPopupOpen:any
};

const EventFeedbackPopup = ({ data,setReviewPopupOpen }: Props) => {
  return (
    <div className="w-[50%] bg-blue-50 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded border border-gray-400 shadow z-[10] h-[80%]">
      <div className="w-100 bg-blue-800 rounded-t h-[50px] flex items-center justify-center">
        <p className="text-white text-xl text-center font-semibold">Feedback</p>
      </div>

      <div className=" w-100 h-[calc(100%-100px)] overflow-auto p-[10px]">
        {data?.map((eventData:any,i:any) => {
            return <ProductViewReviewCard key={i} data={eventData} />
        })}
        
      </div>

      <div className="h-[50px]">
        <button onClick={() => setReviewPopupOpen(false)} className="bg-blue-800 py-[10px] w-[50%] ml-[25%] text-white rounded-[30px]">
          Close
        </button>
      </div>
    </div>
  );
};

export default EventFeedbackPopup;
