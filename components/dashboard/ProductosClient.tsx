"use client";

import { useState, useMemo } from "react";
import { Search, ShoppingCart, Plus, Minus, Trash2, X, Package } from "lucide-react";

type Producto = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: { nombre: string };
  imagen?: { url: string } | null;
};

type Categoria = {
  id: number;
  nombre: string;
};

type ItemCarrito = {
  producto: Producto;
  cantidad: number;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

function urlImagen(producto: Producto) {
  if (!producto.imagen?.url) return null;
  const url = producto.imagen.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export default function ProductosClient({
  productos,
  categorias,
}: {
  productos: Producto[];
  categorias: Categoria[];
}) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCategoria =
        categoriaActiva === "Todos" || p.categoria?.nombre === categoriaActiva;
      const coincideBusqueda = p.nombre
        ?.toLowerCase()
        .includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [productos, categoriaActiva, busqueda]);

  function agregarAlCarrito(producto: Producto) {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.producto.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: Math.min(i.cantidad + 1, producto.stock) }
            : i
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
    setCarritoAbierto(true);
  }

  function cambiarCantidad(id: number, delta: number) {
    setCarrito((prev) =>
      prev
        .map((i) =>
          i.producto.id === id
            ? { ...i, cantidad: Math.max(0, Math.min(i.cantidad + delta, i.producto.stock)) }
            : i
        )
        .filter((i) => i.cantidad > 0)
    );
  }

  function quitarDelCarrito(id: number) {
    setCarrito((prev) => prev.filter((i) => i.producto.id !== id));
  }

  const totalCarrito = carrito.reduce(
    (sum, i) => sum + i.producto.precio * i.cantidad,
    0
  );
  const cantidadItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <div className="w-full max-w-full relative">

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Productos</h1>
          <p className="text-sm text-gray-500">{productos.length} productos disponibles</p>
        </div>

        {/* Botón carrito - flotante en móvil */}
        <button
          onClick={() => setCarritoAbierto(true)}
          className="relative bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white p-3 rounded-full shadow-lg"
        >
          <ShoppingCart size={20} />
          {cantidadItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-pink-500">
              {cantidadItems}
            </span>
          )}
        </button>
      </div>

      {/* Buscador */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar producto..."
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
            categoriaActiva === "Todos"
              ? "bg-pink-600 text-white"
              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.nombre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              categoriaActiva === cat.nombre
                ? "bg-pink-600 text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
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
              className="border rounded-2xl p-3 sm:p-4 bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-full aspect-square rounded-xl bg-pink-50 flex items-center justify-center mb-2 overflow-hidden">
                {imagen ? (
                  <img
                    src={imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="text-pink-300" size={32} />
                )}
              </div>

              {producto.categoria?.nombre && (
                <span className="text-[10px] sm:text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full w-fit mb-1.5">
                  {producto.categoria.nombre}
                </span>
              )}

              <p className="font-semibold text-sm text-gray-800 leading-tight line-clamp-2">
                {producto.nombre}
              </p>
              {producto.descripcion && (
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                  {producto.descripcion}
                </p>
              )}

              <div className="flex items-end justify-between mt-2 pt-2 border-t">
                <div>
                  <p className="text-pink-600 font-bold text-sm sm:text-base">
                    ${producto.precio?.toLocaleString("es-CO")}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Stock: {producto.stock}
                  </p>
                </div>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  disabled={producto.stock <= 0}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white flex items-center justify-center shrink-0 disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
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

      {/* Overlay oscuro cuando el carrito está abierto */}
      {carritoAbierto && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setCarritoAbierto(false)}
        />
      )}

      {/* Panel del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-200 ${
          carritoAbierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart size={20} className="text-pink-600" />
            Carrito ({cantidadItems})
          </h2>
          <button onClick={() => setCarritoAbierto(false)} className="text-gray-400">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {carrito.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              El carrito está vacío. Toca "+" en un producto para agregarlo.
            </p>
          ) : (
            carrito.map((item) => (
              <div key={item.producto.id} className="flex items-center gap-3 border-b pb-3">
                <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center shrink-0 overflow-hidden">
                  {urlImagen(item.producto) ? (
                    <img
                      src={urlImagen(item.producto)!}
                      alt={item.producto.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="text-pink-300" size={18} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.producto.nombre}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${item.producto.precio.toLocaleString("es-CO")} c/u
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => cambiarCantidad(item.producto.id, -1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-500"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-5 text-center">{item.cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(item.producto.id, 1)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center text-gray-500"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => quitarDelCarrito(item.producto.id)}
                    className="text-red-400 ml-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Total</span>
              <span className="text-pink-600 font-bold text-lg">
                ${totalCarrito.toLocaleString("es-CO")}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-3 rounded-xl font-semibold">
              Confirmar venta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}