// COMPONENT
import Navbar from '../../components/Navbar';

// ICON LINKS
const learn =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar%2Flearn.svg?alt=media&token=2a3deb73-60a8-43b6-9932-67411a27859c';

const bannerImage =
  'https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar%2FRectangle%20177.svg?alt=media&token=0121a205-d710-4c7f-8174-1c6b1925a2a4';

const NewHome = () => {
  // POSSIBILITIES CARD
  const PossibilitiesCard = () => {
    return (
      <div className="flex flex-col text-white p-4 items-center rounded">
        <img src={learn} alt="" className="w-12" />
        <h1 className="">Learn</h1>
        <p className="text-center text-white my-4">
          Learn at your own pace with affordable, high-quality courses. Unlock
          your potential and achieve your goals today!
        </p>
        <button className="p-3 bg-blue-600 rounded">Digital Courses </button>
      </div>
    );
  };
  return (
    <div>
      <Navbar />

      <div className="w-full  max-w-[1280px] ml-[50%] translate-x-[-50%]">
        {/* 1ST SECTION START - BANNER */}
        <section className="grid md:grid-cols-2 mb-8 p-8">
          {/* TEXT CONTAINER */}
          <div className="p-4 text-left flex items-center justify-center max-md:hidden">
            <div className="">
              <h1 className="text-2xl font-bold tracking-wider mb-4 sm:text-3xl lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-10">
                <span className="text-primary">Connecting</span> minds
                <br />
                Redefining
                <span className="text-primary"> Learning </span> <br /> and{' '}
                <span className="text-primary">Collaboration</span>
              </h1>

              <h1 className="mb-4 lg:mb-8 xl:mb-10 text-blue-gray-900">
                Learn at your pace, earn your CPD points, and advance your
                career - all in one place!
              </h1>

              <button className="bg-primary text-white p-3 rounded cursor-pointer w-[150px]">
                Explore here
              </button>
            </div>
          </div>

          {/* IMAGE CONTAINER */}
          <div className="p-4 flex items-center justify-center">
            <img src={bannerImage} alt="" className="w-[70%]" />
          </div>

          {/* TEXT CONTAINER */}
          <div className="p-4 text-center flex items-center justify-center md:hidden">
            <div className="">
              <h1 className="text-2xl font-bold tracking-wider mb-4 sm:text-3xl">
                <span className="text-primary">Connecting</span> minds
                <br />
                Redefining
                <span className="text-primary"> Learning </span> <br /> and{' '}
                <span className="text-primary">Collaboration</span>
              </h1>

              <h1 className="mb-4">
                Learn at your pace, earn your CPD points, and advance your
                career - all in one place!
              </h1>

              <button className="bg-primary text-white p-3 rounded cursor-pointer w-[150px]">
                Explore here
              </button>
            </div>
          </div>
        </section>
        {/* 1ST SECTION END - BANNER */}

        {/* 2ND SECTION START - POSSIBILITIES */}
        <section className="p-8 bg-primary">
          <h1 className="text-center text-xl font-bold text-white mb-8">
            The possibilities are endless — you can ...
          </h1>
          <div className="w-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <PossibilitiesCard />
            <PossibilitiesCard />
            <PossibilitiesCard />
          </div>
        </section>
        {/* 2ND SECTION END - POSSIBILITIES */}
      </div>
    </div>
  );
};

export default NewHome;
