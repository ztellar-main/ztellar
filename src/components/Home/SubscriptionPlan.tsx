import React from "react";
import { SubscriptionPlanType } from "../../data/subscriptionData";

type Props = {
  plan: SubscriptionPlanType;
  onMoreDetails: () => void;
};

const SubscriptionPlan: React.FC<Props> = ({ plan, onMoreDetails }) => {
  return (
    <div className={`${plan.appearance.bgColor} flex flex-col p-4 rounded-lg shadow-md hover:opacity-90`}>
      <p className="font-bold text-xl text-left mb-2">{plan.title}</p>
      <p className="text-base font-light py-2">
        Storage Limit: <span className="font-bold">{plan.features.SecureEventDataStorage}</span>
      </p>
      <p className="text-base font-light py-2">
        Event Pages: <span className="font-bold">{plan.features.EventPages}</span>
      </p>
      <p className="text-base font-light py-2">
        Customer Support: <span className="font-bold">{plan.features.CustomerSupport}</span>
      </p>
      <p className="text-base font-light py-2">
        Livestream Capability: <span className="font-bold">{plan.features.LivestreamManpowerSupport}</span>
      </p>
      <p className="text-base font-light py-2">
        Event Data Storage: <span className="font-bold">{plan.features.DataStorage}</span>
      </p>

      <div className="flex justify-center items-center p-2 mt-5">
        <button onClick={onMoreDetails} className="bg-[#243B55] text-white font-light px-7 py-3 rounded">
          More Details
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
