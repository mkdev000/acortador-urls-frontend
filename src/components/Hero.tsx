function Hero() {
  return (
    <div className="text-center px-4 pt-16 pb-4 max-w-xl">
      <h1 className="text-6xl sm:text-8xl font-semibold tracking-tight mb-5 bg-gradient-to-r from-white via-[#AFA9EC] to-[#85B7EB] bg-clip-text text-transparent">
        Rutlink<span className="text-[#7F77DD]">.</span>
      </h1>

      <p className="text-white/55 text-sm sm:text-base">
        Pega una URL larga, obtén un enlace corto al instante y sigue cada clic en tiempo real.
      </p>
    </div>
  );
}

export default Hero;