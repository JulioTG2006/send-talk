import { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import History from "./components/History";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300">
        
        {/* Header */}
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-center w-full">Traductor de Voz a Lenguaje de Señas</h1>

          {/* Botón de tema */}
          <button
            onClick={toggleTheme}
            className="absolute right-6 top-5 text-white text-xl"
            title="Cambiar tema"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        {/* Contenido */}
        <main className="p-6 max-w-4xl mx-auto space-y-10">
          <AudioRecorder />
          <History />
        </main>
      </div>
    </div>
  );
}

export default App;
