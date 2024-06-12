import { useNavigate } from "react-router-dom";
import CloudinaryImg from "../components/CloudinaryImg";
import FaqQuestion from "../components/FaqQuestion";
import Navbar from "../components/Navbar";
import { faqData } from "../utils/faqs";
import Footer from "../components/Footer";

const Home = () => {
  console.log(import.meta.env);

  console.log(import.meta.env.VITE_BASE_URL_API);
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <Navbar />
      {/* UPPER BANNER DESKTOP LAPTOP */}
      <div className="w-100 tablet:hidden">
        <div className="w-100 max-w-[1366px] ml-[50%] translate-x-[-50%] relative">
          <CloudinaryImg
            imageUrl="ztellar/ztellar/fzpaxecrkgom2im3kfxw"
            className="w-100"
          />
          <button
            onClick={() => navigate("/search")}
            className="bg-[#1d4ed8] p-[10px] text-lg  font-semibold rounded-[30px] px-[20px] text-white shadow absolute bottom-[20px] left-[10px]
          laptop:text-base laptop:bottom-[5px]"
          >
            Get started
          </button>
        </div>
      </div>
      {/* UPPER BANNER DESKTOP LAPTOP */}

      {/* UPPER BANNER TABLET MOBILE */}
      <div className="w-100 flex flex-col items-center mt-[20px] tabletMin:hidden">
        {/* TAGLINE */}
        <div className="">
          <div className="w-100 flex items-center justify-center">
            <p className="text-2xl font-bold text-[#1d4ed8]">
              Connecting &nbsp;
            </p>
            <p className="text-2xl font-bold ">minds</p>
          </div>
          <div className="w-100 flex items-center justify-center">
            <p className="text-2xl font-bold text-[#1d4ed8]">
              Redefining &nbsp;
            </p>
            <p className="text-2xl font-bold ">Learning and</p>
          </div>
          <div className="w-100 flex items-center justify-center">
            <p className="text-2xl font-bold text-[#1d4ed8]">
              Collaboration &nbsp;
            </p>
          </div>
        </div>
        {/* TAGLINE END */}
        <CloudinaryImg
          imageUrl="ztellar/ztellar/jwbav7cy4d6gfk5cpdcs"
          className="w-100 h-[auto]"
        />

        <button
          onClick={() => navigate("/search")}
          className="bg-[#1d4ed8] p-[10px] text-lg rounded-[30px] px-[20px] text-white shadow mt-[10px]"
        >
          Get started
        </button>
      </div>
      {/* UPPER BANNER TABLET MOBILE */}

      {/* MESSAGE START */}
      <div className="flex flex-col items-center mt-[20px]">
        <p className="text-lg font-semibold">Start your experience today.</p>
        <p className="text-gray-700">Powered by</p>

        <div className="text-gray-700 flex items-center">
          <CloudinaryImg
            imageUrl="ztellar/ztellar/rc1qcghtoobznugbfaco"
            className="w-20px h-[20px] mr-[5px]"
          />
          <i>Vizcom Corporation</i>
        </div>
      </div>
      {/* MESSAGE END */}

      <hr className="w-[70%] ml-[15%] my-[30px]" />

      <div className="w-100 flex flex-col items-center px-[80px] mobile:px-[10px] py-[20px] bg-indigo-900">
        <p className="text-white text-3xl font-bold mb-[10px] tablet:text-xl">
          What's in it for you
        </p>
        <p className="text-center text-white text-2xl font-light tracking-wider tablet:text-base">
          Welcome to Ztellar, where we believe in the power of connecting minds
          to revolutionize learning and collaboration. Our platform is designed
          to streamline the process, making it easier and more efficient for
          individuals and teams to come together, share knowledge, and work
          towards common goals.
        </p>
      </div>

      <hr className="w-[70%] ml-[15%] my-[30px]" />

      <div className="w-100 flex flex-col items-center px-[50px] mobile:px-[10px] py-[20px] bg-indigo-900 mb-[20px]">
        <p className="text-white text-3xl font-bold tablet:text-xl">
          Latest Event 2024
        </p>
      </div>

      <div className="w-100 max-w-[70%] ml-[50%] translate-x-[-50%] relative tablet:max-w-[100%]">
        <CloudinaryImg
          imageUrl="ztellar/ztellar/wfqlrp6wagqjftjlrwb5"
          className="w-100"
        />
      </div>

      <div className="w-100 max-w-[70%] ml-[50%] translate-x-[-50%] relative tablet:max-w-[100%]">
        <CloudinaryImg
          imageUrl="ztellar/psme LRC 2024/qsniqu3fmmxehktnj3zc"
          className="w-100"
        />
      </div>

      <hr className="w-[70%] ml-[15%] my-[30px]" />

      <div className="w-100 flex flex-col items-center px-[50px] mobile:px-[10px] py-[20px] bg-indigo-900 mb-[30px]">
        <p className="text-white text-3xl font-bold tablet:text-xl">
          Frequently asked questions (FAQ's)
        </p>
      </div>

      <div className="w-100 max-w-[70%] ml-[50%] translate-x-[-50%] mb-[30px] tablet:max-w-[100%]">
        {faqData?.map((fData: any, i: any) => {
          return <FaqQuestion key={i} index={i} data={fData} />;
        })}
      </div>

      <hr className="w-[70%] ml-[15%] my-[30px]" />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
