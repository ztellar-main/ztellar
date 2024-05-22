type Props = {
  data: any;
  index: any;
};

const UserListCard = ({ data, index }: Props) => {
  return (
    <tr>
      <td className="p-3 text-sm tracking-wide">{index + 1}.</td>
      <td className="p-3 text-sm tracking-wide">{data?._id}</td>
      <td className="p-3 text-sm tracking-wide">{data?.email}</td>
      <td className="p-3 text-sm tracking-wide">{data?.product_owned?.length}</td>
    </tr>
  );
};

export default UserListCard;
