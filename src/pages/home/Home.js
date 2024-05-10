import { useState } from "react";

import "../../css/style.css";
import "../../css/add.css";

import NewContact from "../addContact/NewContact";
import AllContact from "../getContact/AllContact";
export function Home() {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }
  return (
    <div className="maindiv">
      <div className="inputHolderDiv">
        <div className="subInputHolder">
          <button onClick={togglePop}>ADD CONTACT +</button>
          {seen ? <NewContact toggle={togglePop} /> : null}
        </div>
      </div>
      <AllContact />
    </div>
  );
}
