import jsPDF from "jspdf"

export function generarFactura() {
  const doc = new jsPDF()

  // Tamaño de la página
  const pageWidth = doc.internal.pageSize.getWidth()

  // -----------------------------
  // ENCABEZADO
  // -----------------------------

  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)

  doc.text(
    "ARRIBA DISTRIBUIDORA M.C",
    pageWidth / 2,
    25,
    { align: "center" }
  )

  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)

  doc.text(
    "FACTURA DE VENTA",
    pageWidth / 2,
    35,
    { align: "center" }
  )

  // Línea
  doc.line(20, 42, pageWidth - 20, 42)

  // -----------------------------
  // INFORMACIÓN DE LA FACTURA
  // -----------------------------

  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)

  doc.text("N.º Factura:", 20, 55)
  doc.text("Fecha:", 20, 63)

  doc.setFont("helvetica", "normal")

  // Estos valores quedarán vacíos
  // hasta conectar una venta real.

  doc.text("________________", 55, 55)
  doc.text("________________", 55, 63)

  // -----------------------------
  // CLIENTE
  // -----------------------------

  doc.setFont("helvetica", "bold")
  doc.text("CLIENTE", 20, 78)

  doc.setFont("helvetica", "normal")
  doc.text("Nombre:", 20, 87)

  // -----------------------------
  // VENDEDOR
  // -----------------------------

  doc.setFont("helvetica", "bold")
  doc.text("VENDEDOR", 20, 101)

  doc.setFont("helvetica", "normal")
  doc.text("Nombre:", 20, 110)

  // -----------------------------
  // PRODUCTOS
  // -----------------------------

  doc.setFont("helvetica", "bold")
  doc.text("PRODUCTOS", 20, 126)

  doc.line(20, 131, pageWidth - 20, 131)

  doc.text("Producto", 20, 140)
  doc.text("Cant.", 105, 140)
  doc.text("Precio", 130, 140)
  doc.text("Total", 165, 140)

  doc.line(20, 145, pageWidth - 20, 145)

  // -----------------------------
  // TOTALES
  // -----------------------------

  doc.setFont("helvetica", "bold")

  doc.text("Subtotal:", 130, 175)
  doc.text("Descuento:", 130, 183)
  doc.text("TOTAL:", 130, 193)

  // -----------------------------
  // PIE
  // -----------------------------

  doc.line(20, 205, pageWidth - 20, 205)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)

  doc.text(
    "Gracias por su compra",
    pageWidth / 2,
    218,
    { align: "center" }
  )

  // -----------------------------
  // GENERAR PDF
  // -----------------------------

  doc.save("factura.pdf")
}