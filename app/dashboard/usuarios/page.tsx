 "use client";

 import {useEffect, useState} from "react";
 import {UserPlus, Loader2, Mail, User as UserIcon} from "lucide-react"

 type Vendedor = {
    id: string;
    nombre: string;
    email: string;
    username: string;
    creado: string;
 };

 export default function UsuariosPage() {
    const [vendedores, setVendedores] = useState<Vendedor[]>([]);
    const [cargando, setCargando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    const[form, setForm] = useState({
    nombre:"",
    apellido:"",
    username:"",
    email:"",
    password:"",
 });

 async function cargarVendedores() {
    setCargando(true);

    try {
const res= await fetch("/api/vendedores");
const data= await res.json();
setVendedores(data.vendedores ??[]);
    } catch (error) {
        setError("Error al cargar los vendedores");
    } finally {
        setCargando(false);
    }
}

useEffect(() => {
    cargarVendedores();
}, []);

async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError("");
    setExito("");

    try {
        const res= await fetch("/api/vendedores", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(form),
        });
        const data= await res.json();

        if (!res.ok) {
            setError(data.error ??"ocurrio un error");
            return;
        } 
        setExito(`vendedor"${form.username}" creado exitosamente`); 
            setForm({
                nombre:"",
                apellido:"",
                username:"",
                email:"",
                password:"",
            });
            cargarVendedores();
        
    } catch { 
        setError("no se pudo conectar con el servidor");
    } finally {
        setEnviando(false);
    }
}
        return (

            <div className="w-full max-w-full">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                    Gestion de Usuarios
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 mb-6">
                        Crea y administra las cuenta de los vendedores
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Formulario*/}
           
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-md border p-4 sm:p-6 h-fit">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-4">

                        <UserPlus size={20} className=" text-pink-600"/>
                        Crear vendedor
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input
                            type="text"
                            placeholder="nombre"
                            value={form.nombre}
                            onChange={(e)=>setForm({...form, nombre: e.target.value})}

                            className="border rounded-lg px-3 py-2 text-sm w-full"/>

                            <input
                type="text"
                placeholder="Apellido"
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
            </div>
 
            <input
              type="text"
              placeholder="Usuario (obligatorio)"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="border rounded-lg px-3 py-2 text-sm w-full"
            />
 
            <input
              type="email"
              placeholder="Email (opcional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm w-full"
            />
 
            <input
              type="password"
              placeholder="Contraseña (obligatorio)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
              className="border rounded-lg px-3 py-2 text-sm w-full"
            />
 
            {error && (
              <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {exito && (
              <p className="text-green-600 text-sm bg-green-50 rounded-lg px-3 py-2">
                {exito}
              </p>
            )}
 
            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {enviando ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <UserPlus size={18} />
              )}
              {enviando ? "Creando..." : "Crear vendedor"}
            </button>
          </form>
        </div>
 
        {/* Lista de vendedores */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border p-4 sm:p-6">
          <h2 className="font-bold text-gray-800 mb-4">
            Vendedores registrados
          </h2>
 
          {cargando ? (
            <p className="text-sm text-gray-400">Cargando...</p>
          ) : vendedores.length === 0 ? (
            <p className="text-sm text-gray-400">
              Todavía no has creado ningún vendedor.
            </p>
          ) : (
            <div className="space-y-3">
              {vendedores.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                      <UserIcon size={18} className="text-pink-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {v.nombre || v.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                        <UserIcon size={12} /> {v.username}
                        {v.email && (
                          <>
                            <span className="mx-1">·</span>
                            <Mail size={12} /> {v.email}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
 
      </div>
    </div>
  );
}
