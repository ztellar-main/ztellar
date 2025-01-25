import { MdKeyboardArrowRight } from 'react-icons/md';

type Props = {
  setShowSidebar: any;

};

const Header = ({ setShowSidebar }: Props) => {

  return (
    <div className="h-[50px] w-full bg-blue-gray-800 flex items-center">
      <button
        onClick={() => setShowSidebar(true)}
        className="text-xs bg-blue-gray-500 text-white h-full flex items-center justify-center gap-x-2 w-[140px] min-w-[140px] mr-2"
      >
        Open Sidebar <MdKeyboardArrowRight className="w-4 h-4" />
      </button>
      <div className="line-clamp-1 text-white font-semibold">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here
      </div>
    </div>
  );
};

export default Header;
