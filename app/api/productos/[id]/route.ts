import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// PATCH: edita un producto (solo admin)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  if (role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { nombre, descripcion, precio, stock, codigo } = body;

    const res = await fetch(`${STRAPI_URL}/api/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: { nombre, descripcion, precio, stock, codigo },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message ?? "No se pudo actualizar el producto" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, producto: data.data });
  } catch {
    return NextResponse.json({ error: "No se pudo conectar con el servidor" }, { status: 500 });
  }
}