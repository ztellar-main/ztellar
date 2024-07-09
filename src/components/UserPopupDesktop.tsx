import CloudinaryImg from "./CloudinaryImg";
import { useAppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../state/userSlice";
import { useAppSelector } from "../state/store";

type Props = {
  isOpen: boolean;
  setIsOpen: any;
};
function UserPopupDesktop({ isOpen, setIsOpen }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((e) => e.user.currentUser);

  const logoutButtonFunction = () => {
    setIsOpen(false);
    navigate("/");
    dispatch(logout());
  };
  return (
    <>
      {/* MAIN CONTAINER */}
      <div
        className={`bg-white fixed w-[300px] p-[5px] shadow right-[0] top-[70px] z-[18] rounded border border-blue-600 laptop:w-[270px]
        ${
          isOpen ? "translate-x-[-3px]" : "translate-x-full"
        } ease-in-out duration-300 laptop:top-[60px]
        `}
      >
        {/* TOP CONTAINER */}
        <div className="bg-blue-600 w-100 rounded flex flex-col items-center py-[10px]">
          {/* USER IMAGE CONTAINER */}
          <div className="h-[100px] w-[100px] border-[2px] border-white rounded-circle ">
            <CloudinaryImg
              imageUrl={user?.avatar}
              className="w-100 h-100 border-[2px] border-blue-600 rounded-circle"
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
          onClick={() => {
            navigate("/owned");
            setIsOpen(false);
          }}
          className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded mb-[5px] hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700"
        >
          Acquired courses and events{" "}
        </button>
        <button
          onClick={() => {
            if (user?.role === "superAuthorUser") {
              navigate("/author/dashboard");
              return setIsOpen(false);
            }
            return setIsOpen(false);
          }}
          className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded mb-[5px] hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700"
        >
          Author Dashboard{" "}
        </button>
        <button onClick={() => navigate('/edit-profile')} className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700">
          Account settings
        </button>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        <button onClick={() => navigate('/owned/qr')} className="bg-blue-100 text-gray-800 w-100 p-[10px] rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer laptop:text-sm active:bg-blue-700">
          Qr code
        </button>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        

        <button
          onClick={logoutButtonFunction}
          className="bg-blue-600 text-white w-100 p-[10px] rounded laptop:text-sm hover:bg-blue-400"
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

export default UserPopupDesktop;
