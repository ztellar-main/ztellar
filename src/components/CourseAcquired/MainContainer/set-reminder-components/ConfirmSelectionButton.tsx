import React from "react";

// INTERFACE
interface ConfirmSelectionButtonProps {
  handleSubmitCustomDays: () => void;
}

const ConfirmSelectionButton: React.FC<ConfirmSelectionButtonProps> = ({
  handleSubmitCustomDays,
}) => {
  return (
    <div className="w-full flex justify-center items-center p-3">
      {/* CONFIRM BUTTON */}
      {/* THIS WILL LET YOU SUBMIT YOUR SELECTED DAYS */}
      <button
        onClick={handleSubmitCustomDays}
        className="mt-4 bg-[#2F2F2F] text-white px-7 py-3 rounded-lg hover:bg-opacity-90 transition"
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default ConfirmSelectionButton;
