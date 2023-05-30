import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { createPDF } from './generarPDF';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  listProducts: Product[] = []
  loading: boolean = false;
  listCart: Product[] = []
  cartCostoNeto = 0;
  cartIva = 0;
  cartTotal = 0;

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts()
  }

  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    })
  }

  insertListCart(product: Product) {
    this.listCart.push(product);
    this.calcularCostos(this.listCart);
  }

  deleteListCart(product: Product) {
    var index = this.listCart.indexOf(product)
    // this.restarCostos(product);
    this.listCart.splice(index, 1);
    this.calcularCostos(this.listCart);
  }

  calcularCostos(listaCart: Product[]) {
    this.cartCostoNeto = 0;
    this.cartIva = 0;
    this.cartTotal = 0;

    for (let i = 0; i < listaCart.length; i++) {
      const product = listaCart[i];

      this.cartCostoNeto = this.cartCostoNeto + product.price;
      this.cartIva = this.cartCostoNeto * 0.16;
      this.cartTotal = this.cartCostoNeto + this.cartIva;
    }
  }

  clearListCart() {
    this.listCart.length = 0;
    this.calcularCostos(this.listCart);
  }

  confirmarCompra() {


    let text;
    if (confirm("¿Desea generar la factura con estos productos?") == true) {
      createPDF(this.listCart, this.cartCostoNeto, this.cartIva, this.cartTotal);

      // alert("apretaste ok");
    } else {
      text = "You canceled!";
    }
  }

  // deleteProduct(id: number) {
  //   this.loading = true;
  //   this._productService.deleteProduct(id).subscribe(() => {
  //     this.getListProducts();
  //     this.toastr.warning("El producto fue eliminado con éxito", "Atención");
  //   })
  // }

  

  // createPDF() {
  //   let rowsProducts = [];
  //   for (let i = 0; i < this.listCart.length; i += 1) { // i suggest a for-loop since you need both arrays at a time 
  //     rowsProducts.push(
  //       [
  //         { text: `0000${this.listCart[i].id}`, alignment: "left", border: [false, false, false, false] },
  //         { text: `${this.listCart[i].name}`, alignment: "left", border: [false, false, false, false] },
  //         { text: `Bs ${this.listCart[i].price}`, alignment: "right", border: [false, false, false, false] },
  //       ],
  //     );
  //   }

  //   try {
  //     let pdfDefinition: any = {
  //       pageSize: { width: 200, height: "auto" },
  //       pageMargins: [10, 10],
  //       content: [
  //         { text: "SENIAT", style: 'title' },
  //         { text: "RIF J-000202001", style: 'title' },
  //         { text: "FARMATODO, C.A.", style: 'title', bold: false },
  //         { text: "Av. Los Guayabitos, CC Expreso Baruta\nNivel 5, Of. Unica, Urb. La Trinidad\n(Sector Puerta Azul), Caracas.", style: 'dataTitle' },
  //         { text: "FARMACIA OPALO, TLF:0800-FARMATODO\nCCS:Sabana Gnc. Casanova/Recreo. Ed Rupi\nCAJA 06", style: 'dataTitle' },
  //         { text: "RIF/C.I.: V25221952", style: 'data' },
  //         { text: "RAZON SOCIAL: Gabriel Jose Estacio Rivas", style: 'data' },
  //         { text: "Tienda: 2189", style: 'data' },
  //         { text: "Ticket: 13129", style: 'data' },
  //         { text: "Le Atendió: OTAMENDI LUIS", style: 'data' },
  //         { text: "FACTURA", style: 'dataTitle' },
  //         {
  //           style: 'data',
  //           table: {
  //             widths: ["*", "*"],
  //             body: [
  //               [
  //                 { text: 'FACTURA:', alignment: "left", border: [false, false, false, false] },
  //                 { text: '00034034', alignment: "right", border: [false, false, false, false] },
  //               ],
  //               [
  //                 { text: 'FECHA: 18-04-2023:', alignment: "left", border: [false, false, false, false] },
  //                 { text: 'HORA: 12:14', alignment: "right", border: [false, false, false, false] },
  //               ],
  //             ]
  //           }
  //         },
  //         { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
  //         {
  //           style: 'data',
  //           table: {
  //             widths: [30, "*", 30],
  //             body: rowsProducts,
  //           }
  //         },
  //         { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
  //         {
  //           style: 'data',
  //           table: {
  //             widths: [30, "*", 30],
  //             body: [
  //               [
  //                 { text: `Bs. ${this.cartCostoNeto}`, alignment: "left", border: [false, false, false, false] },
  //                 { text: 'IVA 16,00%', alignment: "center", border: [false, false, false, false] },
  //                 { text: `Bs. ${this.cartIva}`, alignment: "right", border: [false, false, false, false] },
  //               ],
  //             ]
  //           }
  //         },
  //         { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
  //         {
  //           style: 'data',
  //           table: {
  //             widths: ["*", "*"],
  //             body: [
  //               [
  //                 { text: `Tarj. Débito`, alignment: "left", border: [false, false, false, false] },
  //                 { text: `Bs. ${this.cartTotal}`, alignment: "right", border: [false, false, false, false] },
  //               ],
  //             ]
  //           }
  //         },
  //         { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
  //         {
  //           style: 'title',
  //           table: {
  //             widths: ["*", "*"],
  //             body: [
  //               [
  //                 { text: `TOTAL`, alignment: "left", border: [false, false, false, false] },
  //                 { text: `${this.cartTotal}`, alignment: "right", border: [false, false, false, false] },
  //               ],
  //             ]
  //           }
  //         },
  //         { text: "**Plazo para devoluciones: 30 días**", bold: true, style: 'data' },
  //         { text: "||| ||||| || |||| ||| || ||| ||| |||", bold: true, style: 'title' },
  //         { text: "T4XX6A911A11PFY4AXENI", style: 'dataTitle' },
  //         // {
  //         //   style: 'data',
  //         //   table: {
  //         //     widths: [130, 80, 30],
  //         //     body: [
  //         //       [
  //         //         { text: 'Datos del Contrato', alignment: 'center', fillColor: '#ababab', bold: true },
  //         //         { text: 'Total costo:', bold: true, border: [false, true, false, false] },
  //         //         { text: `${this.cartTotal}`, bold: true, border: [false, true, false, false] }
  //         //       ]
  //         //     ]
  //         //   }
  //         // },
  //       ],
  //       styles: {
  //         title: {
  //           fontSize: 7,
  //           bold: true,
  //           alignment: 'center'
  //         },
  //         header: {
  //           fontSize: 6.5,
  //           color: 'gray'
  //         },
  //         dataTitle: {
  //           fontSize: 6,
  //           alignment: 'center'
  //         },
  //         data: {
  //           fontSize: 6
  //         }
  //       }
  //     }
  //     let pdf = pdfMake.createPdf(pdfDefinition);
  //     pdf.open();
  //   }
  //   catch (err) {
  //   }
  // }

}
