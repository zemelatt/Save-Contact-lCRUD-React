import axios from "axios";

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

export async function allContatcs() {
  return await axios.get(``);
}

export async function newContact({ name, number }) {
  const data = { name, number };
  return await axios.post(``, data);
}

export function editableContact(pid) {
  const id = pid;

  return axios.get(`/${id}`);
}

export async function editContact({ pid, name, number }) {
  const data = { pid, name, number };

  return await axios.put(`/up/${data.pid}`, data);
}

export async function deleteContact(pid) {
  const id = pid;
  return await axios.delete(`/delete/${id}`);
}
