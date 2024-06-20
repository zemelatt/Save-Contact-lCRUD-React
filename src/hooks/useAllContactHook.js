import React, { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import { useContact, useDeleteContactMutation } from "./query";
export const useAllContactHook = () => {
  const myValue = useSelector((state) => state.myValue.value);
  const { mutate } = useDeleteContactMutation();

  const [edit, setEdit] = useState();
  const [pop, setPop] = useState();

  const { isLoading, data: contacts } = useContact();

  const handleDelete = async (pid) => {
    mutate(pid);
  };
  const handleEdit = (pid) => {
    setEdit(pid);
    setPop(true);
  };
  function togglePop() {
    setPop(!pop);
  }
  if (isLoading) return <div>Loading</div>;
  if (!contacts) return <div> </div>;

  return {
    togglePop,
    handleEdit,
    handleDelete,
    myValue,
    contacts,
    edit,
    pop,
  };
};
