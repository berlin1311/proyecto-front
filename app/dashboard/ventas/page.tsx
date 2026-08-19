import { getProductos } from "@/lib/strapi";
import VentasClient from "@/components/dashboard/VentasClient";

export default async function VentasPage() {
  const productos = (await getProductos()) ?? [];

  return <VentasClient productos={productos} />;
}