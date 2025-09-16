import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// CAMINHO CORRIGIDO AQUI
import { useAuth } from "../../context/AuthContext";
import "./ChatCliente.css";

function ChatCliente() {
  // USO DO HOOK CORRIGIDO AQUI
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("userToken");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!token) return;

    const initChat = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/chat/create",
          {},
          { headers: { Authorization: "Bearer " + token } }
        );
        setChat(res.data);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("Erro ao iniciar o chat:", err.response?.data || err);
      }
    };

    initChat();
  }, [token]);

  const handleSend = async () => {
    if (!input.trim() || !chat) return;
    try {
      const res = await axios.post(
        `http://localhost:3001/chat/${chat._id}/message`,
        { content: input },
        { headers: { Authorization: "Bearer " + token } }
      );
      setChat(res.data);
      setMessages(res.data.messages);
      setInput("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err.response?.data || err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!user || !chat) {
    return <div>Carregando conversa...</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">Mensagens</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender._id === user._id ? "sent" : "received"}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatCliente;