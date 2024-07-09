import CloudinaryImg from "./CloudinaryImg";
import { useAppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../state/userSlice";
import { useAppSelector } from "../state/store";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
function UserPopupMobileAndDesktop({ isOpen, setIsOpen }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((e) => e.user.currentUser);

  const logoutButtonFunction = () => {
    navigate("/");
    dispatch(logout());
  };
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`bg-white w-100 h-[100dvh] fixed shadow top-0 left-0 ${
          isOpen
            ? "tablet:translate-x-[5px] mobile:translate-x-0"
            : "translate-x-[-100%] "
        } ease-in-out duration-300 p-[5px] mobile:top-0 mobile:w-100 mobile:h-[100dvh]
         tablet:top-[60px] tablet:w-[350px] tablet:rounded tablet:border tablet:border-blue-600 tablet:h-[auto] z-[18]`}
      >
        {/* TOP CONTAINER */}
        <div className="bg-blue-600 w-100 rounded flex flex-col items-center py-[10px]">
          {/* USER IMAGE CONTAINER */}
          <div className="h-[100px] w-[100px] border-[2px] border-white rounded-circle object-cover">
            <CloudinaryImg
              imageUrl={user?.avatar}
              className="w-100 h-100 border-[2px] border-blue-600 rounded-circle object-cover"
            />
          </div>

          {/* NAME */}
          <p className="text-white mt-[10px] font-semibold text-lg">
            {user?.fname} {user?.lname}
          </p>
          {/* EMAIL */}
          <p className="text-sm text-gray-100">{user?.email}</p>
        </div>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        {/* BUTTON LINKS */}
        <button
          onClick={() => navigate("/owned")}
          className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded mb-[5px] hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700 mobile:py-[12px]"
        >
          Acquired courses and events
        </button>
        <button
          onClick={() => {
            if (user?.role === "superAuthorUser") {
              navigate("/author/dashboard");
              return setIsOpen(false);
            }
            return setIsOpen(false);
          }}
          className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded mb-[5px] hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700 mobile:py-[12px]"
        >
          Author Dashboard
        </button>
        <button onClick={() => navigate('/edit-profile')} className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700 mobile:py-[12px]">
          Account settings
        </button>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        {/* HOME AND ABOUT US BUTTON CONTAINER */}
        <div className="w-100 flex">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-100 text-gray-800 grow w-[auto] p-[10px] rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700 mobile:py-[12px]"
          >
            Home
          </button>

          <div className="w-[5px]" />

          <button className="bg-blue-100 text-gray-800 grow w-[auto] p-[10px] rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700 mobile:py-[12px]">
            About us
          </button>
        </div>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        <button
          onClick={logoutButtonFunction}
          className="bg-blue-600 text-white w-100 p-[10px] rounded laptop:text-sm hover:bg-blue-400 mt-[10px] mobile:py-[12px]"
        >
          Logout{" "}
        </button>
      </div>

      {/* BACKGROUND CLOSER */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="w-100 h-100vh fixed top-0 left-0"
        ></div>
      )}
    </>
  );
}

export default UserPopupMobileAndDesktop;
