import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newContact } from "../../axios/api";

import Pop from "../../component/popup/Pop";

export default function NewContact({ toggle }) {
  const [err, setErr] = useState("");
  const [data, setData] = useState({ name: "", number: "" });
  const client = useQueryClient();

  const mutationKey = "addContact";
  const { mutate } = useMutation({
    mutationKey,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["allContact"] });
      toggle();
    },
    mutationFn: async (data) => {
      let response = await newContact(data);

      if (response.status === 200) {
        setErr(response?.data);
        return;
      }
      return response.status;
    },
  });

  async function handlechange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleAddcontact(e) {
    e.preventDefault();
    mutate(data);
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="popHead">
          <h2>Add Contact</h2>

          <button onClick={toggle} className="close">
            X
          </button>
        </span>
        <Pop
          Edit={handleAddcontact}
          name={data?.name}
          number={data?.number}
          getVal={handlechange}
          err={err}
        />
      </div>
    </div>
  );
}
