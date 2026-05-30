import { getProductos, getCategorias } from "@/lib/strapi"

export default async function Home() {
  const productos = await getProductos()
  const categorias = await getCategorias()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">Productos</h1>
        <span className="text-sm text-muted-foreground">{productos.length} productos</span>
      </div>

      {/* Filtros por categoría */}
      <div className="flex gap-2 flex-wrap mb-6">
        <span className="px-4 py-1.5 rounded-full text-sm bg-emerald-600 text-white cursor-pointer">
          Todos
        </span>
        {categorias.map((cat: any) => (
          <span key={cat.id} className="px-4 py-1.5 rounded-full text-sm border hover:bg-muted cursor-pointer">
            {cat.nombre}
          </span>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto: any) => (
          <div key={producto.id} className="border rounded-xl p-4 bg-white flex flex-col gap-2">
            <div className="w-full h-24 rounded-lg bg-muted flex items-center justify-center text-3xl mb-1">
              🛍️
            </div>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
              {producto.categoria?.nombre}
            </span>
            <p className="font-medium text-sm leading-tight">{producto.nombre}</p>
            <p className="text-xs text-muted-foreground">{producto.descripcion}</p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <div>
                <p className="text-emerald-600 font-semibold">${producto.precio.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Stock: {producto.stock}</p>
              </div>
              <button className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}