import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_API });

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (userId) => API.get(`/chat/${userId}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const deleteChat = (chatId) => API.delete(`/chat/${chatId}`);