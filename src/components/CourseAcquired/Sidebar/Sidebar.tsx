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
      <Header setShowSidebar={setShowSidebar} />
      <div className="w-full h-[50px] bg-blue-gray-50 flex items-center gap-2">
        <button
          onClick={() => {
            setUserStates({ ...userStates, component: 'set-reminder' });
            if (width <= 768) {
              setShowSidebar(false);
            }
          }}
          className="text-xs bg-blue-gray-700 p-2 rounded text-white ml-2"
        >
          Reminder
        </button>
        <button
          onClick={() => {
            setUserStates({ ...userStates, component: 'quiz-result' });
            if (width <= 768) {
              setShowSidebar(false);
            }
          }}
          className="text-xs bg-blue-gray-700 p-2 rounded text-white"
        >
          Download Certificate
        </button>
      </div>
      <div className="w-full h-[calc(100%-100px)] overflow-scroll overflow-x-hidden">
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
