import Sidebar from '../../components/CourseAcquired/Sidebar/Sidebar';

// Main component
const AcquiredCourse = () => {
  return (
    <>
      <div className="h-screen bg-red-100 flex">
        {/* BODY */}
        <Sidebar />
        <div className="w-full h-full bg-green-100">
          <p className="">Home</p>
        </div>
      </div>
    </>
  );
};

export default AcquiredCourse;
