import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { editContact, editableContact } from "../../axios/api";
import { decrement } from "../../redux/Slice/slice";
import Pop from "../../component/Popup/Pop";

export default function Edit({ pid, toggle }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", number: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await editableContact(pid);
      setData({
        ...data,
        name: response?.ContactName,
        number: response?.ContactNumber,
        pid: response?.pid,
      });
    };
    fetchData();
  }, [pid]);

  async function handlechange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await editContact(data);
    if (response?.status === 201) toggle();
    dispatch(decrement());
    setErr(response?.data);
  };

  if (!data.name && !data.number) return <div> </div>;
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
            name={data.name}
            number={data.number}
            getVal={handlechange}
            err={err}
          />
        </div>
      </div>
    </div>
  );
}
