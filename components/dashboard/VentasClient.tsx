"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import jsPDF from "jspdf";
import { Plus, Trash2, Search, Loader2, CheckCircle2, X, FileDown } from "lucide-react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  codigo?: string;
  stock: number;
};

type ItemPedido = {
  producto: Producto;
  cantidad: number;
};

type ItemGuardado = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

type Pedido = {
  id: number;
  NumerodePedido: string;
  NombredelCliente: string;
  direccion?: string;
  total: number;
  estadoPedido: string;
  items: ItemGuardado[];
  createdAt: string;
};

const ESTADOS = ["pendiente", "proceso", "enviada", "entregada", "cancelada"];

const ESTADO_COLOR: Record<string, string> = {
  pendiente: "text-yellow-700 bg-yellow-50 border-yellow-200",
  proceso: "text-blue-700 bg-blue-50 border-blue-200",
  enviada: "text-purple-700 bg-purple-50 border-purple-200",
  entregada: "text-green-700 bg-green-50 border-green-200",
  cancelada: "text-red-700 bg-red-50 border-red-200",
};

export default function VentasClient({ productos }: { productos: Producto[] }) {
  const { user } = useUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [busquedaTabla, setBusquedaTabla] = useState("");
  const [actualizandoId, setActualizandoId] = useState<number | null>(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreTienda, setNombreTienda] = useState("");
  const [direccion, setDireccion] = useState("");
  const [buscarCodigo, setBuscarCodigo] = useState("");
  const [items, setItems] = useState<ItemPedido[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState<string | null>(null);

  async function cargarPedidos() {
    setCargandoPedidos(true);
    try {
      const res = await fetch("/api/pedidos");
      const data = await res.json();
      setPedidos(data.pedidos ?? []);
    } finally {
      setCargandoPedidos(false);
    }
  }

  useEffect(() => {
    cargarPedidos();
  }, []);

  const productoEncontrado = useMemo(() => {
    if (!buscarCodigo) return null;
    return productos.find(
      (p) =>
        p.codigo?.toLowerCase() === buscarCodigo.toLowerCase() ||
        p.nombre.toLowerCase().includes(buscarCodigo.toLowerCase())
    );
  }, [buscarCodigo, productos]);

  function agregarItem() {
    if (!productoEncontrado) return;
    setItems((prev) => {
      const existe = prev.find((i) => i.producto.id === productoEncontrado.id);
      if (existe) {
        return prev.map((i) =>
          i.producto.id === productoEncontrado.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { producto: productoEncontrado, cantidad: 1 }];
    });
    setBuscarCodigo("");
  }

  function cambiarCantidad(id: number, cantidad: number) {
    setItems((prev) =>
      prev.map((i) => (i.producto.id === id ? { ...i, cantidad: Math.max(1, cantidad) } : i))
    );
  }

  function quitarItem(id: number) {
    setItems((prev) => prev.filter((i) => i.producto.id !== id));
  }

  const totalPedido = items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);

  function resetFormulario() {
    setNombreTienda("");
    setDireccion("");
    setBuscarCodigo("");
    setItems([]);
    setError("");
  }

  async function guardarPedido() {
    setError("");
    if (!nombreTienda.trim()) { setError("Escribe el nombre de la tienda"); return; }
    if (items.length === 0) { setError("Agrega al menos un producto"); return; }

    setGuardando(true);
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreCliente: nombreTienda,
          direccion,
          total: totalPedido,
          items: items.map((i) => ({
            id: i.producto.id,
            nombre: i.producto.nombre,
            precio: i.producto.precio,
            cantidad: i.cantidad,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "No se pudo guardar el pedido"); return; }

      setExito(data.numeroPedido);
      resetFormulario();
      cargarPedidos();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  }

  function generarFacturaPDF(pedido: Pedido) {
    const doc = new jsPDF();
    const fecha = new Date(pedido.createdAt).toLocaleDateString("es-CO", {
      day: "numeric", month: "long", year: "numeric",
    });

    doc.setFontSize(18);
    doc.setTextColor(219, 39, 119);
    doc.text("Distribuidora M.C", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Sistema de Gestión de Ventas", 14, 26);

    doc.setDrawColor(230);
    doc.line(14, 30, 196, 30);

    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text(`Factura N°: ${pedido.NumerodePedido}`, 14, 40);
    doc.text(`Fecha del pedido: ${fecha}`, 14, 46);
    doc.text(`Cliente: ${pedido.NombredelCliente}`, 14, 56);
    if (pedido.direccion) doc.text(`Dirección: ${pedido.direccion}`, 14, 62);

    doc.setFontSize(12);
    doc.setTextColor(147, 51, 234);
    doc.text("PAGO CONTRA ENTREGA", 130, 46);

    let y = 76;
    doc.setFillColor(253, 242, 248);
    doc.rect(14, y - 6, 182, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(219, 39, 119);
    doc.text("Producto", 16, y);
    doc.text("Cant.", 130, y);
    doc.text("Precio", 150, y);
    doc.text("Subtotal", 175, y);

    y += 8;
    doc.setTextColor(30);
    (pedido.items ?? []).forEach((item) => {
      doc.text(item.nombre.slice(0, 45), 16, y);
      doc.text(String(item.cantidad), 132, y);
      doc.text(`$${item.precio.toLocaleString("es-CO")}`, 150, y);
      doc.text(`$${(item.precio * item.cantidad).toLocaleString("es-CO")}`, 175, y);
      y += 7;
    });

    doc.setDrawColor(230);
    doc.line(14, y + 2, 196, y + 2);

    doc.setFontSize(13);
    doc.setTextColor(219, 39, 119);
    doc.text(`Total a cobrar: $${pedido.total.toLocaleString("es-CO")}`, 120, y + 12);

    doc.save(`Factura-${pedido.NumerodePedido}.pdf`);
  }

  async function cambiarEstado(pedido: Pedido, nuevoEstado: string) {
    setActualizandoId(pedido.id);
    try {
      const res = await fetch(`/api/pedidos/${pedido.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estadoPedido: nuevoEstado }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "No se pudo actualizar el estado");
        return;
      }

      setPedidos((prev) =>
        prev.map((p) => (p.id === pedido.id ? { ...p, estadoPedido: nuevoEstado } : p))
      );

      // Al pasar a "enviada" generamos la factura automáticamente
      if (nuevoEstado === "enviada") {
        generarFacturaPDF({ ...pedido, estadoPedido: nuevoEstado });
      }
    } finally {
      setActualizandoId(null);
    }
  }

  const pedidosFiltrados = pedidos.filter((p) =>
    p.NombredelCliente?.toLowerCase().includes(busquedaTabla.toLowerCase())
  );

  return (
    <div className="w-full max-w-full">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Ventas</h1>
          <p className="text-sm text-gray-500">
            {role === "admin" ? "Administra todos los pedidos" : "Registra los pedidos que tomas en cada tienda"}
          </p>
        </div>

        {role === "vendedor" && (
          <button
            onClick={() => { setMostrarFormulario(true); setExito(null); }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm shrink-0"
          >
            <Plus size={18} />
            Nueva Venta
          </button>
        )}
      </div>

      {/* Modal Nueva Venta */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            {exito ? (
              <div className="text-center py-6">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 text-lg mb-1">¡Pedido registrado!</h3>
                <p className="text-sm text-gray-500 mb-4">Pedido {exito} guardado con estado "pendiente".</p>
                <button
                  onClick={() => { setMostrarFormulario(false); setExito(null); }}
                  className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-2.5 rounded-lg font-semibold text-sm"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800 text-lg">Nueva Venta</h2>
                  <button onClick={() => { setMostrarFormulario(false); resetFormulario(); }} className="text-gray-400">
                    <X size={22} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <input type="text" placeholder="Nombre de la tienda" value={nombreTienda}
                    onChange={(e) => setNombreTienda(e.target.value)}
                    className="border rounded-lg px-3 py-2.5 text-sm w-full" />
                  <input type="text" placeholder="Dirección (opcional)" value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="border rounded-lg px-3 py-2.5 text-sm w-full" />
                </div>

                <div className="relative mb-2">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Código o nombre del producto..." value={buscarCodigo}
                    onChange={(e) => setBuscarCodigo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && agregarItem()}
                    className="border rounded-lg pl-9 pr-3 py-2.5 text-sm w-full" />
                </div>

                {productoEncontrado && (
                  <div className="flex items-center justify-between bg-pink-50 rounded-lg px-3 py-2 mb-4 text-sm">
                    <span>{productoEncontrado.nombre} — ${productoEncontrado.precio.toLocaleString("es-CO")}</span>
                    <button onClick={agregarItem} className="bg-pink-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                      Agregar
                    </button>
                  </div>
                )}

                <div className="border rounded-lg overflow-hidden mb-4">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-6">
                      Todavía no has agregado productos a este pedido.
                    </p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-2 font-medium text-gray-500">Producto</th>
                          <th className="text-center p-2 font-medium text-gray-500 w-20">Cant.</th>
                          <th className="text-right p-2 font-medium text-gray-500 w-24">Subtotal</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((i) => (
                          <tr key={i.producto.id} className="border-t">
                            <td className="p-2">{i.producto.nombre}</td>
                            <td className="p-2 text-center">
                              <input type="number" min={1} value={i.cantidad}
                                onChange={(e) => cambiarCantidad(i.producto.id, Number(e.target.value))}
                                className="w-14 border rounded px-1 py-0.5 text-center" />
                            </td>
                            <td className="p-2 text-right font-medium">
                              ${(i.producto.precio * i.cantidad).toLocaleString("es-CO")}
                            </td>
                            <td className="p-2 text-center">
                              <button onClick={() => quitarItem(i.producto.id)} className="text-red-400">
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="flex items-center justify-between bg-pink-50 rounded-lg px-4 py-3 mb-4">
                  <span className="text-sm text-gray-600">Total del pedido</span>
                  <span className="font-bold text-pink-600 text-lg">${totalPedido.toLocaleString("es-CO")}</span>
                </div>

                {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>}

                <button onClick={guardarPedido} disabled={guardando}
                  className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                  {guardando ? <Loader2 size={18} className="animate-spin" /> : "Guardar pedido"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-4">
        <input type="text" placeholder="Buscar venta por tienda..." value={busquedaTabla}
          onChange={(e) => setBusquedaTabla(e.target.value)}
          className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-pink-50">
            <tr>
              <th className="text-left p-3 sm:p-4">Tienda</th>
              <th className="text-left p-3 sm:p-4">Pedido</th>
              <th className="text-left p-3 sm:p-4">Total</th>
              <th className="text-left p-3 sm:p-4">Estado</th>
              {role === "admin" && <th className="text-left p-3 sm:p-4">Factura</th>}
            </tr>
          </thead>
          <tbody>
            {cargandoPedidos ? (
              <tr><td colSpan={5} className="p-6 text-center text-gray-400">Cargando...</td></tr>
            ) : pedidosFiltrados.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-gray-400">No hay pedidos todavía.</td></tr>
            ) : (
              pedidosFiltrados.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3 sm:p-4">{p.NombredelCliente}</td>
                  <td className="p-3 sm:p-4 text-gray-500">{p.NumerodePedido}</td>
                  <td className="p-3 sm:p-4 font-medium">${p.total?.toLocaleString("es-CO")}</td>
                  <td className="p-3 sm:p-4">
                    {role === "admin" ? (
                      <select
                        value={p.estadoPedido}
                        disabled={actualizandoId === p.id}
                        onChange={(e) => cambiarEstado(p, e.target.value)}
                        className={`text-xs font-medium capitalize rounded-full border px-2.5 py-1 ${ESTADO_COLOR[p.estadoPedido] ?? ""}`}
                      >
                        {ESTADOS.map((estado) => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${ESTADO_COLOR[p.estadoPedido] ?? ""}`}>
                        {p.estadoPedido}
                      </span>
                    )}
                  </td>
                  {role === "admin" && (
                    <td className="p-3 sm:p-4">
                      <button
                        onClick={() => generarFacturaPDF(p)}
                        title="Descargar factura"
                        className="flex items-center gap-1 text-pink-600 hover:text-pink-700 text-xs font-medium"
                      >
                        <FileDown size={14} /> PDF
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}