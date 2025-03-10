import { useState } from 'react';

type Props = {
  data: any;
};

const ListOfContestants = ({ data }: Props) => {
  const [openPopup, setOpenPopup] = useState(false);

  console.log();
  return (
    <tr className="even:bg-gray-100">
      <td className="p-3 text-left border border-slate-600">
        {data?.team_name}
      </td>
      <td className="p-3 text-left border border-slate-600">
        {data?.team_mates.length + 1}
      </td>
      <td className="p-3 text-left border border-slate-600">
        <button onClick={() => setOpenPopup((e: any) => !e)} className="">
          More Details
        </button>
        {openPopup && (
          //   <ListOfSponsorsPopup
          //     data={data}
          //     setOpenPopup={setOpenPopup}
          //     eventId={eventId}
          //     setRefresher={setRefresher}
          //   />
          <></>
        )}
      </td>
    </tr>
  );
};

export default ListOfContestants;
