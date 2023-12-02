
import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_API });


export const getTimelinePosts= (id) => API.get(`/post/${id}/timeline`);
export const likePost= (id, userId) => API.put(`post/${id}/like`, {userId: userId});
export const getComments= (id) => API.get(`post/${id}/comment`);
export const addComment= (id, data) => API.put(`post/${id}/comment`, data);
export const deleteComment= (id, data) => API.put(`post/${id}/commentDelete`, data);
export const updateComment= (id, data) => API.put(`post/${id}/commentUpdate`, data);