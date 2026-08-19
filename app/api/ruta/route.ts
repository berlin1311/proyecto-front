import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// POST: crea una ruta nueva (solo admin)
export async function POST(req: Request) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  if (role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { nombre, descripcion, dia, barrio } = body;

    if (!nombre || !dia || !barrio) {
      return NextResponse.json(
        { error: "Nombre, día y barrio son obligatorios" },
        { status: 400 }
      );
    }

    const res = await fetch(`${STRAPI_URL}/api/rutas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { nombre, descripcion, dia, barrio } }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message ?? "No se pudo crear la ruta" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, ruta: data.data });
  } catch {
    return NextResponse.json({ error: "No se pudo conectar con el servidor" }, { status: 500 });
  }
}