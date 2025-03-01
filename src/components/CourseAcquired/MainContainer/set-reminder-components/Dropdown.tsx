import React from 'react';

// REACT ICONS IMPORT
import { GoChevronDown } from 'react-icons/go';

//  INTERFACE
interface DropdownProps {
  label: string;
  selected: string;
  options: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  selected,
  options,
  isOpen,
  setIsOpen,
  onSelect,
}) => {
  return (
    <div className="relative w-full mt-4">
      {/* LABEL */}
      <label className="block text-[#333333] font-normal text-lg mb-2">
        {label}
      </label>

      {/* CONTAINER */}
      <div
        className="bg-white border rounded-lg p-3 cursor-pointer flex justify-between mb-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* THE SELECTED ITEM WILL BE SEEN HERE */}
        <span className="text-[#333333] tracking-[1px] font-light">
          {selected}
        </span>

        {/* CHEVRON ICON */}
        <GoChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {/* THIS IS FOR THE DROPDOWN LIST / OPTIONS */}
      {isOpen && (
        <ul className="absolute w-full mt-[-20px] bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="p-3 border-b last:border-none hover:bg-gray-100 cursor-pointer"
            >
              {/* OPTION WILL BE HERE */}
              <p className="text-[#333333] tracking-[1px] font-light">
                {option}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
