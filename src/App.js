import React from "react";
import { ToastContainer } from "react-toastify";
import { MainPage } from "./pages/mainPage/Home";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <MainPage />
    </div>
  );
}

export default App;
