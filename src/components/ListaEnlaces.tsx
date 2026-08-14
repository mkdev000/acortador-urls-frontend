import { useEffect, useState } from "react";

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

  useEffect(() => {
    const cargarEnlaces = async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/api/enlaces");
        const datos = await respuesta.json();
        setEnlaces(datos);
      } catch (error) {
        console.error("Error al cargar los enlaces:", error);
      }
    };

    cargarEnlaces();
  }, [recargar]);

  if (enlaces.length === 0) {
    return <p className="text-gray-500 text-center">Todavía no has creado ningún enlace.</p>;
  }

  return (
    <table className="w-full max-w-2xl border-collapse">
      <thead>
        <tr className="border-b border-gray-300 text-left text-sm text-gray-500">
          <th className="py-2">URL original</th>
          <th className="py-2">Enlace corto</th>
          <th className="py-2">Clics</th>
        </tr>
      </thead>
      <tbody>
        {enlaces.map((enlace) => (
          <tr key={enlace.id} className="border-b border-gray-100">
            <td className="py-2 truncate max-w-xs">{enlace.url_original}</td>
            <td className="py-2">
              
                <a href={`http://localhost:3000/${enlace.codigo_corto}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {enlace.codigo_corto}
              </a>
            </td>
            <td className="py-2">{enlace.clics}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaEnlaces;