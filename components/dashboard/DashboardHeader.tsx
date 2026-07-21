import {Store} from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between mb-8">
        
            <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-xl">
                    <Store className="text-pink-600" size={34} />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Buenos dias, Berlin
                    </h1>
                    
                    <p className="text-gray-500">
                        ¡Bienvenido al Sistema de Gestion de Ventas!
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-gray-500 text-sm">
                    Administrador 
                </p>
            </div>
            
            <div className="bg-white shadow rounded-xl px-4 py-2"> 
                <p className="text-gray-500">
                    10 Julio de 2023
                </p>
            </div>
        </div>
    );
}