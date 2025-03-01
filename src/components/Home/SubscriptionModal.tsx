import React from "react";

// DATA IMPORT
import { SubscriptionPlanType } from "../../data/subscriptionData";

// REACT ICONS
import { VscClose } from "react-icons/vsc";

type Props = {
  plan: SubscriptionPlanType;
  onClose: () => void;
};

const SubscriptionModal: React.FC<Props> = ({ plan, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-3 rounded-md shadow-lg w-1/2 min-w-80 max-h-[650px] overflow-auto">
        {/* TITLE AND CLOSE CONTAINER */}
        <div className="flex justify-between items-center mb-3">
          {/* TITLE */}
          <h2 className="text-2xl font-bold">{plan.title} Plan</h2>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#333] hover:opacity-70 transition duration-300"
          >
            <VscClose size={24} />
          </button>
        </div>

        {/* FEATURES LIST */}
        <div className="border border-[#CFD8DC] rounded-md overflow-hidden">
          <div className="p-4 flex  bg-gray-100 border-b border-[#CFD8DC]">
            <p className="font-bold flex-1 text-lg"> Features</p>
            <p className="font-bold flex-1 text-lg"> Details</p>
          </div>
          {Object.entries(plan.features).map(([key, value]) => (
            <div key={key} className="flex p-3 border-b border-[#CFD8DC]">
              <span className="font-normal text-[#333333] flex-1">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-[#333333] font-semibold capitalize flex-1">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
