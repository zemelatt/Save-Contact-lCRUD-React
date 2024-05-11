import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.baseURL = "http://localhost:2222/api/phonebook";
axios.interceptors.request.use(
  function (req) {
    req.headers = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return req;
  },
  function (error) {
    return error;
  }
);
const HttpStatusCode = {
  NOT_FOUND: 404,
  CREATED: 201,
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
const toastNote = (HttpStatusCodeVal) => {
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
axios.interceptors.response.use(
  function (response) {
    console.log(response.status);
    if (response.status === HttpStatusCode.CREATED) {
      toastNote(HttpStatusCode.CREATED);
    }
    return response;
  },
  function (error) {
    const status = error.response ? error.response.status : null;
    if (status === HttpStatusCode.NOT_FOUND) {
      toastNote(HttpStatusCode.NOT_FOUND);
    } else if (error.message === "Network Error") {
      toastNote("Network Error");
    } else {
      toastNote();
    }
    return;
  }
);
export async function allContatcs() {
  const response = await axios.get(``);

  return response?.data;
}

export async function newContact(data) {
  // console.log(data);
  const file = data.name !== undefined ? data : null;
  console.log(file);

  return await axios.post(``, file);
}

export async function editableContact(pid) {
  const id = pid;
  const response = await axios.get(`/${id}`);
  return response?.data[0];
}

export async function editContact(formData) {
  return await axios.put(
    `/up/${formData.pid}`,
    formData.name !== undefined ? formData : null
  );
}

export async function deleteContact(pid) {
  const id = pid;
  return await axios.delete(`/delete/${id ? id : null}`);
}
