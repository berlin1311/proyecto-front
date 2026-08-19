"use client";

import { useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { Search, Package, Pencil, X, Loader2 } from "lucide-react";

type Producto = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  codigo?: string;
  categoria?: { nombre: string };
  imagen?: { url: string } | null;
};

type Categoria = {
  id: number;
  nombre: string;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

function urlImagen(producto: Producto) {
  if (!producto.imagen?.url) return null;
  const url = producto.imagen.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export default function ProductosClient({
  productos: productosIniciales,
  categorias,
}: {
  productos: Producto[];
  categorias: Categoria[];
}) {
  const { user } = useUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

  const [productos, setProductos] = useState(productosIniciales);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState<Producto | null>(null);
  const [formEdit, setFormEdit] = useState({ nombre: "", descripcion: "", precio: 0, stock: 0, codigo: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCategoria =
        categoriaActiva === "Todos" || p.categoria?.nombre === categoriaActiva;
      const coincideBusqueda =
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.codigo?.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [productos, categoriaActiva, busqueda]);

  function abrirEditar(producto: Producto) {
    setEditando(producto);
    setFormEdit({
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? "",
      precio: producto.precio,
      stock: producto.stock,
      codigo: producto.codigo ?? "",
    });
    setError("");
  }

  async function guardarEdicion(e: React.FormEvent) {
    e.preventDefault();
    if (!editando) return;

    setGuardando(true);
    setError("");

    try {
      const res = await fetch(`/api/productos/${editando.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdit),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No se pudo guardar");
        return;
      }

      setProductos((prev) =>
        prev.map((p) => (p.id === editando.id ? { ...p, ...formEdit } : p))
      );
      setEditando(null);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="w-full max-w-full relative">

      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Productos</h1>
        <p className="text-sm text-gray-500">{productos.length} productos disponibles</p>
      </div>

      {/* Buscador */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white"
        />
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setCategoriaActiva("Todos")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
            categoriaActiva === "Todos" ? "bg-pink-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.nombre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              categoriaActiva === cat.nombre ? "bg-pink-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {productosFiltrados.map((producto) => {
          const imagen = urlImagen(producto);
          return (
            <div
              key={producto.id}
              className="border rounded-2xl p-3 sm:p-4 bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow relative"
            >
              {role === "admin" && (
                <button
                  onClick={() => abrirEditar(producto)}
                  className="absolute top-2 right-2 bg-white shadow rounded-full p-1.5 text-gray-500 hover:text-pink-600 z-10"
                >
                  <Pencil size={14} />
                </button>
              )}

              <div className="w-full aspect-square rounded-xl bg-pink-50 flex items-center justify-center mb-2 overflow-hidden">
                {imagen ? (
                  <img src={imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                ) : (
                  <Package className="text-pink-300" size={32} />
                )}
              </div>

              {producto.categoria?.nombre && (
                <span className="text-[10px] sm:text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full w-fit mb-1.5">
                  {producto.categoria.nombre}
                </span>
              )}

              {producto.codigo && (
                <p className="text-[10px] text-gray-400 mb-0.5">Código: {producto.codigo}</p>
              )}

              <p className="font-semibold text-sm text-gray-800 leading-tight line-clamp-2">
                {producto.nombre}
              </p>
              {producto.descripcion && (
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{producto.descripcion}</p>
              )}

              <div className="flex items-end justify-between mt-2 pt-2 border-t">
                <div>
                  <p className="text-pink-600 font-bold text-sm sm:text-base">
                    ${producto.precio?.toLocaleString("es-CO")}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">Stock: {producto.stock}</p>
                </div>
              </div>
            </div>
          );
        })}

        {productosFiltrados.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-400 py-10">
            No se encontraron productos.
          </p>
        )}
      </div>

      {/* Modal de edición - solo admin */}
      {editando && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Editar producto</h2>
              <button onClick={() => setEditando(null)} className="text-gray-400">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={guardarEdicion} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre"
                value={formEdit.nombre}
                onChange={(e) => setFormEdit({ ...formEdit, nombre: e.target.value })}
                required
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={formEdit.descripcion}
                onChange={(e) => setFormEdit({ ...formEdit, descripcion: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                placeholder="Código (ej: PRD001)"
                value={formEdit.codigo}
                onChange={(e) => setFormEdit({ ...formEdit, codigo: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Precio"
                  value={formEdit.precio}
                  onChange={(e) => setFormEdit({ ...formEdit, precio: Number(e.target.value) })}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formEdit.stock}
                  onChange={(e) => setFormEdit({ ...formEdit, stock: Number(e.target.value) })}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>

              {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  className="flex-1 border rounded-lg py-2.5 text-sm font-semibold text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {guardando ? <Loader2 size={16} className="animate-spin" /> : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}