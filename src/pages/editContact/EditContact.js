import React, { useContext } from "react";
import { useCustomHook } from "hooks/useEditContactHook";
import { ContextTest } from "hooks/contextHook";
export default function Edit({ toggle }) {
  const pid = useContext(ContextTest);
  const { data, err, handleEdit, handlechange, Pop } = useCustomHook({
    pid,
    toggle,
  });

  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <span className="popHead">
            <h2>Edit Contact</h2>
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
