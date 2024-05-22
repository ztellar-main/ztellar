import axios from "axios";
import toas from "../../utils/toas";
import { useAppSelector } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/store";
import { paymongoId } from "../../state/userSlice";

type Props = {
  regType: string;
  price: string;
  productId: string;
  productType: string;
  title: string;
  authorId: string;
  userId: string;
};

const PaymongoCashPaymentButton = ({
  regType,
  price,
  productId,
  productType,
  title,
  authorId,
  userId,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((e) => e.user.token);

  //   SUBMIT BUTTON
  const submitPaymongo = async () => {
    if (!userId) {
      return toas("Enter user id.", "error");
    }

    if (!regType || !price || !productId || !productType || !authorId) {
      return toas("Please choose registration.", "error");
    }

    try {
      const res = await axios({
        method: "post",
        url: "/paymongo/create-checkout-cash-payment",
        data: { regType, price, productId, productType, title, authorId ,uid:userId },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const checkoutId = res.data.id;
      dispatch(paymongoId(checkoutId));
      const checkoutUrl = res?.data?.attributes?.checkout_url;
      window.location.href = checkoutUrl;
    } catch (err) {
      toas("Something went wrong please try again.", "error");
      navigate(`/search?query=${productId}`);
    }
  };
  return (
    <>
      <button
        onClick={submitPaymongo}
        className="w-100 bg-green-600 text-white p-[10px] rounded hover:bg-green-400 active:bg-green-600"
      >
        Paymongo
      </button>
    </>
  );
};

export default PaymongoCashPaymentButton;
