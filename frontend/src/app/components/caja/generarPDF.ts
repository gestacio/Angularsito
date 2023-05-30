import { Product } from "src/app/interfaces/product";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export function createPDF(listaProductos: Product[], totalNeto: number, totalIva: number, TotalCarrito: number) {
    let neto = (Math.round(totalNeto * 100) / 100).toFixed(2);
    let iva = (Math.round(totalIva * 100) / 100).toFixed(2);
    let total = (Math.round(TotalCarrito * 100) / 100).toFixed(2);

    let rowsProducts = [];
    for (let i = 0; i < listaProductos.length; i += 1) { // i suggest a for-loop since you need both arrays at a time 
        let idProducto = listaProductos[i].id;
        let nombreProducto = listaProductos[i].name;
        let precioProducto = (Math.round(listaProductos[i].price * 100) / 100).toFixed(2);

        rowsProducts.push(
            [
                { text: `0000${idProducto}`, alignment: "left", border: [false, false, false, false] },
                { text: `${nombreProducto}`, alignment: "left", border: [false, false, false, false] },
                { text: `Bs ${precioProducto}`, alignment: "right", border: [false, false, false, false] },
            ],
        );
    }

    try {
        let pdfDefinition: any = {
            pageSize: { width: 200, height: "auto" },
            pageMargins: [10, 10],
            content: [
                { text: "SENIAT", style: 'title' },
                { text: "RIF J-000202001", style: 'title' },
                { text: "FARMATODO, C.A.", style: 'title', bold: false },
                { text: "Av. Los Guayabitos, CC Expreso Baruta\nNivel 5, Of. Unica, Urb. La Trinidad\n(Sector Puerta Azul), Caracas.", style: 'dataTitle' },
                { text: "FARMACIA OPALO, TLF:0800-FARMATODO\nCCS:Sabana Gnc. Casanova/Recreo. Ed Rupi\nCAJA 06", style: 'dataTitle' },
                { text: "RIF/C.I.: V25221952", style: 'data' },
                { text: "RAZON SOCIAL: Gabriel Jose Estacio Rivas", style: 'data' },
                { text: "Tienda: 2189", style: 'data' },
                { text: "Ticket: 13129", style: 'data' },
                { text: "Le Atendió: OTAMENDI LUIS", style: 'data' },
                { text: "FACTURA", style: 'dataTitle' },
                {
                    style: 'data',
                    layout: 'noBorders',
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                { text: 'FACTURA:', alignment: "left" },
                                { text: '00034034', alignment: "right" },
                            ],
                            [
                                { text: 'FECHA: 18-04-2023:', alignment: "left", },
                                { text: 'HORA: 12:14', alignment: "right" },
                            ],
                        ]
                    }
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    style: 'data',
                    table: {
                        widths: [20, "*", 40],
                        body: rowsProducts,
                    }
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    style: 'data',
                    layout: 'noBorders',
                    table: {
                        widths: [20, "*", 40],
                        body: [
                            [
                                { text: `Bs. ${neto}`, alignment: "left" },
                                { text: 'IVA 16,00%', alignment: "center" },
                                { text: `Bs. ${iva}`, alignment: "right" },
                            ],
                        ]
                    }
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    style: 'data',
                    layout: 'noBorders',
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                { text: `Tarj. Débito`, alignment: "left" },
                                { text: `Bs. ${total}`, alignment: "right" },
                            ],
                        ]
                    }
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    style: 'title',
                    layout: 'noBorders',
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                { text: `TOTAL`, alignment: "left" },
                                { text: `${total}`, alignment: "right" },
                            ],
                        ]
                    }
                },
                { text: "**Plazo para devoluciones: 30 días**", bold: true, style: 'data' },
                { text: "||| ||||| || |||| ||| || ||| ||| |||", bold: true, style: 'title' },
                { text: "T4XX6A911A11PFY4AXENI", style: 'dataTitle' },
                // {
                //   style: 'data',
                //   table: {
                //     widths: [130, 80, 30],
                //     body: [
                //       [
                //         { text: 'Datos del Contrato', alignment: 'center', fillColor: '#ababab', bold: true },
                //         { text: 'Total costo:', bold: true, border: [false, true, false, false] },
                //         { text: `${this.cartTotal}`, bold: true, border: [false, true, false, false] }
                //       ]
                //     ]
                //   }
                // },
            ],
            styles: {
                title: {
                    fontSize: 7,
                    bold: true,
                    alignment: 'center'
                },
                header: {
                    fontSize: 6.5,
                    color: 'gray'
                },
                dataTitle: {
                    fontSize: 6,
                    alignment: 'center'
                },
                data: {
                    fontSize: 6
                },
                tableData: {
                    fontSize: 6,
                }
            }
        }
        let pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
    }
    catch (err) {
    }
}
