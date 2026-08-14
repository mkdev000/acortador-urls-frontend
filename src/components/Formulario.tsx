import { useState } from "react";

type FormularioProps = {
  onEnlaceCreado: () => void;
};

function Formulario({ onEnlaceCreado }: FormularioProps) {
  const [url, setUrl] = useState("");
  const [urlCorta, setUrlCorta] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:3000/api/enlaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlOriginal: url }),
      });

      const datos = await respuesta.json();

      setUrlCorta(datos.urlCorta);
      setUrl("");
      setCopiado(false);
      onEnlaceCreado();
    } catch (error) {
      console.error("Error al acortar la URL:", error);
    }
  };

  const handleCopiar = async () => {
    await navigator.clipboard.writeText(urlCorta);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="url"
          required
          placeholder="Pega aquí tu URL larga"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black transition"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Acortar
        </button>
      </form>

      {urlCorta && (
        <div className="flex items-center justify-center gap-3">
          <a href={urlCorta} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {urlCorta}
          </a>
          <button
            onClick={handleCopiar}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition"
          >
            {copiado ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Formulario;