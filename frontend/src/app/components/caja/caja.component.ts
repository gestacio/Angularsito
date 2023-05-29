import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private _productService: ProductService, private toastr: ToastrService) {}

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
    if (confirm("Press a button!") == true) {
      alert("apretaste ok");
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

}
