export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col items-center">

          <img
            src="/logoberlin.png"
            alt="Large System"
            className="w-12 h-12 object-contain"
          />

          <h2 className="mt-2 text-lg font-semibold">
            Large System
          </h2>

          <p className="mt-1 text-sm text-gray-400 text-center">
            Soluciones tecnológicas para empresas modernas.
          </p>

        </div>

        <div className="border-t border-gray-700 mt-5 pt-4">

          <p className="text-center text-xs text-gray-500">
            © 2026 Large System · Desarrollado para Distribuidora M.C.
          </p>

        </div>

      </div>
    </footer>
  );
}