import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import axios from "axios";
import { CgSpinnerTwoAlt } from "react-icons/cg";

// COMPONENTS
import UserListCard from "../components/UserListCard";
import { useState } from "react";

const UserList = () => {
  const [inputValue, setInputValue] = useState("");

  console.log(inputValue);

  const { data, isLoading } = useQuery({
    queryKey: ["userData", inputValue],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/users/user-list?email=${inputValue}`,
      });
      return res?.data;
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <div className="w-[50px] h-[50px] ml-[50%] translate-x-[-50%] mt-[50px] ">
          <CgSpinnerTwoAlt className="w-100 h-100 animate-spin" />
        </div>
      );
    }
  };

  const userData = data?.registered?.filter((udata: any) => {
    console.log(udata);
    return udata?.qr_code === inputValue;
  });

  return (
    <div>
      <Navbar />

      <div className="w-100 p-[10px] border-b border-gray-300">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Enter your email.."
          className="w-[80%] ml-[10%] p-[10px] border border-gray-300 shadow rounded"
        />
      </div>

      <table className="table-auto w-full">
        <thead className="bg-white border-b-2 border-indigo-500 text-left text-gray-700">
          <tr className="">
            <th className="p-3 text-sm tracking-wide">#</th>
            <th className="p-3 text-sm tracking-wide">ID</th>
            <th className="p-3 text-sm tracking-wide">Email</th>
            <th className="p-3 text-sm tracking-wide">owned #</th>
            <th className="p-3 text-sm tracking-wide">fname</th>
            <th className="p-3 text-sm tracking-wide">lname</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((uData: any, i: any) => {
            return <UserListCard data={uData} key={i} index={i} />;
          })}
        </tbody>
      </table>
      <Loading />
    </div>
  );
};

export default UserList;
