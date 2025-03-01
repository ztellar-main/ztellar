import React from "react";

// DATA IMPORT
import { daysOfWeek } from "./setReminderData";

// COMPONENT IMPORT
import ConfirmSelectionButton from "./ConfirmSelectionButton";

// INTERFACE
interface CustomDaysSelectionProps {
  selectedDays: string[];
  toggleDaySelection: (day: string) => void;
  handleSubmitCustomDays: () => void;
}

const CustomDaysSelection: React.FC<CustomDaysSelectionProps> = ({
  selectedDays,
  toggleDaySelection,
  handleSubmitCustomDays,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      {/* TITLE */}
      <p className="text-[#333333] font-medium mb-2">Select Days:</p>

      {/* DAYS SELECTION CONTAINER */}
      <div className="grid grid-cols-3 gap-2">
        {daysOfWeek.map((day) => (
          // DAYS OF THE WEEK BUTTON
          <button
            key={day}
            onClick={() => toggleDaySelection(day)}
            className={`mt-2 px-2 py-3 rounded-md transition ${
              selectedDays.includes(day)
                ? "bg-[#333333] text-white"
                : "bg-[#0D47A1] text-white hover:opacity-80"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* CONFIRM SELECTION BUTTON COMPONENT */}
      <ConfirmSelectionButton handleSubmitCustomDays={handleSubmitCustomDays} />
    </div>
  );
};

export default CustomDaysSelection;
