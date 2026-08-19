"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, MapPin, Clock } from "lucide-react";

type Pedido = {
  id: number;
  NombredelCliente: string;
  total: number;
  estadoPedido: string;
  createdAt: string;
};

function esHoy(fecha: string) {
  const d = new Date(fecha);
  const hoy = new Date();
  return (
    d.getDate() === hoy.getDate() &&
    d.getMonth() === hoy.getMonth() &&
    d.getFullYear() === hoy.getFullYear()
  );
}

export default function VendedorDashboard() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data.pedidos ?? []))
      .finally(() => setCargando(false));
  }, []);

  const pedidosHoy = pedidos.filter((p) => esHoy(p.createdAt));
  const totalHoy = pedidosHoy.reduce((sum, p) => sum + (p.total ?? 0), 0);
  const pendientesHoy = pedidosHoy.filter((p) => p.estadoPedido === "pendiente").length;

  return (
    <div>
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-md p-5 border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Pedidos de hoy</p>
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
              <ShoppingCart size={18} className="text-pink-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {cargando ? "..." : pedidosHoy.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total vendido hoy</p>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign size={18} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {cargando ? "..." : `$${totalHoy.toLocaleString("es-CO")}`}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 border">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Pendientes por procesar</p>
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock size={18} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {cargando ? "..." : pendientesHoy}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Ruta de hoy - placeholder hasta construir el módulo de Rutas */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MapPin size={18} className="text-pink-600" />
                Tu ruta de hoy
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Tiendas asignadas para visitar
              </p>
            </div>
          </div>

          <div className="h-40 rounded-2xl border-2 border-dashed border-pink-200 flex items-center justify-center">
            <p className="text-gray-400 text-sm text-center px-4">
              Aquí verás las tiendas de tu ruta y podrás marcarlas como visitadas
              (disponible cuando construyamos el módulo de Rutas)
            </p>
          </div>
        </div>

        {/* Últimos pedidos tomados */}
        <div className="bg-white rounded-2xl shadow-md border p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Tus últimos pedidos</h2>

          {cargando ? (
            <p className="text-sm text-gray-400">Cargando...</p>
          ) : pedidos.length === 0 ? (
            <p className="text-sm text-gray-400">Todavía no has tomado pedidos.</p>
          ) : (
            <div className="space-y-3">
              {pedidos.slice(0, 5).map((p) => (
                <div key={p.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.NombredelCliente}</p>
                    <p className="text-xs text-gray-500 capitalize">{p.estadoPedido}</p>
                  </div>
                  <span className="text-sm font-bold text-pink-600">
                    ${p.total?.toLocaleString("es-CO")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}