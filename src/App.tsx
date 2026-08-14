import { useState } from "react";
import Formulario from "./components/Formulario";
import ListaEnlaces from "./components/ListaEnlaces";

function App() {
  const [recargar, setRecargar] = useState(0);

  const handleEnlaceCreado = () => {
    setRecargar((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-8 px-4 py-12">
      <h1 className="text-3xl font-bold">Acortador de URLs</h1>
      <Formulario onEnlaceCreado={handleEnlaceCreado} />
      <ListaEnlaces recargar={recargar} />
    </div>
  );
}

export default App;