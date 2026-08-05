"use client";
import { useState } from "react";

export default function VentasPage() {

    const [ mostrarFormulario, setMostrarFormulario] =useState(false);
        

        const [ cliente, setCliente] =useState("");
        const [ producto, setProducto] =useState("");
        const [ cantidad, setCantidad] =useState(1);
        const [ precio, setPrecio] =useState(0);
        
        const total= cantidad*precio;

        function guardarVenta () {
            console.log ({
              cliente,
              producto,
              cantidad,
              precio,
              total,  
            });
            alert("venta registrada correctamente")
        }

    return (
        <main className="p-6">
            
                {/*encabezado*/}

            <div className="flex items-center justify-between mb-6">
                    
                <div>
                    <h1 className="text-3xl font-bold">
                        Ventas
                    </h1>

                    <p className="text-gray-500">
                        Administra las ventas realizadas 
                    </p>
                </div>

                <button className="bg-pink-500 text-white px-5 py-3 rounded-xl hover:bg-pink-600"
                    onClick={() => setMostrarFormulario (true)}
                    
                     >
                    + Nueva Venta
                </button>
     
                { mostrarFormulario && (
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6"> 

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">
                            Nueva Venta
                        </h2>
                        <button
                        onClick={() => setMostrarFormulario(false)}
                        className="text-gray-500 hover:text-gray-700">
                            x
                        </button>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-2 font-medium">
                                Cliente
                            </label>

                            <select 
                            value={cliente}
                            onChange={(e)=> setCliente(e.target.value)}
                            className="w-full border rounded-lg p-3"
                            >

                                <option value=""> Seleccionar Cliente</option>
                                <option> Tienda la Esperanza</option>
                                <option> Tienda el Sol</option>
                                <option> Tienda el Portal</option>
                            </select>
                        </div>

                        
                        <div>
                            <label className="block mb-2 font-medium">
                                Producto
                            </label>

                            <select 
                            value={producto}
                            onChange={(e)=> setProducto(e.target.value)}
                            className="w-full border rounded-lg p-3"
                            >

                                <option value=""> Seleccionar el Producto</option>
                                <option> Jabon en barra </option>
                                <option> bombombum </option>
                                <option>Galleta oreo </option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Cantidad 
                            </label>
                            
                            <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e)=> setCantidad(Number(e.target.value))}
                            className="w-full border rounded-lg p-3"
                    
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Precio
                            </label>
                            <input 
                            type="number"
                            value={precio}
                            onChange={(e) =>setPrecio(Number(e.target.value))}
                            className="w-full border rounded-lg p-3"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">
                                Total
                            </label>

                            <input
                            type="text"
                            value= {`$${total.toLocaleString("es-CO")}`}
                            readOnly
                            className="w-full border rounded-lg p-3 bg-gray-100"
                            />
                        </div> 

                    </div>
                    <button
                    onClick={guardarVenta}
                    className="mt-6 bg-pink-500 text-white px-5 py-3 rounded-xl hover:bg-pink-600"
                    >
                        Guardar Venta
                    </button>
                    </div>
                ) }
          
                    {/*Buscador*/}
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <input
                type="text"
                placeholder="Buscar Venta"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                </div>

                {/*tabla*/}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

        <thead className="bg-pink-50">
            <tr>
            <th className="text-left p-4">Cliente</th>
            <th className="text-left p-4">Fecha</th>
            <th className="text-left p-4">Total</th>
            <th className="text-left p-4">Estado</th>
            </tr>
            
            </thead>

        <tbody>

            <tr className="border-t">
              <td className="p-4">Tienda La Esperanza</td>
              <td className="p-4">20/07/2026</td>
              <td className="p-4">$150.000</td>
              <td className="p-4 text-green-600">
                Completada
                </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Tienda El Sol</td>
              <td className="p-4">20/07/2026</td>
              <td className="p-4">$85.000</td>
              <td className="p-4 text-green-600">
                Completada 
                </td>
            </tr>

                </tbody>

            </table>

        </div>


    </main>

    )
}