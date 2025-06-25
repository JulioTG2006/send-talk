import axios from 'axios';

const API_URL = 'https://backend-temporal.example.com/api';

export const subirAudio = (formData) => {
  return axios.post(`${API_URL}/audio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const obtenerTraduccion = (id) => {
  return axios.get(`${API_URL}/traduccion/${id}`);
};
export const obtenerHistorial = () => {
  return axios.get(`${API_URL}/historial`);
};
export const eliminarTraduccion = (id) => {
  return axios.delete(`${API_URL}/traduccion/${id}`);
};
