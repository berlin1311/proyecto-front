"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
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
    UserCheck,
    Menu,
    X
} from "lucide-react"

const menu = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
    { href: "/dashboard/clientes", label: "Clientes", icon: Users, adminOnly: false },
    { href: "/dashboard/productos", label: "Productos", icon: Package, adminOnly: false },
    { href: "/dashboard/ventas", label: "Ventas", icon: ShoppingCart, adminOnly: false },
    { href: "/dashboard/rutas", label: "Rutas", icon: Map, adminOnly: false },
    { href: "/dashboard/promociones", label: "Promociones", icon: Tag, adminOnly: false },
    { href: "/dashboard/devoluciones", label: "Devoluciones", icon: RotateCcw, adminOnly: false },
    { href: "/dashboard/reportes", label: "Reportes", icon: BarChart3, adminOnly: true },
    { href: "/dashboard/usuarios", label: "Usuarios", icon: UserCheck, adminOnly: true },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();
    const [open, setOpen] = useState(false);

    const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

    if (!isLoaded) {
        return <div className="w-0 sm:w-64 min-h-screen bg-[#4b1830]" />;
    }

    const menuVisible = menu.filter((item) => !item.adminOnly || role === "admin");

    return (
        <>
            {/* Botón hamburguesa - solo visible en celular */}
            <button
                onClick={() => setOpen(true)}
                className="sm:hidden fixed top-4 left-4 z-50 bg-[#4b1830] text-white p-2 rounded-lg shadow-lg"
                aria-label="Abrir menú"
            >
                <Menu size={22} />
            </button>

            {/* Fondo oscuro al abrir el menú en celular */}
            {open && (
                <div
                    className="sm:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar: fijo en desktop, deslizable en celular */}
            <aside
                className={`
                    fixed sm:static top-0 left-0 z-50
                    w-64 min-h-screen bg-[#4b1830] text-white
                    transform transition-transform duration-200
                    ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
                `}
            >
                <div className="flex items-center justify-between gap-3 p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center shrink-0">
                            <Store size={26} />
                        </div>
                        <div>
                            <h2 className="font-bold"> Distribuidora M.C </h2>
                            <p className="text-sm text-pink-300"> Sistema de Gestion de Ventas</p>
                        </div>
                    </div>

                    {/* Botón cerrar - solo celular */}
                    <button
                        onClick={() => setOpen(false)}
                        className="sm:hidden text-white/70 hover:text-white"
                        aria-label="Cerrar menú"
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="mt-6 px-3 space-y-2">

                    <p className="px-4 mb-2 text-xs uppercase tracking-widest text-pink-200">
                        {role === "admin" ? "Principal" : "Mi panel"}
                    </p>

                    {menuVisible.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                pathname === href
                                    ? "bg-pink-500"
                                    : "hover:bg-pink-400/20"
                            }`}
                        >
                            <Icon size={20} />
                            {label}
                        </Link>
                    ))}
                </nav>

            </aside>
        </>
    );
}