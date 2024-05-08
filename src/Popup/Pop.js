import React from "react";

const Pop = ({
  close,
  Edit,
  name,
  setName,
  numerr,
  number,
  setNumber,
  err,
}) => {
  return (
    <div>
      <form onSubmit={Edit}>
        <label>
          Name: {name}
          <input
            type="text"
            value={name}
            style={{ textTransform: "capitalize" }}
            onChange={setName}
            autoFocus
            required
          />{" "}
          <p className="err"> {numerr}</p>
        </label>
        <label>
          Phone Number: {number}
          <input
            type="tel"
            value={number}
            placeholder="+2519000000"
            // pattern="[0-9]{10}"
            onChange={setNumber}
            required
          />
          <p className="err">{err}</p>
        </label>
        <button type="submit">UPDATE CONTACT</button>
      </form>
    </div>
    // </div>
  );
};

export default Pop;
