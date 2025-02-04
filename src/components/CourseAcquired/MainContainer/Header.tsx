import { MdKeyboardArrowRight } from 'react-icons/md';

type Props = {
  setShowSidebar: any;
  courseData: any;
};

const Header = ({ setShowSidebar, courseData }: Props) => {
  
  return (
    <div className="h-[50px] w-full bg-blue-gray-800 flex items-center">
      <button
        onClick={() => setShowSidebar(true)}
        className="text-xs bg-blue-gray-500 text-white h-full flex items-center justify-center gap-x-2 w-[140px] min-w-[140px] mr-2"
      >
        Open Sidebar <MdKeyboardArrowRight className="w-4 h-4" />
      </button>
      <div className="line-clamp-1 text-white font-semibold">
        {courseData?.title}
      </div>
    </div>
  );
};

export default Header;
