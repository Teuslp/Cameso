// frontend/src/components/NotificationBell/NotificationBell.jsx (NOVO ARQUIVO)

import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NotificationBell.css'; // Criaremos este CSS a seguir

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.lida).length;

  // Função para buscar as notificações
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      const response = await fetch('/api/notificacoes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  // Busca as notificações quando o componente é montado
  useEffect(() => {
    fetchNotifications();
    // Opcional: Busca por novas notificações a cada 1 minuto
    const interval = setInterval(fetchNotifications, 60000);
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
        const token = localStorage.getItem('userToken');
        await fetch('/api/notificacoes/marcar-todas-lidas', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchNotifications(); // Atualiza a lista
    } catch (error) {
        console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  return (
    <div className="notification-bell-container">
      <button onClick={() => setIsOpen(!isOpen)} className="bell-button">
        <FaBell />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h3>Notificações</h3>
            <button onClick={handleMarkAllAsRead} className="mark-all-read-btn">Marcar todas como lidas</button>
          </div>
          <ul className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <li key={notif._id} className={!notif.lida ? 'unread' : ''}>
                  <Link to={notif.link || '#'} onClick={() => setIsOpen(false)}>
                    <p>{notif.mensagem}</p>
                    <small>{new Date(notif.createdAt).toLocaleString('pt-BR')}</small>
                  </Link>
                </li>
              ))
            ) : (
              <li className="no-notifications">Nenhuma notificação encontrada.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;