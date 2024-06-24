import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  allContatcs,
  deleteContact,
  editContact,
  newContact,
} from "../axios/api";
import { useState } from "react";

const useContact = () => {
  return useQuery({
    queryKey: ["allContact"],
    queryFn: async () => {
      const response = await allContatcs();

      return response;
    },
  });
};
const useNewContactMutation = (toggle) => {
  const [err, setErr] = useState("");
  const [status, setstatus] = useState("");
  const client = useQueryClient();
  const mutationKey = "addContact";
  const { mutate, isSuccess, response, data } = useMutation({
    mutationKey,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allContact"] });
    },
    mutationFn: async (data) => {
      let response = await newContact(data);
      console.log(response.status);
      setErr(response?.data);
      if (response.status === 200) {
        setstatus(response.status);
        return err;
      }
      toggle();
      return status;
    },
  });
  return {
    mutate,
    response,
    isSuccess,
    data,
    err,
    status,
  };
};
const useDeleteContactMutation = () => {
  const client = useQueryClient();
  const mutationKey = "deleteContact";
  const { mutate, onSuccess } = useMutation({
    mutationKey,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allContact"] });
    },
    mutationFn: async (pid) => {
      let response = await deleteContact(pid);
      return response.data;
    },
  });

  return {
    mutate,
    onSuccess,
  };
};

const useEditContactMutation = () => {
  const client = useQueryClient();
  const mutationKey = "editContact";
  const { mutate, onSuccess } = useMutation({
    mutationKey,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allContact"] });
    },
    mutationFn: async (data) => {
      let response = await editContact(data);
      return response.status;
    },
  });
  return {
    mutate,
    onSuccess,
  };
};
export {
  useEditContactMutation,
  useDeleteContactMutation,
  useContact,
  useNewContactMutation,
};
