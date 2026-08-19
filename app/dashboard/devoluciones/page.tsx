"use client";

import { RotateCcw, Search, Plus } from "lucide-react";
import { useState } from "react";

export default function DevolucionesPage() {
  const [buscar, setBuscar] = useState("");

  return (
    <main className="p-6">

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Devoluciones
          </h1>

          <p className="text-gray-500 mt-1">
            Registra y consulta las devoluciones realizadas por los clientes
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600
          text-white px-5 py-3 rounded-lg transition"
        >
          <Plus size={20} />
          Nueva devolución
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
            placeholder="Buscar devolución..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="w-full border border-gray-200 rounded-lg
            pl-10 pr-4 py-3 outline-none
            focus:ring-2 focus:ring-pink-300"
          />

        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-pink-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">
                Pedido
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Motivo
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Cantidad
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>

            {/* Registro temporal */}
            <tr className="border-t border-gray-100">

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-pink-100
                    flex items-center justify-center">
                    <RotateCcw
                      size={20}
                      className="text-pink-500"
                    />
                  </div>

                  <span className="font-medium">
                    PED-1786592060449
                  </span>

                </div>
              </td>

              <td className="px-6 py-4 text-gray-600">
                Producto dañado
              </td>

              <td className="px-6 py-4 font-medium">
                2
              </td>

              <td className="px-6 py-4">
                <span
                  className="bg-yellow-100 text-yellow-700
                  px-3 py-1 rounded-full text-sm"
                >
                  Registrada
                </span>
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </main>
  );
}