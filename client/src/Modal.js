import React, { useState } from "react";
import "./Modal.css";
import "./App.css";
import "./App.js";
import io from "socket.io-client";
import Chat from "./Chat";
//import useOnClickOutside from "./Hooks/useOnClickOutside";

const socket = io.connect("http://localhost:3001");

function Modal({ closeModal,CM}) {

  

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="modalBackground" 
     onClick={(e)=>{
      if(e.target.className==="modalBackground" && e.target.className!=="Chat"){
        CM()
      }
     }} >
      {!showChat ? (
        <div className="modalContainer" >
          <div className="titleCloseBtn">
            <button className="Btn" onClick={() => { closeModal(false) }}> X</button>
          </div>
          <div className="joinChatContainer">
            <h2>채팅 참여</h2>
              <div className="body">
                <p>
                <input
                    type="text"
                    placeholder="참여자의 이름"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        joinRoom();
                      }
                    }}
                  />
            
                  <input
                    type="text"
                    placeholder="방 번호"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        joinRoom();
                      }
                    }}
                  />
                </p>
              </div>
                <div className="footer">
                  <div className="footer">
                    <button onClick={joinRoom} >참여</button>
                  </div>
                </div>
          </div>
        </div>
      ) : (
        <Chat  className1="Chat" socket={socket} username={username} room={room} onExit={setShowChat} />
      )}
    </div>
  );
}

export default Modal 