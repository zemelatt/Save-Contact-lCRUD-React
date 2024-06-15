import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { editContact, editableContact } from "../../axios/api";
import { setMyValue } from "../../redux/Slice/slice";
import Pop from "../../component/popup/Pop";
import { useQuery } from "@tanstack/react-query";

export default function Edit({ pid, toggle }) {
  const dispatch = useDispatch();
  const [datas, setData] = useState({ name: "", number: "" });
  const [err, setErr] = useState("");

  useQuery({
    queryKey: ["oneContact"],
    queryFn: async () => {
      const response = await editableContact(pid);
      setData({
        ...datas,
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
    setData((datas) => ({ ...datas, [name]: value }));
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    datas.pid = pid;

    const response = await editContact(datas);
    if (response?.status === 201) {
      toggle();
      dispatch(setMyValue());
      return;
    }
    setErr(response?.data);
  };

  if (!datas.name && !datas.number) return <div> </div>;
  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <span className="popHead">
            <h2>EDIT CONTACT</h2>
            <button onClick={toggle} className="close">
              X
            </button>
          </span>
          <Pop
            Edit={handleEdit}
            name={datas.name}
            number={datas.number}
            getVal={handlechange}
            err={err}
          />
        </div>
      </div>
    </div>
  );
}
