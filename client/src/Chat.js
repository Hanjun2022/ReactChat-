import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import pic1 from "./picture/Button.png";

function Chat({ socket, username, room,onExit,className1 }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("received_message");
    };
  }, [socket]);

  const handleExit = () => {
    socket.emit("leave_room", { username, room });
    if (onExit) {
      onExit(false); 
    }
  };

  return (
    <div className={className1}>
    <div className="chat-window" >
      <div className="chat-header">
        <p>Live Chat</p>
        <img
          className="exit-button"
          src={pic1}
          alt="Exit"
          style={{ width: '40px', height: '30px' }}
          onClick={handleExit}
        />
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
    </div>
  );
}

export default Chat;
