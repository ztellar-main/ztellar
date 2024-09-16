import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ICONS
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

// COMPONENTS
import UserPopupDesktop from "./UserPopupDesktop";
import UserPopupMobileAndDesktop from "./UserPopupMobileAndDesktop";
import MobileSearchPopup from "./MobileSearchPopup";
import UserBurgerPopup from "./UserBurgerPopup";
import { useAppSelector } from "../state/store";

const Navbar = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const token = useAppSelector((state) => state.user.token);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchEnterFunction = (e: any) => {
    const title = e.target.value;
    if (e.key === "Enter") {
      navigate(`/search?query=${title}`);
      setSearchValue(title);
    }
  };

  return (
    <>
      <div className="w-100 h-[65px] shadow flex sticky top-0 left-0 p-[5px] bg-blue-50 z-[20] tablet:justify-between">
        {/* LEFT CONTAINER */}
        <div
          onClick={() => navigate("/")}
          className="w-[120px] h-100 flex items-center mobile:w-[100px]"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/ztellar%2FGroup%207363.png?alt=media&token=4a7ac4cd-7d2a-4572-9ba9-d8fde4277650"
            className="h-[50px]"
            alt=""
          />
        </div>

        {/* MIDDLE CONTAINER */}
        <div className="grow h-100 flex items-center ml-[20px] relative tablet:hidden">
          <CiSearch className="absolute w-[25px] h-[25px] top-[50%] translate-y-[-50%] left-[10px] invert-[10%] laptop:w-[20px] laptop:h-[20px]" />
          <input
            placeholder="Search course or events"
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="p-[10px] text-gray-800 border w-100 rounded-[30px] border-blue-gray-300 outline-none pl-[50px] laptop:p-[8px] laptop:pl-[40px]"
            onKeyDown={searchEnterFunction}
            value={searchValue}
          />
        </div>

        {/* RIGHT CONTAINER */}
        <div className="flex tablet:hidden">
          {/* LINKS */}
          <div className="h-100 flex items-center px-[20px]">
            <p
              onClick={() => navigate("/")}
              className="mr-[20px] cursor-pointer text-blue-600 transition-all"
            >
              Home
            </p>
            <p className="cursor-pointer hover:text-blue-600 transition-all">
              About us
            </p>
          </div>

          {/* USER CONTAINER DESKTOP */}
          <div className=" h-100 flex items-center ">
            {/* LOGGED IN */}
            {/* USER IMAGE */}
            {token ? (
              <>
                <div className=" h-[50px] w-[50px] min-h-[50px] rounded-circle border-[2px] border-blue-600 laptop:h-[45px] box-border">
                  {/* <CloudinaryImg
                    imageUrl={user?.avatar}
                    className="h-100 w-100 bg-blue-900 rounded-circle object-cover"
                  /> */}

                  <img
                    src={user?.avatar}
                    className="w-100 h-[100%] rounded-circle object-cover box-border"
                    alt=""
                  />
                </div>

                <div className="h-100 ml-[15px] flex flex-col">
                  {user?.role === "company" && (
                    <p className="break-keep font-semibold mt-[5px] ">
                      {user?.company_name}
                    </p>
                  )}

                  {user?.role !== "company" && (
                    <p className="break-keep font-semibold mt-[5px] ">
                      {user?.fname}
                    </p>
                  )}

                  <p className="break-keep text-xs mt-[2px]">{user?.role}</p>
                </div>

                <div className="h-100 flex items-center mx-[10px] ">
                  <IoIosArrowDown
                    onClick={() => setIsOpen(true)}
                    className=" w-[40px] h-[auto] p-[8px] rounded-circle cursor-pointer hover:bg-gray-200 laptop:w-[35px]"
                  />
                  {/* USER POPUP DESKTOP */}
                  <UserPopupDesktop isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
              </>
            ) : (
              // LOGGED OUT
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="p-[8px] w-[90px] rounded-[30px] border border-blue-600 text-blue-600 mr-[10px] tracking-wide font-semibold cursor-pointer hover:bg-blue-100 active:bg-blue-50 transition-all"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 p-[8px] w-[90px] rounded-[30px] border border-blue-600 text-white mr-[5px] tracking-wide font-semibold cursor-pointer hover:bg-blue-500 active:bg-blue-600 transition-all"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        {/* TABLET AND MOBILE MODE */}
        <div className="h-100 flex items-center tabletMin:hidden">
          {/* SEARCH ICON */}
          <div
            onClick={() => setSearchIsOpen(true)}
            className="active:bg-gray-200 rounded-circle mr-[10px] invert-[20%]"
          >
            <CiSearch className="w-[35px] h-[35px] top-[50%] p-[5px]" />
          </div>
          <MobileSearchPopup
            searchIsOpen={searchIsOpen}
            setSearchIsOpen={setSearchIsOpen}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          {/* LOGGEDIN */}
          {user ? (
            <>
              {/* USER ICON */}
              <div onClick={() => setIsOpen(true)} className="">
                <div className="w-[35px] h-[35px] bg-blue-800 rounded-circle border-[2px] border-blue-800 ">
                  <img
                    src={user?.avatar}
                    className="w-100 h-[100%] rounded-circle object-cover box-border"
                    alt=""
                  />
                </div>
              </div>
              <UserPopupMobileAndDesktop
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </>
          ) : (
            <>
              {/* LOGGED OUT */}
              {/* BURGER ICON CONTAINER */}
              <div
                onClick={() => setBurgerIsOpen(true)}
                className="active:bg-gray-200 rounded-circle mr-[5px] invert-[10%]"
              >
                <RxHamburgerMenu className="w-[35px] h-[35px]  p-[7px]" />
              </div>
              <UserBurgerPopup
                burgerIsOpen={burgerIsOpen}
                setBurgerIsOpen={setBurgerIsOpen}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
