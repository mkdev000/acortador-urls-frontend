import { useEffect, useRef } from "react";

function FondoEstrellas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ajustarTamaño = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    ajustarTamaño();
    window.addEventListener("resize", ajustarTamaño);

    const estrellas = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radio: Math.random() * 1.5 + 0.4,
      fase: Math.random() * Math.PI * 2,
      velocidad: 0.02 + Math.random() * 0.03,
    }));

    let animacionId: number;

    const dibujar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const estrella of estrellas) {
        estrella.fase += estrella.velocidad;
        const opacidad = 0.3 + Math.sin(estrella.fase) * 0.35;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(opacidad, 0.05)})`;
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
        ctx.fill();
      }

      animacionId = requestAnimationFrame(dibujar);
    };

    dibujar();

    return () => {
      window.removeEventListener("resize", ajustarTamaño);
      cancelAnimationFrame(animacionId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-[#06060d]"
    />
  );
}

export default FondoEstrellas;