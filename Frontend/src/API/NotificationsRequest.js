import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_API });

export const getAllNotifications = () => API.get(`/notifications/getAll`);

export const addEvent = (data) => API.post('/notifications/', data);

export const deleteEvent = (senderId) => API.delete(`/notifications/${senderId}`);