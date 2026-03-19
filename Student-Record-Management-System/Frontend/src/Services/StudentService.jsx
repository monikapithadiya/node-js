import axios from 'axios';

const BASE_URL = 'http://localhost:3000/students';

export const getAllStudents = () => axios.get(`${BASE_URL}/get`);
export const addStudent = (data) => axios.post(`${BASE_URL}/add`, data);
export const updateStudent = (id, data) => axios.put(`${BASE_URL}/edit/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
