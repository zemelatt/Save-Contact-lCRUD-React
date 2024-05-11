const Pop = ({ getVal, Edit, name, numerr, number, err }) => {
  console.log(name);
  return (
    <div>
      <form onSubmit={Edit}>
        <label>
          Name: {name}
          <input
            type="text"
            name="name"
            defaultValue={name}
            style={{ textTransform: "capitalize" }}
            onChange={getVal}
            autoFocus
            required
          />
          <p className="err"> {numerr}</p>
        </label>
        <label>
          Phone Number: {number}
          <input
            name="number"
            type="tel"
            defaultValue={number}
            placeholder="+2519000000"
            pattern="[0-9]{10}"
            onChange={getVal}
            required
          />
          <p className="err">{err}</p>
        </label>
        <button type="submit">UPDATE CONTACT</button>
      </form>
    </div>
  );
};

export default Pop;
