import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Pop from "../component/popup/Pop";
import { editableContact } from "../axios/api";

import { useQuery } from "@tanstack/react-query";
import { useEditContactMutation } from "./query";

export const useCustomHook = ({ pid, toggle }) => {
  const { mutate } = useEditContactMutation();

  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", number: "" });
  const [err, setErr] = useState("");

  useQuery({
    queryKey: ["oneContact", pid],
    queryFn: async () => {
      const response = await editableContact(pid);

      setData({
        ...data,
        name: response?.ContactName,
        number: response?.ContactNumber,
        pid: response?.pid,
      });

      return data;
    },
    enabled: !!pid,
    retry: 3,
  });

  async function handlechange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  }

  async function handleEdit(e) {
    e.preventDefault();
    data.pid = pid;
    mutate(data);
    toggle();
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
