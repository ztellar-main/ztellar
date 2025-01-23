import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

const Header = () => {
  return (
    <div className="w-full py-1 flex justify-between h-[50px] bg-blue-gray-100 items-center px-4">
      <div className="h-[42px] w-[42px] rounded-full bg-blue-gray-300"></div>

      <div className="flex items-center gap-x-6">
        <BsThreeDotsVertical className="text-gray-800 cursor-pointer" />
        <MdClose className="text-gray-800 cursor-pointer w-5 h-5" />
      </div>
    </div>
  );
};

export default Header;
