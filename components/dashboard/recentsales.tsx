import {ShoppingCart} from 'lucide-react'

export default function RecentSales() {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            {/*encabezado*/}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                <ShoppingCart className="text-green-600 mr-2" size={24} />

                <h2 className="text-xl font-bold text-gray-800">
                    Ultimas Ventas
                </h2>
            </div>
            
           <span className="bg-green-100 text-green-600 text-sm font-semibold py-1 px-3 rounded-full">
                Hoy 
            </span>
        </div>

        {/* lista de ventas */}
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
                <div>
                <p className="font-medium">Tienda la Esperanza</p>
                <p className="text-sm text-gray-500">Cliente</p>
                </div>

    
          <span className="text-green-600 font-bold">
            250,000
          </span>
        </div>    

    <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-medium">Tienda El Sol</p>
            <p className="text-sm text-gray-500">Cliente</p>
          </div>

          <span className="text-green-600 font-bold">
            $400.000
          </span>
        </div>

        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-medium">Tienda La María</p>
            <p className="text-sm text-gray-500">Cliente</p>
          </div>

          <span className="text-green-600 font-bold">
            $250.000
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Supermercado El Rebajón</p>
            <p className="text-sm text-gray-500">Cliente</p>
          </div>

          <span className="text-green-600 font-bold">
            $230.000
          </span>
        </div>

      </div>
    </div>
  );
}    

