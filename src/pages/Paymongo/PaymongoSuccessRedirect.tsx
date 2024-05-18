import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { paymongoIdClear } from "../../state/userSlice";
import toas from "../../utils/toas";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const PaymongoSuccessRedirect = () => {
  const paymongoId = useAppSelector((e) => e.user.paymongo);
  const token = useAppSelector((e) => e.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: retrieveData,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: [paymongoId],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/paymongo/retrieve-checkout?checkoutId=${paymongoId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });

      const result = res?.data;

      const paymentStatus =
        result?.data?.attributes?.payment_intent?.attributes.status;

      console.log(paymentStatus);

      if (paymentStatus !== "succeeded") {
        toas("You have no present registration.", "error");
        navigate("/");
        return res?.data;
      }

      const description =
        result?.data?.attributes?.payment_intent?.attributes?.description;
      const amount =
        result?.data?.attributes?.payment_intent?.attributes?.amount;
      const amountString = amount.toString();
      const transactionFee =
        result?.data?.attributes?.payments[0]?.attributes?.fee;
      const amountLessFee = amount - transactionFee;
      const last = amountLessFee.toString();

      // VALUE START
      const lessAmount: any = last.slice(0, -2) + "." + last.slice(-2);
      const baseAmount =
        amountString.slice(0, -2) + "." + amountString.slice(-2);
      const paymentMode =
        result?.data?.attributes?.payment_intent?.attributes?.payments[0]
          .attributes.source.type;
      const paymentSource = "paymongo";
      const authorId = description.split("/")[1];
      const productId = description.split("/")[0];
      const productType = description.split("/")[2];
      const regType = description.split("/")[3];

      const authorPayment = Number(lessAmount * 0.928);
      const ztellarFee = Number(lessAmount * 0.072);

      const buyerId = description.split("/")[4];

      // const buyerId = "6648af4ed324ee229b29acd5";

      try {
        await axios({
          method: "put",
          url: "/payment/create-payment",
          data: {
            lessAmount,
            baseAmount,
            paymentMode,
            paymentSource,
            authorId,
            productId,
            productType,
            regType,
            buyerId,
            authorPayment,
            ztellarFee,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        dispatch(paymongoIdClear());
        toas("Transaction successful", "success");
        navigate("/");
      } catch (err) {
        console.log(err);
      }

      return res?.data;
    },
  });

  if (!paymongoId) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
        <p className="text-indigo-900 text-lg font-semibold tracking-widest">
          Processing
        </p>
        <p className="text-indigo-900 font-semibold tracking-widest">
          Please wait ...{" "}
        </p>
        <div className="w-[70px] h-[70px]">
          <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
        </div>
      </div>
    );
  }

  if (isFetched) {
    if (!retrieveData) {
      return <Navigate to="/" />;
    }
  }
};

export default PaymongoSuccessRedirect;
