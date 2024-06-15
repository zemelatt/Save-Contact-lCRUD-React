import axios from "axios";
import { toastNote } from "./toastAsset";
import { HttpStatusCode } from "./toastAsset";

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

axios.interceptors.response.use(
  function (response) {
    if (response.status === HttpStatusCode.CREATED || HttpStatusCode.OK) {
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
  const file = data.name !== undefined ? data : null;
  return await axios.post(``, file);
}

export async function editableContact(pid) {
  const id = pid;
  const response = await axios.get(`/${id}`);

  return response?.data;
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
