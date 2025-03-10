import React from 'react';

interface InputTextFieldProps {
  placeholder: string;
  set: any;
  value: any;
}

const InputTextField: React.FC<InputTextFieldProps> = ({
  placeholder,
  set,
  value,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e: any) => set(e.target.value)}
      className="w-full p-3 border border-[#CFD8DC] rounded-md mb-4 tracking-[1px] font-light focus:placeholder-transparent focus:outline-none"
    />
  );
};

export default InputTextField;
