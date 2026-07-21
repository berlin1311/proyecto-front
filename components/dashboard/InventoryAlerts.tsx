import { AlertTriangle } from "lucide-react";

export default function InventoryAlerts() {
    return (
        <div className="bg-white rounded-2xl shadow-md border p-6 ">
            {/*encabezado*/}
            <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={24} />
                <h2 className="text-xl font-bold text-gray-800">
                    Stock bajo
                    </h2>
                </div>

                <span className="bg-red-100 text-red-600 text-sm font-semibold py-1 rounded-full">
                    3 productos 
                </span>
            </div> 

            {/* lista */}
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
                <div>
                <p className="font-medium text">Jabon en barra</p>
                <p className="text-sm text-gray-500">Codigo:PRD001</p>
                </div>

                <span className="text-red-500 font-bold">
                    Stock: 8
                </span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
            <div>
            <p className="font-medium">Bombombum</p>
            <p className="text-sm text-gray-500">Código: PRD002</p>
            </div>

        <span className="text-red-500 font-bold">
            Stock: 10
            </span>
        </div>

        <div className="flex justify-between items-center">
            <div>
            <p className="font-medium">Galleta Oreo</p>
            <p className="text-sm text-gray-500">Código: PRD003</p>
            </div>

            <span className="text-red-500 font-bold">
            Stock: 10
            </span>
            </div>
        </div>
    </div> 
    );
}