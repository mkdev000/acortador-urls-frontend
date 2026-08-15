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
          className="flex-1 rounded-lg border border-white/15 bg-white/5 text-white placeholder:text-white/40 px-4 py-2 outline-none focus:border-white/40 transition"
        />
        <button
          type="submit"
          className="relative px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-[#7F77DD] to-[#185FA5] hover:shadow-[0_0_20px_rgba(55,138,221,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Acortar
        </button>
      </form>

      {urlCorta && (
        <div className="flex items-center justify-center gap-3">
          <a href={urlCorta} target="_blank" rel="noopener noreferrer" className="text-[#AFA9EC] underline">
            {urlCorta}
          </a>
          <button
            onClick={handleCopiar}
            className="text-sm border border-white/15 text-white/80 rounded-md px-3 py-1 hover:bg-white/10 transition"
          >
            {copiado ? "¡Copiado!" : "Copiar"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Formulario;