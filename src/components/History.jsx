import React, { useEffect, useState } from 'react';
import { obtenerHistorial, eliminarTraduccion } from '../services/api';
import { FaHistory } from 'react-icons/fa'; // al inicio del archivo


const History = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const res = await obtenerHistorial();
        setHistorial(res.data);
      } catch (error) {
        console.error('Error al obtener historial:', error);
        alert('No se pudo cargar el historial.');
      } finally {
        setLoading(false);
      }
    };

    cargarHistorial();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Deseas eliminar esta traducción?');
    if (!confirmar) return;

    try {
      await eliminarTraduccion(id);
      setHistorial((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la traducción.');
    }
  };

  return (
<div className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl shadow-lg max-w-xl mx-auto text-center space-y-4 border border-white/20">
    <h2 className="text-2xl font-bold text-center text-cyan-300 mb-4 drop-shadow-md flex items-center justify-center gap-2">
      <FaHistory />
      Historial de Traducciones
    </h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : historial.length === 0 ? (
        <p className="text-center text-gray-600">No hay traducciones registradas.</p>
      ) : (
        historial.map((item) => (
          <div key={item.id} className="mb-4 border-b pb-2">
            <p><strong>Texto:</strong> {item.texto}</p>
            <p><strong>Fecha:</strong> {item.fecha}</p>
            {item.videoUrl && (
              <video controls width="300" className="mt-2 rounded">
                <source src={item.videoUrl} type="video/mp4" />
              </video>
            )}
            <button
              onClick={() => handleEliminar(item.id)}
              className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default History;

/*
import React, { useEffect, useState } from 'react';
import { obtenerHistorial, eliminarTraduccion } from '../services/api';

const History = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const res = await obtenerHistorial();
        setHistorial(res.data);
      } catch (error) {
        console.error('Error al obtener historial:', error);
        alert('No se pudo cargar el historial.');
      } finally {
        setLoading(false);
      }
    };

    cargarHistorial();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Deseas eliminar esta traducción?');
    if (!confirmar) return;

    try {
      await eliminarTraduccion(id);
      setHistorial((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la traducción.');
    }
  };

  return (
    <div className="mt-8 p-4 bg-white shadow rounded max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Historial de Traducciones</h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : historial.length === 0 ? (
        <p className="text-center text-gray-600">No hay traducciones registradas.</p>
      ) : (
        historial.map((item) => (
          <div key={item.id} className="mb-4 border-b pb-2">
            <p><strong>Texto:</strong> {item.texto}</p>
            <p><strong>Fecha:</strong> {item.fecha}</p>
            {item.videoUrl && (
              <video controls width="300" className="mt-2 rounded">
                <source src={item.videoUrl} type="video/mp4" />
              </video>
            )}
            <button
              onClick={() => handleEliminar(item.id)}
              className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default History;

*/