const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export async function getProductos() {
  const res = await fetch(`${STRAPI_URL}/api/productos?populate=categoria&populate=imagen&populate=imagenes`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    cache: "no-store",
  })
  const data = await res.json()
  return data.data
}

export async function getCategorias() {
  const res = await fetch(`${STRAPI_URL}/api/categorias`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    cache: "no-store",
  })
  const data = await res.json()
  return data.data
}