import { getProductos, getCategorias } from "@/lib/strapi";
import ProductosClient from "@/components/dashboard/ProductosClient";

export default async function ProductosPage() {
  const productos = (await getProductos()) ?? [];
  const categoriasRaw = (await getCategorias()) ?? [];

  // Quitamos "descuentos" de los filtros de esta página (va aparte)
  const categorias = categoriasRaw.filter(
    (cat: any) => cat.nombre?.toLowerCase() !== "descuentos"
  );

  return <ProductosClient productos={productos} categorias={categorias} />;
}