import{
    Package,
    TriangleAlert,
    UserCheck,
    Users,
} from "lucide-react";

import SummaryCard from "./SummaryCard"

export default function SummaryCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            <SummaryCard 
            titulo="clientes"
            valor="120"
            icono={Users}
        />
            <SummaryCard
            titulo="productos"
            valor="50"
            icono={Package} 
        />
            <SummaryCard 
            titulo="inventarios"
            valor="75" icono={TriangleAlert} 
        />
            <SummaryCard 
            titulo="vendedores" 
            valor="5" 
            icono={UserCheck} 
            />

        </div>
    );
}