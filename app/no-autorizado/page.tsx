import Link from "next/link";

export default function NoAutorizadoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#fff9fc] via-[#f7e6f5] to-[#ead8f7] px-4 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Acceso no autorizado
      </h1>
      <p className="text-gray-600 max-w-md">
        No tienes permisos para ver esta sección. Si crees que esto es un
        error, contacta al administrador del sistema.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}