import { GoStarFill } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';
// import { Feedback } from "../data/feedbackData";

interface FeedbackModalProps {
  feedbackData: any;
  onClose: () => void;
}

const FeedbackModal = ({ feedbackData, onClose }: FeedbackModalProps) => {
  const stars = Array(5).fill(0);
  const colors = {
    orange: '#FFD600',
    gray: '#a9a9a9',
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-lg w-[900px] md:w-[700px] lg:w-[50%] shadow-lg overflow-auto max-h-[80vh]">
        <div className="flex fixed bg-white w-[900px] md:w-[700px] lg:w-[50%] justify-between p-4 rounded">
          <h2 className="text-[24px] font-bold text-center text-[#333333]">
            All Feedbacks
          </h2>
          <button onClick={onClose} className="text-[#333333]">
            <IoCloseOutline size={20} />
          </button>
        </div>

        <div className=" mt-[80px]">
          {feedbackData.map((feedback: any, index: any) => {
            const date = new window.Date(feedback?.createdAt);
            return (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300 mb-2 mx-2"
              >
                <p className="mb-4 text-[#333333] font-medium">
                  {feedback?.comment}
                </p>
                <div className="flex mb-4 items-center">
                  <img
                    src={feedback?.user?.avatar}
                    className="h-[50px] w-[50px] rounded-full mr-4"
                    alt="User avatar"
                  />
                  <div>
                    <p className="text-[18px] text-[#333333] font-bold mb-2">
                      {feedback?.user?.fname} {feedback?.user?.lname}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-[24px] flex">
                        {stars.map((_, index) => {
                          return (
                            <GoStarFill
                              key={index}
                              size="14"
                              style={{
                                marginRight: '5',
                                cursor: 'pointer',
                              }}
                              color={
                                feedback?.rating > index
                                  ? colors.orange
                                  : colors.gray
                              }
                            />
                          );
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-light text-[#333333]">
                  {' '}
                  {date.toLocaleDateString('en-US')}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
