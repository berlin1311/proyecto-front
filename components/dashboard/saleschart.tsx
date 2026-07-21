export default function SalesChart() {
    return (

        <div className="bg-white rounded-2xl shadow-md border p-6">  
        <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-xl font-bold text-gray-800">
                Ventas de la Semana
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                Resumen de las ventas registradas 
            </p>
        </div>

        <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-xl font-semibold">
            Julio
        </div>

        </div>

        <div className="h-80 rounded-2xl border-2 border-dashed border-pink-200 flex items-center justify-center">
            <p className="text-gray-400">
                Gráfico de ventas aquí
                </p>
        </div>
        </div>
            
    );

}