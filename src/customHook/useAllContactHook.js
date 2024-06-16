import React from "react";

import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import { allContatcs, deleteContact } from "../axios/api";
import { decrement } from "../redux/Slice/slice";
import { useQuery } from "@tanstack/react-query";

export const useAllContactHook = () => {
  const dispatch = useDispatch();
  const myValue = useSelector((state) => state.myValue.value);

  const [contacts, setContacts] = useState([]);
  const [edit, setEdit] = useState();

  const [pop, setPop] = useState();

  const { refetch } = useQuery({
    queryKey: ["allContact"],
    queryFn: async () => {
      const response = await allContatcs();
      setContacts(response);
      return response;
    },
  });

  useEffect(() => {
    refetch();
  }, [myValue, refetch]);

  const handleDelete = async (pid) => {
    deleteContact(pid);
    dispatch(decrement());
  };
  const handleEdit = (pid) => {
    setEdit(pid);
    setPop(true);
  };
  function togglePop() {
    setPop(!pop);
  }
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
