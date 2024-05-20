import { LuScanLine } from "react-icons/lu";

type Props = {
  data: any;
  index: any;
};
const ScanEventCard = ({ data, index }: Props) => {
  return (
    <tr>
      <td className="p-3 text-sm tracking-wide">{index + 1}.)</td>
      <td className="p-3 text-sm tracking-wide">{data?.title}</td>
      <td className="p-3 text-sm tracking-wide">
        <button
          onClick={() =>
            (window.location.href = `/author/event/go-scan?id=${data?._id}`)
          }
          className="bg-indigo-900 text-white p-[5px] px-[10px] rounded flex items-center hover:bg-indigo-700 active-indigo-800"
        >
          Go scan
          <LuScanLine className="ml-[5px]" />
        </button>
      </td>
    </tr>
  );
};

export default ScanEventCard;
