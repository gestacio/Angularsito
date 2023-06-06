import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FaFactura } from "src/app/interfaces/fafactura";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export function createPDF(fafactura: FaFactura) {

    const xrif = fafactura.maempresa!.xrif;
    const xshortname = fafactura.maempresa!.xshortname;
    const xaddress = fafactura.maempresa!.xaddress;

    const xnameTienda = fafactura.matienda!.xname;
    const nstore = fafactura.matienda!.nstore;
    const xtelfTienda = fafactura.matienda!.xtelf;
    const xaddressTienda = fafactura.matienda!.xaddress;

    const xfirstname = fafactura.seusuario!.xfirstname;
    const xlastname = fafactura.seusuario!.xlastname;

    const neto = (Math.round(fafactura.mneto * 100) / 100).toFixed(2);
    const iva = (Math.round(fafactura.miva * 100) / 100).toFixed(2);
    const total = (Math.round(fafactura.mtotal * 100) / 100).toFixed(2);

    // const fdate = new Date().toLocaleDateString()
    // const ftime = new Date().toLocaleTimeString()
    const fdate = new Date(fafactura.createdAt!.toString()).toLocaleDateString()
    const ftime = new Date(fafactura.createdAt!.toString()).toLocaleTimeString()

    let rowsProducts = [];
    for (let i = 0; i < fafactura.faventa!.length; i += 1) { // i suggest a for-loop since you need both arrays at a time 
        let idProducto = fafactura.faventa![i].id;
        let nombreProducto = fafactura.faventa![i].xproduct;
        let precioProducto = (Math.round(fafactura.faventa![i].mprice * 100) / 100).toFixed(2);

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
                { text: `RIF ${xrif}`, style: 'title' },
                { text: `${xshortname}`, style: 'title', bold: false },
                { text: `${xaddress}`, style: 'dataTitle', margin: [ 35, 0 ] },
                { text: `${xnameTienda}, ${xtelfTienda}`, style: 'dataTitle' },
                { text: `${xaddressTienda}`, style: 'dataTitle' },
                { text: "CAJA 06", style: 'dataTitle' },
                { text: `RIF/C.I.: ${fafactura.macliente!.xdni}`, style: 'data' },
                { text: `RAZÓN SOCIAL: ${fafactura.macliente!.xbusinessname}`, style: 'data' },
                { text: `Tienda: ${nstore}`, style: 'data' },
                { text: "Ticket: 13129", style: 'data' },
                { text: `Le Atendió: ${xlastname}, ${xfirstname}`, style: 'data' },
                { text: "FACTURA", style: 'dataTitle' },
                {
                    style: 'data',
                    layout: 'noBorders',
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                { text: 'FACTURA:', alignment: "left" },
                                { text: `000${fafactura.id}`, alignment: "right" },
                            ],
                            [
                                { text: `Fecha ${fdate}`, alignment: "left", },
                                { text: `Hora: ${ftime}`, alignment: "right" },
                            ],
                        ]
                    }
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    style: 'data',
                    table: {
                        widths: [30, "*", 40],
                        body: rowsProducts,
                    }
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    style: 'data',
                    layout: 'noBorders',
                    table: {
                        widths: [40, "*", 40],
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
