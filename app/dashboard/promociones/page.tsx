"use client";

import { useState } from "react";
import { Tag, Search, Plus } from "lucide-react";

export default function PromocionesPage() {
  const [buscar, setBuscar] = useState("");

  return (
    <main className="p-6">

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Promociones
          </h1>

          <p className="text-gray-500 mt-1">
            Gestiona los descuentos y promociones de los productos
          </p>
        </div>

        <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-lg">
          <Plus size={20} />
          Nueva promoción
        </button>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Buscar promoción..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-pink-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">
                Promoción
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Descuento
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Producto
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>

            {/* Ejemplo temporal */}
            <tr className="border-t border-gray-100">

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Tag size={20} className="text-pink-500" />
                  </div>

                  <span className="font-medium">
                    Promoción especial
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 font-semibold text-pink-600">
                10%
              </td>

              <td className="px-6 py-4 text-gray-600">
                Producto de ejemplo
              </td>

              <td className="px-6 py-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Activa
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}