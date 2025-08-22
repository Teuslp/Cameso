import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatCliente.css";

function ChatCliente({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  // Rolar automaticamente para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Buscar ou criar chat
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/chat", {
          headers: { Authorization: "Bearer " + token },
        });

        if (res.data.length > 0) {
          setChatId(res.data[0]._id);
          setMessages(
            res.data[0].messages.map((m) => ({
              text: m.content,
              sender: m.sender?.role === "cliente" ? "cliente" : "admin",
            }))
          );
        } else {
          const create = await axios.post(
            "http://localhost:3001/chat/create",
            { participantIds: [userId] },
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
          );
          setChatId(create.data._id);
          setMessages([]);
        }
      } catch (err) {
        console.error("Erro ao buscar/criar chat:", err.response?.data || err);
      }
    };
    fetchChat();
  }, [userId]);

  // Enviar mensagem
  const handleSend = async () => {
    console.log("handleSend chamado"); // <--- linha de teste
    if (!input.trim() || !chatId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:3001/chat/${chatId}/message`,
        { content: input },
        { headers: { Authorization: "Bearer " + token } }
      );

      setMessages(
        res.data.messages.map((m) => ({
          text: m.content,
          sender: m.sender?.role === "cliente" ? "cliente" : "admin",
        }))
      );
      setInput("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err.response?.data || err);
    }
  };

  // Envio ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Mensagens</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "cliente" ? "sent" : "received"}`}
          >
            {msg.text}
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
