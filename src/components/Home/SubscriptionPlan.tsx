import React from 'react';
import { SubscriptionPlanType } from '../../data/subscriptionData';

type Props = {
  plan: SubscriptionPlanType;
  onMoreDetails: () => void;
};

const SubscriptionPlan: React.FC<Props> = ({ plan, onMoreDetails }) => {
  return (
    <>
      <div className={'rounded-lg shadow-md hover:opacity-90 overflow-hidden border border-blue-gray-50'}>
        <div
          className={`${plan.appearance.bgColor} p-4 flex items-center justify-center`}
        >
          <p className="font-bold text-xl text-left text-white">{plan.title}</p>
        </div>
        <div className={` flex flex-col p-4 `}>
          <p className="text-sm font-light py-2 text-[#333333]">
            Storage Limit:{' '}
            <span className="font-bold ">
              {plan.features.SecureEventDataStorage}
            </span>
          </p>
          <p className="text-sm font-light py-2 text-[#333333]">
            Event Pages:{' '}
            <span className="font-bold">{plan.features.EventPages}</span>
          </p>
          <p className="text-sm font-light py-2 text-[#333333]">
            Customer Support:{' '}
            <span className="font-bold">{plan.features.CustomerSupport}</span>
          </p>
          <p className="text-sm font-light py-2 text-[#333333]">
            Livestream Capability:{' '}
            <span className="font-bold">
              {plan.features.LivestreamManpowerSupport}
            </span>
          </p>
          <p className="text-sm font-light py-2 text-[#333333]">
            Event Data Storage:{' '}
            <span className="font-bold">{plan.features.DataStorage}</span>
          </p>

          <div className="flex justify-center items-center p-2 mt-5">
            <button
              onClick={onMoreDetails}
              className="border border-[#333333] text-[#333333] font-light px-7 py-3 rounded underline underline-offset-2 hover:bg-[#333333] hover:text-white duration-300"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlan;
