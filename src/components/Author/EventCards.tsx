import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
    data:any
    index:any
}

function EventCards({data,index}: Props) {
    const navigate = useNavigate()
  const [action, setAction] = useState(false);
  return (
    <tr>
      <td className="p-3 text-sm tracking-wide">{index + 1}.)</td>
      <td className="p-3 text-sm tracking-wide">
        {data?.title}
      </td>
      <td className="p-3 text-sm tracking-wide tabletMin:w-[285px]">
        <div className="tablet:hidden">
          <button onClick={() => navigate(`/author/event/setup?id=${data?._id}`)} className="bg-green-600 text-white p-[8px] w-[80px] rounded tracking-wider hover:bg-green-400 mr-[10px] active:bg-green-600 shadow">
            Setup
          </button>

          <button className="bg-blue-600 text-white p-[8px] w-[80px] rounded tracking-wider hover:bg-blue-400 mr-[10px] active:bg-blue-600 shadow">
            Edit
          </button>

          <button className="bg-red-600 text-white p-[10px] w-[80px] rounded tracking-wider hover:bg-red-400 active:bg-red-600 shadow">
            Delete
          </button>
        </div>

        {/* SELECT ACTION BUTTON */}
        <div className="relative mobileMin:w-[140px] tabletMin:hidden">
          <button
            onClick={() => (action ? setAction(false) : setAction(true))}
            className="white border rounded flex items-center justify-between tablet:text-xs p-[10px] text-gray-600 w-100 text-nowrap bg-gray-50"
          >
            Select action
            <MdKeyboardArrowDown className="ml-[5px]" />
          </button>
          {action && (
            <div className="bg-gray-50 shadow absolute w-100 top-[45px] p-[5px] rounded z-[12]">
              <button onClick={() => navigate(`/author/event/setup?id=${data?._id}`)} className="bg-green-600 text-white p-[8px] w-100 rounded tracking-wider  active:bg-green-400 shadow mb-[5px]">
                Setup
              </button>

              <button className="bg-blue-600 text-white p-[8px] w-100 rounded tracking-wider  active:bg-blue-400 shadow mb-[5px]">
                Edit
              </button>

              <button className="bg-red-600 text-white p-[8px] w-100 rounded tracking-wider  active:bg-red-400 shadow">
                Delete
              </button>
            </div>
          )}
          {action && (
            <div
              onClick={() => setAction(false)}
              className=" w-100 h-100 z-[11] fixed top-0 left-0"
            />
          )}
        </div>
      </td>
    </tr>
  );
}

export default EventCards;
