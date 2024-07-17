import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../state/store";
import axios from "axios";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { useState } from "react";
import PaymongoButton from "../components/Paymongo/PaymongoButton";

const BuyProduct = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productId = query.get("id") || "";
  const token = useAppSelector((e) => e.user.token);

  const [price, setPrice] = useState("");

  const regTypeFinal = price.split("/")[0];
  const priceFinal = price.split("/")[1];

  const { data, isFetched, isLoading } = useQuery({
    queryKey: [productId],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/product/find-product-id?id=${productId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <div className="p-[20px]">
          <p className="text-center text-2xl font-semibold text-blue-900">
            Please wait ...
          </p>
          <div className="w-[70px] h-[70px] ml-[50%] translate-x-[-50%] mt-[30px]">
            <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
          </div>
        </div>
      );
    }
  };

  if (isFetched) {
    if (!data) {
      return <Navigate to="/" />;
    }
  }

  const PHP = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <div className="bg-gray-100 min-h-[100vh]">
      <Navbar />

      <Loading />
      {/* MAIN BODY */}
      <div className="p-[10px]">
        <div className="w-[50%] tablet:w-100 ml-[50%] translate-x-[-50%] shadow bg-blue-50 p-[10px] rounded border border-black mt-[20px]">
          <div className="w-100 h-[auto] rounded">
            <img
              src={data?.image_url}
              alt=""
              className="w-100 h-[100%] object-cover"
            />
          </div>

          <div className="p-[5px]">
            <div className="w-100 text-lg font-semibold text-gray-800">
              {data?.title}
            </div>
          </div>

          <div className="flex items-center">
            <hr className="grow border-t border-gray-600" />
            <div className="mx-[20px] text-gray-600">REGISTRATION OPTION</div>
            <hr className="grow border-t border-gray-600" />
          </div>

          <div className="w-100">
            <select
              onChange={(e) => setPrice(e.target.value)}
              className="w-100 border p-[10px] border-gray-400 rounded"
              name=""
              id=""
            >
              <option value="">Choose registration</option>

              {data?.prices?.map((priceData: any, i: any) => {
                return (
                  <option
                    key={i}
                    value={`${priceData?.priceType}/${priceData?.price}`}
                  >
                    {priceData?.priceName} - {PHP.format(priceData?.price)}
                  </option>
                );
              })}
            </select>
          </div>
          <hr className="my-[20px] border-t border-gray-600" />

          {/* PAYMONGO BUTTON */}
          <PaymongoButton
            regType={regTypeFinal}
            price={priceFinal}
            productId={productId}
            productType={data?.type}
            title={data?.title}
            authorId={data?.author_id}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
