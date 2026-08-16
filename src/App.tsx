import { useState } from "react";
import Formulario from "./components/Formulario";
import ListaEnlaces from "./components/ListaEnlaces";
import FondoEstrellas from "./components/FondoEstrellas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [recargar, setRecargar] = useState(0);

  const handleEnlaceCreado = () => {
    setRecargar((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-4 pb-12">
      <FondoEstrellas />
      <Navbar />
      <Hero />
      <Formulario onEnlaceCreado={handleEnlaceCreado} />
      <ListaEnlaces recargar={recargar} />
      
        <a href="https://github.com/mkdev000"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 left-4 text-[#7F77DD]/60 hover:text-[#7F77DD] text-xs transition-colors"
>
  Creado por Kevin Mecinas.
</a>
    </div>
  );
}

export default App;