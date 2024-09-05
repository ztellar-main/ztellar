import { MdErrorOutline } from 'react-icons/md';

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  setter: any;
  error: any;
  value: any;
};

const InputComponent = ({
  name,
  type,
  placeholder,
  setter,
  error,
  value,
}: InputProps) => {
  return (
    <>
      <div className="w-100 mb-[10px]">
        {/* label */}
        <p className="text-sm font-bold text-gray-900 ml-[5px] mb-[5px]">
          {name}
        </p>
        {/* input */}
        <input
          type={type}
          placeholder={placeholder}
          className="w-100 p-[10px]  rounded border border-gray-600"
          onChange={(e: any) => setter(e.target.value)}
          value={value}
        />
        {/* error handler output */}
        {error?.status !== 'start' && (
          <div
            className={`flex items-center pl-[5px] text-sm mt-[5px]
              ${error?.status === 'error' && 'text-red-600'}
              ${error?.status === 'success' && 'text-green-600'}
            `}
          >
            <MdErrorOutline className="mr-[5px]" />
            {error?.message}
          </div>
        )}
      </div>
    </>
  );
};

export default InputComponent;
