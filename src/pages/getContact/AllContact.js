import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Edit from "../editContact/EditContact";
import { useAllContactHook } from "hooks/useAllContactHook";

import { ContextTest } from "hooks/contextHook";
export default function AllContact() {
  const { togglePop, handleEdit, handleDelete, contacts, edit, pop } =
    useAllContactHook();

  return (
    <div>
      <ContextTest.Provider value={edit}>
        {pop ? <Edit toggle={togglePop} /> : null}
      </ContextTest.Provider>
      {contacts && (
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
              {contacts?.length > 0 ? (
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
      )}
    </div>
  );
}
