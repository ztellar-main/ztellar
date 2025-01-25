import Header from './Header';
import SubjectCard from './SubjectCard';

type Props = {
  setShowSidebar: any;
  courseSubject: any;
  userStates: any;
  setUserStates: any;
};

const Sidebar = ({
  setShowSidebar,
  courseSubject,
  userStates,
  setUserStates,
}: Props) => {
  return (
    <div className="w-[400px] min-w-[300px] h-[100%] bg-white border-right">
      <Header setShowSidebar={setShowSidebar} />
      <div className="w-full h-[calc(100%-50px)] overflow-scroll overflow-x-hidden">
        {courseSubject?.map((subjectData: any, i: any) => {
          return (
            <SubjectCard
              key={i}
              subjectData={subjectData}
              userStates={userStates}
              setUserStates={setUserStates}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
