"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import{
   LayoutDashboard, Receipt, Package, Building2,
      RotateCcw, BarChart3, Tag, Settings, Store, Search
} from "lucide-react"
import {Button} from "@/components/ui/button"

const navLinks = [
   { href: "/", label: "panel", icon: LayoutDashboard },
   { href: "/ventas", label: "ventas", icon: Receipt, badge: 12 },
   { href: "/productos", label: "productos", icon: Package },
   { href: "/clientes", label: "clientes", icon: Building2 },
   { href: "/reportes", label: "reportes", icon: BarChart3 },
   { href: "/devoluciones", label: "devoluciones", icon: RotateCcw },
   { href: "/rutas", label: "rutas", icon: Store },
   { href: "/descuentos", label: "descuentos", icon: Tag },
   
] 
export default function Header() {
   const pathname = usePathname()
   return (
      <header className="w-full border-b bg-background">
         <div className="flex h-14 items-center justify-between px-6">
            

        {/* logo + nav */}
         <div className="flex items-center gap-8">
         <Link href="/" className="flex items-center gap-2 font-medium text-sm">
         <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white">
         <Store className="h-4 w-4" />
         </div>

         Gestion de ventas         
         </Link>

         <nav className="flex items-center gap-1">
         {navLinks.map(({ href, label, icon: Icon, badge }) => {
            const isActive = pathname === href

            return (
               <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
               isActive
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            >
         

            <Icon className="h-4 w-4" />

         {label}

         {badge && (
   <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white leading-none">
   {badge}
   </span>  
   )}
         </Link>
            )
         })}

         </nav>
         </div>
         
   
           {/* acciones */}

         <div className="flex items-center gap-4">
            <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted">
            <Search className="h-4 w-4"/>
            </button>
            <div className="relative">
            <button variant="ghost" size="icon" className="h-8 w-8">
            <Tag className="h-4 w-4" />
            </button>

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-background" />
            </div>
            <button variant="ghost" size="icon" className="h-8 w-8">
               <Settings className="h-4 w-4"/>
            </button>

            <div className="ml-1 h-6 w-px bg-border"/>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                     BC
               </div>
         </div>
         </div>
      </header>
   );
}

         
   
   
   