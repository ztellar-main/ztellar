import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAppSelector } from "../../state/store";
import { PiWarningCircleFill } from "react-icons/pi";
import toas from "../../utils/toas";

type Props = {
  eventId: string;
  setOpenAddSubjectPopup: any;
  refresher: boolean;
  setRefresher: any;
};

const AddSubjectOnEventPopup = ({
  eventId,
  setOpenAddSubjectPopup,
  refresher,
  setRefresher,
}: Props) => {
  const token = useAppSelector((e) => e.user.token);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [titleErrorHandler, setTitleErrorHandler] = useState({
    message: "",
    status: "start",
  });

  const uploadSubjectButtonFunction = async () => {
    try {
      await axios({
        method: "put",
        url: "/product/add-subject-on-event",
        data: {
          title,
          link,
          productId: eventId,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      if (refresher === true) {
        setRefresher(false);
      } else {
        setRefresher(true);
      }
      setTitleErrorHandler({ message: "success", status: "success" });
      toas("Subject successfully uploaded", "success");
      setOpenAddSubjectPopup(false);
    } catch (err) {
      toas("There is something wrong in your information.", "error");
      if (err instanceof AxiosError) {
        const error = err?.response?.data?.message || err?.message;
        setTitleErrorHandler({ message: error, status: "failed" });
      }
    }
  };
  return (
    <>
      <div className="w-[500px] bg-white fixed z-[22] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded">
        <div className="w-100 p-[10px] bg-indigo-900 rounded-t text-white">
          Add Subject
        </div>

        {/* TITLE */}
        <div className="p-[10px]">
          <p className="font-semibold text-sm ml-[5px]">Title</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your subject title."
            className="w-100 border p-[10px] rounded"
          />
        </div>

        {/* LINK */}
        <div className="p-[10px]">
          <p className="font-semibold text-sm ml-[5px]">Link</p>
          <input
            type="text"
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter your subject link."
            className="w-100 border p-[10px] rounded"
          />

          <button
            onClick={uploadSubjectButtonFunction}
            className="w-100 bg-indigo-900 mt-[20px] p-[5px] text-gray-200 rounded hover:bg-indigo-600 active:bg-indigo-900"
          >
            Upload subject
          </button>

          {titleErrorHandler?.status !== "start" && (
            <div
              className={`mt-[10px] flex items-center ${
                titleErrorHandler?.status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <PiWarningCircleFill className="mb-[2px] mr-[5px]" />
              {titleErrorHandler?.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddSubjectOnEventPopup;
