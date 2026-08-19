"use client";

import { useState, useMemo, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Plus, MapPin, Phone, CheckCircle2, Circle, X, Loader2, Map } from "lucide-react";

type Ruta = {
  id: number;
  nombre: string;
  descripcion?: string;
  dia: string;
  barrio: string;
};

type Cliente = {
  id: number;
  nombre_tienda: string;
  nombre: string;
  telefono: string;
  direccion: string;
  barrio: string;
};

const DIAS = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", ];

const DIA_HOY = () => {
  const idx = new Date().getDay(); // 0=domingo, 1=lunes...
  const mapa = [, "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  return mapa[idx];
};

export default function RutasClient({
  rutas: rutasIniciales,
  clientes,
}: {
  rutas: Ruta[];
  clientes: Cliente[];
}) {
  const { user } = useUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

  const [rutas, setRutas] = useState(rutasIniciales);
  const [diaSeleccionado, setDiaSeleccionado] = useState(DIA_HOY());
  const [visitadas, setVisitadas] = useState<number[]>([]);

  // Cargar visitas guardadas localmente para hoy
  useEffect(() => {
    const clave = `visitas-${new Date().toDateString()}`;
    const guardadas = localStorage.getItem(clave);
    if (guardadas) setVisitadas(JSON.parse(guardadas));
  }, []);

  function marcarVisitada(clienteId: number) {
    setVisitadas((prev) => {
      const nuevo = prev.includes(clienteId)
        ? prev.filter((id) => id !== clienteId)
        : [...prev, clienteId];
      const clave = `visitas-${new Date().toDateString()}`;
      localStorage.setItem(clave, JSON.stringify(nuevo));
      return nuevo;
    });
  }

  // Rutas del día seleccionado
  const rutasDelDia = rutas.filter((r) => r.dia === diaSeleccionado);
  const barriosDelDia = rutasDelDia.map((r) => r.barrio.toLowerCase());

  // Clientes que caen en esos barrios (agrupación automática)
  const clientesDeLaRuta = clientes.filter((c) =>
    barriosDelDia.includes(c.barrio?.toLowerCase())
  );

  const visitadosCount = clientesDeLaRuta.filter((c) => visitadas.includes(c.id)).length;

  // --- Formulario admin: crear ruta ---
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", descripcion: "", dia: "lunes", barrio: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  async function crearRuta(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const res = await fetch("/api/rutas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "No se pudo crear"); return; }

      setRutas((prev) => [...prev, data.ruta]);
      setForm({ nombre: "", descripcion: "", dia: "lunes", barrio: "" });
      setMostrarForm(false);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="w-full max-w-full">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Rutas</h1>
          <p className="text-sm text-gray-500">
            {role === "admin"
              ? "Configura los barrios y días de cada ruta"
              : "Tiendas que te tocan visitar hoy"}
          </p>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setMostrarForm(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm shrink-0"
          >
            <Plus size={18} />
            Nueva Ruta
          </button>
        )}
      </div>

      {/* Selector de día */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
        {DIAS.map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSeleccionado(dia)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap transition ${
              diaSeleccionado === dia
                ? "bg-pink-600 text-white"
                : dia === DIA_HOY()
                ? "border-2 border-pink-400 text-pink-600"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {dia} {dia === DIA_HOY() && "· hoy"}
          </button>
        ))}
      </div>

      {/* Progreso (solo vendedor) */}
      {role === "vendedor" && clientesDeLaRuta.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md border p-4 mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">Progreso de la ruta</span>
          <span className="font-bold text-pink-600">
            {visitadosCount} / {clientesDeLaRuta.length} tiendas visitadas
          </span>
        </div>
      )}

      {/* Rutas configuradas ese día (contexto) */}
      {rutasDelDia.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {rutasDelDia.map((r) => (
            <span key={r.id} className="text-xs bg-pink-50 text-pink-700 px-3 py-1 rounded-full flex items-center gap-1">
              <Map size={12} /> {r.nombre} · {r.barrio}
            </span>
          ))}
        </div>
      )}

      {/* Lista de tiendas */}
      {clientesDeLaRuta.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border p-10 text-center">
          <p className="text-gray-400 text-sm">
            No hay tiendas asignadas para {diaSeleccionado}
            {rutasDelDia.length === 0 && role === "admin" && " — crea una ruta para ese día."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientesDeLaRuta.map((c) => {
            const visitada = visitadas.includes(c.id);
            return (
              <div
                key={c.id}
                className={`bg-white rounded-2xl shadow-md border p-4 transition ${
                  visitada ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{c.nombre_tienda}</p>
                    <p className="text-xs text-gray-500">{c.nombre}</p>
                  </div>
                  {role === "vendedor" && (
                    <button onClick={() => marcarVisitada(c.id)}>
                      {visitada ? (
                        <CheckCircle2 size={22} className="text-green-500" />
                      ) : (
                        <Circle size={22} className="text-gray-300" />
                      )}
                    </button>
                  )}
                </div>

                <div className="space-y-1 text-xs text-gray-500">
                  {c.telefono && (
                    <p className="flex items-center gap-1.5"><Phone size={12} /> {c.telefono}</p>
                  )}
                  <p className="flex items-center gap-1.5">
                    <MapPin size={12} /> {c.direccion} — {c.barrio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal crear ruta - admin */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Nueva ruta</h2>
              <button onClick={() => setMostrarForm(false)} className="text-gray-400">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={crearRuta} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre de la ruta (ej: Ruta Centro)"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                placeholder="Descripción (opcional)"
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <select
                value={form.dia}
                onChange={(e) => setForm({ ...form, dia: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full bg-white capitalize"
              >
                {DIAS.map((d) => (
                  <option key={d} value={d} className="capitalize">{d}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Barrio (debe coincidir con el de Clientes)"
                value={form.barrio}
                onChange={(e) => setForm({ ...form, barrio: e.target.value })}
                required
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />

              {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>}

              <button
                type="submit"
                disabled={guardando}
                className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {guardando ? <Loader2 size={16} className="animate-spin" /> : "Crear ruta"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}