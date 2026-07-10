const axios = require('axios')

const STRAPI_URL = "http://localhost:1337"
const STRAPI_TOKEN = "bcfe849dc44273ea21e4733d18cf49cb428e3d536524909d1328be6699e051f4595d25c5e004d6ddd5abae4be4f615e3131240a395a3ec568ac8d991039a56de5bbcbc4b8cd3a6fc219148ae2207c70bff1e9505bb7d7de6f4cf1b95d56868082637a9a37f2109ca52dd7b5801e76d7bda573883b6bd4c6a51150b79cb77be01"
const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  "Content-Type": "application/json",
};

const categorias = [
  {
    nombre:"Dulceria",
    slug:"dulceria",
    descripcion:"Dulces y golosinas",
  },

  {
    nombre:"Aseo",
    slug:"aseo",
    descripcion:"Productos de aseo",
  },

{
  nombre:"Cacharreria",
  slug:"cacharreria",
  descripcion:"Articulos para el hogar",

},

{
  nombre:"cuidado Personal",
  slug:"cuidado-personal",
  descripcion:"Productos para el cuidado personal",
},
{
  nombre: "descuentos",
  slug: "descuentos",
  descripcion: "Productos con descuentos especiales",
}

];

const productos =[
  //dulceria//
{
  nombre:"Chocolatina Jet caja por 24 unidades",
  slug:"chocolatina-jet",
  precio: 20000,
  stock: 30,
  categoria: "dulceria",
  descripcion:"Chocolatina Jet de cocholate",
} ,
{nombre:"gomitas caja por 12 paquetes",
slug:"gomitas",
precio: 24000,
stock: 25,
categoria: "dulceria",
descripcion:"caja surtida por 12 paquetes de gomitas"
},
{
  nombre:"bombombum",
  slug:"bombombum",
  precio: 9000,
  stock: 25,
  categoria: "dulceria",
  descripcion:"paquete de bombombum por 24 unidades"
},
{
  nombre:"papas de Limon (paquete por 24 unidades)",
  slug:"papas-limon",
  precio: 10000,
  stock: 20,
  categoria: "dulceria",
  descripcion:"Caja de papas de limon por 24 unidades"
},
{
  nombre:"Galleta Oreo paquete por 12 unidades",
  slug:"galleta-oreo",
  precio: 8000,
  stock: 15,
  categoria: "dulceria",
  descripcion:"Caja de Galletas Oreo por 12 unidades"
},
{
  nombre:"Piazza paquete por 24 unidades",
  slug:"piazza",
  precio: 9500,
  stock: 25,
  categoria: "dulceria",
  descripcion:"Barquillo con crema de nucita"
},
{
  nombre:"coffe delight paquete por 100 unidades",
  slug:"coffe-delight",
  precio: 8500,
  stock: 20,
  categoria: "dulceria",
  descripcion:"Caramelo duro con cafe"
},
//aseo//
{ 
  nombre:"esponja de lavar lozas",
  slug:"esponja-lavar-lozas",
  precio: 6000,
  stock: 15,
  categoria: "aseo",
  descripcion:"Paquete deEsponja para lavar lozas"
},
{nombre:"jabon Rey",
  slug: "jabon-rey",
  precio: 22000,
  stock: 20,
  categoria: "aseo",
  descripcion:"Caja de Jabon de lavar la ropa por 12 unidades",
},
{
  nombre:"bolsa de basura jumbo por 10 unidades",
  slug:"bolsa-basura-jumbo",
  precio: 1500,
  stock: 30,
  categoria: "aseo",
  descripcion:"Bolsa de basura jumbo por 10 unidades"
},
{
  nombre:"Bolsa de basura extrajumbo por 10 unidades",
  slug:"bolsa-basura-extrajumbo",
  precio: 3000,
  stock: 25,
  categoria: "aseo",
  descripcion:"Bolsa de basura extrajumbo por 10 unidades"
},
{
  nombre:"brillos fino para loza bolsa por 30 unidades",
  slug:"brillos-fino-loza",
  precio: 2500,
  stock: 20,
  categoria: "aseo",
  descripcion:"Brillos fino para loza bolsa por 30 unidades"
},
//cacharreria//
{
  nombre:"jabonera de plastico",
  slug:"jabonera-plastico",
  precio: 2000,
  stock: 20,
  categoria: "cacharreria",
  descripcion:"Jabonera de plastico para el baño"
},
{
  nombre:"escoba de barrer",
  slug:"escoba-barrer",
  precio: 6500,
  stock: 15,
  categoria: "cacharreria",
  descripcion:"Escoba de barrer para el hogar"
},
{
  nombre:"recogedor de plastico",
  slug:"recogedor-plastico",
  precio: 3000,
  stock: 20,
  categoria: "cacharreria",
  descripcion:"Recogedor de plastico para el hogar"
},
{
  nombre:"Gota magica (pega loca) paquete por 12 unidades",
  slug:"gota-magica",
  precio: 7600,
  stock: 25,
  categoria: "cacharreria",
  descripcion:"Gota magica (pega loca) paquete por 12 unidades"
},
//cuidadopersonal//
{
  nombre:"shampoo sedal tira por 12 unidades",
  slug:"shampoo-sedal",
  precio: 12000,
  stock: 20,
  categoria: "cuidado-personal",
  descripcion:"Shampoo sedal para el cuidado personal"
},
{
  nombre:"acondicionador sedal tira por 12 unidades",
  slug:"acondicionador-sedal",
  precio: 12000,
  stock: 20,
  categoria: "cuidado-personal",
  descripcion:"Acondicionador sedal para el cuidado personal"
},
{
  nombre:"colgate paquete por 12 unidades",
  slug:"colgate",
  precio: 45000,
  stock: 20,
  categoria: "cuidado-personal",
  descripcion:"Colgate paquete por 12 unidades"
},
{
  nombre:"desodorante rexona paquete por 18 unidades",
  slug:"desodorante-rexona",
  precio: 19000,
  stock: 20,
  categoria: "cuidado-personal",
  descripcion:"Desodorante rexona paquete por 18 unidades"
},
]
async function crearCategorias() {
  console.log("Creando categorias...")
  const categoriasCreadas = {}

  const res = await axios.get(`${STRAPI_URL}/api/categorias`, { headers })
  const existentes = res.data.data

  for (const cat of existentes) {
    categoriasCreadas[cat.nombre] = cat.id
  }

  for (const categoria of categorias) {
    if (!categoriasCreadas[categoria.nombre]) {
      try {
        const res = await axios.post(
          `${STRAPI_URL}/api/categorias`,
          { data: categoria },
          { headers }
        )
        categoriasCreadas[categoria.nombre] = res.data.data.id
        console.log(`✅ Categoria creada: ${categoria.nombre}`)
      } catch (e) {
        console.error(`❌ Error en categoria ${categoria.nombre}:`, e.response?.data?.error || e.message)
      }
    }
  }

  return categoriasCreadas
}

async function crearProductos(categoriasCreadas) {
  console.log("Creando productos...")

  for (const producto of productos) {
    try {
      const { categoria, ...resto } = producto
      await axios.post(
        `${STRAPI_URL}/api/productos`,
        { data: { ...resto, categoria: categoriasCreadas[categoria] } },
        { headers }
      )
      console.log(`✅ Producto creado: ${producto.nombre}`)
    } catch (e) {
      console.error(`❌ Error en producto ${producto.nombre}:`, e.response?.data?.error || e.message)
    }
  }
}

async function main() {
  console.log("Iniciando script...")
  const categoriasCreadas = await crearCategorias()
  await crearProductos(categoriasCreadas)
  console.log("✅ Listo!")
}

main()
