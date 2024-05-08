import { useState } from "react";
import { useDispatch } from "react-redux";

import { newContact } from "../Axios/api";
import { decrement } from "../Redux/Slice/Slice";
import Pop from "../Popup/Pop";

export default function NewContact(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [err, setErr] = useState("");

  async function handleAddcontact(e) {
    e.preventDefault();
    try {
      let response = await newContact({ name, number });
      if (response.status === 201) props.toggle();
      setErr(response.data);
      dispatch(decrement());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="popHead">
          <h2>ADD CONTACT</h2>

          <button onClick={props.toggle} className="close">
            X
          </button>
        </span>
        <Pop
          Edit={handleAddcontact}
          name={name}
          number={number}
          setName={(e) => setName(e.target.value)}
          setNumber={(e) => setNumber(e.target.value)}
          err={err}
        />
      </div>
    </div>
  );
}
