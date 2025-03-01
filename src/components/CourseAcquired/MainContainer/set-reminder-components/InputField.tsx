import React from "react";

// INTERFACE
interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="w-full mt-4">
      {/* LABEL */}
      <label className="block text-[#333333] font-normal text-lg mb-2">
        {label}
      </label>

      {/* TIME INPUT */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full mb-5 p-3 border rounded-lg bg-white focus:placeholder-transparent focus:outline-none"
      />
    </div>
  );
};

export default InputField;
