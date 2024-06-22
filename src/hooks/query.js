import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { allContatcs, deleteContact, editContact } from "../axios/api";

const useContact = () => {
  return useQuery({
    queryKey: ["allContact"],
    queryFn: async () => {
      const response = await allContatcs();

      return response;
    },
  });
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
export { useEditContactMutation, useDeleteContactMutation, useContact };
