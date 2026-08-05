import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-[#fff9fc] via-[#f7e6f5] to-[#ead8f7]"
    >
      {/* Círculos decorativos */}
      <div className="absolute -top-32 -right-24 w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] rounded-full bg-pink-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 w-[180px] sm:w-[260px] md:w-[350px] h-[180px] sm:h-[260px] md:h-[350px] rounded-full bg-violet-300/20 blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 flex flex-col items-center gap-4 sm:gap-5 text-center">

        <p className="text-sm sm:text-base text-gray-600 font-medium">
          Bienvenido a
        </p>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-gray-900">
            Sistema de Gestión
          </span>
          <span className="block bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
            de Ventas
          </span>
        </h1>

        <p className="max-w-xs sm:max-w-lg md:max-w-xl text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
          Administra clientes, productos, ventas e inventario
          desde una plataforma moderna, rápida y diseñada para
          hacer crecer tu negocio.
        </p>

        <Link
          href="/login"
          className="mt-2 inline-block bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:scale-105 transition"
        >
          Iniciar sesión
        </Link>

      </div>
    </section>
  );
}