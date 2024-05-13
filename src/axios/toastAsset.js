import { toast } from "react-toastify";
export const HttpStatusCode = {
  NOT_FOUND: 404,
  CREATED: 201,
  OK: 200,
};
const toastStyle = {
  errServer: {
    position: "top-center",
    hideProgressBar: false,
    newestOnTop: false,
    rtl: false,
    pauseOnHover: true,
  },
  errNotFound: {
    position: "top-right",
    autoClose: 3000,
    newestOnTop: false,
    rtl: false,
    pauseOnHover: true,
  },
  informativ: { position: "top-right", autoClose: 5000 },
  success: {
    position: "bottom-right",
    autoClose: 3000,
  },
};
const toastMessages = {
  networkError: "Temporarly server is down!",
  NOT_FOUND: "The server cannot find the requested resource",
  success: "Contact updated",
  otherMsg: "Something went wrong, stay patient ",
};

export const toastNote = (HttpStatusCodeVal) => {
  switch (HttpStatusCodeVal) {
    case "Network Error":
      toast.error(toastMessages.networkError, toastStyle.errServer);
      break;
    case HttpStatusCode.NOT_FOUND:
      toast.error(toastMessages.NOT_FOUND, toastStyle.errNotFound);
      break;
    case HttpStatusCode.CREATED:
      toast.success(toastMessages.success, toastStyle.success);
      break;
    default:
      toast.info(toastMessages.otherMsg, toastStyle.informativ);
      break;
  }
};
