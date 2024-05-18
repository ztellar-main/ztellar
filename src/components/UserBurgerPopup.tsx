import { Link } from "react-router-dom";

type Props = {
  burgerIsOpen: boolean;
  setBurgerIsOpen: (open: boolean) => void;
};
function UserBurgerPopup({ burgerIsOpen, setBurgerIsOpen }: Props) {
  return (
    <>
      {/* MAIN CONTAINER */}
      <div
        // onClick={() => setBurgerIsOpen(false)}
        className={`bg-white fixed w-100 h-[100dvh] p-[5px] shadow left-0 top-0 z-[18] rounded border
        ${
          burgerIsOpen ? "translate-x-0" : "translate-x-[-100%]"
        } ease-in-out duration-300 tablet:w-[300px] mobile:w-100`}
      >
        {/* TOP CONTAINER */}
        <div className="bg-blue-600 w-100 rounded p-[10px]">
          <p className="text-white font-semibold text-lg text-center">
            Welcome to Ztellar
          </p>
        </div>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        {/* BUTTONS */}
        <Link to="/login">
          <button
            onClick={() => setBurgerIsOpen(false)}
            className="w-100  p-[10px] text-base mb-[10px] bg-blue-100 rounded text-gray-800 active:bg-blue-300 tracking-wide"
          >
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button
            onClick={() => {
              setBurgerIsOpen(false);
            }}
            className="w-100  p-[8px] text-base mb-[10px] bg-blue-100 rounded text-gray-800 active:bg-blue-300 tracking-wide"
          >
            Signup
          </button>
        </Link>

        <Link to="/">
          <button
            onClick={() => setBurgerIsOpen(false)}
            className="w-100  p-[8px] text-base mb-[10px] bg-blue-100 rounded text-gray-800 active:bg-blue-300 tracking-wide"
          >
            Home
          </button>
        </Link>

        <button
          onClick={() => setBurgerIsOpen(false)}
          className="w-100  p-[8px] text-base bg-blue-100 rounded text-gray-800 active:bg-blue-300 tracking-wide"
        >
          About us
        </button>

        <hr className="w-100 border-blue-600 my-[10px] opacity-[40%]" />

        <button
          onClick={() => setBurgerIsOpen(false)}
          className="w-100 text-white p-[8px] text-base bg-blue-600 rounded active:bg-blue-400 tracking-wider"
        >
          Close
        </button>
      </div>

      {/* BACKGROUND CLOSER */}
      {burgerIsOpen && (
        <div
          onClick={() => setBurgerIsOpen(false)}
          className="w-100 h-100vh fixed top-0 left-0 "
        ></div>
      )}
    </>
  );
}

export default UserBurgerPopup;
