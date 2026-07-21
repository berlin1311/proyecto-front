"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    BarChart3,
    Map,
    Tag,
    RotateCcw,
    Store,
} from "lucide-react"

const menu = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/clientes", label: "Clientes", icon: Users },
    { href: "/productos", label: "Productos", icon: Package },
    { href: "/ventas", label: "Ventas", icon: ShoppingCart },
    { href: "/reportes", label: "Reportes", icon: BarChart3 },
    { href: "/rutas", label: "Rutas", icon: Map },
    { href: "/descuentos", label: "Descuentos", icon: Tag },
    { href: "/devoluciones", label: "Devoluciones", icon: RotateCcw },
];
    

export default function Sidebar () {
    const pathname = usePathname();

    return (

        <aside className="w-64 min-h-screen bg-[#4b1830] text-white">

        <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center">
            <Store size={26}/>
        </div>

        <div>
            <h2 className="font-bold "> Distribuidora M.C </h2>
            <p className="text-sm text-pink-300"> Sistema de Gestion de Ventas</p>
            </div>
        </div>

        <nav className="mt-6 px-3 space-y-2">
            
            <p className="px-4 mb-2 text-xs uppercase tracking-widest tex-pink-200">
                Principal
            </p>

            {menu.map(({ href, label, icon: Icon})=> (

                <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    pathname === href
                    ?"bg-pink-500"
                    : " hover:bg-pink-400/20"
                
                }`}
            >
                <Icon size={20}/>
                {label}
                </Link>
                ))}
            </nav>
    
        </aside>   
    
    );
}