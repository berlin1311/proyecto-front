import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// GET: lista los pedidos (admin ve todos, vendedor solo los suyos)
export async function GET() {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  const res = await fetch(
    `${STRAPI_URL}/api/pedidos?sort=createdAt:desc&pagination[pageSize]=100`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      cache: "no-store",
    }
  );
  const data = await res.json();

  let pedidos = data.data ?? [];

  // Si es vendedor, solo mostramos los pedidos que él mismo tomó
  if (role === "vendedor") {
    pedidos = pedidos.filter((p: any) => p.IddeUsuario === userId);
  }

  return NextResponse.json({ pedidos });
}

// POST: crea un pedido nuevo (con varios productos)
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { nombreCliente, direccion, items, total } = body;

    if (!nombreCliente || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Falta el nombre de la tienda o los productos" },
        { status: 400 }
      );
    }

    const numeroPedido = `PED-${Date.now()}`;

    const payload = {
      data: {
        total,
        subtotal: total,
        NumerodePedido: numeroPedido,
        estadoPedido: "pendiente",
        NombredelCliente: nombreCliente,
        direccion: direccion || undefined,
        items,
        IddeUsuario: userId,
      },
    };

    const res = await fetch(`${STRAPI_URL}/api/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message ?? "No se pudo guardar el pedido" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, numeroPedido, pedido: data.data });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor" },
      { status: 500 }
    );
  }
}