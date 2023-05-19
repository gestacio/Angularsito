import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
// import {} from '@angular/material'

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent {
  listProducts: Product[] = []
  loading: boolean = false;
  array_products: Product[] = [];

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

  postListProductsWhere(e: Event) {
    const filtro = (e.target as HTMLInputElement).value;
    this._productService.postListProductsWhere(filtro).subscribe((data: Product[]) => {
      console.log(data)
      this.array_products = data;
      // this.loading = false;
    })
    // const filtro = (e.target as HTMLInputElement).value;
    // console.log(filtro);
    // this.array_products = this.listProducts.filter((product) => {
    //   return product.name.toLowerCase() == filtro.trim().toLocaleLowerCase();
    // });
    // console.log(this.array_products)

    // this.listProducts.filter = filtro.trim().toLowerCase();


    
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning("El producto fue eliminado con éxito", "Atención");
    })
  }

}
