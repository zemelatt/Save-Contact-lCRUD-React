import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Edit from "../EditContact/EditContact";
import { allContatcs, deleteContact } from "../Axios/api";
import { decrement } from "../Redux/Slice/Slice";

const AllContact = () => {
  const dispatch = useDispatch();
  const myValue = useSelector((state) => state.myValue.value);

  const [contacts, setContacts] = useState([]);
  const [edit, setEdit] = useState();
  const [pop, setPop] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await allContatcs();
        setContacts(response.data);
      } catch (error) {
        console.log(`erorr: ${error.message}`);
      }
    };
    fetchData();
  }, [myValue]);

  const handleDelete = async (pid) => {
    deleteContact(pid);
    dispatch(decrement());
  };
  const handleEdit = (pid) => {
    setEdit(pid);
    setPop(true);
  };
  function togglePop() {
    setPop(!pop);
  }
  return (
    <div>
      {pop ? <Edit toggle={togglePop} pid={edit} /> : null}
      <div className="listHolder">
        <table>
          <thead>
            <tr>
              <th> Name</th>
              <th> Phone number</th>
              <th> Edit</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((val, index) => (
                <tr key={index}>
                  <td>{val.ContactName}</td>
                  <td>{val.ContactNumber}</td>
                  <td>
                    <FaTrash
                      className="icons delete"
                      onClick={() => handleDelete(val.pid)}
                    />
                  </td>
                  <td>
                    <FaEdit
                      className="icons edit"
                      onClick={() => handleEdit(val.pid)}
                    />
                  </td>
                  <td></td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContact;
