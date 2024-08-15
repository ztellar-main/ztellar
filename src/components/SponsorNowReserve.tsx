import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import toas from "../utils/toas";
import axios from "axios";
import { useAppSelector } from "../state/store";

type Props = {
  eventTitle: String;
  bootNumber: String;
  prices: any;
  fileUrl: string;
  setOpenForm: any;
  productId: string;
  bootId: string
};

const SponsorNowReserve = ({
  eventTitle,
  bootNumber,
  fileUrl,
  prices,
  setOpenForm,
  productId,
  bootId
}: Props) => {
  const [priceData, setPriceData] = useState({
    priceName: "",
    price: null,
  });

  const user = useAppSelector((e) => e.user.currentUser);
  const senderEmail = user?.email;

  const submitButtonFunction = async (sponsorType: any, sponsorPrice: any) => {
    if (!priceData?.priceName || !priceData?.price) {
      return toas("Please select type to sponsor", "error");
    }

    try {
      await axios({
        method: "put",
        url: "users/sponsor-reserve",
        data: {
          productId,
          senderEmail,
          eventTitle,
          bootNumber,
          sponsorType,
          sponsorPrice,
          bootId
        },
      });
      window.location.href = fileUrl;
      toas("Successfully reserved", "success");
      setOpenForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-white border border-gray-200 shadow-lg rounded p-[20px]">
      <div
        onClick={() => setOpenForm(false)}
        className="w-100 flex justify-end cursor-pointer"
      >
        <IoCloseOutline className="w-[30px] h-[30px]" />
      </div>

      <p className="text-center my-[10px]">Title of event</p>
      <p className="text-center my-[10px] text-2xl font-semibold text-blue-600">
        {eventTitle}
      </p>

      <p className="text-center font-semibold text-blue-600 text-lg">
        Boot number: {bootNumber}
      </p>

      <Select
        size="lg"
        label="Select type to sponsor"
        placeholder={undefined}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={undefined}
      >
        {prices?.map((priceData: any, i: any) => {
          return (
            <Option
              onClick={() =>
                setPriceData({
                  priceName: priceData?.price_name,
                  price: priceData?.price,
                })
              }
              key={i}
            >
              {priceData?.price_name}: {priceData?.price}
            </Option>
          );
        })}
      </Select>

      <p className="text-center font-semibold mt-[20px] mb-[5px]">
        Important Reminder:
      </p>

      <p className="w-[70%] ml-[50%] translate-x-[-50%] indent-10">
        Please download the sponsorship contract by clicking the "Download"
        button below. Fill in the required information, sign the contract, and
        send it back to us within 2 weeks or before the 72nd PSME National
        Convention, scheduled for October 17–19, 2024. Your prompt response will
        help us secure your participation and ensure a smooth collaboration.
        Please email the completed contract to psmelrc@vizcom.ph. Should you
        need further information, please book an appointment [here] or email us
        at psmelrc@vizcom.ph.
      </p>

      <button
        onClick={() => {
          return submitButtonFunction(priceData?.priceName, priceData?.price);
        }}
        className="bg-blue-800 py-[10px] px-[20px] rounded ml-[50%] translate-x-[-50%] text-white cursor-pointer hover:bg-blue-600 mt-[20px]"
      >
        Download
      </button>
    </div>
  );
};

export default SponsorNowReserve;
