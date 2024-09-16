import Navbar from '../../components/Navbar';
import { FaStar } from 'react-icons/fa';

const CoursePreviewPublic = () => {
  const stars = Array(5).fill(0);
  const colors = {
    orange: '#ffcc32',
    gray: 'blue-gray-50',
  };
  return (
    <div>
      <Navbar />
      {/* MAIN BODY */}
      <div className="w-100 p-[5px] bg-blue-gray-50 text-blue-gray-800 flex justify-end tracking-wider">
        /view/course
      </div>
      {/* VIDEO */}
      <div className="w-100 h-[400px] bg-black"></div>
      {/* DETAILS */}
      <div className="w-100 max-w-[1280px] ml-[50%] translate-x-[-50%] laptop:p-[10px]">
        {/* title */}
        <p className="my-[10px] text-2xl font-bold text-blue-gray-900">
          When an unknown printer took a galley of type and scrambled it to
        </p>
        {/* description */}
        <p className="text-blue-gray-800 text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset s
        </p>

        <hr className="m-[20px]" />
        {/* author */}
        <div className="bg-blue-gray-100 p-[10px]">
          <div className="flex my-[10px]">
            <div className="w-[50px] h-[50px] bg-blue-gray-300 rounded-[50%] mr-[10px]"></div>

            <div className="flex flex-col justify-center">
              <p className="font-semibold text-blue-gray-900 mb-[2px]">
                Juan Dela Cruz
              </p>
              <p className="text-xs">Author</p>
            </div>
          </div>
          {/* rating */}
          <div className="flex items-center">
            <p className="text-lg mr-[5px] text-blue-gray-800">0.00</p>
            <div className="flex">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size="18"
                    style={{
                      marginRight: '10',
                      cursor: 'pointer',
                    }}
                    color={1 > index ? colors.orange : colors.gray}
                  />
                );
              })}
            </div>
            <p className="text-lg mr-[5px] text-blue-gray-800">(100)</p>
          </div>
        </div>
      </div>

      <div className="h-[100px] "></div>

      <div className="w-100 max-w-[1280px] bg-blue-gray-900 p-[15px] laptop:p-[10px] mobile:p-[15px] ml-[50%] translate-x-[-50%] fixed bottom-0 laptopMin:rounded-t-[20px] font-semibold text-white flex items-center justify-center">
        Get this course for only P3,000
        <button className="bg-blue-800 p-[10px] rounded ml-[10px] px-[20px]">
          Acquire now
        </button>
      </div>
    </div>
  );
};

export default CoursePreviewPublic;
