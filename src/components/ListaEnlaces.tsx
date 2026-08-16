import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";

type Enlace = {
  id: number;
  url_original: string;
  codigo_corto: string;
  clics: number;
  fecha_creacion: string;
};

type ListaEnlacesProps = {
  recargar: number;
};

function ListaEnlaces({ recargar }: ListaEnlacesProps) {
  const [enlaces, setEnlaces] = useState<Enlace[]>([]);
  const [ocultos, setOcultos] = useState<number[]>([]);

  useEffect(() => {
    const cargarEnlaces = async () => {
      try {
        const respuesta = await fetch("https://rutlink-backend.onrender.com/api/enlaces");
        const datos = await respuesta.json();
        setEnlaces(datos);
      } catch (error) {
        console.error("Error al cargar los enlaces:", error);
      }
    };

    cargarEnlaces();
  }, [recargar]);

  const ocultarEnlace = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOcultos((prev) => [...prev, id]);
  };

  const enlacesVisibles = enlaces.filter((enlace) => !ocultos.includes(enlace.id));

  if (enlacesVisibles.length === 0) {
    return <p className="text-white/40 text-center">Todavía no has creado ningún enlace.</p>;
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-2">
      {enlacesVisibles.map((enlace) => (

        <a key={enlace.id}
          href={`https://rutlink-backend.onrender.com/${enlace.codigo_corto}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
        >
          <button
            onClick={(e) => ocultarEnlace(enlace.id, e)}
            className="absolute -top-2.5 -right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-[#06060d] border border-white/15 text-[#AFA9EC] hover:text-white hover:border-[#7F77DD] hover:bg-[#7F77DD]/20 transition-all opacity-0 group-hover:opacity-100"
          >
            <HiXMark size={13} />
          </button>

          <div className="min-w-0">
            <p className="text-[#AFA9EC] text-sm font-medium">
              rutlink.io/{enlace.codigo_corto}
            </p>
            <p className="text-white/40 text-xs mt-0.5 truncate max-w-xs">
              {enlace.url_original}
            </p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-white text-base font-medium">{enlace.clics}</p>
            <p className="text-white/35 text-[10px]">clics</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ListaEnlaces;