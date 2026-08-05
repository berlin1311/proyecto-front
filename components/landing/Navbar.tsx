export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">

      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-4">

          <img
            src="/logodistribuidora.png"
            alt="Logo"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Distribuidora M.C
            </h1>

            <p className="text-sm text-gray-500">
              Sistema de Gestión de Ventas
            </p>
          </div>

        </div>

        {/* Menú */}
        <nav className="flex">

          <a
            href="#inicio"
            className=" mr-10 font-medium text-gray-700 hover:text-pink-600 transition"
          >
            Inicio
          </a>
   

          <a
            href="#contacto"
            className="font-medium text-gray-700 hover:text-pink-600 transition"
          >
            Contacto
          </a>

        </nav>

      </div>

    </header>
  );
}