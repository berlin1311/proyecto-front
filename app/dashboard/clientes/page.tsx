"use client";

import { useState } from "react";
import { UserPlus, Search, MapPin, Phone, Store, Pencil, Trash2 } from "lucide-react";

type Cliente = {
  id: number;
  nombre_tienda: string;
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
};

// Datos de prueba (después se conecta a Strapi)
const clientesIniciales: Cliente[] = [
  { id: 1, nombre_tienda: "Tienda la Esperanza", nombre: "María Gómez", telefono: "300 555 1234", direccion: "Cra 5 # 10-20", ciudad: "Valledupar" },
  { id: 2, nombre_tienda: "Tienda El Sol", nombre: "Carlos Pérez", telefono: "301 555 5678", direccion: "Calle 12 # 8-15", ciudad: "Valledupar" },
  { id: 3, nombre_tienda: "Supermercado El Rebajón", nombre: "Ana Torres", telefono: "302 555 9012", direccion: "Av. Principal # 3-40", ciudad: "Valledupar" },
];

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);

  const [form, setForm] = useState({
    nombre_tienda: "",
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
  });

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombre_tienda.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  function abrirNuevo() {
    setEditando(null);
    setForm({ nombre_tienda: "", nombre: "", telefono: "", direccion: "", ciudad: "" });
    setMostrarForm(true);
  }

  function abrirEditar(cliente: Cliente) {
    setEditando(cliente);
    setForm({
      nombre_tienda: cliente.nombre_tienda,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      ciudad: cliente.ciudad,
    });
    setMostrarForm(true);
  }

  function guardar(e: React.FormEvent) {
    e.preventDefault();

    if (editando) {
      setClientes(
        clientes.map((c) => (c.id === editando.id ? { ...editando, ...form } : c))
      );
    } else {
      setClientes([...clientes, { id: Date.now(), ...form }]);
    }

    setMostrarForm(false);
  }

  function eliminar(id: number) {
    if (confirm("¿Eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  }

  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-sm sm:text-base text-gray-500">
            Registra y administra tus clientes.
          </p>
        </div>

        <button
          onClick={abrirNuevo}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm shrink-0"
        >
          <UserPlus size={18} />
          Nuevo cliente
        </button>
      </div>

      {/* Buscador */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por tienda o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white"
        />
      </div>

      {/* Formulario (modal simple) */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-bold text-gray-800 mb-4">
              {editando ? "Editar cliente" : "Nuevo cliente"}
            </h2>

            <form onSubmit={guardar} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre de la tienda"
                value={form.nombre_tienda}
                onChange={(e) => setForm({ ...form, nombre_tienda: e.target.value })}
                required
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                required
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={form.ciudad}
                onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMostrarForm(false)}
                  className="flex-1 border rounded-lg py-2.5 text-sm font-semibold text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-lg py-2.5 text-sm font-semibold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de clientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientesFiltrados.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-md border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                  <Store size={18} className="text-pink-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{c.nombre_tienda}</p>
                  <p className="text-xs text-gray-500 truncate">{c.nombre}</p>
                </div>
              </div>

              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => abrirEditar(c)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => eliminar(c.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-gray-500">
              {c.telefono && (
                <p className="flex items-center gap-1.5">
                  <Phone size={12} /> {c.telefono}
                </p>
              )}
              <p className="flex items-center gap-1.5">
                <MapPin size={12} /> {c.direccion}
                {c.ciudad && `, ${c.ciudad}`}
              </p>
            </div>
          </div>
        ))}

        {clientesFiltrados.length === 0 && (
          <p className="text-sm text-gray-400 col-span-full text-center py-8">
            No se encontraron clientes.
          </p>
        )}
      </div>
    </div>
  );
}