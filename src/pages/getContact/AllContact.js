import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import Edit from "../editContact/EditContact";
import { allContatcs, deleteContact } from "../../axios/api";
import { decrement } from "../../redux/Slice/slice";
import { useQuery } from "@tanstack/react-query";

export default function AllContact() {
  const dispatch = useDispatch();
  const myValue = useSelector((state) => state.myValue.value);

  const [contacts, setContacts] = useState([]);
  const [edit, setEdit] = useState();

  const [pop, setPop] = useState();

  const { refetch } = useQuery({
    queryKey: ["allContact"],
    queryFn: async () => {
      const response = await allContatcs();
      setContacts(response);
      return response;
    },
  });

  useEffect(() => {
    refetch();
  }, [myValue, refetch]);

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
  if (!contacts) return <div> </div>;
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
                      onClick={() => handleDelete(val.id)}
                    />
                  </td>
                  <td>
                    <FaEdit
                      className="icons edit"
                      onClick={() => handleEdit(val.id)}
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
}
