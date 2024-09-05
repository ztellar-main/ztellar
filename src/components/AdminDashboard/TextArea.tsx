import { MdErrorOutline } from 'react-icons/md';

type TextAreaProps = {
  setter: any;
  error: any;
  value: string;
};

const TextArea = ({ setter, error, value }: TextAreaProps) => {
  return (
    <div className="w-100 mb-[10px]">
      {/* label */}
      <p className="text-sm font-bold text-gray-900 ml-[5px] mb-[5px]">
        Description
      </p>
      {/* input */}
      <textarea
        placeholder="Enter your course decription"
        className="w-100 border border-gray-600 rounded h-[70px] p-[10px]"
        onChange={(e: any) => setter(e.target.value)}
        value={value}
      ></textarea>
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
  );
};

export default TextArea;
