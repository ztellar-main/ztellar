import { RiLiveLine } from "react-icons/ri";

type Props = {
  data: any;
};

const GoLiveEventCard = ({ data }: Props) => {
  console.log(data);
  return (
    <tr>
      <td className="p-3 text-sm tracking-wide">{"1.)"}</td>
      <td className="p-3 text-sm tracking-wide">{data?.title}</td>
      <td className="p-3 text-sm tracking-wide">
        <button
          onClick={() =>
            (window.location.href = `/author/event/go-live?id=${data?._id}`)
          }
          className="bg-indigo-900 text-white p-[5px] px-[10px] rounded flex items-center hover:bg-indigo-700 active-indigo-800"
        >
          Go live
          <RiLiveLine className="ml-[5px]" />
        </button>
      </td>
    </tr>
  );
};

export default GoLiveEventCard;
