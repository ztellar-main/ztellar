import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function toas(message:string, type:string) {
  const successToastify = () => {
    toast.success(`${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const errorToastify = () => {
    toast.warn(`${message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  if (type === "success") {
    return successToastify();
  }

  if (type === "error") {
    return errorToastify();
  }
}

export default toas;
