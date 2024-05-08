import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { editContact, editableContact } from "../Axios/api";
import { decrement } from "../Redux/Slice/Slice";
import Pop from "../Popup/Pop";

const Edit = (props) => {
  const pid = props.pid;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = () => {
      try {
        editableContact(pid).then((response) => {
          setName(response.data[0].ContactName);
          setNumber(response.data[0].ContactNumber);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pid]);

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await editContact({ name, number, pid }).then((response) => {
        if (response.status === 201) {
          props.toggle();
          dispatch(decrement());
        }
        setErr(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <span className="popHead">
            <h2>EDIT CONTACT</h2>

            <button onClick={props.toggle} className="close">
              X
            </button>
          </span>
          <Pop
            Edit={handleEdit}
            name={name}
            number={number}
            setName={(e) => setName(e.target.value)}
            setNumber={(e) => setNumber(e.target.value)}
            err={err}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
