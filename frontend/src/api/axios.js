// frontend/src/api/axios.js (NOVO ARQUIVO)

import axios from 'axios';

// Cria uma instância do axios
const api = axios.create({
  baseURL: '/', // A base da nossa URL da API
});

// Isso é um "interceptor". Ele "intercepta" toda requisição antes de ela ser enviada.
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    // Se o token existir, ele é adicionado ao cabeçalho de autorização
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;