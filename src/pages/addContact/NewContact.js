import { useState } from "react";
import { useDispatch } from "react-redux";

import { newContact } from "../../axios/api";
import { decrement } from "../../redux/Slice/slice";
import Pop from "../../component/Popup/Pop";

export default function NewContact({ toggle }) {
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const [data, setData] = useState({ name: "", number: "" });

  async function handlechange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleAddcontact(e) {
    e.preventDefault();
    let response = await newContact(data);
    if (response?.status === 201) toggle();
    dispatch(decrement());
    setErr(response?.data);
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="popHead">
          <h2>ADD CONTACT</h2>

          <button onClick={toggle} className="close">
            X
          </button>
        </span>
        <Pop
          Edit={handleAddcontact}
          name={data.name}
          number={data.number}
          getVal={handlechange}
          err={err}
        />
      </div>
    </div>
  );
}
