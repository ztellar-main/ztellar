type Props = {
  data: any;
  index: any;
};

const UserListCard = ({ data, index }: Props) => {

  console.log(index)
  return (
    <tr>
      {/* <td className="p-3 text-sm tracking-wide">{index + 1}.</td>
      <td className="p-3 text-sm tracking-wide">{data?._id}</td>
      <td className="p-3 text-sm tracking-wide">{data?.email}</td>
      <td className="p-3 text-sm tracking-wide">{data?.product_owned?.length}</td>
      <td className="p-3 text-sm tracking-wide">{data?.fname} {data?.lname}</td> */}
      <td className="p-3 text-sm tracking-wide">{data?._id?.fname} {data?._id?.lname}</td>
    </tr>
  );
};

export default UserListCard;
