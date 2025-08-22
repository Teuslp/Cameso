import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import axios from "axios";
import "./ChatAdmin.css";

function ChatAdmin() {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("userToken"); // certifique-se de salvar token no login

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await axios.get("http://localhost:3001/chat", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(res.data);
      if (res.data.length > 0) setActiveChat(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const res = await axios.post(
        `http://localhost:3001/chat/${activeChat._id}/message`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActiveChat(res.data);
      setNewMessage("");
      fetchChats(); // atualizar lista de chats
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Conversas</h3>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat._id}
              className={activeChat?._id === chat._id ? "active" : ""}
              onClick={() => setActiveChat(chat)}
            >
              {chat.participants
                .filter((p) => p._id !== user.id)
                .map((p) => p.nome)
                .join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-main">
        <div className="messages">
          {activeChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender._id === user.id ? "sent" : "received"}`}
            >
              <span className="sender">{msg.sender.nome}</span>
              <span className="content">{msg.content}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
