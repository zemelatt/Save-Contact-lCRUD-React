import React, { useContext } from "react";

import { useCustomHook } from "customHook/useEditContactHook";

export default function Edit({ pid, toggle }) {
  const { data, err, handleEdit, handlechange, Pop } = useCustomHook({
    pid,
    toggle,
  });
  const value = useContext();
  console.log(value);
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
