import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author/AuthorSidebar";
// import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
// import { MdOutlineCheckCircle } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdOutlineCheckCircle } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useAppSelector } from "../../state/store";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

// COMPONENTS
import OnPropImageInput from "../../components/Author/OnPropImageInput";
import OnDropVideoInput from "../../components/Author/OnDropVideoInput";
import axios from "axios";
import toas from "../../utils/toas";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  // const navigate = useNavigate();
  const preset_key = "zh6pbgqx";
  const CLOUD_NAME = "dbagrkam0";
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.currentUser);

  // FOR RESPONSIVE PAGE DESIGN
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setOpenSide(true);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();
  }, []);

  const navigate = useNavigate();

  // CONDITION STATES
  const [openSidebar, setOpenSide] = useState(true);
  const [priceId, setPriceId] = useState(2);
  const [uploadDisplay, setUploadDisplay] = useState(false);

  // UPLOAD STATE
  const [uploadImageState, setUploadImageState] = useState("");
  const [uploadVideoState, setUploadVideoState] = useState("");
  const [uploadDataState, setUploadDataState] = useState("");

  // CHUNK
  const [videoChunk, setVideoChunk] = useState(0);
  const [videoChunkCount, setVideoChunkCount] = useState(0);

  // PROGRESS
  const [imageUploadProgress, setImageUploadProgress] = useState("0");
  const [videoUploadProgress, setVideoUploadProgress] = useState("0");

  // INPUT VALUES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState([
    {
      priceType: "",
      priceName: "",
      price: "",
      id: 1,
    },
  ]);
  const [place, setPlace] = useState("");
  const [liveId, setLiveId] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoIntro, setVideoIntro] = useState<File | null>(null);

  // ERROR HANDLERS
  const [titleErrorHandler, setTitleErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [descriptionErrorHandler, setDescriptionErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [priceErrorHandler, setPriceErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [placeErrorHandler, setPlaceErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [liveIdErrorHandler, setLiveIdErrorHandler] = useState({
    message: "",
    status: "start",
  });

  const [videoErrorHandler, setVideoErrorHandler] = useState({
    message: "",
    status: "start",
  });
  const [imageErrorHandler, setImageErrorHandler] = useState({
    message: "",
    status: "start",
  });

  // TITLE ONCHANGE FUNCTION
  const titleInputOnchangeFunction = async (e: any) => {
    const title = e.target.value;
    const length = title.length;

    if (!title) {
      return setTitleErrorHandler({ message: "", status: "start" });
    }

    const regexFname = new RegExp(/[${}<>/]/g);
    const m = title.match(regexFname);

    if (m) {
      return setTitleErrorHandler({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }

    if (length > 100) {
      return setTitleErrorHandler({
        message: "Please enter 100 and below characters only.",
        status: "failed",
      });
    }

    setTitleErrorHandler({ message: "success", status: "success" });
    setTitle(title);
  };

  // DESCRIPTION ONCHANGE FUNCTION
  const descriptionOnChangeFunction = async (e: any) => {
    const description = e.target.value;
    const length = description.length;

    if (!description) {
      return setDescriptionErrorHandler({ message: "", status: "start" });
    }

    if (length > 200) {
      return setTitleErrorHandler({
        message: "Please enter 200 and below characters only.",
        status: "failed",
      });
    }

    const regexFname = new RegExp(/[${}<>/]/g);
    const m = description.match(regexFname);

    if (m) {
      return setDescriptionErrorHandler({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }

    setDescriptionErrorHandler({ message: "success", status: "success" });

    setDescription(description);
  };

  // ADD PRICE ROW
  const addPriceRow = () => {
    setPriceId(priceId + 1);
    const _prices = [...prices];

    const priceIndex = prices.length - 1;

    const _priceType = prices[priceIndex]["priceType"];
    const _price = prices[priceIndex]["price"];
    const _priceName = prices[priceIndex]["priceName"];

    if (!_priceType || !_price || !_priceName) {
      return setPriceErrorHandler({
        message:
          "Please fill up all the price inputs first before adding new one.",
        status: "failed",
      });
    }

    _prices.push({
      priceType: "",
      priceName: "",
      price: "",
      id: priceId,
    });
    setPriceErrorHandler({ message: "success", status: "success" });
    setPrices(_prices);
  };

  // HANDLE PRICE ONCHANGE
  const handlePriceChange = (id: any, e: any) => {
    const index = prices.findIndex((p) => p.id === id);
    const _prices = [...prices] as any;

    _prices[index][e.target.name] = e.target.value;

    const priceFirst = prices[0].price;
    const priceNameFirst = prices[0].priceName;
    const priceTypeFirst = prices[0].priceType;

    console.log(priceErrorHandler);

    if (!priceFirst || !priceNameFirst || !priceTypeFirst) {
      return setPriceErrorHandler({
        message: "Please complete your price input fields.",
        status: "failed",
      });
    }

    setPriceErrorHandler({ message: "success", status: "success" });

    setPrices(_prices);
  };

  // HANDLE PRICE DELETE
  const removeMember = (id: any) => {
    let _prices = [...prices];
    _prices = _prices.filter((member) => member.id !== id);
    setPrices(_prices);
  };

  // PLACE ONCHANGE FUNCTION
  const placeOnChangeFunction = async (e: any) => {
    const place = e.target.value;
    const length = place.length;

    if (!place) {
      return setPlaceErrorHandler({ message: "", status: "start" });
    }

    if (length > 200) {
      return setPlaceErrorHandler({
        message: "Please enter 200 and below characters only.",
        status: "failed",
      });
    }

    const regexFname = new RegExp(/[${}<>/]/g);
    const m = place.match(regexFname);

    if (m) {
      return setPlaceErrorHandler({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }
    setPlaceErrorHandler({ message: "success", status: "success" });
    setPlace(place);
  };

  // LIVE ID ONCHANGE FUNCTION
  const liveIdOnchangeFunction = async (e: any) => {
    const liveId = e.target.value;
    const length = liveId.length;

    if (!liveId) {
      return setLiveIdErrorHandler({ message: "", status: "start" });
    }

    if (length > 200) {
      return setLiveIdErrorHandler({
        message: "Please enter 200 and below characters only.",
        status: "failed",
      });
    }

    const regexFname = new RegExp(/[${}<>/]/g);
    const m = liveId.match(regexFname);

    if (m) {
      return setLiveIdErrorHandler({
        message: "Please avoid using this characters $ , { , } , < , > , /",
        status: "failed",
      });
    }
    setLiveIdErrorHandler({ message: "success", status: "success" });
    setLiveId(liveId);
  };

  // UPLOAD BUTTON FUNCTION
  const uploadButtonFunction = async () => {
    // TITLE FUNCTION START
    const titleFunction = () => {
      const length = title.length;

      if (!title) {
        return setTitleErrorHandler({
          message: "Title cannot be empty.",
          status: "failed",
        });
      }

      const regexFname = new RegExp(/[${}<>/]/g);
      const m = title.match(regexFname);

      if (m) {
        return setTitleErrorHandler({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "failed",
        });
      }

      if (length > 100) {
        return setTitleErrorHandler({
          message: "Please enter 100 and below characters only.",
          status: "failed",
        });
      }

      setTitleErrorHandler({ message: "success", status: "success" });
    };
    titleFunction();
    // TITLE FUNCTION END

    // DESCRIPTION FUNCTION START
    const descriptionFunction = () => {
      const length = description.length;

      if (!description) {
        return setDescriptionErrorHandler({
          message: "Description cannot be empty.",
          status: "failed",
        });
      }

      if (length > 200) {
        return setTitleErrorHandler({
          message: "Please enter 200 and below characters only.",
          status: "failed",
        });
      }

      const regexFname = new RegExp(/[${}<>/]/g);
      const m = description.match(regexFname);

      if (m) {
        return setDescriptionErrorHandler({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "failed",
        });
      }

      setDescriptionErrorHandler({ message: "success", status: "success" });
    };
    descriptionFunction();
    // DESCRIPTION FUNCTION END

    // PLACE FUNCTION START
    const placeFunction = () => {
      const length = place.length;

      if (!place) {
        return setPlaceErrorHandler({
          message: "Place cannot be empty",
          status: "failed",
        });
      }

      if (length > 200) {
        return setPlaceErrorHandler({
          message: "Please enter 200 and below characters only.",
          status: "failed",
        });
      }

      const regexFname = new RegExp(/[${}<>/]/g);
      const m = place.match(regexFname);

      if (m) {
        return setPlaceErrorHandler({
          message: "Please avoid using this characters $ , { , } , < , > , /",
          status: "failed",
        });
      }
      setPlaceErrorHandler({ message: "success", status: "success" });
    };
    placeFunction();
    // PLACE FUNCTION END

    // THUMBNAIL FUNCTION START
    const thumbnailFunction = () => {
      if (!thumbnail)
        return setImageErrorHandler({
          message: "Please choose your event thumbnail.",
          status: "failed",
        });

      setImageErrorHandler({ message: "success", status: "success" });
    };
    thumbnailFunction();
    // THUMBNAIL FUNCTION END

    // VIDEO FUNCTION START
    const videoFunctionStart = () => {
      if (!videoIntro)
        return setVideoErrorHandler({
          message: "Please choose your event video intro.",
          status: "failed",
        });

      setVideoErrorHandler({ message: "success", status: "success" });
    };
    videoFunctionStart();
    // VIDEO FUNCTION END

    // PRICES FUNCTION START
    const priceFunction = () => {
      const priceFirst = prices[0].price;
      const priceNameFirst = prices[0].priceName;
      const priceTypeFirst = prices[0].priceType;

      const length = prices.length - 1;
      const priceLast = prices[length].price;
      const priceNameLast = prices[length].priceName;
      const priceTypeLast = prices[length].priceType;

      if (!priceFirst || !priceNameFirst || !priceTypeFirst) {
        return setPriceErrorHandler({
          message: "Please complete your price input fields.",
          status: "failed",
        });
      }

      if (!priceLast || !priceNameLast || !priceTypeLast) {
        let _prices = [...prices];
        _prices = _prices.filter((member) => member.id !== length);
        setPrices(_prices);
      }

      setPriceErrorHandler({ message: "success", status: "success" });
    };
    priceFunction();
    // PRICES FUNCTION END

    if (
      titleErrorHandler?.status === "success" &&
      descriptionErrorHandler?.status === "success" &&
      priceErrorHandler?.status === "success" &&
      placeErrorHandler?.status === "success" &&
      liveIdErrorHandler?.status === "success" &&
      videoErrorHandler?.status === "success" &&
      imageErrorHandler?.status === "success"
    ) {
      setUploadDisplay(true);

      // UPLOAD VIDEO FUNCTION START
      const generateUniqueUploadId = () => {
        return `uqid-${Date.now()}`;
      };
      const uploadVideo = async () => {
        if (!videoIntro) {
          console.error("Please select a intro video.");
          return;
        }

        if (!thumbnail) {
          console.error("Please select a thumbnail.");
          return;
        }
        setUploadVideoState("start");

        // UPLOAD VIDEO INTRO
        const fileRef = ref(storage, `videos/${uuidv4()}${videoIntro?.name}`);
        const uploadTask = uploadBytesResumable(fileRef, videoIntro);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref).then((video) => {
              const videoUrl = video;
              const fileRef = ref(
                storage,
                `images/${uuidv4()}${thumbnail?.name}`
              );
              const uploadTask = uploadBytesResumable(fileRef, thumbnail);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                },
                async () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  await getDownloadURL(uploadTask.snapshot.ref).then(
                    async(image) => {
                      const imageUrl = image;

                      if (
                        videoUrl !== "" &&
                        imageUrl !== "" &&
                        titleErrorHandler?.status === "success" &&
                        descriptionErrorHandler?.status === "success" &&
                        priceErrorHandler?.status === "success" &&
                        placeErrorHandler?.status === "success" &&
                        liveIdErrorHandler?.status === "success"
                      ) {
                        try {
                          setUploadDataState("start");
                          await axios({
                            method: "POST",
                            url: "/product/create-product",
                            data: {
                              title,
                              description,
                              prices,
                              place,
                              liveId,
                              imageUrl,
                              videoUrl,
                            },
                            headers: {
                              authorization: `Token ${token}`,
                            },
                          });

                          setUploadDataState("success");
                          toas("Successfully uploaded.", "success");
                          navigate("/author/add-event");
                        } catch (err) {}
                      } else {
                        toas(
                          "There is something wrong in your information.",
                          "error"
                        );
                      }
                    }
                  );
                }
              );
            });
          }
        );
      };
      uploadVideo();
      // UPLOAD VIDEO FUNCTION END
    } else {
      toas("There is something wrong in your information.", "error");
    }
  };

  return (
    <>
      <div className="flex">
        <AuthorSidebar
          page="add-event"
          openSidebar={openSidebar}
          setOpenSide={setOpenSide}
        />
        <div className={`grow bg-gray-100 `}>
          <div className="bg-indigo-900 h-[30px] w-100 sticky top-0 left-0 z-[10] flex items-center justify-center">
            <p className="text-white text-center">Author dashboard</p>
          </div>
          <div className="w-100 bg-gray-200 flex items-center justify-between h-[40px] sticky top-[30px] left-0 z-[10]">
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

            <p className="mr-[10px] text-gray-700">Add-event/create-event</p>
          </div>

          {!uploadDisplay ? (
            <>
              {/* MAIN BODY */}
              <div className="p-[10px] w-100">
                {/* TITLE */}
                <p className="text-2xl font-semibold text-indigo-700 tracking-wider text-center mb-[10px]">
                  Create event
                </p>
                <div className="w-[80%] tablet:w-100 ml-[50%] translate-x-[-50%]">
                  {/* TITLE */}
                  <div className=" w-100">
                    <p className="font-semibold mb-[2px]">Title</p>
                    <input
                      value={title}
                      type="text"
                      onChange={titleInputOnchangeFunction}
                      placeholder="Please enter your event title"
                      className="border p-[10px] w-100 rounded"
                    />
                    {/* ERROR HANDLER */}
                    {titleErrorHandler?.status !== "start" && (
                      <div className="flex mt-[5px]">
                        {titleErrorHandler?.status === "success" ? (
                          <MdOutlineCheckCircle className="text-green-600" />
                        ) : (
                          <PiWarningCircleFill className="text-red-600 " />
                        )}

                        <p
                          className={`text-sm tablet:text-xs ml-[5px] ${
                            titleErrorHandler?.status === "success"
                              ? " text-green-600"
                              : "text-red-600"
                          } `}
                        >
                          {titleErrorHandler?.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div className="w-100 mt-[10px]">
                    <p className="font-semibold mb-[2px]">Description</p>
                    <textarea
                      value={description}
                      placeholder="Please enter your event description"
                      onChange={descriptionOnChangeFunction}
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      className="w-100 h-[80px] p-[10px] border rounded"
                    ></textarea>
                  </div>

                  {/* ERROR HANDLER */}
                  {descriptionErrorHandler?.status !== "start" && (
                    <div className="flex mt-[5px]">
                      {descriptionErrorHandler?.status === "success" ? (
                        <MdOutlineCheckCircle className="text-green-600" />
                      ) : (
                        <PiWarningCircleFill className="text-red-600 " />
                      )}

                      <p
                        className={`text-sm tablet:text-xs ml-[5px] ${
                          descriptionErrorHandler?.status === "success"
                            ? " text-green-600"
                            : "text-red-600"
                        } `}
                      >
                        {descriptionErrorHandler?.message}
                      </p>
                    </div>
                  )}

                  {/* PRICE START */}
                  <p className="font-semibold mb-[2px] mt-[10px]">Prices</p>
                  <div className="w-100 p-[10px] rounded bg-white shadow">
                    {/* PRICE TYPE START */}

                    {prices.map((pricesData, i) => {
                      return (
                        <div key={i} className="class">
                          <div className="flex items-center mb-[10px] grow mobile:flex-col ">
                            <div className=" mr-[10px] w-[140px] mobile:w-100 mobile:mr-0 flex items-center mobile:mb-[10px]">
                              <p className="mr-[10px] text-gray-800">
                                {i + 1}.
                              </p>
                              <select
                                name="priceType"
                                id=""
                                value={pricesData?.priceType}
                                onChange={(e) => {
                                  handlePriceChange(pricesData?.id, e);
                                }}
                                className="p-[10px] w-100 border rounded text-xs text-gray-700"
                              >
                                <option value="">Choose type</option>
                                <option value="face_to_face">
                                  Face to face
                                </option>
                                <option value="virtual">Virtual</option>
                              </select>
                            </div>

                            <input
                              type="number"
                              name="price"
                              value={pricesData?.price}
                              placeholder="Enter price"
                              onChange={(e) => {
                                handlePriceChange(pricesData?.id, e);
                              }}
                              className="p-[10px] rounded grow border min-w-[20px] mobile:w-100"
                            />
                          </div>
                          <div className="flex w-100 items-center mb-[10px] ">
                            <input
                              type="text"
                              name="priceName"
                              value={pricesData?.priceName}
                              placeholder="Enter price name"
                              onChange={(e) => {
                                handlePriceChange(pricesData?.id, e);
                              }}
                              className="w-100 p-[10px] rounded  border"
                            />
                            {prices.length > 1 && (
                              <button
                                onClick={() => removeMember(pricesData?.id)}
                                className="bg-red-600 p-[10px] text-white rounded cursor-pointer text-nowrap ml-[10px] shadow hover:bg-red-400 active:bg-red-600"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className="text-red-600 flex items-center text-sm mobile:text-xs">
                      {priceErrorHandler?.status !== "start" && (
                        <>
                          <MdOutlineCheckCircle
                            className={`${
                              priceErrorHandler?.status === "success"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          />
                          <p
                            className={`text-sm tablet:text-xs ml-[5px] ${
                              priceErrorHandler?.status === "success"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {priceErrorHandler?.message}
                          </p>
                        </>
                      )}
                    </div>

                    <button
                      onClick={addPriceRow}
                      className="bg-blue-600 p-[10px] text-white rounded cursor-pointer shadow mt-[10px] flex items-center"
                    >
                      Add price
                      <IoAddCircleOutline className="ml-[5px] w-[auto] h-[20px]" />
                    </button>
                  </div>

                  {/* PRICE END */}

                  {/* PLACE START*/}
                  <div className=" w-100 mt-[20px]">
                    <p className="font-semibold mb-[2px]">Place</p>

                    <input
                      type="text"
                      value={place}
                      onChange={placeOnChangeFunction}
                      placeholder="Please enter your event place"
                      className="border p-[10px] w-100 rounded"
                    />
                    {/* ERROR HANDLER */}
                    {placeErrorHandler?.status !== "start" && (
                      <div className="flex mt-[5px]">
                        {placeErrorHandler?.status === "success" ? (
                          <MdOutlineCheckCircle className="text-green-600" />
                        ) : (
                          <PiWarningCircleFill className="text-red-600 " />
                        )}

                        <p
                          className={`text-sm tablet:text-xs ml-[5px] ${
                            placeErrorHandler?.status === "success"
                              ? " text-green-600"
                              : "text-red-600"
                          } `}
                        >
                          {placeErrorHandler?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* PLACE END */}

                  {/* LIVE ID START*/}
                  <div className=" w-100 mt-[20px]">
                    <p className="font-semibold mb-[2px]">Live id</p>
                    <input
                      value={liveId}
                      type="text"
                      onChange={liveIdOnchangeFunction}
                      placeholder="Please enter your event live id"
                      className="border p-[10px] w-100 rounded"
                    />
                    {/* ERROR HANDLER */}
                    {liveIdErrorHandler?.status !== "start" && (
                      <div className="flex mt-[5px]">
                        {liveIdErrorHandler?.status === "success" ? (
                          <MdOutlineCheckCircle className="text-green-600" />
                        ) : (
                          <PiWarningCircleFill className="text-red-600 " />
                        )}

                        <p
                          className={`text-sm tablet:text-xs ml-[5px] ${
                            liveIdErrorHandler?.status === "success"
                              ? " text-green-600"
                              : "text-red-600"
                          } `}
                        >
                          {liveIdErrorHandler?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* LIVE ID END */}

                  {/* THUMBNAIL START*/}
                  <div className=" w-100 mt-[20px]">
                    <p className="font-semibold mb-[2px]">Thumbnail</p>
                    <div className="w-100 p-[10px] bg-white rounded shadow">
                      <OnPropImageInput
                        setImage={setThumbnail}
                        setImageErrorHandler={setImageErrorHandler}
                        imageErrorHandler={imageErrorHandler}
                      />
                    </div>
                    {/* ERROR HANDLER */}
                    {imageErrorHandler?.status === "failed" && (
                      <div className="flex mt-[5px]">
                        <PiWarningCircleFill className="text-red-600" />
                        <p className="text-sm tablet:text-xs ml-[5px] text-red-600">
                          {imageErrorHandler?.message}
                        </p>
                      </div>
                    )}

                    {imageErrorHandler?.status === "success" && (
                      <div className="flex mt-[5px]">
                        <PiWarningCircleFill className="text-green-600" />
                        <p className="text-sm tablet:text-xs ml-[5px] text-green-600">
                          {imageErrorHandler?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* THUMBNAIL END */}

                  {/* VIDEO START*/}
                  <div className=" w-100 mt-[20px]">
                    <p className="font-semibold mb-[2px]">Introduction video</p>
                    <div className="w-100 p-[10px] bg-white rounded shadow">
                      <OnDropVideoInput
                        setVideoIntro={setVideoIntro}
                        setVideoErrorHandler={setVideoErrorHandler}
                        videoErrorHandler={videoErrorHandler}
                      />
                    </div>

                    {/* ERROR HANDLER */}
                    {videoErrorHandler?.status === "failed" && (
                      <div className="flex mt-[5px]">
                        <PiWarningCircleFill className="text-red-600" />
                        <p className="text-sm tablet:text-xs ml-[5px] text-red-600">
                          {videoErrorHandler?.message}
                        </p>
                      </div>
                    )}

                    {videoErrorHandler?.status === "success" && (
                      <div className="flex mt-[5px]">
                        <PiWarningCircleFill className="text-green-600" />
                        <p className="text-sm tablet:text-xs ml-[5px] text-green-600">
                          {videoErrorHandler?.message}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* VIDEO END */}

                  {/* SUBMIT BUTTON */}
                  <button
                    onClick={uploadButtonFunction}
                    className="bg-indigo-800 text-white w-100 p-[10px] mt-[30px] rounded hover:bg-indigo-600 active:bg-indigo-800 mb-[30px] flex items-center justify-center"
                  >
                    Upload
                    <FiUploadCloud className=" ml-[10px] w-[auto] h-[20px]" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-[60%] ml-[50%] translate-x-[-50%] p-[10px]">
                <p className="text-center font-semibold text-2xl text-indigo-800 mb-[20px]">
                  Uploading files and data please wait.
                </p>

                <div
                  className={`flex items-center text-lg tracking-widest mb-[20px] 
              ${!uploadVideoState && "text-gray-700"}
              ${uploadVideoState === "start" && "text-blue-700"}
              ${uploadVideoState === "success" && "text-green-600"}`}
                >
                  Uploading video : ({videoChunk} / {videoChunkCount}){" "}
                  {videoUploadProgress}%
                  {uploadVideoState === "start" && (
                    <CgSpinnerTwoAlt className="ml-[20px] animate-spin" />
                  )}
                </div>

                <div
                  className={`flex items-center text-lg tracking-widest mb-[20px]
              ${!uploadImageState && "text-gray-700"}
              ${uploadImageState === "start" && "text-blue-700"}
              ${uploadImageState === "success" && "text-green-600"}
              `}
                >
                  Uploading image : {imageUploadProgress}%{" "}
                  {uploadImageState === "start" && (
                    <CgSpinnerTwoAlt className="ml-[20px] animate-spin" />
                  )}
                </div>

                <div
                  className={`flex items-center text-lg tracking-widest mb-[20px]
              ${!uploadDataState && "text-gray-700"}
              ${uploadDataState === "start" && "text-blue-700"}
              ${uploadDataState === "success" && "text-green-600"}
              `}
                >
                  Finalizing ...
                  {uploadDataState === "start" && (
                    <CgSpinnerTwoAlt className="ml-[20px]" />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
