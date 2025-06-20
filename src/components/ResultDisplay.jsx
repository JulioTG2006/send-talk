import React from 'react';

const ResultDisplay = ({ resultado }) => {
  if (!resultado) return null;

  return (
    <div className="mt-4 bg-green-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Resultado de la traducción</h3>

      {/* Si tu backend devuelve una URL de video */}
      {resultado.videoUrl && (
        <video controls className="mx-auto rounded" width="320">
          <source src={resultado.videoUrl} type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      )}

      {/* Si el backend devuelve texto (por ejemplo la transcripción) */}
      {resultado.texto && (
        <p className="mt-2 text-gray-800">{resultado.texto}</p>
      )}
    </div>
  );
};

export default ResultDisplay;
