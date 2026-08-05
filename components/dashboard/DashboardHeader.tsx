"use client";

import {Store} from "lucide-react";
import {UserButton, useUser} from "@clerk/nextjs";

export default function DashboardHeader() {
    const {user} = useUser();

    const role = (user?.publicMetadata as { role?: string } | undefined)?.role;
    const roleLabel = role === "admin" ? "Administrador" : role === "vendedor" ? "Vendedor" : "";
    
    const fecha= new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });


    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-pink-100 p-3 rounded-xl shrink-0">
                    <Store className="text-pink-600" size={24} />
                </div>

                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Buenos dias, {user?.firstName || ""}
                    </h1>
                    
                    <p className="text-gray-500">
                        ¡Bienvenido al Sistema de Gestion de Ventas!
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
               <div className="bg-white shadow rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-500">
                {fecha} 
                  
                </div>
                <div className="flex items-center gap-2">
                    {roleLabel && (
                        <span className="hidden sm:inline text-sm text-gray-500">
                            {roleLabel}
                        </span>
                    )}
                    <UserButton/>
                </div>
            </div>
        </div>
    );
}