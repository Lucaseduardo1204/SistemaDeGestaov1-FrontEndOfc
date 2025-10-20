import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://seu-backend.com/api', // URL do seu back-end
  // headers: { 'Authorization': 'Bearer ...' } // Para autenticação
});