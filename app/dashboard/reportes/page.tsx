export default function ReportesPage() {
  return (
    <main className="p-6">
      
      {/* Encabezado */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Reportes
        </h1>

        <p className="text-gray-500 mt-1">
          Consulta y analiza el comportamiento de las ventas
        </p>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Ventas del día */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Ventas del día
          </p>

          <h2 className="text-2xl font-bold mt-2">
            $0
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            0 ventas realizadas
          </p>
        </div>

        {/* Ventas del mes */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Ventas del mes
          </p>

          <h2 className="text-2xl font-bold mt-2">
            $0
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Este mes
          </p>
        </div>

        {/* Productos vendidos */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Productos vendidos
          </p>

          <h2 className="text-2xl font-bold mt-2">
            0
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Productos registrados en ventas
          </p>
        </div>

        {/* Clientes atendidos */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Clientes atendidos
          </p>

          <h2 className="text-2xl font-bold mt-2">
            0
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Clientes con compras
          </p>
        </div>

      </div>
      {/* Filtros */}
<div className="bg-white border rounded-xl p-5 shadow-sm mt-6">

  <div className="mb-4">
    <h2 className="text-lg font-semibold">
      Filtros
    </h2>

    <p className="text-sm text-gray-500">
      Selecciona los criterios para consultar el reporte
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Fecha inicial */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Fecha inicial
      </label>

      <input
        type="date"
        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
      />
    </div>

    {/* Fecha final */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Fecha final
      </label>

      <input
        type="date"
        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
      />
    </div>

    {/* Vendedor */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Vendedor
      </label>

      <select
        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
      >
        <option value="">Todos los vendedores</option>
        <option value="1">Vendedor 1</option>
        <option value="2">Vendedor 2</option>
      </select>
    </div>

    {/* Botón */}
    <div className="flex items-end">
      <button
        type="button"
        className="w-full bg-pink-500 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-pink-600 transition"
      >
        Generar reporte
      </button>
    </div>

  </div>

</div>
{/* Tabla de ventas */}
<div className="bg-white border rounded-xl p-5 shadow-sm mt-6">

  <div className="mb-4">
    <h2 className="text-lg font-semibold">
      Ventas
    </h2>

    <p className="text-sm text-gray-500">
      Detalle de las ventas realizadas
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">

      <thead>
        <tr className="border-b text-left">
          <th className="py-3 px-3 font-semibold text-gray-600">
            Fecha
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Cliente
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Vendedor
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Productos
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Total
          </th>
        </tr>
      </thead>

      <tbody>

        <tr className="border-b hover:bg-gray-50">
          <td className="py-3 px-3">
            18/08/2026
          </td>

          <td className="py-3 px-3">
            Tienda El Sol
          </td>

          <td className="py-3 px-3">
            Vendedor 1
          </td>

          <td className="py-3 px-3">
            5
          </td>

          <td className="py-3 px-3 font-semibold">
            $120.000
          </td>
        </tr>

        <tr className="border-b hover:bg-gray-50">
          <td className="py-3 px-3">
            18/08/2026
          </td>

          <td className="py-3 px-3">
            Tienda La Esperanza
          </td>

          <td className="py-3 px-3">
            Vendedor 2
          </td>

          <td className="py-3 px-3">
            3
          </td>

          <td className="py-3 px-3 font-semibold">
            $85.000
          </td>
        </tr>

        <tr className="border-b hover:bg-gray-50">
          <td className="py-3 px-3">
            17/08/2026
          </td>

          <td className="py-3 px-3">
            Tienda Central
          </td>

          <td className="py-3 px-3">
            Vendedor 1
          </td>

          <td className="py-3 px-3">
            8
          </td>

          <td className="py-3 px-3 font-semibold">
            $210.000
          </td>
        </tr>

      </tbody>

    </table>
  </div>

</div>
{/* Productos más vendidos */}
<div className="bg-white border rounded-xl p-5 shadow-sm mt-6">

  <div className="mb-4">
    <h2 className="text-lg font-semibold">
      Productos más vendidos
    </h2>

    <p className="text-sm text-gray-500">
      Productos con mayor cantidad de unidades vendidas
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">

      <thead>
        <tr className="border-b text-left">

          <th className="py-3 px-3 font-semibold text-gray-600">
            Producto
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Categoría
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Unidades vendidas
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Total generado
          </th>

        </tr>
      </thead>

      <tbody>

        <tr className="border-b hover:bg-gray-50">

          <td className="py-3 px-3 font-medium">
            Galletas Oreo
          </td>

          <td className="py-3 px-3">
            Dulcería
          </td>

          <td className="py-3 px-3">
            35
          </td>

          <td className="py-3 px-3 font-semibold">
            $105.000
          </td>

        </tr>

        <tr className="border-b hover:bg-gray-50">

          <td className="py-3 px-3 font-medium">
            Jabón en barra
          </td>

          <td className="py-3 px-3">
            Aseo
          </td>

          <td className="py-3 px-3">
            28
          </td>

          <td className="py-3 px-3 font-semibold">
            $84.000
          </td>

        </tr>

        <tr className="border-b hover:bg-gray-50">

          <td className="py-3 px-3 font-medium">
            Bombombum
          </td>

          <td className="py-3 px-3">
            Dulcería
          </td>

          <td className="py-3 px-3">
            22
          </td>

          <td className="py-3 px-3 font-semibold">
            $44.000
          </td>

        </tr>

      </tbody>

    </table>
  </div>

</div>
{/* Ventas por vendedor */}
<div className="bg-white border rounded-xl p-5 shadow-sm mt-6">

  <div className="mb-4">
    <h2 className="text-lg font-semibold">
      Ventas por vendedor
    </h2>

    <p className="text-sm text-gray-500">
      Resumen de ventas realizadas por cada vendedor
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">

      <thead>
        <tr className="border-b text-left">

          <th className="py-3 px-3 font-semibold text-gray-600">
            Vendedor
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Número de ventas
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Productos vendidos
          </th>

          <th className="py-3 px-3 font-semibold text-gray-600">
            Total vendido
          </th>

        </tr>
      </thead>

      <tbody>

        <tr className="border-b hover:bg-gray-50">

          <td className="py-3 px-3 font-medium">
            Vendedor 1
          </td>

          <td className="py-3 px-3">
            12
          </td>

          <td className="py-3 px-3">
            65
          </td>

          <td className="py-3 px-3 font-semibold">
            $450.000
          </td>

        </tr>

        <tr className="border-b hover:bg-gray-50">

          <td className="py-3 px-3 font-medium">
            Vendedor 2
          </td>

          <td className="py-3 px-3">
            8
          </td>

          <td className="py-3 px-3">
            42
          </td>

          <td className="py-3 px-3 font-semibold">
            $285.000
          </td>

        </tr>

      </tbody>

    </table>
  </div>

</div>

    </main>
  )
}