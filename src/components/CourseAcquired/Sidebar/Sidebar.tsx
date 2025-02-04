import Header from './Header';
import SubjectCard from './SubjectCard';

type Props = {
  setShowSidebar: any;
  courseSubject: any;
  userStates: any;
  setUserStates: any;
  courseId: any;
  width: any;
};

const Sidebar = ({
  setShowSidebar,
  courseSubject,
  userStates,
  setUserStates,
  courseId,
  width,
}: Props) => {
  return (
    <div className="h-[100%] bg-white border-right fixed z-20 w-full md:static md:w-[400px] md:min-w-[300px] shadow-lg">
      <Header
        setShowSidebar={setShowSidebar}
        userStates={userStates}
        setUserStates={setUserStates}
        width={width}
      />
      <div className="w-full h-[calc(100%-50px)] overflow-scroll overflow-x-hidden">
        {courseSubject?.map((subjectData: any, i: any) => {
          return (
            <SubjectCard
              key={i}
              subjectData={subjectData}
              userStates={userStates}
              setUserStates={setUserStates}
              index={i}
              courseId={courseId}
              width={width}
              setShowSidebar={setShowSidebar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
