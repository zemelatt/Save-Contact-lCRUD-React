import { useState } from "react";

import Pop from "../../component/popup/Pop";
import { useNewContactMutation } from "hooks/query";

export default function NewContact({ toggle }) {
  const [data, setData] = useState({ name: "", number: "" });
  const { mutate, err } = useNewContactMutation(toggle);

  async function handlechange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleAddcontact(e) {
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
