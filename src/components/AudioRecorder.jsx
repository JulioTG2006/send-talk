import React, { useState, useRef } from 'react';
import { subirAudio } from '../services/api';
import ResultDisplay from './ResultDisplay';
import { obtenerTraduccion } from '../services/api';
import { FaMicrophoneAlt } from 'react-icons/fa'; 
import { FaPaperPlane } from 'react-icons/fa'; 




const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);



  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audio = new Blob(audioChunks.current, { type: 'audio/wav' });
      setAudioBlob(audio);
      audioChunks.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    setAudioBlob(file); // Lo tratamos igual que un blob grabado
  }
};
  const handleSend = async () => {
    if (!audioBlob) return;
    const formData = new FormData();
    formData.append('audio', audioBlob, 'grabacion.wav');

    setCargando(true);

    try {
      const res = await subirAudio(formData);
      const id = res.data.id;

      const respuesta = await obtenerTraduccion(id);
      setResultado(respuesta.data);
    } catch (error) {
      console.error(error);
      alert("Error al enviar o recibir datos del backend.");
    } finally {
      setCargando(false); 
    }
  };

    const cancelarAudio = () => {
    setAudioBlob(null);
    setSelectedFile(null);
    };
  return (
<div className="p-6 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl shadow-lg max-w-xl mx-auto text-center space-y-4 border border-white/20">
<h2 className="text-2xl font-bold text-cyan-300 drop-shadow-md flex items-center justify-center gap-2">
  <FaMicrophoneAlt />
  Grabador de voz
</h2>
      <div className="mt-4">
  <label className="block mb-1 font-medium">O selecciona un archivo de audio:</label>
  <input
    type="file"
    accept="audio/*"
    onChange={handleFileChange}
    className="border rounded p-1"
  />
    {selectedFile && (
    <p className="mt-1 text-sm text-gray-600">Archivo: {selectedFile.name}</p>
  )}
</div>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`text-white bg-gradient-to-r from-blue-600 to-cyan-400 hover:shadow-xl font-semibold text-lg px-6 py-2 rounded-full transition-all duration-300 ${
          recording ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {recording ? 'Detener' : 'Grabar'}
      </button>

    {audioBlob && (
    <>
        <audio controls src={URL.createObjectURL(audioBlob)} className="w-full mt-2" />
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
        >
          <FaPaperPlane />
          Enviar
          {cargando && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-300"></div>
            </div>
          )}


        </button>

        <button
            onClick={cancelarAudio}
            className="text-white bg-gradient-to-r from-blue-600 to-cyan-400 hover:shadow-xl font-semibold text-lg px-6 py-2 rounded-full transition-all duration-300"
        >
            Cancelar / Repetir
        </button>
        </div>
    </>
    )}

      <ResultDisplay resultado={resultado} />
    </div>
  );
};

export default AudioRecorder;
