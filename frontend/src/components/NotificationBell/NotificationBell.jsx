// frontend/src/components/NotificationBell/NotificationBell.jsx (VERSÃO CORRIGIDA)

import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NotificationBell.css';
import api from '../../api/axios'; 

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.lida).length;

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/admin/notificacoes'); 
      setNotifications(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
        // 3. USAR api.post E A ROTA CORRETA PARA ADMIN
        await api.post('/admin/notificacoes/marcar-todas-lidas');
        fetchNotifications();
    } catch (error) {
        console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  // O resto do seu código JSX permanece igual
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
