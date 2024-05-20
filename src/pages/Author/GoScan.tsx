import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppSelector } from "../../state/store";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import CloudinaryImg from "../../components/CloudinaryImg";

const GoScan = () => {
  const [openSidebar, setOpenSide] = useState(true);
  const token = useAppSelector((e) => e.user.token);
  const [inputValue, setInputValue] = useState("");
  const [userCred, setUserCred] = useState({
    fname: "",
    mname: "",
    lname: "",
    avatar: "",
    regType: "",
  });
  const [errorHandler, setErrorHandler] = useState({
    message: "",
    status: "start",
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("id") || "";

  // GET ALL AUTHOR EVENTS
  const { data: eventData, isLoading } = useQuery({
    queryKey: ["golive"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `/product/get-event-qr-scan?id=${eventId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-[70px] h-[70px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <CgSpinnerTwoAlt className="animate-spin w-100 h-[100%] text-indigo-900" />
      </div>
    );
  }

  const inputOnchange = async (e: any) => {
    setInputValue(e.target.value);
    const samsan = eventData?.registered?.find((data: any) => {
      return data?.qr_code === e.target.value;
    });

    console.log(samsan);
    const fname = samsan?._id?.fname;
    const mname = samsan?._id?.mname;
    const lname = samsan?._id?.lname;
    const avatar = samsan?._id?.avatar;
    const regType = samsan?.reg_type;
    if (e.target.value === "") {
      setUserCred({
        fname: "",
        mname: "",
        lname: "",
        avatar: "",
        regType: "",
      });

      return setErrorHandler({
        message: "Scan qr code.",
        status: "idle",
      });
    }

    if (!samsan) {
      setUserCred({
        fname: "",
        mname: "",
        lname: "",
        avatar: "",
        regType: "",
      });
      return setErrorHandler({
        message: "You are not registered. Please register.",
        status: "failed",
      });
    }

    setUserCred({
      fname: fname,
      mname: mname,
      lname: lname,
      avatar,
      regType,
    });

    setErrorHandler({
      message: "Success.",
      status: "success",
    });

    setTimeout(() => {
      setUserCred({
        fname: "",
        mname: "",
        lname: "",
        avatar: "",
        regType: "",
      });
      setInputValue("");
      setErrorHandler({
        message: "",
        status: "",
      });
    }, 5000);
  };

  return (
    <>
      <div className="flex">
        <AuthorSidebar
          page="event/scan-qr-code"
          openSidebar={openSidebar}
          setOpenSide={setOpenSide}
        />
        <div className={`grow bg-gray-50 `}>
          <div className="bg-indigo-900 p-[5px] w-100 sticky top-0 left-0">
            <p className="text-white text-center">Author dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px]">
            {openSidebar ? (
              <div className="tablet:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(true)}
                className="transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            {!openSidebar ? (
              <div className="mobileMin:hidden" />
            ) : (
              <button
                onClick={() => setOpenSide(false)}
                className="tabletMin:hidden transition-all bg-indigo-900 p-[10px] px-[20px] h-100 text-white"
              >
                <FaArrowRightLong className="w-[auto] h-[20px] cursor-pointer" />
              </button>
            )}

            <p className="mr-[10px]">Go scan</p>
          </div>

          {/* MAIN BODY */}
          <div className="w-100">
            {/* <Loading /> */}
            {/* LIVE */}

            <div className="w-[50%] ml-[50%] translate-x-[-50%] p-[10px]  mt-[30px]">
              {/* TITLE */}
              <p className="text-center text-xl font-semibold text-indigo-800 mb-[20px]">
                Enter qr code.
              </p>
              <input
                value={inputValue}
                onChange={inputOnchange}
                type="text"
                placeholder="Please scan qr code.."
                className="w-100 p-[10px] rounded border border-gray-300 shadow"
              />

              {userCred?.fname && (
                <div className="w-100 p-[10px] flex flex-col items-center">
                  <div className="w-[150px] h-[150px] mb-[30px] border-[4px] rounded-circle border-indigo-800">
                    <CloudinaryImg
                      imageUrl={userCred?.avatar}
                      className="w-100 h-100"
                    />
                  </div>
                  <p className="font-semibold underline">
                    Registration type: {userCred?.regType}
                  </p>

                  <p className="text-2xl font-semibold text-indigo-800">
                    {userCred?.fname} {userCred?.mname} {userCred?.lname}
                  </p>
                </div>
              )}
              <p
                className={`text-center
              ${errorHandler?.status === "idle" && "text-indigo-800"}
              ${errorHandler?.status === "failed" && "text-red-600"}
              ${errorHandler?.status === "success" && "text-green-600"}
              `}
              >
                {errorHandler?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoScan;
