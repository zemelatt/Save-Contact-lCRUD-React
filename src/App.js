import React from "react";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Home />
    </div>
  );
}

export default App;
