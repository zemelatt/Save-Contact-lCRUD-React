import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { editContact, editableContact } from "../axios/api";
import { setMyValue } from "../redux/Slice/slice";
import Pop from "../component/popup/Pop";
import { useQuery } from "@tanstack/react-query";

export const useCustomHook = ({ pid, toggle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", number: "" });
  const [err, setErr] = useState("");

  useQuery({
    queryKey: ["oneContact"],
    queryFn: async () => {
      const response = await editableContact(pid);

      setData({
        ...data,
        name: response?.ContactName,
        number: response?.ContactNumber,
        pid: response?.pid,
      });
      return response;
    },
  });

  async function handlechange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  }
  async function handleEdit(e) {
    e.preventDefault();
    data.pid = pid;

    const response = await editContact(data);
    if (response?.status === 201) {
      toggle();
      dispatch(setMyValue());
      return;
    }
    setErr(response?.data);
  }
  if (!data) {
    return <div></div>;
  }
  //   if (!data.name && !data.number) return <div> </div>;
  return {
    data,
    err,
    handleEdit,
    handlechange,
    Pop,

    dispatch,
  };
};
