import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NotificationBell.css';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext'; // 1. Importar o useAuth

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // 2. Obter o utilizador logado do contexto

  const unreadCount = notifications.filter(n => !n.lida).length;

  // 3. Tornar a função de busca dinâmica
  useEffect(() => {
    // Não faz nada se o utilizador não estiver carregado
    if (!user) return;

    // Decide qual URL usar com base no papel do utilizador
    const notificationsUrl = user.role === 'admin' ? '/admin/notificacoes' : '/notificacoes';

    const fetchNotifications = async () => {
      try {
        const response = await api.get(notificationsUrl);
        setNotifications(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [user]); // 4. Executa novamente se o utilizador mudar (ex: login/logout)

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    const markAsReadUrl = user.role === 'admin' ? '/admin/notificacoes/marcar-todas-lidas' : '/notificacoes/marcar-todas-lidas';
    try {
        await api.post(markAsReadUrl);
        setNotifications(prev => prev.map(n => ({ ...n, lida: true })));
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
            {unreadCount > 0 && (
                 <button onClick={handleMarkAllAsRead} className="mark-all-read-btn">Marcar todas como lidas</button>
            )}
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
              <li className="no-notifications">Nenhuma notificação nova.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;