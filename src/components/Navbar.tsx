import { FaGithub, FaLinkedin } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 sm:px-10 py-5">
      <span className="text-2xl font-medium tracking-tight bg-gradient-to-r from-white via-[#AFA9EC] to-[#85B7EB] bg-clip-text text-transparent">
        Rutlink<span className="text-[#7F77DD]">.</span>
      </span>

      <div className="flex items-center gap-5">
        
         <a href="https://github.com/mkdev000/acortador-urls-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors"
        >
          <FaGithub size={21} />
        </a>
        
          <a href="https://www.linkedin.com/in/kevin-mecinas-jim%C3%A9nez-46860a429/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors"
        >
          <FaLinkedin size={21} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;