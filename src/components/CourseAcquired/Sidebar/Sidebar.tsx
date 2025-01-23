import Header from './Header';
import SubjectCard from './SubjectCard';

const Sidebar = () => {
  return (
    <div className="w-[400px] min-w-[300px] h-[100%] bg-white ">
      <Header />
      <div className="w-full h-[calc(100%-50px)] overflow-scroll overflow-x-hidden">
        <SubjectCard />
      </div>
    </div>
  );
};

export default Sidebar;
