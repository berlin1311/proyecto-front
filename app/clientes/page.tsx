export default function ClientesPage() {
    return (
    <main className="p-6">

        <div className="flex items-center justify-between mb-6">

            <div>
                <h1 className=" text-3xl font-bold">
                        Clientes
                </h1>

                <p className="text-gray-500">
                    Administar los Clientes registrados
                </p>
            </div>

            <button className="bg-pink-500 text-white px-5 py-3 rounded-xl hover:bg-pink-600">
                + Nuevo Cliente
            </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <input 
            type="text"
            placeholder="Buscar Cliente"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
                <thead className="bg-pink-50">
                <tr>
                    <th className="text-left p-4"> Cliente </th>
                    <th className="text-left p-4"> Telefono </th>
                    <th className="text-left p-4"> Direccion </th>
                    <th className="text-left p-4"> Estado</th>
                </tr>
                </thead>

                <tbody>
                    <tr className="border-t">
                    <td className="p-4">Tienda La Esperanza</td>
                    <td className="p-4">3001234567</td>
                    <td className="p-4">Valledupar</td>
                    <td className="p-4 text-green-600">Activo</td>
                </tr>

                <tr className="border-t">
                    <td className="p-4">Tienda El Sol</td>
                    <td className="p-4">3019876543</td>
                    <td className="p-4">Valledupar</td>
                    <td className="p-4 text-green-600">Activo</td>
                </tr>
                <tr className="border-t">
                    <td className="p-4">Tienda El Portal</td>
                    <td className="p-4">3105130026</td>
                    <td className="p-4">Valledupar</td>
                    <td className="p-4 text-green-600">Activo</td>
                </tr>

                </tbody>

            </table>

        </div>

    </main>

    );
}
