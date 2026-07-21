export default function VentasPage() {
    return (
        <main className="p-6">
           
                {/*encabezado*/}

            <div className="flex items-center justify-between mb-6">
                    
                <div>
                    <h1 className="text-3xl font-bold">
                        Ventas
                    </h1>

                    <p className="text-gray-500">
                        Administra las ventas realizadas 
                    </p>
                </div>

                <button className="bg-pink-500 text-white px-5 py-3 rounded-xl hover:bg-pink-600">
                    + Nueva Venta
                </button>

                    {/*Buscador*/}
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <input
                type="text"
                placeholder="Buscar Venta"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                </div>

                {/*tabla*/}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

        <thead className="bg-pink-50">
            <tr>
            <th className="text-left p-4">Cliente</th>
            <th className="text-left p-4">Fecha</th>
            <th className="text-left p-4">Total</th>
            <th className="text-left p-4">Estado</th>
            </tr>
            
            </thead>

        <tbody>

            <tr className="border-t">
              <td className="p-4">Tienda La Esperanza</td>
              <td className="p-4">20/07/2026</td>
              <td className="p-4">$150.000</td>
              <td className="p-4 text-green-600">
                Completada
                </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Tienda El Sol</td>
              <td className="p-4">20/07/2026</td>
              <td className="p-4">$85.000</td>
              <td className="p-4 text-green-600">
                Completada 
                </td>
            </tr>

                </tbody>

            </table>

        </div>


    </main>

    )
}