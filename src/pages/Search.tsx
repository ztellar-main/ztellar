import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CgSpinnerTwoAlt } from "react-icons/cg";

// COMPONENTS
import ProductSearchCard from "../components/ProductSearchCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productTitle = query.get("query") || "";

  const { data: productData, isLoading } = useQuery({
    queryKey: [productTitle, "search"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/product/get-search-product?title=${productTitle}`
      });

      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[70px] h-[70px] ml-[50%] translate-x-[-50%] mt-[30px]">
        <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
      </div>
    );
  }

  console.log(productData);

  return (
    <>
      <div className="">
        <Navbar />
        {/* MAIN BODY */}
        <div className="bg-blue-800 p-[10px] text-white text-lg font-semibold">
          Search courses and events
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,270px)] p-[20px] gap-[10px] justify-around">
          {productData?.map((data: any, i: any) => {
            return <ProductSearchCard key={i} data={data} />;
          })}
        </div>

        {productData?.length <= 0 && (
          <p className="text-center">Event or course title does not exist</p>
        )}
      </div>
    </>
  );
};

export default Search;
