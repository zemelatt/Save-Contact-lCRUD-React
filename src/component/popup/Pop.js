import React from "react";

const Pop = ({ getVal, Edit, name, number, err }) => {
  return (
    <div>
      <form onSubmit={Edit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            defaultValue={name} // Use defaultValue for initial value
            style={{ textTransform: "capitalize" }}
            onChange={getVal}
            autoFocus
          />
          <p className="err">{err}</p>
        </label>
        <label>
          Phone Number:
          <input
            name="number"
            type="tel"
            defaultValue={number} // Use defaultValue for initial value
            placeholder="+2519000000"
            onChange={getVal}
          />
          <p className="err">{err}</p>
        </label>
        <button type="submit">UPDATE CONTACT</button>
      </form>
    </div>
  );
};

export default Pop;
