import { BsCash } from "react-icons/bs";

type Props = {
  data: any;
  index: any;
};
const EventCashPaymentCard = ({ data, index }: Props) => {
  return (
    <tr>
      <td className="p-3 text-sm tracking-wide">{index + 1}.)</td>
      <td className="p-3 text-sm tracking-wide">{data?.title}</td>
      <td className="p-3 text-sm tracking-wide">
        <button
          onClick={() =>
            (window.location.href = `/author/event/go-event-cash?id=${data?._id}`)
          }
          className="bg-indigo-900 text-white p-[5px] px-[10px] rounded flex items-center hover:bg-indigo-700 active-indigo-800"
        >
          Pay cash
          <BsCash className="ml-[5px]" />
        </button>
      </td>
    </tr>
  );
};

export default EventCashPaymentCard;
