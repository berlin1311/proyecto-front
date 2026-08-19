import { getRutas, getClientes } from "@/lib/strapi";
import RutasClient from "@/components/dashboard/RutasClient";

export default async function RutasPage() {
  const rutas = (await getRutas()) ?? [];
  const clientes = (await getClientes()) ?? [];

  return <RutasClient rutas={rutas} clientes={clientes} />;
}