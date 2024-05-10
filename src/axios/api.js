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
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  },
  informativ: { position: "top-right", autoClose: 5000 },
  success: {
    position: "bottom-right",
    autoClose: 3000,
  },
};
const toastNote = (HttpStatusCodeVal) => {
  switch (HttpStatusCodeVal) {
    case "Network Error":
      console.log();
      toast.error("Temporarly server is down!", toastStyle.errServer);
      break;
    case HttpStatusCode.NOT_FOUND:
      toast.error(
        "The server cannot find the requested resource.",
        toastStyle.errNotFound
      );
      break;
    case HttpStatusCode.CREATED:
      toast.success("Contact updated", toastStyle.success);
      break;
    default:
      toast.info("Something went wrong, stay patient ", toastStyle.informativ);
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
  // const file = data.name !== undefined ? data : null;
  // console.log(file);

  return await axios.post(``, data);
}

export async function editableContact(pid) {
  const id = pid;
  const response = await axios.get(`/${id}`);
  return response?.data[0];
}

export async function editContact(formData) {
  console.log("from");
  console.log(formData);
  return await axios.put(
    `/up/${formData.pid}`,
    formData.name !== undefined ? formData : null
  );
}

export async function deleteContact(pid) {
  const id = pid;
  return await axios.delete(`/delete/${id ? id : null}`);
}
