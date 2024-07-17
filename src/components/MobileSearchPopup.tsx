import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Props = {
  searchIsOpen: boolean;
  setSearchIsOpen: (open: boolean) => void;
  setSearchValue: any;
  searchValue: any;
};
const MobileSearchPopup = ({
  searchIsOpen,
  setSearchIsOpen,
  // setSearchValue,
  // searchValue,
}: Props) => {
  // const navigate = useNavigate();

  // const searchEnterFunction = (e: any) => {
  //   const title = e.target.value;
  //   // e.preventDefault()
  //   if (e.key === "Enter") {
  //     navigate(`/search?query=${title}`);
  //     setSearchIsOpen(false);
  //   }
  // };
  return (
    // MAIN CONTAINER
    <div
      //   onClick={() => setSearchIsOpen(false)}
      className={`bg-white fixed w-100 h-[100dvh] p-[10px] shadow left-0 top-0 z-[18] rounded border
    ${
      searchIsOpen ? "translate-x-0" : "translate-x-[-100%]"
    } ease-in-out duration-300`}
    >
      {/* SEARCH INPUT CONTAINER */}
      <div className="flex items-center w-100">
        <div className="grow  relative mr-[10px]">
          <CiSearch className="absolute top-[50%] translate-y-[-50%] w-[25px] h-[25px] invert-[10%] left-[10px] " />
          {/* <input
            type="text"
            className="w-100 p-[10px] rounded-[30px] text-base mr-[10px] border border-blue-600 outline-blue-600 pl-[40px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={searchEnterFunction}
            enterKeyHint="search"
            autoFocus
          /> */}
        </div>
        <IoCloseOutline
          onClick={() => setSearchIsOpen(false)}
          className="w-[35px] h-[35px] p-[5px] rounded-circle invert-[20%] active:bg-gray-200"
        />
      </div>
    </div>
  );
};

export default MobileSearchPopup;
