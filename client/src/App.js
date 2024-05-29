//import useOnClickOutside from "./Hooks/useOnClickOutside";
import React, { useState} from "react";
import "./App.css";
import Modal from './Modal';




function App() {

  const [openModal, setOpenModal] = useState(false);
  const handleButtonClick = (value) => {
    setOpenModal(false);
  };

  return (
    <div className="App">
      <button
        className="openModalBtn"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        방 참여
      </button>

      {openModal && (
       
        <Modal closeModal={() => setOpenModal(false)}  CM={handleButtonClick}/>
  
      )}
    </div>
  );
}

export default App;
